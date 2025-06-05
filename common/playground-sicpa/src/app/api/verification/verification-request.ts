import { v4 } from "uuid";

const verfificationRequestSus = {
  vverifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      "vc+sd-jwt": {
        "sd-jwt_alg_values": [
          "EdDSA"
        ],
        "kb-jwt_alg_values": [
          "EdDSA"
        ]
      }
    },
    id: `${v4()}`,
    input_descriptors: [
      {
        id: `${v4()}`,
        name: "A specific type of VC",
        purpose: "We want a VC of this type",
        constraints: {
          fields: [
            {
              path: ["$.type"],
              filter: {
                type: "string",
                pattern: "UniversityDegreeCredential",
              },
            },
          ],
        },
      },
    ],
  },
};

const verfificationRequest = {
  verifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      ldp_vc: {
        proof_type: ["Ed25519Signature2018"],
      },
      ldp_vp: {
        proof_type: ["Ed25519Signature2018"],
      },
    },
    id: "1234eee8-5717-4562-c3fc-2d963f66afa6",
    input_descriptors: [
      {
        id: "iata_code_presence",
        constraints: {
          fields: [
            {
              filter: {
                pattern: "BachelorDegree",
                type: "string",
              },
              path: ["$.credentialSubject.degree.type"],
            },
          ],
        },
      },
    ],
  },
};

const verfificationRequestEmail1 = {
  verifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      ldp_vc: {
        proof_type: ["Ed25519Signature2018"],
      },
      ldp_vp: {
        proof_type: ["Ed25519Signature2018"],
      },
    },
    id: `${v4()}`,
    input_descriptors: [
      {
        constraints: {
          fields: [
            {
              filter: {
                pattern: "BachelorDegree",
                type: "string",
              },
              path: ["$.credentialSubject.degree.type"],
            },
          ],
        },
        id: `${v4()}`,
        name: "Input descriptor for credential 1",
        purpose: "",
      },
    ],
    name: "Test #4",
    purpose: "Altme presentation definition subset of PEX v2.0",
  },
};

const verfificationRequestEmail = {
  verifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      jwt_vc_json: {
        alg: ["RSA256"],
      },
      jwt_vp_json: {
        alg: ["RSA256"],
      },
    },
    id: `${v4()}`,
    input_descriptors: [
      {
        constraints: {
          fields: [
            {
              filter: {
                pattern: "EmailPass",
                type: "string",
              },
              path: ["$.credentialSubject.type"],
            },
          ],
        },
        id: `${v4()}`,
        name: "Input descriptor for credential 1",
        purpose: "",
      },
    ],
    name: "Test #4",
    purpose: "Altme presentation definition subset of PEX v2.0",
  },
};

const verfificationRequestPID = {
  verifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      "vc+sd-jwt": {
        "sd-jwt_alg_values": ["EdDSA"],
        "kb-jwt_alg_values": ["EdDSA"],
      },
    },
    id: `${v4()}`,
    input_descriptors: [
      {
        constraints: {
          fields: [
            {
              filter: {
                pattern: "John Doe",
                type: "string",
              },
              path: ["$.name"],
            },
          ],
        },
        id: `${v4()}`,
        name: "Input descriptor for credential 1",
        purpose: "Altme presentation definition subset of PEX v2.0",
      },
    ],
  },
};


const verfificationRequesteVisa = {
  verifierDidId: process.env.DTS_VERIFIER_DID_ID as string,
  presentationDefinition: {
    format: {
      "vc+sd-jwt": {
        "sd-jwt_alg_values": ["EdDSA"],
        "kb-jwt_alg_values": ["EdDSA"],
      },
    },
    id: `${v4()}`,
    input_descriptors: [
      {
        constraints: {
          fields: [
            {
              filter: {
                const: "CA",
                type: "string",
              },
              path: ["$.visa.natlCode"],
            },
          ],
        },
        id: `${v4()}`,
        name: "Input descriptor for credential 1",
        purpose: "Altme presentation definition subset of PEX v2.0",
      },
    ],
  },
};

export {
  verfificationRequest,
  verfificationRequestEmail,
  verfificationRequestEmail1,
  verfificationRequestPID,
  verfificationRequesteVisa
};
