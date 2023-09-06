import dbConnect from "@/lib/dbConnect";
import Player from "@/models/player";
import { NextApiHandler } from "next";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getPlayerById(req, res);
    case "PATCH":
      return updatePlayer(req, res);
    case "DELETE":
      return deletePlayer(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const getPlayerById: NextApiHandler = async (req, res) => {
  await dbConnect();
  const { playerid } = req.query;

  try {
    const player = await Player.findById(playerid);
    if (!player) return res.status(404).json({ error: "Player Not Found!" });

    if (player.marches && player.marches.length > 0) {
      await player.populate("marches");
    }

    res.status(200).json({ player });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePlayer: NextApiHandler = async (req, res) => {
  await dbConnect();

  const { playerid } = req.query;
  const playerData = req.body;

  try {
    const updatePlayer = await Player.findByIdAndUpdate(playerid, playerData, {
      new: true,
    });
    if (!updatePlayer)
      return res.status(404).json({ error: "Player Not Found!" });
    res.status(200).json({ updatePlayer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlayer: NextApiHandler = async (req, res) => {
  await dbConnect();
  const { playerid } = req.query;

  try {
    const player = await Player.findByIdAndDelete(playerid);
    if (!player) return res.status(404).json({ error: "Player Not Found!" });

    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
