import type { NextApiResponse, NextApiRequest } from "next";
import connect from "../../../lib/dbconnect";

import keyGen from "../../../utils/keyGen";
import AccessKey from "../../../models/AccessKey";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"




const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await unstable_getServerSession(request, response, authOptions)

    if (session) {
        // console.log(new ObjectId(session.user.userId))
        // return response.json(session)
        const userId = session.userId
        const {
            method,
        } = request;
        await connect();

        switch (method) {
            case "GET":
                try {
                    console.log("get request")
                } catch (e) {
                    response.status(500).json({
                        error: e.message,
                    });
                }
                break;
            case "POST":
                try {
                    console.log("post")
                } catch (e) {
                    response.status(500).json({
                        error: e.message,
                    });
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
