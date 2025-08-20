'use client';

import { useCreateWallet } from '@privy-io/react-auth';

export default function CreateWalletButton() {
  const { createWallet } = useCreateWallet({
    onSuccess: ({ wallet }) => {
      console.log('Created wallet', wallet);
    },
    onError: (error) => {
      console.error('Failed to create wallet with error', error);
    },
  });

  const handleClick = async () => {
    try {
      const wallet = await createWallet();
      console.log('Wallet returned:', wallet);
    } catch (err) {
      console.error('Error calling createWallet:', err);
    }
  };

  return <button onClick={handleClick}>Create Wallet</button>;
}
