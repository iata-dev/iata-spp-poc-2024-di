import { useNavigate, useSearchParams } from 'react-router';

import { ICONS } from '@/assets/icons/Icons';
import Banner from '@/components/Banner';
import Spinner from '@/components/Loader.jsx';
import Services from '@/components/Services';
import StatusMessage from '@/components/StatusMessage';
import { Button } from '@/components/ui/button';
import { useUserVerification } from '@/hooks/use-verification.js';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

const services = [
  {
    icon: ICONS.TIMER,
    title: '3 hours of stay',
  },
  {
    icon: ICONS.DISH,
    title: 'Complimentary Food and drinks',
  },
  {
    icon: ICONS.WIFI_SPEED,
    title: 'Unlimited Wi-Fi',
  },
  {
    icon: ICONS.WATCH_CHARGE,
    title: 'Device charging stations',
  },
];

export const LoungeAccessGranted = () => {
  const [searchParams] = useSearchParams();
  const verificationId = searchParams.get('verificationId');
  const navigate = useNavigate();

  const { hasAccess, isLoading, isError, errorMessage } = useUserVerification(
    verificationId
  );

  const handleAccessToLoungeQRCode = () => {
    navigate(`/lounge-qr?verificationId=${verificationId}`);
  };

  if (isLoading) {
    return (
      <Page>
        <Banner
          title="Loading..."
          description="Relax and let us verify your loyalty status."
        />
        <Spinner />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page>
        <Banner
          title="Unavailable"
          description="More info for how to get access..."
        />
        <StatusMessage
          icon={ICONS.NO_LOUNGE}
          title="Please try again later."
          description={errorMessage}
        />
      </Page>
    );
  }

  return !hasAccess ? (
    <Page>
      <Banner
        title="Enjoy your stay"
        description="Relax with our new in-lounge spa services - available now with limited-time offers for lounge users only."
      />
      <Container className="py-5 w-4/5 text-balance flex flex-col text-center justify-center items-center gap-3">
        <StatusMessage
          icon={ICONS.NO_LOUNGE}
          title="You do not have eligible loyalty level to the Lounge"
          description="You need to upgrade your loyalty level in order to enjoy complimentary services such as our lounge"
        />
      </Container>
    </Page>
  ) : (
    <Page>
      <Banner
        title="Enjoy your stay"
        description="Relax with our new in-lounge spa services - available now with limited-time offers for lounge users only."
      />
      <Container className="w-4/5 flex flex-col text-center items-center gap-12">
        <StatusMessage
          icon={ICONS.LOUNGE}
          title="Successfully Granted Access to Lounge"
          description="Enjoy your stay and make the most amenities available to you"
          className="mt-10"
        />
        <Services services={services} />
      </Container>
      <Container className="mt-3">
        <Button className="w-full" onClick={handleAccessToLoungeQRCode}>
          <div className="font-normal  leading-[1.25rem]">Present QR Code</div>
        </Button>
      </Container>
    </Page>
  );
};
