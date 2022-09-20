import type { NextApiResponse, NextApiRequest } from "next";
import Application from "../../../models/App";
import connect from "../../../lib/dbconnect";
import { ObjectId } from "mongodb";
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  console.log("Receive request");
  await connect();
  switch (method) {
    case "GET":
      try {
        const apps = await Application.find({});
        return response.status(200).json({
          data: apps,
        });
      } catch (e) {
        response.status(400).json({ error: e.message });
      }
      break;
    case "POST":
      try {
        const userId = new ObjectId(request.body.userId);
        const app = new Application({
          name: request.body.name,
          description: request.body?.description,
          userId,
        });

        app.save((e, app) => {
          if (e) response.status(400).json({ error: e.message });
          else
            response.status(200).json({
              data: app,
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
};

export default handler;
