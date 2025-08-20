import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

export enum RecoveryStatus {
  ACTIVE = 'active',
  WARNING_SENT = 'warning_sent',
  TRUSTEES_NOTIFIED = 'trustees_notified',
  RECOVERY_IN_PROGRESS = 'recovery_in_progress',
  RECOVERED = 'recovered',
  CANCELLED = 'cancelled'
}

class User extends Model {
  public id!: number;
  public email!: string;
  public walletAddress!: string;
  public publicKey!: string;
  public recoveryThreshold!: number;
  public inactivityMonths!: number;
  public lastLogin!: Date;
  public isActive!: boolean;
  public recoveryStatus!: RecoveryStatus;
  public recoveryInitiatedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public isInactive(): boolean {
    const now = new Date();
    const lastLoginDate = new Date(this.lastLogin);
    const monthsDiff = (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsDiff > this.inactivityMonths;
  }

  public async updateLastLogin(): Promise<void> {
    this.lastLogin = new Date();
    await this.save();
  }

  public canInitiateRecovery(): boolean {
    return this.recoveryStatus === RecoveryStatus.ACTIVE && this.isInactive();
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    walletAddress: {
      type: DataTypes.STRING(42),
      allowNull: false,
      unique: true,
      field: 'wallet_address'
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'public_key'
    },
    recoveryThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      field: 'recovery_threshold'
    },
    inactivityMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'inactivity_months'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'last_login'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    recoveryStatus: {
      type: DataTypes.ENUM(...Object.values(RecoveryStatus)),
      allowNull: false,
      defaultValue: RecoveryStatus.ACTIVE,
      field: 'recovery_status'
    },
    recoveryInitiatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'recovery_initiated_at'
    }
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    underscored: true
  }
);

export default User;
