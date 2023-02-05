import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
const base_url = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const { id } = req.query;

  if (req.method == "DELETE") {
    const options = {
      method: "DELETE",
      url: `${base_url}/api/product/category/${id}`,
      headers: {
        token: session.accessToken,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.status(200).json(response.data);
      })
      .catch(function (error) {
        return res.status(500).json({ message: "Delete Failed, server error" });
      });
  }

  if (req.method == "PUT") {
    const body = await req.body.data;

    const options = {
      method: "PUT",
      url: `${base_url}/api/product/category/${id}`,
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      data: body,
    };

    // res.status(200).json(options);
    await axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  }
}
