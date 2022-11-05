import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@upstash/qstash";

const c = new Client({
  token: process.env.QSTASH_TOKEN!,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await c.publishJSON({
      topic: "notifications",
      body: {
        text: "hello world!", // dynamic event
      },
    });
    res.status(200).end(result.messageId);
  } catch (err) {
    res.status(500).end(err);
  }
}

export default handler;
