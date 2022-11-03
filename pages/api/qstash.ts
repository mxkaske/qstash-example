import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";

// EXAMPLE

type Data = {
  name: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("signature has been verified", req.body);
  res.status(200).json({ name: "John Doe" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default verifySignature(handler);
