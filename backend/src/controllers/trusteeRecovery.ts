import { Request, Response } from "express";
import { getTrusteeAccessByVaultId } from "../db/trusteeAccess";
import emailService from "../services/email";

const otpStore = new Map<string, { otp: string; expires: number; email: string }>();

// Generate OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Store OTP with expiration
function storeOTP(trusteeVaultId: string, email: string): string {
  const otp = generateOTP();
  const expires = Date.now() + (10 * 60 * 1000); // 10 minutes
  
  otpStore.set(trusteeVaultId, { otp, expires, email });
  
  // Clean up expired OTPs
  setTimeout(() => {
    otpStore.delete(trusteeVaultId);
  }, 10 * 60 * 1000);
  
  return otp;
}

// Verify OTP
function verifyOTP(trusteeVaultId: string, inputOTP: string): boolean {
  const stored = otpStore.get(trusteeVaultId);
  
  if (!stored || Date.now() > stored.expires) {
    otpStore.delete(trusteeVaultId);
    return false;
  }
  
  return stored.otp === inputOTP;
}

// Step 1: Initiate unlock process
export async function initiateUnlockController(req: Request, res: Response): Promise<Response> {
  const { trusteeVaultId } = req.body;

  if (!trusteeVaultId) {
    return res.status(400).send({
      success: false,
      message: "Trustee Vault ID is required",
    });
  }

  try {
    // Find trustee access record
    const trusteeAccess = await getTrusteeAccessByVaultId(trusteeVaultId);

    if (!trusteeAccess) {
      return res.status(404).send({
        success: false,
        message: "Vault ID not found or invalid",
      });
    }

    if (!trusteeAccess.isActive) {
      return res.status(400).send({
        success: false,
        message: "Recovery is not yet available for this vault. The owner may still be active.",
      });
    }

    // Generate and send OTP
    const otp = storeOTP(trusteeVaultId, trusteeAccess.trusteeEmail);
    
    if (process.env.NODE_ENV !== "test") {
      await emailService.sendOTPEmail(trusteeAccess.trusteeEmail, otp);
    }

    return res.status(200).send({
      success: true,
      message: "Verification code sent to your email",
      data: {
        vaultInfo: {
          title: trusteeAccess.vault?.title,
          secretType: trusteeAccess.vault?.secretType,
          ownerEmail: trusteeAccess.vault?.user?.email
        },
        otpSent: process.env.NODE_ENV !== "test"
      }
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Step 2: Verify OTP and recovery key, return decrypted secret
export async function verifyAndRecoverController(req: Request, res: Response): Promise<Response> {
  const { trusteeVaultId, otp, recoveryPassword } = req.body;

  if (!trusteeVaultId || !otp || !recoveryPassword) {
    return res.status(400).send({
      success: false,
      message: "Trustee Vault ID, OTP, and recovery password are required",
    });
  }

  try {
    // Verify OTP first
    if (!verifyOTP(trusteeVaultId, otp)) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Get trustee access record
    const trusteeAccess = await getTrusteeAccessByVaultId(trusteeVaultId);
    if (!trusteeAccess || !trusteeAccess.isActive) {
      return res.status(400).send({
        success: false,
        message: "Vault not found or recovery not active",
      });
    }

    // Verify recovery password
    const isValidPassword = await trusteeAccess.verifyRecoveryKey(recoveryPassword);
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid recovery password",
      });
    }

    // Clean up OTP
    otpStore.delete(trusteeVaultId);

    // Send notification to owner
    if (process.env.NODE_ENV !== "test" && trusteeAccess.vault?.user?.email) {
      await emailService.sendRecoveryCompleteNotification(
        trusteeAccess.vault.user.email,
        trusteeAccess.vault.title,
        trusteeAccess.trusteeEmail
      );
    }

    // Return encrypted secret for frontend decryption
    return res.status(200).send({
      success: true,
      message: "Recovery successful! Use the recovery password to decrypt the secret.",
      data: {
        encryptedSecret: trusteeAccess.vault?.encryptedSecret,
        vaultInfo: {
          title: trusteeAccess.vault?.title,
          secretType: trusteeAccess.vault?.secretType,
          fileName: trusteeAccess.vault?.fileName,
          isFile: !!trusteeAccess.vault?.ipfsHash
        },
        ownerInfo: {
          email: trusteeAccess.vault?.user?.email
        }
      }
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Recovery failed: ${error.message}`,
    });
  }
}

// Get vault info without starting recovery (for preview)
export async function getVaultInfoController(req: Request, res: Response): Promise<Response> {
  const { trusteeVaultId } = req.params;

  if (!trusteeVaultId) {
    return res.status(400).send({
      success: false,
      message: "Trustee Vault ID is required",
    });
  }

  try {
    const trusteeAccess = await getTrusteeAccessByVaultId(trusteeVaultId);

    if (!trusteeAccess) {
      return res.status(404).send({
        success: false,
        message: "Vault ID not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Vault information retrieved",
      data: {
        vaultInfo: {
          title: trusteeAccess.vault?.title,
          secretType: trusteeAccess.vault?.secretType,
          isFile: !!trusteeAccess.vault?.ipfsHash,
          ownerEmail: trusteeAccess.vault?.user?.email
        },
        isActive: trusteeAccess.isActive,
        canRecover: trusteeAccess.isActive
      }
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}