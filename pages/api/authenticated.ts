import type { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "middleware/auth";

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: "Authenticated" });
});
