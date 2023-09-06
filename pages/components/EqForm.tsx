import { FC } from "react";
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Select,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { FiEdit2, FiPlus } from "react-icons/fi";
import data from "../data/item.json";
import { March } from "@/utils/types";
import commander from "../data/commanders.json";
import swal from "sweetalert";

interface Props {
  mode?: boolean;
  march?: March;
  playerid?: string;
  setModalRender?: any;
}

const EqForm: FC<Props> = ({
  mode,
  march,
  playerid,
  setModalRender,
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const customClose = () => {
    setModalRender();
  };

  let initialFormValues = {
    firstCommander: march ? march.firstCommander : "",
    secondCommander: march ? march.secondCommander : "",
    marchType: march ? march.marchType : "",
    helm: march ? march.helm : "",
    chest: march ? march.chest : "",
    weapon: march ? march.weapon : "",
    glove: march ? march.glove : "",
    leg: march ? march.leg : "",
    boot: march ? march.boot : "",
    firstAccessory: march ? march.firstAccessory : "",
    secondAccessory: march ? march.secondAccessory : "",
    critHelm: march ? march.critHelm : false,
    critChest: march ? march.critChest : false,
    critWeapon: march ? march.critWeapon : false,
    critGlove: march ? march.critGlove : false,
    critLeg: march ? march.critLeg : false,
    critBoot: march ? march.critBoot : false,
    critFirstAccessory: march ? march.critFirstAccessory : false,
    critSecondAccessory: march ? march.critSecondAccessory : false,
    iconicHelm: march ? march.iconicHelm : false,
    iconicChest: march ? march.iconicChest : false,
    iconicWeapon: march ? march.iconicWeapon : false,
    iconicGlove: march ? march.iconicGlove : false,
    iconicLeg: march ? march.iconicLeg : false,
    iconicBoot: march ? march.iconicBoot : false,
    iconicFirstAccessory: march ? march.iconicFirstAccessory : false,
    iconicSecondAccessory: march ? march.iconicSecondAccessory : false,
  };

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (mode) {
          await axios
            .patch(`/api/marches/${march?._id}`, values)
            .then((res) => {
              triggerSwal("March başarıyla güncellendi", "", "success");
              resetForm();
              onClose();
              customClose();
            });
        } else {
          await axios.post(`/api/marches/${playerid}`, values).then((res) => {
            triggerSwal("March başarıyla oluşturuldu", "", "success");
            resetForm();
            onClose();
            customClose();
          });
        }
      } catch (error) {
        console.log("Hata:", error);
      }
    },
  });

  return (
    <>
      <Button onClick={onOpen} border={mode ? "0px" : "1px"}>
        {mode ? null : "Add March"}&nbsp;
        {mode ? <FiEdit2 /> : <FiPlus />}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your marches</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Flex gap={4}>
                <FormControl isRequired>
                  <FormLabel>First Commander</FormLabel>
                  <Select
                    name="firstCommander"
                    id="firstCommander"
                    placeholder="Select first commander"
                    onChange={formik.handleChange}
                    defaultValue={march?.firstCommander}
                  >
                    {commander.commanders
                      .filter((x) => x != formik.values.secondCommander)
                      .map((commander, index) => {
                        return (
                          <option key={index} value={commander}>
                            {commander}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Second Commander</FormLabel>
                  <Select
                    name="secondCommander"
                    id="secondCommander"
                    placeholder="Select second commander"
                    onChange={formik.handleChange}
                    defaultValue={march?.secondCommander}
                  >
                    {commander.commanders
                      .filter((x) => x != formik.values.firstCommander)
                      .map((commander, index) => {
                        return (
                          <option key={index} value={commander}>
                            {commander}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
              </Flex>

              <FormControl isRequired marginTop={4}>
                <FormLabel>March Type</FormLabel>
                <Select
                  name="marchType"
                  id="marchType"
                  placeholder="Select march type"
                  onChange={formik.handleChange}
                  defaultValue={march?.marchType}
                >
                  <option value={"Archer"}>Archer</option>
                  <option value={"Cavalary"}>Cavalary</option>
                  <option value={"Infantry"}>Infantry</option>
                  <option value={"Mix"}>Mix</option>
                  <option value={"Siege"}>Siege</option>
                </Select>
              </FormControl>

              <Flex direction={"column"} gap={4} marginY={4}>
                {/* HELM */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Helm</FormLabel>
                    <Select
                      name="helm"
                      onChange={formik.handleChange}
                      placeholder="Select Helm"
                      defaultValue={march?.helm}
                    >
                      {data["en-En"].Helms.map((helm, index) => {
                        return (
                          <option value={helm} key={index}>
                            {helm}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Helm</FormLabel>
                    <Checkbox
                      name="critHelm"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critHelm}
                    >
                      Crit Helm
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Helm</FormLabel>
                    <Checkbox
                      name="iconicHelm"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicHelm}
                    >
                      Iconic Helm
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* CHEST */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Chest</FormLabel>
                    <Select
                      name="chest"
                      onChange={formik.handleChange}
                      placeholder="Select Chest"
                      defaultValue={march?.chest}
                    >
                      {data["en-En"].Chest.map((chest, index) => {
                        return (
                          <option value={chest} key={index}>
                            {chest}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Chest</FormLabel>
                    <Checkbox
                      name="critChest"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critChest}
                    >
                      Crit Chest
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Chest</FormLabel>
                    <Checkbox
                      name="iconicChest"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicChest}
                    >
                      Iconic Chest
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* WEAPON */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Weapon</FormLabel>
                    <Select
                      name="weapon"
                      onChange={formik.handleChange}
                      placeholder="Select Weapon"
                      defaultValue={march?.weapon}
                    >
                      {data["en-En"].Weapons.map((weapon, index) => {
                        return <option key={index}>{weapon}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Weapon</FormLabel>
                    <Checkbox
                      name="critWeapon"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critWeapon}
                    >
                      Crit Weapon
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Weapon</FormLabel>
                    <Checkbox
                      name="iconicWeapon"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicWeapon}
                    >
                      Iconic Weapon
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* GLOVE */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Glove</FormLabel>
                    <Select
                      name="glove"
                      onChange={formik.handleChange}
                      placeholder="Select Glove"
                      defaultValue={march?.glove}
                    >
                      {data["en-En"].Gloves.map((glove, index) => {
                        return <option key={index}>{glove}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Glove</FormLabel>
                    <Checkbox
                      name="critGlove"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critGlove}
                    >
                      Crit Glove
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Glove</FormLabel>
                    <Checkbox
                      name="iconicGlove"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicGlove}
                    >
                      Iconic Glove
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* LEG */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Leg</FormLabel>
                    <Select
                      name="leg"
                      onChange={formik.handleChange}
                      placeholder="Select Leg"
                      defaultValue={march?.leg}
                    >
                      {data["en-En"].Legs.map((leg, index) => {
                        return <option key={index}>{leg}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Leg</FormLabel>
                    <Checkbox
                      name="critLeg"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critLeg}
                    >
                      Crit Leg
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Leg</FormLabel>
                    <Checkbox
                      name="iconicLeg"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicLeg}
                    >
                      Iconic Leg
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* BOOT */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Boot</FormLabel>
                    <Select
                      name="boot"
                      onChange={formik.handleChange}
                      placeholder="Select Boot"
                      defaultValue={march?.boot}
                    >
                      {data["en-En"].Boots.map((boot, index) => {
                        return <option key={index}>{boot}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Boot</FormLabel>
                    <Checkbox
                      name="critBoot"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critBoot}
                    >
                      Crit Boot
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Boot</FormLabel>
                    <Checkbox
                      name="iconicBoot"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicBoot}
                    >
                      Iconic Boot
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* FIRST ACCESSORY */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>First Accessory</FormLabel>
                    <Select
                      name="firstAccessory"
                      onChange={formik.handleChange}
                      placeholder="Select First Accessory"
                      defaultValue={march?.firstAccessory}
                    >
                      {data["en-En"].Accessories.map((accessory, index) => {
                        return <option key={index}>{accessory}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit First Accessory</FormLabel>
                    <Checkbox
                      name="critFirstAccessory"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critFirstAccessory}
                    >
                      Crit First Accessory
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic First Accessory</FormLabel>
                    <Checkbox
                      name="iconicFirstAccessory"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicFirstAccessory}
                    >
                      Iconic First Accessory
                    </Checkbox>
                  </FormControl>
                </Flex>

                {/* SECOND ACCESSORY */}
                <Flex align={"center"} gap={4}>
                  <FormControl>
                    <FormLabel>Second Accessory</FormLabel>
                    <Select
                      name="secondAccessory"
                      onChange={formik.handleChange}
                      placeholder="Select Second Accessory"
                      defaultValue={march?.secondAccessory}
                    >
                      {data["en-En"].Accessories.map((accessory, index) => {
                        return <option key={index}>{accessory}</option>;
                      })}
                      ;
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Crit Second Accessory</FormLabel>
                    <Checkbox
                      name="critSecondAccessory"
                      onChange={formik.handleChange}
                      isChecked={formik.values.critSecondAccessory}
                    >
                      Crit Second Accessory
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Iconic Second Accessory</FormLabel>
                    <Checkbox
                      name="iconicSecondAccessory"
                      onChange={formik.handleChange}
                      isChecked={formik.values.iconicSecondAccessory}
                    >
                      Iconic Second Accessory
                    </Checkbox>
                  </FormControl>
                </Flex>
              </Flex>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EqForm;
