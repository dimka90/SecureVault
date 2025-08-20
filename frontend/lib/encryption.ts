
import CryptoJS from 'crypto-js';
export const encryptData = async (data: string, key: string): Promise<string> => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
      throw new Error('Decryption failed - invalid key or corrupted data');
    }
    
    return originalText;
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
