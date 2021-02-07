import { IUser } from "../../models/IUser";
import { createDocumentClient } from "../createDocumentClient";

const client = createDocumentClient();

export const getUserFromDbById = async (userId: string): Promise<IUser> => {
  const params = {
    TableName: process.env.USERS_TABLE || "",
    Key: {
      userId,
      wishlistId: "USER_INFO",
    },
  };

  return client
    .get(params)
    .promise()
    .then((response) => response.Item as IUser);
};
