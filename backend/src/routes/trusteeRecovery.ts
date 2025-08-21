import { Router } from "express";
import {
  initiateUnlockController,
  getVaultInfoController,
  verifyOTPController,
  verifyRecoveryPasswordController  
} from "../controllers/trusteeRecovery";

const trusteeRouter = Router();

trusteeRouter.get("/:trusteeVaultId", getVaultInfoController);

// Step 1: Initiate unlock process - sends OTP to trustee email
// POST /api/trustee-recovery/initiate
trusteeRouter.post("/initiate", initiateUnlockController);

trusteeRouter.post("/verify-otp", verifyOTPController);
trusteeRouter.post("/verify-recovery-password", verifyRecoveryPasswordController);

export default trusteeRouter;


