import dbConnect from "@/lib/dbConnect";
import Player from "@/models/player";
import { NextApiHandler } from "next";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getAllPlayers(req, res);
    case "POST":
      return createPlayer(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const getAllPlayers: NextApiHandler = async (req, res) => {
  await dbConnect();

  const player = await Player.find().lean();

  res.status(200).json({ player });
};

const createPlayer: NextApiHandler = async (req, res) => {
  await dbConnect();

  const playerData = req.body;

  try {
    const newPlayer = new Player(playerData);
    await newPlayer.save();
    res.status(201).json({ newPlayer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
