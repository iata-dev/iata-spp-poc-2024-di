import { NextResponse } from "next/server";
import getCognitoJwt from "../_lib/cognito-auth";
import { credOffers } from "../_lib/cred-offer";

type ResponseData = {
  issuance: {
    credentialOfferUri: string;
  };
};

export async function POST(request: Request) {
  const jwtToken = await getCognitoJwt();

  const ISSUANCE_ENDPOINT = `${process.env.CRED_API_BASE_URL}/openid4vc/credential-offer`;

  const body = await request.json()
  const credFormat = body["vct"] as keyof typeof credOffers;

  const credential = credOffers[credFormat];
  credential.claims = body;



  const res = await fetch(`${ISSUANCE_ENDPOINT}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-AGENT-ID": process.env.DTS_AGENT_ID as string,
    },
    body: JSON.stringify(credential),
  });

  // const {issuance, errors} = await res.json() as ResponseData
  const issuance = (await res.json()) as ResponseData;

  console.log("issuance", issuance);

  return NextResponse.json(
    { issuance },
    { status: res.status, headers: { "Cache-Control": "no-store" } }
  );
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
