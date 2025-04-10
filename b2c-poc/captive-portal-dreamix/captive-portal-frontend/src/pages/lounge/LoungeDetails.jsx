import { useSearchParams } from 'react-router';

import { Wifi } from '@/assets/icons/Wifi.jsx';
import Banner from '@/components/Banner';
import Card, { ICONS } from '@/components/Card';
import Spinner from '@/components/Loader.jsx';
import { useUserVerification } from '@/hooks/use-verification.js';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

const items = [
  {
    title: '3 hours of stay',
    description: 'Relax, recharge, or get work done',
    icon: ICONS.timer,
  },
  {
    title: 'Complimentary Food and drinks',
    description: 'Savor delicious meals, snacks, and beverages',
    icon: ICONS.dish,
  },
  {
    title: 'Unlimited Wi-Fi',
    description: 'Stay connected with high-speed internet access',
    icon: ICONS.wifiSpeed,
  },
  {
    title: 'Device charging stations',
    description: 'Keep your phone, tablet, or laptop fully powered',
    icon: ICONS.watchCharge,
  },
];

const POLLING_INTERVAL = 500; // 0.5 seconds
const LoungeDetails = () => {
  const [searchParams] = useSearchParams();
  const verificationId = searchParams.get('verificationId');

  const { hasAccess, isLoading, isError, errorMessage } = useUserVerification(
    verificationId,
    POLLING_INTERVAL
  );

  if (isLoading) {
    return (
      <Page>
        <Banner
          title="Loading..."
          description="Our Business Class passengers and Wings&Perks members can benefit from
          our free internet and unlimited messaging services. You can start
          using it by logging in immediately."
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
        <div>{errorMessage}</div>
      </Page>
    );
  }

  return !hasAccess ? (
    <Page>
      <Banner
        title="Welcome to our exclusive lounge"
        description="Our Business Class passengers and Wings&Perks members can benefit from
          our free internet and unlimited messaging services. You can start
          using it by logging in immediately."
      />
      <Container className="py-5 w-4/5 text-balance flex flex-col text-center justify-center items-center gap-3">
        <Wifi />
        <p className="text-md font-semibold leading-[1.25rem]">
          You don&#39;t have permission to use Lounge Resources.
        </p>
        <p className="text-sm font-light leading-[1.25rem] text-muted-foreground">
          Please upgrade your loyalty status
        </p>
      </Container>
    </Page>
  ) : (
    <Page>
      <Banner
        title="Enjoy your stay"
        description="As a Wings&Perks member, you have unlimited internet and unlimited text messaging rights as part of the privileges of your Business Class travel."
      />
      <Container className="py-5 flex flex-col gap-5">
        {items.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </Container>
    </Page>
  );
};
export default LoungeDetails;
