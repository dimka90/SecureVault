import { Router } from "express";
import {
  initiateVaultRecoveryController,
  validateRecoveryTokenController,
  recoverVaultController,
  cancelRecoveryController,
  getVaultsRequiringRecoveryController,
} from "../controllers/recovery";

const vaultRecoveryRouter = Router();
vaultRecoveryRouter.post("/:vaultId/initiate", initiateVaultRecoveryController);
vaultRecoveryRouter.get("/validate/:token", validateRecoveryTokenController);
vaultRecoveryRouter.post("/recover/:token", recoverVaultController);
vaultRecoveryRouter.post("/cancel/:token", cancelRecoveryController);
vaultRecoveryRouter.get("/requiring-recovery", getVaultsRequiringRecoveryController);

export default vaultRecoveryRouter;
