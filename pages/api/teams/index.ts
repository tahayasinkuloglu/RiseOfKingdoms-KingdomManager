import dbConnect from "@/lib/dbConnect";
import Team from "@/models/team";
import { NextApiHandler } from "next";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getAllTeams(req, res);
    case "POST":
      return createTeams(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const getAllTeams: NextApiHandler = async (req, res) => {
  await dbConnect();

  try {
    const team = await Team.find().lean();
    res.status(200).json({ team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createTeams: NextApiHandler = async (req, res) => {
  await dbConnect();

  const teamData = req.body;

  try {
    const newTeam = new Team(teamData);
    await newTeam.save();
    res.status(201).json({ newTeam });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
