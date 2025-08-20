import nodemailer from 'nodemailer';

interface RecoveryEmailData {
  trusteeEmail: string;
  ownerName?: string;
  ownerEmail: string;
  vaultTitle: string;
  recoveryToken: string;
  recoveryLink: string;
}

interface WarningEmailData {
  ownerEmail: string;
  ownerName?: string;
  daysSinceLastLogin: number;
  warningThreshold: number;
  trusteesCount: number;
}

interface TrusteeDesignationEmailData {
  trusteeEmail: string;
  ownerEmail: string;
  ownerName: string;
  vaultTitle: string;
  trusteeVaultId: string;
  inactivityMonths: number;
}

interface RecoveryAvailableEmailData {
  trusteeEmail: string;
  ownerEmail: string;
  ownerName: string;
  vaultTitle: string;
  trusteeVaultId: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendRecoveryNotification(data: RecoveryEmailData): Promise<void> {
    const { trusteeEmail, ownerName, ownerEmail, vaultTitle, recoveryToken, recoveryLink } = data;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Digital Inheritance Recovery Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .recovery-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recovery-link { display: inline-block; background: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .warning { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Digital Inheritance Recovery Request</h1>
        </div>
        
        <div class="content">
            <h2>Hello,</h2>
            
            <p>You have been designated as a trusted recovery contact for <strong>${ownerName || ownerEmail}</strong>'s digital inheritance vault.</p>
            
            <p>The vault owner has been inactive and has requested that their digital assets be made accessible through the recovery process.</p>
            
            <div class="recovery-box">
                <h3>Recovery Details:</h3>
                <ul>
                    <li><strong>Vault:</strong> ${vaultTitle}</li>
                    <li><strong>Owner:</strong> ${ownerEmail}</li>
                </ul>
            </div>
            
            <h3>What you need to do:</h3>
            <ol>
                <li>Click the recovery link below</li>
                <li>Enter the recovery password that <strong>${ownerName || 'the owner'}</strong> shared with you offline</li>
                <li>Access the protected information</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${recoveryLink}" class="recovery-link">Start Recovery Process</a>
            </div>
            <p>If you have any questions or concerns, please contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System. This is an automated message regarding recovery access for digital assets.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: trusteeEmail,
      subject: `Recovery Access Needed - ${vaultTitle}`,
      html: emailTemplate,
      text: `Digital Inheritance Recovery Request
      
You have been designated as a recovery contact for ${ownerEmail}'s vault: "${vaultTitle}".

Recovery Token: ${recoveryToken}
Recovery Link: ${recoveryLink}

You will need the recovery password that was shared with you offline to access the protected information.

If you did not expect this email, please contact support.`
    });
  }

  async sendInactivityWarning(data: WarningEmailData): Promise<void> {
    const { ownerEmail, ownerName, daysSinceLastLogin, warningThreshold, trusteesCount } = data;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Digital Inheritance - Account Activity Warning</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #fff3cd; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .warning-box { background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; }
        .action-button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1> Account Activity Warning</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${ownerName || 'there'},</h2>
            
            <p>We noticed that you haven't logged into your Digital Inheritance account for <strong>${daysSinceLastLogin} days</strong>.</p>
            
            <div class="warning-box">
                <h3>Important Notice:</h3>
                <p>If you remain inactive for <strong>${warningThreshold} more days</strong>, the recovery process will be initiated for your protected vaults.</p>
                <p>Your ${trusteesCount} designated trustee(s) will be notified and given access to your digital inheritance.</p>
            </div>
            
            <h3>What this means:</h3>
            <ul>
                <li>Your digital assets remain secure</li>
                <li>Trustees cannot access your vaults yet</li>
                <li>You can prevent recovery by logging in</li>
                <li>This is working as designed for your protection</li>
            </ul>
            
            <h3>⚡ To prevent recovery initiation:</h3>
            <p>Simply log into your account to reset the inactivity timer.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL}/login" class="action-button">Log Into My Account</a>
            </div>
            
            <p><strong>Was this intentional?</strong> If you're planning to be away, you can adjust your inactivity settings in your account preferences.</p>
            
            <p>If you have any questions, please contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System as part of your account security monitoring.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: ownerEmail,
      subject: `Account Activity Warning - ${daysSinceLastLogin} days inactive`,
      html: emailTemplate,
      text: `Digital Inheritance - Account Activity Warning

Hello ${ownerName || 'there'},

You haven't logged in for ${daysSinceLastLogin} days. If you remain inactive for ${warningThreshold} more days, recovery will be initiated for your vaults.

Log in to prevent this: ${process.env.FRONTEND_URL}/login

This is working as designed for your digital inheritance protection.`
    });
  }

  // NEW: Send trustee designation email (when vault created)
  async sendTrusteeDesignationEmail(data: TrusteeDesignationEmailData): Promise<void> {
    const { trusteeEmail, ownerName, ownerEmail, vaultTitle, trusteeVaultId, inactivityMonths } = data;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>You've Been Designated as a Digital Trustee</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e3f2fd; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .vault-id-box { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center; }
        .vault-id { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #1976d2; }
        .important { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>You've Been Designated as a Digital Trustee</h1>
        </div>
        
        <div class="content">
            <h2>Hello,</h2>
            
            <p>${ownerEmail} has designated you as a trusted contact for their digital assets.</p>
            
            <p>This means that if ${ownerName} becomes unable to access their digital accounts for more than <strong>${inactivityMonths} months</strong>, you will be able to help recover their important information.</p>
            
            <div class="vault-id-box">
                <p><strong>Your Vault Access ID:</strong></p>
                <div class="vault-id">${trusteeVaultId}</div>
                <p><small>Keep this ID safe - you'll need it for recovery</small></p>
            </div>
            
            <h3>Vault Details:</h3>
            <ul>
                <li><strong>Vault Name:</strong> ${vaultTitle}</li>
                <li><strong>Owner:</strong> ${ownerEmail}</li>
                <li><strong>Inactivity Period:</strong> ${inactivityMonths} months</li>
            </ul>
            
            <div class="important">
                <h4>Important Next Steps:</h4>
                <ol>
                    <li><strong>Save your Vault Access ID:</strong> ${trusteeVaultId}</li>
                    <li><strong>Contact ${ownerName}:</strong> They will share a recovery password with you offline</li>
                    <li><strong>Keep both secure:</strong> You'll need both the ID and password for recovery</li>
                </ol>
            </div>
            
            <h3> Your responsibilities:</h3>
            <ul>
                <li>Keep your Vault Access ID secure</li>
                <li>Remember where ${ownerName} told you the recovery password is</li>
                <li>Only use this access if ${ownerName} is truly unable to access their accounts</li>
                <li>Contact ${ownerName} if you have any questions</li>
            </ul>
            
            <p>Thank you for agreeing to be a digital trustee. This is an important responsibility that helps ensure ${ownerName}'s digital legacy is protected.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System. If you did not expect this designation, please contact ${ownerEmail} directly.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: trusteeEmail,
      subject: `You've Been Designated as a Digital Trustee - ${vaultTitle}`,
      html: emailTemplate,
      text: `You've Been Designated as a Digital Trustee

${ownerName} (${ownerEmail}) has designated you as a trusted contact for their digital vault: "${vaultTitle}".

Your Vault Access ID: ${trusteeVaultId}

Important:
1. Save this Vault Access ID safely
2. Contact ${ownerName} for the recovery password
3. You'll only need this if they become inactive for ${inactivityMonths} months

If you have questions, contact ${ownerEmail} directly.`
    });
  }

  async sendRecoveryAvailableNotification({
  trusteeEmail,
  ownerEmail,
  ownerName,
  vaultTitle,
  trusteeVaultId,
  daysSinceLastLogin
}: {
  trusteeEmail: string;
  ownerEmail: string;
  ownerName: string;
  vaultTitle: string;
  trusteeVaultId: string;
  daysSinceLastLogin: number;
}) {
  const subject = `Recovery Available - ${vaultTitle}`;
  const html = `
    <h2>Vault Recovery is Now Available</h2>
    <p>Hello,</p>
    <p>You have been designated as a trustee for a digital vault belonging to <strong>${ownerName}</strong> (${ownerEmail}).</p>
    <p>The vault owner has been inactive for <strong>${daysSinceLastLogin} days</strong>, and recovery is now available.</p>
    
    <h3>Vault Details:</h3>
    <ul>
      <li><strong>Vault:</strong> ${vaultTitle}</li>
      <li><strong>Trustee Vault ID:</strong> ${trusteeVaultId}</li>
    </ul>
    
    <p>To recover this vault, please visit the recovery portal and use your Trustee Vault ID.</p>
    <p><strong>Important:</strong> You will need the recovery password that was shared with you when you were designated as trustee.</p>
  `;

  await this.transporter.sendMail({
    from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
    to: trusteeEmail,
    subject: subject,
    html: html
  });
}

  // NEW: Send recovery available notification to trustee
  async sendRecoveryAvailableEmail(data: RecoveryAvailableEmailData): Promise<void> {
    const { trusteeEmail, ownerName, ownerEmail, vaultTitle, trusteeVaultId } = data;

    const recoveryLink = `${process.env.FRONTEND_URL}/recovery/${trusteeVaultId}`;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recovery Access Now Available</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #fff3cd; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .recovery-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recovery-link { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .important { background: #f8d7da; padding: 15px; border-radius: 6px; border-left: 4px solid #dc3545; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Recovery Access Now Available</h1>
        </div>
        
        <div class="content">
            <h2>Hello,</h2>
            
            <p><strong>${ownerName}</strong> (${ownerEmail}) has been inactive for the designated period. As their trusted contact, you can now access their digital inheritance.</p>
            
            <div class="recovery-box">
                <h3>Recovery Details:</h3>
                <ul>
                    <li><strong>Vault:</strong> ${vaultTitle}</li>
                    <li><strong>Owner:</strong> ${ownerEmail}</li>
                    <li><strong>Your Access ID:</strong> ${trusteeVaultId}</li>
                </ul>
            </div>
            
            <div class="important">
                <h4>Before proceeding:</h4>
                <ul>
                    <li>Have you tried contacting ${ownerName} directly?</li>
                    <li>Are you certain they need assistance?</li>
                    <li>Do you have the recovery password they shared with you?</li>
                </ul>
            </div>
            
            <h3>To access the vault:</h3>
            <ol>
                <li>Click the recovery link below</li>
                <li>Enter your Vault Access ID: <strong>${trusteeVaultId}</strong></li>
                <li>Complete email verification</li>
                <li>Enter the recovery password that ${ownerName} shared with you offline</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${recoveryLink}" class="recovery-link"> Begin Recovery Process</a>
            </div>
            
            <p><strong>Important:</strong> This access should only be used if you're certain ${ownerName} needs assistance. The recovery process will notify them that their vault has been accessed.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System. Recovery access is now available for ${vaultTitle}.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: trusteeEmail,
      subject: `Recovery Access Available - ${vaultTitle}`,
      html: emailTemplate,
      text: `Recovery Access Now Available

${ownerName} (${ownerEmail}) has been inactive. As their trustee, you can now recover their vault: "${vaultTitle}".

Your Access ID: ${trusteeVaultId}
Recovery Link: ${recoveryLink}

Please ensure ${ownerName} truly needs assistance before proceeding.

You'll need the recovery password they shared with you offline.`
    });
  }

  // NEW: Send OTP email for recovery verification
  async sendOTPEmail(email: string, otp: string): Promise<void> {
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recovery Verification Code</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e3f2fd; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .otp-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1976d2; margin: 10px 0; }
        .warning { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1> Recovery Verification Code</h1>
        </div>
        
        <div class="content">
            <h2>Your verification code:</h2>
            
            <div class="otp-box">
                <div class="otp-code">${otp}</div>
                <p><small>This code expires in 10 minutes</small></p>
            </div>
            
            <p>Enter this code on the recovery page to continue accessing the digital inheritance vault.</p>
            
            <div class="warning">
                <h4>Security Notice:</h4>
                <ul>
                    <li>Only use this code if you initiated a recovery request</li>
                    <li>Never share this code with anyone</li>
                    <li>If you didn't request this, someone may be trying to access a vault you're designated for</li>
                </ul>
            </div>
            
            <p>If you have any questions or concerns, please contact our support team immediately.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System for vault recovery verification.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: email,
      subject: `🔢 Recovery Verification Code: ${otp}`,
      html: emailTemplate,
      text: `Recovery Verification Code

Your verification code: ${otp}

This code expires in 10 minutes. Only use this if you initiated a recovery request.

If you didn't request this, please contact support immediately.`
    });
  }

  // Recovery completion notification to owner
  async sendRecoveryCompleteNotification(ownerEmail: string, vaultTitle: string, trusteeEmail: string): Promise<void> {
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recovery Completed</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #d4edda; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .info-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .warning { background: #f8d7da; padding: 15px; border-radius: 6px; border-left: 4px solid #dc3545; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Digital Inheritance Recovery Completed</h1>
        </div>
        
        <div class="content">
            <h2>Recovery Notification</h2>
            
            <p>This is to notify you that recovery has been completed for your vault:</p>
            
            <div class="info-box">
                <h3>📋 Recovery Details:</h3>
                <ul>
                    <li><strong>Vault:</strong> ${vaultTitle}</li>
                    <li><strong>Recovered By:</strong> ${trusteeEmail}</li>
                    <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
                </ul>
            </div>
            
            <p>Your designated trustee has successfully accessed the protected information in this vault using the recovery process.</p>
            
            <div class="warning">
                <h4>⚠️ If this was unexpected:</h4>
                <ul>
                    <li>Contact ${trusteeEmail} immediately to understand why recovery was initiated</li>
                    <li>If this was unauthorized, contact our support team right away</li>
                    <li>Change your account passwords and review your security settings</li>
                </ul>
            </div>
            
            <h3>What happened:</h3>
            <ul>
                <li>Your trustee used their Vault Access ID and recovery password</li>
                <li>They completed email verification</li>
                <li>The vault contents were made accessible to them</li>
                <li>This recovery process was part of your digital inheritance plan</li>
            </ul>
            
            <p>If you have any questions about this recovery, please contact our support team or reach out to your trustee directly.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated notification from Digital Inheritance System regarding vault recovery activity.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: ownerEmail,
      subject: `✅ Recovery Completed - ${vaultTitle}`,
      html: emailTemplate,
      text: `Digital Inheritance Recovery Completed

Your vault "${vaultTitle}" has been successfully recovered by ${trusteeEmail}.

Date: ${new Date().toLocaleString()}

This recovery was completed using the digital inheritance process you set up.

If this was unexpected, please contact support immediately.`
    });
  }
}




export default new EmailService();