import { jwtDecode } from "jwt-decode";

export const jwtExtractIssuerDid = (jwt) => {
  return jwtDecode(jwt).iss;
}
