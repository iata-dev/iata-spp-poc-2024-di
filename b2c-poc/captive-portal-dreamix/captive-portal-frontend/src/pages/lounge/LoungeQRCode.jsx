import { QRCodeSVG } from 'qrcode.react';
import { useSearchParams } from 'react-router';

import { ICONS } from '@/assets/icons/Icons';
import Banner from '@/components/Banner';
import Spinner from '@/components/Loader.jsx';
import StatusMessage from '@/components/StatusMessage';
import { useUserVerification } from '@/hooks/use-verification.js';
import { Container } from '@/layout/Container';
import { Page } from '@/layout/Page';

const POLLING_INTERVAL = 500; // 0.5 seconds
const qrCodeData = {
  accessType: "Lounge Pass",
  airlineProgram: "Athena Gold",
  membershipNumber: "N12345678",
  validity: "27/02/2025",
}

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
          description="Relax with our new in-lounge spa services - available now with limited-time offers for lounge users only."
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
          title="You do not have permission to use Lounge Resources."
          description="Please upgrade your loyalty status"
          className="mt-10"
        />
      </Container>
    </Page>
  ) : (
    <Page>
      <Banner
        title="Enjoy your stay"
        description="Relax with our new in-lounge spa services - available now with limited-time offers for lounge users only."
      />
      <Container className="justify-center flex flex-col">
        <div className="flex flex-col items-center gap-4">
          <QRCodeSVG value={JSON.stringify(qrCodeData)} size={180} />
          <p className="text-sm w-[180px] text-center text-gray-500">
            Scan the QR code to one of the lounge gates
          </p>
        </div>
      </Container>
    </Page>
  );
};
export default LoungeDetails;
