import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import z from "zod";
import { Integrations, notify } from "@/lib/webhooks";

// TODO: could be moved into a middleware withValidation
// for the sake of keeping it simple, it stays here for now
const verifyIntegration = (integration: unknown) => {
  const result = z.nativeEnum(Integrations).safeParse(integration);
  if (!result.success) {
    throw new Error("Wrong integration!", result.error);
  }
  return result.data;
};

const verifyBody = (body: unknown) => {
  const result = z.object({ text: z.string() }).safeParse(body);
  if (!result.success) {
    throw new Error("Wrong body!", result.error);
  }
  return result.data;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const integration = verifyIntegration(req.query.integration);
    const body = verifyBody(req.body);
    const result = await notify(integration, body.text);
    if (!result.ok) {
      return res.status(500).end(`Problem with ${integration}`);
    }
    return res.status(200).json({ integration });
  } catch (e) {
    return res.status(500).end(e);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default verifySignature(handler);
