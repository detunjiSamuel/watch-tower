import type { NextApiResponse, NextApiRequest } from "next";
import connect from "../../../lib/dbconnect";
import ProjectModel from "../../../models/Project";


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// TODO generate slug that will be used
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
                    const projects = await ProjectModel.find({ userId })
                    response.status(200).json({
                        projects
                    });
                } catch (e) {
                    response.status(500).json({
                        error: e.message,
                    });
                }
                break;
            case "POST":
                try {
                    const project = new ProjectModel({
                        name: request.body.name,
                        description: request.body?.description,
                        userId
                    });
                    project.save((e, project) => {
                        if (e)
                            return response.status(400).json({
                                error: e.message
                            })
                        return response.status(200).json({
                            project
                        })
                    })
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
