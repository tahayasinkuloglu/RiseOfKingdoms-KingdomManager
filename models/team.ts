import { model, models, Schema, Model, ObjectId } from "mongoose";

interface ITeam {
  name: string;
  players?: ObjectId[];
}

const TeamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Team = models?.Team || model("Team", TeamSchema);

export default Team as Model<ITeam>;
