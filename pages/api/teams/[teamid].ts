import { NextApiHandler } from "next";
import Team from "@/models/team";
import Player from "@/models/player";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return getTeamsById(req, res);
    case "POST":
      return addPlayerToTeam(req, res);
    case "PATCH":
      return updateTeam(req, res);
    case "DELETE":
      return deleteTeam(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const getTeamsById: NextApiHandler = async (req, res) => {
  const { teamid } = req.query;

  try {
    const team = await Team.findById(teamid);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    const players = await Player.find({
      _id: { $in: team.players },
    });
    res.status(200).json({ players });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const addPlayerToTeam: NextApiHandler = async (req, res) => {
  const { teamid } = req.query;
  const players = req.body;

  try {
    const team = await Team.findById(teamid);
    if (!team) {
      return res.status(404).json({ message: "Player not found." });
    }

    const newTeam = new Team(players);
    const saveTeam = await newTeam.save();

    res.status(201).json({ saveTeam });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeam: NextApiHandler = async (req, res) => {
  const { teamid } = req.query;
  const team = req.body;

  try {
    const updateTeam = await Team.findByIdAndUpdate(teamid, team, {
      new: true,
    });
    if (!updateTeam) return res.status(404).json({ error: "Team Not Found!" });
    res.status(200).json({ updateTeam });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTeam: NextApiHandler = async (req, res) => {
  const { teamid } = req.query;

  try {
    const deletedTeam = await Team.findByIdAndDelete(teamid);
    if (!deletedTeam) {
      return res.status(404).json({ message: "March not found!" });
    }
    res
      .status(200)
      .json({ message: "March deleted successfully!", deletedTeam });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
