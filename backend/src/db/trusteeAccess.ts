
import TrusteeAccess from "../model/trusteeAccess";
import Vault from "../model/vault";
import User from "../model/user";

export interface CreateTrusteeAccessData {
  originalVaultId: number;
  trusteeEmail: string;
  recoveryPassword: string;
}

export async function createTrusteeAccess(data: CreateTrusteeAccessData): Promise<TrusteeAccess> {
  try {
    console.log(`Creating trustee access for vault ID: ${data.originalVaultId} with trustee email: ${data.trusteeEmail}`);
    const trusteeVaultId = TrusteeAccess.generateVaultId();
    console.log(`Generated trustee vault ID: ${trusteeVaultId}`);
    const recoveryKeyHash = await TrusteeAccess.hashRecoveryKey(data.recoveryPassword);
    // Log the creation for debugging
  
    console.log(`Generated trustee vault12 ID: ${trusteeVaultId}`);
    console.log("My own key", recoveryKeyHash)
    const trusteeAccess = await TrusteeAccess.create({
      trusteeVaultId,
      originalVaultId: data.originalVaultId,
      trusteeEmail: data.trusteeEmail,
      recoveryKeyHash,
      isActive: false
    });

    return trusteeAccess;
  } catch (error: any) {
    throw new Error(`Failed to create trustee access: ${error.message}`);
  }
}

// Find by trustee vault ID
export async function getTrusteeAccessByVaultId(trusteeVaultId: string): Promise<TrusteeAccess | null> {
  try {
    return await TrusteeAccess.findOne({
      where: { trusteeVaultId },
      include: [
        {
          model: Vault,
          as: 'vault',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'email', 'walletAddress']
            }
          ]
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to get trustee access: ${error.message}`);
  }
}

// Get all trustee access records for a vault
export async function getTrusteeAccessByOriginalVaultId(originalVaultId: number): Promise<TrusteeAccess | null> {
  try {
    return await TrusteeAccess.findOne({
      where: { originalVaultId },
      include: [
        {
          model: Vault,
          as: 'vault'
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to get trustee access by original vault ID: ${error.message}`);
  }
}

// Get all inactive user vaults that need recovery activation
export async function getVaultsNeedingRecoveryActivation(): Promise<TrusteeAccess[]> {
  try {
    return await TrusteeAccess.findAll({
      where: {
        isActive: false
      },
      include: [
        {
          model: Vault,
          as: 'vault',
          where: {
            isActive: true
          },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'email', 'walletAddress', 'lastLogin', 'inactivityMonths']
            }
          ]
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vaults needing recovery activation: ${error.message}`);
  }
}

// Activate recovery for user's vaults
export async function activateRecoveryForUser(userId: string): Promise<TrusteeAccess[]> {
  try {
    const trusteeAccessRecords = await TrusteeAccess.findAll({
      where: {
        isActive: false
      },
      include: [
        {
          model: Vault,
          as: 'vault',
          where: {
            userId: userId,
            isActive: true
          }
        }
      ]
    });

    const activatedRecords: TrusteeAccess[] = [];
    for (const record of trusteeAccessRecords) {
      await record.activateRecovery();
      activatedRecords.push(record);
    }

    return activatedRecords;
  } catch (error: any) {
    throw new Error(`Failed to activate recovery for user: ${error.message}`);
  }
}

export { TrusteeAccess };