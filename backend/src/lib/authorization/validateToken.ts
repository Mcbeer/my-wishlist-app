import { verify } from "jsonwebtoken";
import { ITokenData } from "../../models/IUser";

export const validateToken = (token: string): ITokenData | null => {
  const verifiedToken = verify(token, process.env.JWT_SECRET || "");

  if (!verifiedToken) {
    return null;
  }

  return verifiedToken as ITokenData;
};
