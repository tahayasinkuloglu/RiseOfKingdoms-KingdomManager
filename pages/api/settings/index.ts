import dbConnect from "@/lib/dbConnect";
import Player from "@/models/player";
import { NextApiHandler } from "next";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return getPlayerSettings(req, res);

    default:
      return res.status(404).json({ message: "Invalid method type" });
  }
};

const getPlayerSettings: NextApiHandler = async (req, res) => {
  await dbConnect();

  const player = await Player.find().lean();
  res.status(200).json({ player });
};

export default Handler;
