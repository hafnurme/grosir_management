import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: `${base_url}/api/user/`,
      headers: {
        token: session.accessToken,
      },
    };
    await axios
      .request(options)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Fetch Failed, server error" });
      });
  }

  if (req.method === "PUT") {

    const body = await req.body.data;

    const options = {
      method: "PUT",
      url: `${base_url}/api/user/`,
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      data: body,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json("Delete Failed , Server Error");
      });

  }
}
