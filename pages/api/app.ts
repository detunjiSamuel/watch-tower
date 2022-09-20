import type { NextApiResponse, NextApiRequest } from "next";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  response.statusCode = 200;
  response.json({
    Msg: "Works !",
  });
};

export default handler;
