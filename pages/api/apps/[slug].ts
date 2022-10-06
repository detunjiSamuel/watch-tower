import type { NextApiResponse, NextApiRequest } from "next";
import Application from "../../../models/App";
import connect from "../../../lib/dbconnect";
import { ObjectId } from "mongodb";

// TODO generate slug that will be used
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    method,
    query: { slug },
  } = request;
  await connect();

  switch (method) {
    case "GET":
      try {
        const app = await Application.findById(slug);
        if (!app)
          return response.status(404).json({ error: "App does not exist" });
        response.status(200).json({
          data: app,
        });
      } catch (e) {
        response.status(500).json({
          error: e.message,
        });
      }
      break;
    case "PUT":
      try {
        const app = await Application.findByIdAndUpdate(slug, {
          name: request.body.nam,
        });

        if (!app)
          return response.status(404).json({
            error: "App does not exist",
          });
        response.status(200).json({
          data: app,
        });
      } catch (e) {
        response.status(500).json({ error: e.message });
      }
      break;
    case "DELETE":
      try {
        const app = await Application.deleteOne({ _id: slug });
        if (!app)
          return response.status(404).json({ error: "App does not exist" });

        response.status(200).json({ data: app });
      } catch (e) {
        response.status(500).json({ error: e.message });
      }
      break;
    default:
      response.setHeader("Allow", ["GET", "POST"]);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
