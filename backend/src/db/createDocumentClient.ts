import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const createDocumentClient = () => {
  const client = new DocumentClient({ convertEmptyValues: true });
  return client;
};
