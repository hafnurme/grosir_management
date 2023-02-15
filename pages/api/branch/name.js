import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const body = await req.body.data;

  if (req.method === "POST") {
    const options = {
      method: "POST",
      url: `${base_url}/api/branch/search`,
      headers: {
        token: session.accessToken,
      },
      data: body,
    };

    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(500).json("Delete Failed , Server Error");
      });
  }
}
