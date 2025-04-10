import { useEffect, useState } from 'react';

import { createVerification } from '@/api/client.js';
import Banner from '@/components/Banner';
import ConnectToWallet from '@/components/ConnectToWallet';
import TermAgreement from '@/components/TermAgreement.jsx';
import {
  STATUS_VERIFICATION_FAILED,
} from '@/constants/statuses';
import { useToast } from '@/hooks/use-toast.js';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

export const LoungeLogin = () => {
  const { toast } = useToast();
  const [walletUrl, setWalletUrl] = useState(null);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    createVerification('lounge')
      .then((res) => {
        setWalletUrl(res.body.url);
      })
      .catch((error) => {
        console.error('>>>> error', error);
        toast({
          title: 'Network error',
          description: 'Please try again',
          status: STATUS_VERIFICATION_FAILED,
        });
      });
  }, [toast]);

  const handleCheckboxChange = (checked) => {
    setCheckboxChecked(checked);
  };

  return (
    <Page>
      <Banner
        title="Welcome to Kronos Lounge Portal"
        description="Relax with our new in-lounge spa services - available now with limited-time offers for lounge users only."
      />
      <Container className="flex flex-col gap-4 py-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold leading-[1.25rem]">
            Request Lounge Access
          </h3>
          <p className="text-xs">
            You need to present your boarding pass and/or loyalty membership
            details
          </p>
        </div>
        <TermAgreement
          className="px-3"
          id="personal-info-lounge"
          onChange={handleCheckboxChange}
        >
          I agree to share following required information:
          <ul className="list-disc list-inside mt-2 flex flex-col gap-1">
            <li>Boarding pass details</li>
            <li>Loyalty credentials</li>
          </ul>
        </TermAgreement>
        <ConnectToWallet
          onClick={() => (window.location.href = walletUrl)}
          isLoading={!walletUrl}
          title="Present from Wallet"
          disabled={!walletUrl || !checkboxChecked}
        />
      </Container>
    </Page>
  );
};
