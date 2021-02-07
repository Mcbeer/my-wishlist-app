import { sign } from "jsonwebtoken";

export const generateTokenAccess = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
};
