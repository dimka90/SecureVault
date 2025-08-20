import { Request, Response } from "express";
import {
  createVault,
  getVaultById,
  getVaultsByUserId,
  getVaultsByUserWallet,
  getVaultsByType,
  updateVault,
  deleteVault,
  hardDeleteVault,
  getUserVaultStats,
  searchVaults,
  getFileVaults,
  CreateVaultData,
  UpdateVaultData
} from "../db/vault";
import { SecretType } from "../model/vault";
import {  getUserByWalletAddress } from "../db/user";
import { createTrusteeAccess } from "../db/trusteeAccess";
import emailService from "../services/email";
import { getUserById as fetchUserById } from "../db/user";



export async function createVaultController(req: Request, res: Response): Promise<Response> {

  const { 
    userId, 
    title, 
    description, 
    encryptedSecret, 
    secretType,
    ipfsHash,
    fileName,
    fileSize,
    trusteeEmail,
    recoveryPassword  
  } = req.body;

  console.log("I am doing great")
  if (!userId || !title || !encryptedSecret || !recoveryPassword || !trusteeEmail) {
    return res.status(400).send({
      success: false,
      message: "Fields userId, title, encryptedSecret, recoveryPassword, and trusteeEmail are required",
    });
  }

  try {
    // Get user info for email
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Create the main vault
    const vaultData: CreateVaultData = {
      userId,
      title,
      description,
      encryptedSecret,
      secretType: secretType || SecretType.NOTE,
      ipfsHash,
      fileName,
      fileSize: fileSize ? parseInt(fileSize) : undefined,
      trusteeEmail
    };

    const vault = await createVault(vaultData);

    console.log("Vault created successfully:", vault.id);
    let trusteeVaultId = null;

    // Create trustee access if trustee email and recovery password provided
    if (trusteeEmail && recoveryPassword) {
      const trusteeAccess = await createTrusteeAccess({
        originalVaultId: parseInt(vault.id, 10),
        trusteeEmail,
        recoveryPassword
      });

      console.log("Trustee access created successfully:", trusteeAccess.trusteeVaultId);    
      trusteeVaultId = trusteeAccess.trusteeVaultId;

      // Send trustee designation email
      if (process.env.NODE_ENV !== "test") {
        await emailService.sendTrusteeDesignationEmail({
          trusteeEmail,
          ownerEmail: user.email,
          ownerName: user.email.split('@')[0],
          vaultTitle: vault.title,
          trusteeVaultId: trusteeVaultId,
          inactivityMonths: user.inactivityMonths
        });
      }
    }

    return res.status(201).send({
      success: true,
      message: "Successfully created new vault" + (trusteeEmail ? " and notified trustee" : ""),
      data: {
        vault: vault,
        trusteeVaultId: trusteeVaultId,
        trusteeNotified: !!trusteeEmail
      },
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}



export async function getVaultController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Vault ID is required",
    });
  }

  try {
    const vault = await getVaultById(id);
    
    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Vault not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Vault retrieved successfully",
      data: vault,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserVaultsController(req: Request, res: Response): Promise<Response> {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const vaults = await getVaultsByUserId(userId);

    return res.status(200).send({
      success: true,
      message: "User vaults retrieved successfully",
      data: vaults,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserVaultsByWalletController(req: Request, res: Response): Promise<Response> {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).send({
      success: false,
      message: "Wallet address is required",
    });
  }

  try {
    const vaults = await getVaultsByUserWallet(walletAddress);

    return res.status(200).send({
      success: true,
      message: "User vaults retrieved successfully",
      data: vaults,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getVaultsByTypeController(req: Request, res: Response): Promise<Response> {
  const { userId, secretType } = req.params;

  if (!userId || !secretType) {
    return res.status(400).send({
      success: false,
      message: "User ID and secret type are required",
    });
  }

  // Validate secret type
  if (!Object.values(SecretType).includes(secretType as SecretType)) {
    return res.status(400).send({
      success: false,
      message: "Invalid secret type",
    });
  }

  try {
    const vaults = await getVaultsByType(userId, secretType as SecretType);

    return res.status(200).send({
      success: true,
      message: `Vaults of type ${secretType} retrieved successfully`,
      data: vaults,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function updateVaultController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const updateData: UpdateVaultData = req.body;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Vault ID is required",
    });
  }

  try {
    const result = await updateVault(id, updateData);

    return res.status(200).send({
      success: true,
      message: "Vault updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function deleteVaultController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).send({
      success: false,
      message: "Vault ID and User ID are required",
    });
  }

  try {
    await deleteVault(id, userId);

    return res.status(200).send({
      success: true,
      message: "Vault deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function hardDeleteVaultController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).send({
      success: false,
      message: "Vault ID and User ID are required",
    });
  }

  try {
    await hardDeleteVault(id, userId);

    return res.status(200).send({
      success: true,
      message: "Vault permanently deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserVaultStatsController(req: Request, res: Response): Promise<Response> {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const stats = await getUserVaultStats(userId);

    return res.status(200).send({
      success: true,
      message: "User vault statistics retrieved successfully",
      data: stats,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function searchVaultsController(req: Request, res: Response): Promise<Response> {
  const { userId } = req.params;
  const { q: searchTerm } = req.query;

  if (!userId || !searchTerm) {
    return res.status(400).send({
      success: false,
      message: "User ID and search term are required",
    });
  }

  try {
    const vaults = await searchVaults(userId, searchTerm as string);

    return res.status(200).send({
      success: true,
      message: "Vault search completed successfully",
      data: vaults,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getFileVaultsController(req: Request, res: Response): Promise<Response> {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const vaults = await getFileVaults(userId);

    return res.status(200).send({
      success: true,
      message: "File vaults retrieved successfully",
      data: vaults,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Helper controller to create vault with wallet authentication
export async function createVaultByWalletController(req: Request, res: Response): Promise<Response> {
  const { 
    walletAddress,
    title, 
    description, 
    encryptedSecret, // Simplified - no separate AES key
    secretType,
    ipfsHash,
    fileName,
    fileSize,
    trusteeEmail // New trustee field
  } = req.body;

  if (!walletAddress || !title || !encryptedSecret) {
    return res.status(400).send({
      success: false,
      message: "Fields walletAddress, title, and encryptedSecret are required",
    });
  }

  try {
    // Find user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this wallet address",
      });
    }

    const vaultData: CreateVaultData = {
      userId: user.id.toString(),
      title,
      description,
      encryptedSecret, // Already encrypted with recovery password on frontend
      secretType: secretType || SecretType.NOTE,
      ipfsHash,
      fileName,
      fileSize: fileSize ? parseInt(fileSize) : undefined,
      trusteeEmail
    };

    const result = await createVault(vaultData);

    return res.status(201).send({
      success: true,
      message: "Successfully created new vault",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}
async function getUserById(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await fetchUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
