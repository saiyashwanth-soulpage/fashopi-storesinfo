import { authenticated } from "middleware/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default authenticated(async function handler2(req: any, res: any) {
  if (req.method === "GET") {
    // console.log(req.body);

    const displaystores = await prisma.store.findMany({
      where: { userId: req?.userId },
    });
    res.json(displaystores);
  }
});
