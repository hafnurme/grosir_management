import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const body = await req.body.data;
  const { id } = req.query;

  if (req.method == "POST") {
    const options = {
      method: "POST",
      url: `${base_url}/api/product/order/distribute/${id}`,
      headers: {
        token: session.accessToken,
      },
      data: body,
    };

    console.log(options);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(function (error) {
        return res.status(500).json({ message: "Delete Failed, server error" });
      });
  }
}
