"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationEffect = exports.generatePolicy = void 0;
var generatePolicy = function (_a) {
    var principalId = _a.principalId, effect = _a.effect, resource = _a.resource;
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
exports.generatePolicy = generatePolicy;
var AuthorizationEffect;
(function (AuthorizationEffect) {
    AuthorizationEffect["ALLOW"] = "Allow";
    AuthorizationEffect["DENY"] = "Deny";
})(AuthorizationEffect = exports.AuthorizationEffect || (exports.AuthorizationEffect = {}));
