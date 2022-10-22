import type { NextApiResponse, NextApiRequest } from "next";
import connect from "../../../lib/dbconnect";
import ProjectModel from "../../../models/Project";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await unstable_getServerSession(request, response, authOptions)
    if (session) {
        const { query: { id }, method } = request
        await connect()
        switch (method) {
            case "GET":
                try {
                    const project = await ProjectModel.findById(id);
                    if (!project)
                        return response.status(401).json({ error: "Non existent Project" })
                    response.status(200).json(project)
                } catch (e) {
                    return response.status(400).json({ error: e.message })
                }
                break
            case "PUT":
                try {
                    const project = await ProjectModel.findByIdAndUpdate(id, {
                        name: request.body.name,
                        description: request.body.description
                    }, { new: true })
                    if (!project)
                        return response.status(404).json({ error: "Non-existnent " })
                    response.status(200).json(project)
                } catch (e) {
                    return response.status(400).json({ error: e.message })
                }
                break
            case "DELETE":
                try {
                    const project = await ProjectModel.deleteOne({
                        _id: id
                    })
                    if (!project)
                        return response.status(404).json({
                            error: "Non-existent"
                        })
                    response.status(200).json(project)
                }
                catch (e) {
                    return response.status(400).json({ error: e.message })

                }
                break
            default:
                response.setHeader("Allow", ["GET", "POST"]);
                response.status(405).end(`Method ${method} Not Allowed`);
        }
    } else {
        return response.status(401).json({ msg: "unauthorized" })
    }
}


export default handler;