import { transformData } from "@/lib/transformData";
import Marches from "@/models/march";
import Player from "@/models/player";
import { NextApiHandler } from "next";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return getAllPlayerMarches(req, res);
    case "POST":
      return addMarchToPlayer(req, res);
    case "PATCH":
      return updateMarches(req, res);
    case "DELETE":
      return deleteMarches(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const getAllPlayerMarches: NextApiHandler = async (req, res) => {
  const { playerid } = req.query;

  try {
    const player = await Player.findById(playerid);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    const marches = await Marches.find({
      _id: { $in: player.marches },
    });

    res.status(200).json({ marches });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const addMarchToPlayer: NextApiHandler = async (req, res) => {
  const { playerid } = req.query;
  const march = req.body;

  try {
    const player = await Player.findById(playerid);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    const newMarch = new Marches(march);
    const saveMarch = await newMarch.save();
    player.marches?.push(saveMarch._id as any);
    await player.save();

    res.status(201).json({ saveMarch });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateMarches: NextApiHandler = async (req, res) => {
  const { playerid } = req.query;
  const march = req.body;

  try {
    const updateMarch = await Marches.findByIdAndUpdate(playerid, march, {
      new: true,
    });
    if (!updateMarch)
      return res.status(404).json({ error: "March Not Found!" });
    res.status(200).json({ updateMarch });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMarches: NextApiHandler = async (req, res) => {
  const { playerid } = req.query;
  const marchid = req.body;

  try {
    const player = await Player.findById(playerid);
    if (!player) {
      return res.status(404).json({ message: "Player not found!" });
    }

    if (player.marches) {
      player.marches = player.marches.filter(
        (march) => march.toString() !== marchid
      );
      await player.save();
    }

    const deletedMarch = await Marches.findByIdAndDelete(marchid);
    if (!deletedMarch) {
      return res.status(404).json({ message: "March not found!" });
    }
    res
      .status(200)
      .json({ message: "March deleted successfully!", deletedMarch });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
