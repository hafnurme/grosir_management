import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: `${base_url}/api/warehouse/batch/${id}`,
      headers: {
        token: session.accessToken,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(500).json("Delete Failed , Server Error");
      });
  }
}
