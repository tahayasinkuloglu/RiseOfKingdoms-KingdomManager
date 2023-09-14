import { model, models, Schema, Model, ObjectId } from "mongoose";

interface IMarches {
  firstCommander: string;
  secondCommander: string;
  marchType: string;
  helm: string;
  chest: string;
  weapon: string;
  glove: string;
  leg: string;
  boot: string;
  firstAccessory: string;
  secondAccessory: string;
  critHelm: boolean;
  critChest: boolean;
  critWeapon: boolean;
  critGlove: boolean;
  critLeg: boolean;
  critBoot: boolean;
  critFirstAccessory: boolean;
  critSecondAccessory: boolean;
  iconicHelm: boolean;
  iconicChest: boolean;
  iconicWeapon: boolean;
  iconicGlove: boolean;
  iconicLeg: boolean;
  iconicBoot: boolean;
  iconicFirstAccessory: boolean;
  iconicSecondAccessory: boolean;
}

const MarchesSchema = new Schema<IMarches>({
  firstCommander: {
    type: String,
    required: true,
  },
  secondCommander: {
    type: String,
    required: true,
  },
  marchType: {
    type: String,
    required: true,
  },
  helm: {
    type: String,
    default: "",
  },
  chest: {
    type: String,
    default: "",
  },
  weapon: {
    type: String,
    default: "",
  },
  glove: {
    type: String,
    default: "",
  },
  leg: {
    type: String,
    default: "",
  },
  boot: {
    type: String,
    default: "",
  },
  firstAccessory: {
    type: String,
    default: "",
  },
  secondAccessory: {
    type: String,
    default: "",
  },
  critHelm: {
    type: Boolean,
    required: true,
  },
  critChest: {
    type: Boolean,
    required: true,
  },
  critWeapon: {
    type: Boolean,
    required: true,
  },
  critGlove: {
    type: Boolean,
    required: true,
  },
  critLeg: {
    type: Boolean,
    required: true,
  },
  critBoot: {
    type: Boolean,
    required: true,
  },
  critFirstAccessory: {
    type: Boolean,
    required: true,
  },
  critSecondAccessory: {
    type: Boolean,
    required: true,
  },
  iconicHelm: {
    type: Boolean,
    required: true,
  },
  iconicChest: {
    type: Boolean,
    required: true,
  },
  iconicWeapon: {
    type: Boolean,
    required: true,
  },
  iconicGlove: {
    type: Boolean,
    required: true,
  },
  iconicLeg: {
    type: Boolean,
    required: true,
  },
  iconicBoot: {
    type: Boolean,
    required: true,
  },
  iconicFirstAccessory: {
    type: Boolean,
    required: true,
  },
  iconicSecondAccessory: {
    type: Boolean,
    required: true,
  },
});

const Marches = models?.Marches || model("Marches", MarchesSchema);

export default Marches as Model<IMarches>;
