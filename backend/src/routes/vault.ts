import { Router } from "express";
import {
  createVaultController,
  createVaultByWalletController,
  getVaultController,
  getUserVaultsController,
  getUserVaultsByWalletController,
  getVaultsByTypeController,
  updateVaultController,
  deleteVaultController,
  hardDeleteVaultController,
  getUserVaultStatsController,
  searchVaultsController,
  getFileVaultsController
} from "../controllers/vault";

const vaultRouter = Router();

// Create
vaultRouter.post("/", createVaultController);
vaultRouter.post("/wallet", createVaultByWalletController);

// Read
vaultRouter.get("/:id", getVaultController);
vaultRouter.get("/user/:userId", getUserVaultsController);
vaultRouter.get("/wallet/:walletAddress", getUserVaultsByWalletController);
vaultRouter.get("/user/:userId/type/:secretType", getVaultsByTypeController);
vaultRouter.get("/user/:userId/stats", getUserVaultStatsController);
vaultRouter.get("/user/:userId/search", searchVaultsController);
vaultRouter.get("/user/:userId/files", getFileVaultsController);

// Update
vaultRouter.put("/:id", updateVaultController);

// Delete
vaultRouter.delete("/:id", deleteVaultController);
vaultRouter.delete("/:id/permanent", hardDeleteVaultController);

export default vaultRouter;
