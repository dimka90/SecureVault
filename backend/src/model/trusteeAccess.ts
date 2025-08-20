import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import Vault from "./vault";
import crypto from "crypto";
import bcrypt from "bcrypt"

class TrusteeAccess extends Model {
  public id!: number;
  public trusteeVaultId!: string;
  public originalVaultId!: number;
  public trusteeEmail!: string;
  public isActive!: boolean;
  public recoveryKeyHash!: string;
  public activatedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associated vault
  public vault?: Vault;

  // Generate unique trustee vault ID
  public static generateVaultId(): string {
    const randomBytes = crypto.randomBytes(6).toString('hex');
    return randomBytes.toUpperCase();
  }

  // Hash recovery password
  public static async hashRecoveryKey(recoveryPassword: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(recoveryPassword, saltRounds);
  }

  // Verify recovery password
  public async verifyRecoveryKey(recoveryPassword: string): Promise<boolean> {
    return await bcrypt.compare(recoveryPassword, this.recoveryKeyHash);
  }

  // Activate recovery for this vault
  public async activateRecovery(): Promise<void> {
    this.isActive = true;
    this.activatedAt = new Date();
    await this.save();
  }

  // Deactivate recovery
  public async deactivateRecovery(): Promise<void> {
    this.isActive = false;
    this.activatedAt = null;
    await this.save();
  }

  // Check if recovery can be activated
  public canActivateRecovery(): boolean {
    return !this.isActive;
  }

  public getDisplayInfo() {
    return {
      trusteeVaultId: this.trusteeVaultId,
      vaultTitle: this.vault?.title || 'Unknown Vault',
      isActive: this.isActive,
      createdAt: this.createdAt,
      activatedAt: this.activatedAt
    };
  }
}

TrusteeAccess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    trusteeVaultId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'trustee_vault_id'
    },
    originalVaultId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'original_vault_id',
      references: {
        model: 'vaults',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    trusteeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'trustee_email',
      validate: {
        isEmail: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_active'
    },
    recoveryKeyHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'recovery_key_hash'
    },
    activatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'activated_at'
    }
  },
  {
    sequelize,
    tableName: "trustee_access",
    modelName: "TrusteeAccess",
    timestamps: true,
    underscored: true
  }
);

TrusteeAccess.belongsTo(Vault, { foreignKey: 'originalVaultId', as: 'vault' });
Vault.hasOne(TrusteeAccess, { foreignKey: 'originalVaultId', as: 'trusteeAccess' });

export default TrusteeAccess;