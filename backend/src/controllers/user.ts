import { Request, Response } from "express";
import { 
  createUser, 
  getUserById, 
  getUserByEmail, 
  getUserByWalletAddress,
  updateUser, 
  updateLastLogin,
  getAllUsers,
  getInactiveUsers,
  deleteUser,
  CreateUserData,
  UpdateUserData 
} from "../db/user";
import { RecoveryStatus } from "../model/user";

export async function createUserController(req: Request, res: Response): Promise<Response> {
  const { email, walletAddress, publicKey, recoveryThreshold, inactivityMonths } = req.body;

  if (!email || !walletAddress || !publicKey) {
    return res.status(400).send({
      success: false,
      message: "Fields email, walletAddress, and publicKey are required",
    });
  }

  try {
    const userData: CreateUserData = {
      email,
      walletAddress,
      publicKey,
      recoveryThreshold,
      inactivityMonths
    };

    const result = await createUser(userData);

    return res.status(201).send({
      success: true,
      message: "Successfully created new user",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await getUserById(id);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserByEmailController(req: Request, res: Response): Promise<Response> {
  const { email } = req.params;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getUserByWalletController(req: Request, res: Response): Promise<Response> {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).send({
      success: false,
      message: "Wallet address is required",
    });
  }

  try {
    const user = await getUserByWalletAddress(walletAddress);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function updateUserController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const updateData: UpdateUserData = req.body;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const result = await updateUser(id, updateData);

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function updateLastLoginController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    await updateLastLogin(id);

    return res.status(200).send({
      success: true,
      message: "Last login updated successfully",
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getAllUsersController(req: Request, res: Response): Promise<Response> {
  try {
    const users = await getAllUsers();

    return res.status(200).send({
      success: true,
      message: "Successfully retrieved all users",
      data: users,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function getInactiveUsersController(req: Request, res: Response): Promise<Response> {
  try {
    const users = await getInactiveUsers();

    return res.status(200).send({
      success: true,
      message: "Successfully retrieved inactive users",
      data: users,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

export async function deleteUserController(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    await deleteUser(id);

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}