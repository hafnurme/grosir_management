import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

/** Cari produk yang sudah ada di warehouse */
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const body = await req.body.data;

    const options = {
      method: "POST",
      url: `${base_url}/api/warehouse/product`,
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
        return res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
        return res.status(500).json({ message: "Fetch Failed, server error" });
      });
  }
}
