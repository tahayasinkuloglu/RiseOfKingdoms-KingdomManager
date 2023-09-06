export interface IFinalPlayer {
  _id: string;
  governorID: number;
  name: string;
  role: string;
  isAoo: boolean;
  isAdmin: boolean;
  timezone: string;
  kp: string;
  kpAfter: string;
  dp: string;
  dpAfter: string;
  power: number;
  civilization: string;
  vip: number;
  killt1: string;
  killt2: string;
  killt3: string;
  killt4: string;
  killt5: string;
  marches?: March[];
  createdAt: Date;
  updatedAt: string;
}

type EquipmentType =
  | "Weapons"
  | "Helms"
  | "Chest"
  | "Gloves"
  | "Legs"
  | "Boots"
  | "Accessories";

interface EquipmentItem {
  equipmentType: EquipmentType;
  name: string;
  itemName: string;
  isCrit: boolean;
  isIconic: boolean;
}

export interface March {
  _id?: string;
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

export interface ITeams {
  _id?: string;
  name: string;
  players: IFinalPlayer[];
}
