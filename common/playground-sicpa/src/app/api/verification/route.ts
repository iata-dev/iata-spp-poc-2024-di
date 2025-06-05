import type { NextApiRequest, NextApiResponse } from "next";
import getCognitoJwt from "../_lib/cognito-auth";
import {
  verfificationRequest,
  verfificationRequestEmail,
  verfificationRequestEmail1,
  verfificationRequestPID,
  verfificationRequesteVisa
} from "./verification-request";

export async function GET(request: Request) {
  const jwtToken = await getCognitoJwt();

  const VERIFICATION_ENDPOINT = `${process.env.CRED_API_BASE_URL}/openid4vc/verification`;

  const res = await fetch(`${VERIFICATION_ENDPOINT}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-AGENT-ID": process.env.DTS_AGENT_ID as string,
    },
    body: JSON.stringify(verfificationRequesteVisa),
  });

  const verification: Response = await res.json();

  console.log("verification", verification);

  return Response.json(
    { verification },
    { status: res.status, headers: { "Cache-Control": "no-store" } }
  );
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
