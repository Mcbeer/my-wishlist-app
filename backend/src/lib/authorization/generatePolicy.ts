interface GeneratePolicyArgs {
  principalId: string;
  effect: string;
  resource: string;
}

// PrincipalId is the user id
export const generatePolicy = ({
  principalId,
  effect,
  resource,
}: GeneratePolicyArgs) => {
  switch (effect) {
    case AuthorizationEffect.ALLOW:
      return {
        principalId: principalId,
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Allow",
              Resource: resource,
            },
          ],
        },
      };

    case AuthorizationEffect.DENY:
      return {
        principalId: principalId,
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Deny",
              Resource: resource,
            },
          ],
        },
      };

    default:
      return {
        principalId: principalId,
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Deny",
              Resource: resource,
            },
          ],
        },
      };
  }
};

export enum AuthorizationEffect {
  ALLOW = "Allow",
  DENY = "Deny",
}
