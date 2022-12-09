import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: any,
  res: any
) {
  if (req.method === "GET") {
    const displayallstores = await prisma.store.findMany()
    res.json(displayallstores);
  }
}