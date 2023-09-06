import dbConnect from "@/lib/dbConnect";
import { NextApiHandler } from "next";
import Player from "@/models/player";

const Handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      return login(req, res);
    default:
      return res.status(500).json({ error: "Invalid Method Type!" });
  }
};

const login: NextApiHandler = async (req, res) => {
  await dbConnect();

  const { values } = req.body;

  const { userGovernorID, password } = values;

  try {
    const user = await Player.findOne({
      governorID: userGovernorID,
      password: password,
    });
    if (!user)
      return res.status(200).json({ error: "GameID or password incorrect!" });
    const { governorID, isAdmin, name } = user;
    res.status(200).json({ governorID, isAdmin, name, login: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default Handler;
