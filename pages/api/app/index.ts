import type { NextApiResponse, NextApiRequest } from "next";
import Application from "../../../models/App";
import connect from "../../../lib/dbconnect";


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"


const handler = async (request: NextApiRequest, response: NextApiResponse) => {

  const session = await unstable_getServerSession(request, response, authOptions)
  if (session) {
    const userId = session.userId
    const projectId = request.query.projectId as string
    const { method } = request;
    await connect();
    switch (method) {
      case "GET":
        try {
          const apps = await Application.find({ projectId });
          return response.status(200).json({
            apps,
          });
        } catch (e) {
          response.status(400).json({ error: e.message });
        }
        break;
      case "POST":
        try {

          const app = new Application({
            name: request.body.name,
            description: request.body?.description,
            userId,
            projectId
          });

          app.save((e, app) => {
            if (e) response.status(400).json({ error: e.message });
            else
              response.status(200).json({
                 app,
              });
          });
        } catch (e) {
          response.status(400).json({ error: e.message });
        }
        break;
      default:
        response.setHeader("Allow", ["GET", "POST"]);
        response.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    return response.status(401).json({ msg: "unauthorized" })

  }

};

export default handler;
