import { Request, Response } from "express";
import {
  getVaultById,
  findVaultByRecoveryToken,
  getVaultsRequiringRecovery,
} from "../db/vault";
import { VaultRecoveryStatus } from "../model/vault";
import emailService from "../services/email";

export async function initiateVaultRecoveryController(
  req: Request,
  res: Response
): Promise<Response> {
  const { vaultId } = req.params;

  if (!vaultId) {
    return res.status(400).send({
      success: false,
      message: "Vault ID is required",
    });
  }

  try {
    const vault = await getVaultById(vaultId);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Vault not found",
      });
    }

    if (!vault.hasTrustee) {
      return res.status(400).send({
        success: false,
        message: "Vault has no assigned trustee",
      });
    }

    if (!vault.canInitiateRecovery()) {
      return res.status(400).send({
        success: false,
        message: "Recovery cannot be initiated for this vault",
      });
    }

    const recoveryToken = await vault.initiateRecovery();

    const recoveryLink = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/recovery/${recoveryToken}`;
    if (process.env.NODE_ENV !== "test") {
      await emailService.sendRecoveryNotification({
        trusteeEmail: vault.trusteeEmail!,
        ownerEmail: vault.user?.email || "Unknown",
        ownerName: vault.user?.email || "Unknown User",
        vaultTitle: vault.title,
        recoveryToken,
        recoveryLink,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Recovery initiated successfully",
      data: {
        recoveryToken,
        recoveryLink,
        trusteeEmail: vault.trusteeEmail,
        vaultInfo: vault.getRecoveryDisplayInfo(),
        emailSent: process.env.NODE_ENV !== "test",
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Validate recovery token and show recovery page info
export async function validateRecoveryTokenController(
  req: Request,
  res: Response
): Promise<Response> {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Recovery token is required",
    });
  }

  try {
    const vault = await findVaultByRecoveryToken(token);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Invalid or expired recovery token",
      });
    }

    if (vault.recoveryStatus !== VaultRecoveryStatus.RECOVERY_INITIATED) {
      return res.status(400).send({
        success: false,
        message: "Recovery process is not active for this vault",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Recovery token is valid",
      data: {
        vault: vault.getRecoveryDisplayInfo(),
        ownerEmail: vault.user?.email,
        ownerName: vault.user?.email?.split("@")[0], // Simple name extraction
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Attempt to recover vault with recovery password
export async function recoverVaultController(
  req: Request,
  res: Response
): Promise<Response> {
  const { token } = req.params;
  const { recoveryPassword } = req.body;

  if (!token || !recoveryPassword) {
    return res.status(400).send({
      success: false,
      message: "Recovery token and recovery password are required",
    });
  }

  try {
    const vault = await findVaultByRecoveryToken(token);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Invalid or expired recovery token",
      });
    }

    if (vault.recoveryStatus !== VaultRecoveryStatus.RECOVERY_INITIATED) {
      return res.status(400).send({
        success: false,
        message: "Recovery process is not active for this vault",
      });
    }

    // Mark vault as recovered
    await vault.completeRecovery();

    // Send completion notification email
    if (
      process.env.NODE_ENV !== "test" &&
      vault.user?.email &&
      vault.trusteeEmail
    ) {
      await emailService.sendRecoveryCompleteNotification(
        vault.user.email,
        vault.title,
        vault.trusteeEmail
      );
    }

    // Return the encrypted secret for frontend decryption
    // The frontend will use the recovery password to decrypt it
    return res.status(200).send({
      success: true,
      message:
        "Recovery successful! Use the recovery password to decrypt the secret in your browser.",
      data: {
        encryptedSecret: vault.encryptedSecret,
        vaultInfo: vault.getRecoveryDisplayInfo(),
        instructions:
          "The encrypted secret is provided. Use your recovery password to decrypt it client-side.",
        ownerEmail: vault.user?.email,
      },
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Recovery failed: ${error.message}`,
    });
  }
}

// Cancel recovery process
export async function cancelRecoveryController(
  req: Request,
  res: Response
): Promise<Response> {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Recovery token is required",
    });
  }

  try {
    const vault = await findVaultByRecoveryToken(token);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Invalid recovery token",
      });
    }

    await vault.cancelRecovery();

    return res.status(200).send({
      success: true,
      message: "Recovery process cancelled successfully",
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Get all vaults requiring recovery (for admin/monitoring)
export async function getVaultsRequiringRecoveryController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const vaults = await getVaultsRequiringRecovery();

    return res.status(200).send({
      success: true,
      message: "Vaults requiring recovery retrieved successfully",
      data: vaults.map((vault) => ({
        id: vault.id,
        title: vault.title,
        trusteeEmail: vault.trusteeEmail,
        recoveryStatus: vault.recoveryStatus,
        owner: vault.user
          ? {
              email: vault.user.email,
              lastLogin: vault.user.lastLogin,
              inactiveForDays: Math.floor(
                (Date.now() - new Date(vault.user.lastLogin).getTime()) /
                  (1000 * 60 * 60 * 24)
              ),
            }
          : null,
      })),
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}
