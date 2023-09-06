import { model, models, Schema, Model, ObjectId } from "mongoose";

export interface IPlayer {
  _id: ObjectId;
  governorID: string;
  password: string;
  isAdmin: boolean;
  isAoo: boolean;
  name: string;
  role: string;
  power: number;
  civilization: string;
  vip: number;
  marches?: ObjectId[];
  timezone: string;
  dp: string;
  dpAfter: string;
  kp: string;
  kpAfter: string;
  killt1: string;
  killt2: string;
  killt3: string;
  killt4: string;
  killt5: string;
  createdAt: Date;
}

const playerSchema = new Schema<IPlayer>(
  {
    governorID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAoo: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    power: { type: Number, required: true },
    civilization: {
      type: String,
      required: true,
    },
    vip: { type: Number, required: true },
    marches: [
      {
        type: Schema.Types.ObjectId,
        ref: "Marches",
      },
    ],
    timezone: {
      type: String,
    },
    dp: {
      type: String,
      default: "0",
    },
    dpAfter: {
      type: String,
      default: "0",
    },
    kp: {
      type: String,
      default: "0",
    },
    kpAfter: {
      type: String,
      default: "0",
    },
    killt1: {
      type: String,
      default: "0",
    },
    killt2: {
      type: String,
      default: "0",
    },
    killt3: {
      type: String,
      default: "0",
    },
    killt4: {
      type: String,
      default: "0",
    },
    killt5: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const Player = models?.Player || model("Player", playerSchema);

export default Player as Model<IPlayer>;
