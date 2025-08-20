// services/cronScheduler.ts
import * as cron from 'node-cron';
import InactiveUserService from './inactiveUserService';

export class CronScheduler {
  
  /**
   * Start all scheduled tasks
   */
  static startScheduler(): void {
    console.log('Starting cron scheduler...');
    
    // Check for inactive users daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      console.log('Running daily inactive user check...');
      try {
        await InactiveUserService.checkAndActivateRecovery();
      } catch (error: any) {
        console.error('Cron job failed:', error.message);
      }
    }, {
      timezone: "UTC"
    });

    // Optional: Weekly summary report (every Sunday at 8 AM)
    cron.schedule('0 8 * * 0', async () => {
      console.log('Running weekly recovery stats report...');
      try {
        const stats = await InactiveUserService.getRecoveryActivationStats();
        console.log('Weekly Recovery Stats:', JSON.stringify(stats, null, 2));
      } catch (error: any) {
        console.error('Weekly report failed:', error.message);
      }
    }, {
      timezone: "UTC"  
    });

    console.log('Cron scheduler started successfully');
  }

  /**
   * Stop all scheduled tasks
   */
  static stopScheduler(): void {
    cron.getTasks().forEach(task => task.stop());
    console.log('All cron tasks stopped');
  }
}

export default CronScheduler;