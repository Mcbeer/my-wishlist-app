export const getRequesterId = (req: any): string => {
  return req?.requestContext?.authorizer?.principalId || "";
};
