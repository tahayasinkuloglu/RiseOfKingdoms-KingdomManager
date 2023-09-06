const equipmentTypeMap: {
  [key: string]:
    | "Weapons"
    | "Helms"
    | "Chest"
    | "Gloves"
    | "Legs"
    | "Boots"
    | "Accessories";
} = {
  Boot: "Boots",
  Chest: "Chest",
  FirstAccessory: "Accessories",
  Glove: "Gloves",
  Helm: "Helms",
  Leg: "Legs",
  SecondAccessory: "Accessories",
  Weapon: "Weapons",
};

export const transformData = async (submittedData: any) => {
  return {
    firstCommander: submittedData.firstCommander,
    secondCommander: submittedData.secondCommander,
    marchType: submittedData.marchType,
    equipment: Object.entries(submittedData)
      .filter(
        ([key]) =>
          key !== "firstCommander" &&
          key !== "secondCommander" &&
          !key.startsWith("crit") &&
          !key.startsWith("iconic")
      )
      .map(([key, value]) => ({
        equipmentType: equipmentTypeMap[key],
        name: key,
        itemName: (value as string) || "null",
        isCrit: submittedData[`crit${key}`],
        isIconic: submittedData[`iconic${key}`],
      })),
  };
};
