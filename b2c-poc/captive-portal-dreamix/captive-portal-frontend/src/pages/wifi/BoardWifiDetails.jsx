import { ChartNoAxesColumn } from 'lucide-react';

import Banner from '@/components/Banner';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/ui/button';
import { useTemporaryCode } from '@/hooks/use-temporary-code';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

const BoardWifiDetails = () => {
  const { code, isLoading, isError, errorMessage } = useTemporaryCode() || {};

  const Loader = () =>
    isLoading ? (
      <div className="size-4 mr-1 animate-spin rounded-full border-2 border-black/10 border-t-black" />
    ) : null;

  const TemporaryCodeContent = () => {
    if (isLoading) {
      return (
        <div className="w-full flex items-center justify-center text-sm">
          <Loader />
          Generating temporary code
        </div>
      );
    }

    if (isError) {
      return <p className="text-sm">Error: {errorMessage}</p>;
    }

    if (code) {
      return <>{code}</>;
    }
  };

  return (
    <Page>
      <Banner
        title="Enjoy your internet access"
        description="As a Athena Gold you have hi-speed internet and unlimited messaging for during 1 hour."
      />
      <Container className="py-5 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Estimated remaining data usage</p>
          <div className="flex gap-3 items-center p-4 rounded-[0.5rem] bg-gray-100">
            <DiagramIcon />
            <p className="text-sm font-medium">Unlimited internet pass</p>
          </div>
          <div className="bg-primary/10 h-20 flex items-center justify-center rounded-[0.5rem] relative">
            <p className="text-sm font-medium ">
              Session ends in <Timer duration={60} unit="m" /> minutes
            </p>
            <div className="bg-gradient-to-r from-[#01689B] to-[#59C8FF] w-full h-1 absolute bottom-0 rounded-b-[0.5rem]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            Use the following code to connect additional device:
          </p>

          <div
            className={
              'w-full h-[3.25rem] bg-gray-100 border-transparent text-base font-medium flex items-center justify-center rounded-[0.5rem] p-4'
            }
          >
            <TemporaryCodeContent />
          </div>

          <Button className="w-full">Access Kronos Entertainment Portal</Button>
        </div>
      </Container>
    </Page>
  );
};
export default BoardWifiDetails;

const DiagramIcon = () => (
  <div className="border-[0.1rem] border-primary rounded-[0.15rem]">
    <ChartNoAxesColumn size={16} className="text-primary" />
  </div>
);
