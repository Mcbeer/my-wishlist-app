import {
  APIGatewayAuthorizerHandler,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import { getUserFromDbById } from "../db/user/getUserFromDbById";
import {
  AuthorizationEffect,
  generatePolicy,
} from "../lib/authorization/generatePolicy";
import { validateToken } from "../lib/authorization/validateToken";
import { perhaps } from "../utils/perhaps";
import { respondError } from "../utils/respond";

interface ExtendedAPIGatewayAuthorizerEvent
  extends APIGatewayTokenAuthorizerEvent {}

// Custom authorizer function, to be run via API Gateway on requests
const authorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  // Check if the auth type is token
  const type = event.type;

  if (type === "TOKEN") {
    const token = event.authorizationToken;

    const validatedToken = validateToken(token);

    console.log("Validated token...", validatedToken);

    if (!validatedToken) {
      return generatePolicy({
        principalId: "",
        effect: AuthorizationEffect.DENY,
        resource: event.methodArn,
      });
    }

    const [userError, user] = await perhaps(
      getUserFromDbById(validatedToken.userId)
    );

    if (userError) {
      console.log("Could not get user from db");
      console.log(userError);
      return generatePolicy({
        principalId: "",
        effect: AuthorizationEffect.DENY,
        resource: event.methodArn,
      });
    }

    if (!user) {
      console.log("There is no user like that...");
      return generatePolicy({
        principalId: "",
        effect: AuthorizationEffect.DENY,
        resource: event.methodArn,
      });
    }

    console.log("User is all good", user);

    return generatePolicy({
      principalId: user.userId,
      effect: AuthorizationEffect.ALLOW,
      resource: event.methodArn,
    });
  }
};

export { authorizer as handler };
