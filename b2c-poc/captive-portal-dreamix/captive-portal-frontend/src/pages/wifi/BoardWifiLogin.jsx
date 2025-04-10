import { useEffect, useState } from 'react';

import { createVerification } from '@/api/client';
import Banner from '@/components/Banner';
import ConnectToWallet from '@/components/ConnectToWallet';
import Separator from '@/components/Separator';
import SimpleLogin from '@/components/SimpleLogin';
import TermAgreement from '@/components/TermAgreement';
import { STATUS_VERIFICATION_FAILED } from '@/constants/statuses';
import { useToast } from '@/hooks/use-toast';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

export const BoardWifiLogin = () => {
  const { toast } = useToast();
  const [walletUrl, setWalletUrl] = useState(null);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    createVerification('board/wifi')
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
        title="Welcome to Kronos On-board Wi-Fi Portal"
        description="Members of various loyalty programs can enjoy complimentary internet access"
      />
      <Container className="py-5">
        <div className="flex flex-col gap-3">
          <p className="text-balance text-sm font-semibold leading-[1.25rem]">
            Please choose a method to connect to the internet
          </p>

          <div className="flex flex-col gap-3 bg-gray-100 p-3 rounded-[0.5rem]">
            <p className="text-xs font-normal leading-[1.25rem] ">
              In order to connect to the Wi-Fi you need to provide your passport
              details*.
            </p>
            <p className="text-[0.625rem] font-normal leading-[1rem] ">
              *The Wi-fi landing page offer free Wi-fi for top tier customers
              and need to collect First name / Last name / Passport number /
              nationality of people accessing Wi-fi.
            </p>
          </div>

          <TermAgreement
            className="p-1"
            id="personal-info"
            onChange={handleCheckboxChange}
          >
            I agree to share my personal information
          </TermAgreement>
          <ConnectToWallet
            onClick={() => (window.location.href = walletUrl)}
            isLoading={!walletUrl}
            title="Connect with Wallet"
            disabled={!walletUrl || !checkboxChecked}
          />
          <Separator text="or" />
          <SimpleLogin className="" />
        </div>
        <div className="flex justify-center mt-6">
          <a href="#" className="text-xs font-medium text-primary ">
            Become a Member of Kronos miles
          </a>
        </div>
      </Container>
    </Page>
  );
};
