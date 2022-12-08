import { verify } from "jsonwebtoken";

export const authenticated = (fn: any) => async (req: any, res: any) => {
  console.log(req.headers.authorization);

  if (req.headers.authorization.split(" ")[1])
    verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
      async function (err, decoded) {
        console.log(err, decoded);

        if (!err && decoded) {
          req.userId = decoded.subject;
          return await fn(req, res);
        } else {
          // err
          // decoded undefined
          res.status(500).json({ message: "Sorry you are not authenticated" });
        }
      }
    );
  else res.status(500).json({ message: "Sorry you are not authenticated" });
};
