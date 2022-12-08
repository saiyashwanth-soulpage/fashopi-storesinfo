import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    // check body in db or in terminal
    console.log("the body is ", body);

    // using bcrypt, we are hashing the password - hash(myPlaintextPassword, saltRounds, function(err, hash) {

    hash(body.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      body.password = hash;

      // for sending input data to database
      const signupuser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!signupuser) {
        // new users are created in database
        const createusers = await prisma.user.create({ data: body });
        console.log(createusers);
        //  payload is stored in createusers variable

        res.status(200).json({ message: "signup is successfull" });
      } else {
        res.status(409).json({ message: "user already exits" });
      }
    });
  }
}
