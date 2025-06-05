import { NextResponse, type NextRequest } from "next/server";
import getCognitoJwt from "../../_lib/cognito-auth";
import { credOffers } from "../../_lib/cred-offer";

type ResponseStatus = {
    status: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {

  const jwtToken = await getCognitoJwt();

  const issuanceReference = params.slug
  const ISSUANCE_STATUS_ENDPOINT = `${process.env.CRED_API_BASE_URL}/openid4vc/verification/${issuanceReference}`;

  const res = await fetch(`${ISSUANCE_STATUS_ENDPOINT}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-AGENT-ID": process.env.DTS_AGENT_ID as string,
    }
  });

  const apires = (await res.json()) as ResponseStatus;

  console.log("issuance", apires);

  return NextResponse.json(
    { verifidationStatus: apires.status },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
