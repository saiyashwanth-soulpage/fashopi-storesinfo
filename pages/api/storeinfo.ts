import type { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "middleware/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default authenticated(async function handler(req: any, res: any) {
  if (req.method === "POST") {
    console.log(req.body);
    const { tags, ...rest } = req.body;
    console.log(rest);

    try {
      const storeinfocreating = await prisma.store.create({
        data: { ...rest, userId: req.userId },
      });
      console.log(storeinfocreating);

      res.status(200).json({ message: "Store creation is successful" });
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: e });
    }
  }
});
