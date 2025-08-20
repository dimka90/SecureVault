import { getInactiveUsers } from "../db/user";
import { activateRecoveryForUser, getVaultsNeedingRecoveryActivation } from "../db/trusteeAccess";
import emailService from "./email";
import { User } from "../db/user";

export class InactiveUserService {
  
  /**
   * Main function to check and activate recovery for inactive users
   * Should be called by a cron job daily
   */
  static async checkAndActivateRecovery(): Promise<void> {
    try {
      console.log('Starting inactive user check...');
      
      const inactiveUsers = await getInactiveUsers();
      
      console.log(`Found ${inactiveUsers.length} inactive users`);
      
      for (const user of inactiveUsers) {
        await this.processInactiveUser(user);
      }
      
      console.log('Inactive user check completed');
    } catch (error: any) {
      console.error('Error in inactive user check:', error.message);
      throw error;
    }
  }

  /**
   * Process a single inactive user
   */
  private static async processInactiveUser(user: User): Promise<void> {
    try {
      console.log(`Processing inactive user: ${user.email}`);
      
      // Calculate how long the user has been inactive
      const now = new Date();
      const lastLogin = new Date(user.lastLogin);
      const daysSinceLogin = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
      const monthsSinceLogin = daysSinceLogin / 30;
      
      // Check if user has exceeded their inactivity threshold
      if (monthsSinceLogin >= user.inactivityMonths) {
        console.log(`User ${user.email} has been inactive for ${daysSinceLogin} days (${monthsSinceLogin.toFixed(1)} months)`);
        
        // Activate recovery for all user's vaults that have trustees
        const activatedRecords = await activateRecoveryForUser(user.id.toString());
        
        if (activatedRecords.length > 0) {
          console.log(`Activated recovery for ${activatedRecords.length} vaults for user ${user.email}`);
        
          await this.notifyTrustees(user, activatedRecords);
          await user.update({
            recoveryStatus: 'RECOVERY_AVAILABLE' // You may need to add this status
          });
        }
      }
    } catch (error: any) {
      console.error(`Error processing inactive user ${user.email}:`, error.message);
    }
  }

  /**
   * Send notifications to trustees that recovery is now available
   */
  private static async notifyTrustees(user: User, trusteeAccessRecords: any[]): Promise<void> {
    for (const record of trusteeAccessRecords) {
      try {
        if (process.env.NODE_ENV !== "test") {
          await emailService.sendRecoveryAvailableNotification({
            trusteeEmail: record.trusteeEmail,
            ownerEmail: user.email,
            ownerName: user.email.split('@')[0],
            vaultTitle: record.vault?.title || 'Unknown Vault',
            trusteeVaultId: record.trusteeVaultId,
            daysSinceLastLogin: Math.floor((Date.now() - new Date(user.lastLogin).getTime()) / (1000 * 60 * 60 * 24))
          });
        }
        
        console.log(`Recovery available notification sent to ${record.trusteeEmail} for vault ${record.trusteeVaultId}`);
      } catch (error: any) {
        console.error(`Failed to send notification to ${record.trusteeEmail}:`, error.message);
      }
    }
  }

  /**
   * Get stats about recovery activations
   */
  static async getRecoveryActivationStats(): Promise<any> {
    try {
      const inactiveUsers = await getInactiveUsers();
      const vaultsNeedingActivation = await getVaultsNeedingRecoveryActivation();
      
      return {
        totalInactiveUsers: inactiveUsers.length,
        vaultsNeedingActivation: vaultsNeedingActivation.length,
        userBreakdown: inactiveUsers.map(user => ({
          email: user.email,
          lastLogin: user.lastLogin,
          inactivityThreshold: user.inactivityMonths,
          daysSinceLogin: Math.floor((Date.now() - new Date(user.lastLogin).getTime()) / (1000 * 60 * 60 * 24))
        }))
      };
    } catch (error: any) {
      throw new Error(`Failed to get recovery activation stats: ${error.message}`);
    }
  }

  /**
   * Manually activate recovery for a specific user (admin function)
   */
  static async manuallyActivateRecovery(userId: string): Promise<any> {
    try {
      const activatedRecords = await activateRecoveryForUser(userId);
      return {
        success: true,
        activatedVaults: activatedRecords.length,
        message: `Recovery activated for ${activatedRecords.length} vaults`
      };
    } catch (error: any) {
      throw new Error(`Failed to manually activate recovery: ${error.message}`);
    }
  }
}

export default InactiveUserService;