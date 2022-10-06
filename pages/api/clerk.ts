import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "POST":
      try {
        const { type, data } = request.body;
        console.log("type", type);
        console.log("data", data);

        if (type == "user.created") {
          console.debug("user created action");
          const user = new User({
            clerk_id: data.id,
            firstname: data.first_name,
            lastname: data.last_name,
            email: data.email_addresses.find(
              email => email.id == data.primary_email_address_id
            ).email_address,
            imageUrl: data.profile_image_url,
          });

          user.save((e, user) => {
            if (e)
              return response.status(400).json({
                error: e.message,
              });
            else
              return response.status(200).json({
                data: user,
              });
          });
        }

        if (type == "user.deleted") {
          const user = await User.findOneAndDelete({
            clerk_id: data.id,
          });
          if (!user)
            return response.status(400).json({
              error: "Non existent user",
            });
          return response.status(200).json({ data: user });
        }
      } catch (e) {
        return response.status(400).json({ error: e.message });
      }

      break;

    default:
      response.setHeader("Allow", ["POST"]);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
