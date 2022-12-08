import { authenticated } from "middleware/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default authenticated(async function handler2(
  req: any,
  res: any
) {
  if (req.method === "GET") {
    // console.log(req.body);

    const displaystores = await prisma.store.findMany({
      where: { userId:req?.userId },
    });
    res.json(displaystores);
  }

  if (req.method === "PUT") {
    // const updatestore = await prisma.store.update({
    //   where: { id:req?.id }
    // })
    // if(!updatestore){
    //   res.status().json({ message: "Cannot be updated" });
    // }else{
    //   res.status(200).json({ message: "Success" });
    // }
  }

  // if (req.method === "DELETE") {
  //   const deletestore = await prisma.store.delete({
  //     where: { id: req.params.id },
  //   });
  //   res.status(200).json({ message: "Success" });
  // }
});
