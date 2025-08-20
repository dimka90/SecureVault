// import { Model, DataTypes } from "sequelize";
// import sequelize from "../config/sequelize";
// import User from "./user";

// export enum SecretType {
//   SEED_PHRASE = 'seed_phrase',
//   PASSWORD = 'password',
//   DOCUMENT = 'document',
//   NOTE = 'note',
//   PRIVATE_KEY = 'private_key',
//   BANK_DETAILS = 'bank_details'
// }

// class Vault extends Model {
//   public id!: string;
//   public userId!: string;
//   public title!: string;
//   public description!: string | null;
//   public encryptedSecret!: string;
//   public encryptedAESKey!: string;
//   public secretType!: SecretType;
//   public ipfsHash!: string | null;
//   public fileName!: string | null;
//   public fileSize!: number | null;
//   public isActive!: boolean;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   // Virtual field to check if it's a file
//   public get isFile(): boolean {
//     return this.secretType === SecretType.DOCUMENT && !!this.ipfsHash;
//   }

//   // Method to get display info
//   public getDisplayInfo() {
//     return {
//       id: this.id,
//       title: this.title,
//       description: this.description,
//       secretType: this.secretType,
//       isFile: this.isFile,
//       fileName: this.fileName,
//       fileSize: this.fileSize,
//       createdAt: this.createdAt,
//       updatedAt: this.updatedAt
//     };
//   }
// }

// Vault.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: 'user_id',
//       references: {
//         model: 'users',
//         key: 'id'
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE'
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1, 255]
//       }
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     encryptedSecret: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       field: 'encrypted_secret'
//     },
//     encryptedAESKey: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       field: 'encrypted_aes_key'
//     },
//     secretType: {
//       type: DataTypes.ENUM(...Object.values(SecretType)),
//       allowNull: false,
//       defaultValue: SecretType.NOTE,
//       field: 'secret_type'
//     },
//     ipfsHash: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'ipfs_hash'
//     },
//     fileName: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'file_name'
//     },
//     fileSize: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       field: 'file_size'
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//       field: 'is_active'
//     }
//   },
//   {
//     sequelize,
//     tableName: "vaults",
//     modelName: "Vault",
//     timestamps: true,
//     underscored: true
//   }
// );

// Vault.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// User.hasMany(Vault, { foreignKey: 'userId', as: 'vaults' });

// export default Vault;


import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import User from "./user";
import crypto from "crypto";

export enum SecretType {
  SEED_PHRASE = 'seed_phrase',
  PASSWORD = 'password',
  DOCUMENT = 'document',
  NOTE = 'note',
  PRIVATE_KEY = 'private_key',
  BANK_DETAILS = 'bank_details'
}

export enum VaultRecoveryStatus {
  ACTIVE = 'active',
  USER_INACTIVE = 'user_inactive',
  RECOVERY_INITIATED = 'recovery_initiated',
  RECOVERED = 'recovered',
  CANCELLED = 'cancelled'
}

class Vault extends Model {
  public id!: string;
  public userId!: string;
  public title!: string;
  public description!: string | null;
  public encryptedSecret!: string;
  public secretType!: SecretType;
  public ipfsHash!: string | null;
  public fileName!: string | null;
  public fileSize!: number | null;
  public isActive!: boolean;
  
  // New trustee fields
  public trusteeEmail!: string | null;
  public recoveryStatus!: VaultRecoveryStatus;
  public recoveryToken!: string | null;
  public recoveryInitiatedAt!: Date | null;
  public lastTrusteeNotification!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
    user: any;

  // Virtual field to check if it's a file
  public get isFile(): boolean {
    return this.secretType === SecretType.DOCUMENT && !!this.ipfsHash;
  }

  // Check if vault has trustee protection
  public get hasTrustee(): boolean {
    return !!this.trusteeEmail;
  }

  // Generate secure recovery token
  public generateRecoveryToken(): string {
    const token = crypto.randomBytes(32).toString('hex');
    this.recoveryToken = token;
    return token;
  }

  // Check if recovery can be initiated
  public canInitiateRecovery(): boolean {
    return this.recoveryStatus === VaultRecoveryStatus.ACTIVE && this.hasTrustee;
  }

  // Initiate recovery process
  public async initiateRecovery(): Promise<string> {
    if (!this.canInitiateRecovery()) {
      throw new Error('Recovery cannot be initiated for this vault');
    }

    const token = this.generateRecoveryToken();
    this.recoveryStatus = VaultRecoveryStatus.RECOVERY_INITIATED;
    this.recoveryInitiatedAt = new Date();
    
    await this.save();
    return token;
  }

  // Complete recovery
  public async completeRecovery(): Promise<void> {
    this.recoveryStatus = VaultRecoveryStatus.RECOVERED;
    await this.save();
  }

  // Cancel recovery
  public async cancelRecovery(): Promise<void> {
    this.recoveryStatus = VaultRecoveryStatus.ACTIVE;
    this.recoveryToken = null;
    this.recoveryInitiatedAt = null;
    await this.save();
  }

  // Method to get display info (updated)
  public getDisplayInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      secretType: this.secretType,
      isFile: this.isFile,
      fileName: this.fileName,
      fileSize: this.fileSize,
      hasTrustee: this.hasTrustee,
      trusteeEmail: this.trusteeEmail,
      recoveryStatus: this.recoveryStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Get recovery display info (for trustee)
  public getRecoveryDisplayInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      secretType: this.secretType,
      isFile: this.isFile,
      fileName: this.fileName,
      recoveryStatus: this.recoveryStatus,
      recoveryInitiatedAt: this.recoveryInitiatedAt
    };
  }
}

Vault.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    encryptedSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'encrypted_secret'
    },
    secretType: {
      type: DataTypes.ENUM(...Object.values(SecretType)),
      allowNull: false,
      defaultValue: SecretType.NOTE,
      field: 'secret_type'
    },
    ipfsHash: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ipfs_hash'
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_name'
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'file_size'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    // New trustee fields
    trusteeEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'trustee_email',
      validate: {
        isEmail: true
      }
    },
    recoveryStatus: {
      type: DataTypes.ENUM(...Object.values(VaultRecoveryStatus)),
      allowNull: false,
      defaultValue: VaultRecoveryStatus.ACTIVE,
      field: 'recovery_status'
    },
    recoveryToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      field: 'recovery_token'
    },
    recoveryInitiatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'recovery_initiated_at'
    },
    lastTrusteeNotification: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_trustee_notification'
    }
  },
  {
    sequelize,
    tableName: "vaults",
    modelName: "Vault",
    timestamps: true,
    underscored: true
  }
);

Vault.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Vault, { foreignKey: 'userId', as: 'vaults' });

export default Vault;