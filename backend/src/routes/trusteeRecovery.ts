import { Router } from "express";
import {
  initiateUnlockController,
  verifyAndRecoverController,
  getVaultInfoController
} from "../controllers/trusteeRecovery";

const trusteeRouter = Router();

// Get vault info without starting recovery (for preview)
// GET /api/trustee-recovery/vault/:trusteeVaultId
trusteeRouter.get("/:trusteeVaultId", getVaultInfoController);

// Step 1: Initiate unlock process - sends OTP to trustee email
// POST /api/trustee-recovery/initiate
trusteeRouter.post("/initiate", initiateUnlockController);

// Step 2: Verify OTP and recovery password, return encrypted secret
// POST /api/trustee-recovery/verify-and-recover
trusteeRouter.post("/verify-and-recover", verifyAndRecoverController);

export default trusteeRouter;


