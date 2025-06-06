
async function getCognitoJwt(): Promise<string> {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  const cognitoTokenUrl = process.env.COGNITO_TOKEN_URL as string;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const headers = new Headers();
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  headers.set(
    "Authorization",
    `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
  );

  try {
    const response = await fetch(cognitoTokenUrl, {
      cache: "no-store",
      method: "POST",
      body: params,
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching JWT from Cognito: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching JWT from Cognito:", error);
    throw new Error("Failed to obtain JWT from Cognito.");
  }
}

export default getCognitoJwt;
