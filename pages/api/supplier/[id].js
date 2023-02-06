import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (req.method === "DELETE") {
    const options = {
      method: "DELETE",
      url: `${base_url}/api/product/supplier/${id}`,
      headers: {
        token: session.accessToken,
      },
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

  if (req.method === "PUT") {
    const body = await req.body.data;

    // body["contact"] = parseInt(body["contact"]);

    const options = {
      method: "PUT",
      url: `${base_url}/api/product/supplier/${id}`,
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
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
