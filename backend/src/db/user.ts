import User, { RecoveryStatus } from "../model/user";
import { Op } from "sequelize";

export interface CreateUserData {
  email: string;
  walletAddress: string;
  publicKey: string;
  recoveryThreshold?: number;
  inactivityMonths?: number;
}

export interface UpdateUserData {
  email?: string;
  recoveryThreshold?: number;
  inactivityMonths?: number;
  isActive?: boolean;
  recoveryStatus?: RecoveryStatus;
  lastLogin?: Date;
  recoveryInitiatedAt?: Date;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: userData.email },
          { walletAddress: userData.walletAddress }
        ]
      }
    });

    if (existingUser) {
      throw new Error('User already exists with this email or wallet address');
    }

    const user = await User.create(userData as any);
    return user;
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await User.findByPk(id);
  } catch (error: any) {
    throw new Error(`Failed to get user by ID: ${error.message}`);
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await User.findOne({ where: { email } });
  } catch (error: any) {
    throw new Error(`Failed to get user by email: ${error.message}`);
  }
}

export async function getUserByWalletAddress(walletAddress: string): Promise<User | null> {
  try {
    return await User.findOne({ where: { walletAddress } });
  } catch (error: any) {
    throw new Error(`Failed to get user by wallet address: ${error.message}`);
  }
}

export async function updateUser(id: string, updateData: UpdateUserData): Promise<User> {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);
    return user;
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function updateLastLogin(id: string): Promise<void> {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.updateLastLogin();
  } catch (error: any) {
    throw new Error(`Failed to update last login: ${error.message}`);
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    return await User.findAll({
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
}

export async function getInactiveUsers(): Promise<User[]> {
  try {
    const users = await User.findAll({
      where: {
        isActive: true,
        recoveryStatus: RecoveryStatus.ACTIVE
      }
    });

    // Filter users who are actually inactive
    return users.filter(user => user.isInactive());
  } catch (error: any) {
    throw new Error(`Failed to get inactive users: ${error.message}`);
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

export { User };
