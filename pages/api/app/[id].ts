import type { NextApiResponse, NextApiRequest } from "next";
import Application from "../../../models/App";
import connect from "../../../lib/dbconnect";


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// TODO generate slug that will be used
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await unstable_getServerSession(request, response, authOptions)

  if (session) {
    const {
      method,
      query: { id },
    } = request;
    await connect();

    switch (method) {
      case "GET":
        try {
          const app = await Application.findById(id);
          if (!app)
            return response.status(404).json({ error: "App does not exist" });
          response.status(200).json({
            app,
          });
        } catch (e) {
          response.status(500).json({
            error: e.message,
          });
        }
        break;
      case "PUT":
        try {
          const app = await Application.findByIdAndUpdate(id, {
            name: request.body.name,
            description: request.body.description,
          }, { new: true });

          if (!app)
            return response.status(404).json({
              error: "App does not exist",
            });
          response.status(200).json({
            app,
          });
        } catch (e) {
          response.status(500).json({ error: e.message });
        }
        break;
      case "DELETE":
        try {
          const app = await Application.deleteOne({ _id: id });
          if (!app)
            return response.status(404).json({ error: "App does not exist" });

          response.status(200).json({ app });
        } catch (e) {
          response.status(500).json({ error: e.message });
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
