import { authenticated } from "middleware/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default authenticated(async function handler2(
  req: any,
  res: any
) {
  if (req.method === "DELETE") {
    console.log(Number(req.query.id))
    const deletestore = await prisma.store.delete({
      where: { id: Number(req.query.id) },
    });
    res.status(200).json({ message: "Success" });
  }
  if (req.method === "PUT") {
    console.log(Number(req.query.id))
    const updatestore = await prisma.store.update({
      where: { id: Number(req.query.id) },
      data:{...req.body}
    });
    res.status(200).json({ message: "Success" });
  }
});
