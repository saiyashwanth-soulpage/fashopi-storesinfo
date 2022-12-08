import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken"


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler2(
    req: NextApiRequest,
    res: NextApiResponse
)

{
    if (req.method === "POST"){

        const loginuser = await prisma.user.findUnique({
            where:{
              email:req.body.email
            }
          })

      if(!loginuser){
        res.status(404).json({message:"User not exists"})
      }else{
      // to check password - Load hash from your password DB. - bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      // see kiran tamma method in hangouts
      
      compare(req.body.password, loginuser.password, function (err, result) {
        // result == true
        if (!err && result){
            //   just inserting some details in a variable called myclaims - optional(u can also insert directly)
              const myclaims = {
                subject: loginuser.id,
                mypersonalemail: loginuser.email,
              };
    
              // for jwt token
              const jwTokenblah = sign(myclaims, process.env.JWT_SECRET, {expiresIn: "1h"});
    
              res.status(200).json({ authToken_is_anyname:jwTokenblah})
              // res.status(200).json({ message: "User logged in" });
            } else {
              res.status(404).json({ message: "Password mismatch. Please retry" });
            }
          });
        }
      }
}
