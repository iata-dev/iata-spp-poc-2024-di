import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';

import { ICONS } from '@/assets/icons/Icons';
import Banner from '@/components/Banner';
import Spinner from '@/components/Loader';
import StatusMessage from '@/components/StatusMessage';
import { Button } from '@/components/ui/button';
import { useUserVerification } from '@/hooks/use-verification.js';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

export const BoardWifiAccessGranted = () => {
  const [searchParams] = useSearchParams();
  const verificationId = searchParams.get('verificationId');
  const navigate = useNavigate();

  const { hasAccess, isLoading, isError, errorMessage } = useUserVerification(
    verificationId
  );

  const onViewDetails = () => {
    navigate('/board/wifi-details');
  };

  if (isLoading) {
    return (
      <Page>
        <Banner
          title="Loading..."
          description="Relax and let us verify your loyalty status. Members of various loyalty programs can enjoy complimentary internet access."
        />
        <Spinner />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page>
        <Banner title="Service Unavailable" description={errorMessage} />
        <Container className="h-full py-5 w-4/5 flex flex-col text-center justify-center items-center">
          <StatusMessage
            icon={ICONS.NO_WIFI}
            title="Please try again later."
            description={errorMessage}
          />
        </Container>
      </Page>
    );
  }

  return !hasAccess ? (
    <Page>
      <Banner
        title="Welcome to Kronos On-board Wi-Fi Portal"
        description="Members of various loyalty programs can enjoy complimentary internet access"
      />
      <Container className="h-full py-5 w-4/5 flex flex-col text-center justify-center items-center gap-3">
        <StatusMessage
          icon={ICONS.NO_WIFI}
          title="You do not have eligible loyalty level to use Wi-Fi Network."
          description="You need to upgrade your loyalty level in order to enjoy complimentary services such as our Wi-Fi Network"
        />
      </Container>
    </Page>
  ) : (
    <Page>
      <Banner
        title="Enjoy your internet access"
        description="As a Athena Gold you have hi-speed internet and unlimited messaging for 1 hour."
      />
      <Container className="w-4/5 flex flex-col text-center items-center gap-12">
        <StatusMessage
          icon={ICONS.CLOUD_AIRPLANE}
          title="Successfully Granted Access to Internet Network"
          description="Enjoy 1 hour free internet access thanks to your Loyalty Gold Status"
          className="h-full"
        />
      </Container>
      <Container>
        <Button
          className="w-full font-normal leading-[1.25rem]"
          onClick={onViewDetails}
        >
          View details
        </Button>
      </Container>
    </Page>
  );
};
