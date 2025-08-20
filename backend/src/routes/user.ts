import { Router } from "express";
import {
  createUserController,
  getUserController,
  getUserByEmailController,
  getUserByWalletController,
  updateUserController,
  updateLastLoginController,
  getAllUsersController,
  getInactiveUsersController,
  deleteUserController
} from "../controllers/user";

const router = Router();

// Create new user
router.post("/", createUserController);

// Get all users
router.get("/", getAllUsersController);
router.get("/inactive", getInactiveUsersController);
router.get("/:id", getUserController);
router.get("/email/:email", getUserByEmailController);
router.get("/wallet/:walletAddress", getUserByWalletController);

// Update user
router.put("/:id", updateUserController);

// Update last login
router.patch("/:id/last-login", updateLastLoginController);

// Delete user
router.delete("/:id", deleteUserController);

export default router;