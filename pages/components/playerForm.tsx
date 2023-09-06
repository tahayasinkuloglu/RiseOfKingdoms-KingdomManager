import { FC, useEffect, useState } from "react";
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
  calc,
  Select,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { object, number, string, boolean } from "yup";
import { IFinalPlayer } from "@/utils/types";
import swal from "sweetalert";

let playerSchema = object({
  governorID: number()
    .required("GovernorID can't be null!")
    .typeError("GovernorID must be number!"),
  // password: string().required("Password can't be null!"),
  password: string(),
  name: string().required("Name can't be null!"),
  role: string().required("Please select a role."),
  power: number()
    .required("Number can't be null!")
    .typeError("Power must be number!"),
  civilization: string().required("Please select a role."),
  vip: number().required("VIP can't be null!").typeError("VIP must be number!"),
  isAdmin: boolean(),
  isAoo: boolean(),
  timezone: string(),
  dp: number().typeError("Death Points must be number!"),
  kp: number().typeError("Kill Points must be number!"),
});

interface Props {
  mode?: boolean;
  player?: IFinalPlayer;
  setModalRender?: any;
}

const PlayerForm: FC<Props> = ({
  mode,
  player,
  setModalRender,
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdmin, setIsAdmin] = useState("false");
  const text = "Add Player";

  const customClose = () => {
    setModalRender();
  };

  let initialFormValues = {
    governorID: player ? player.governorID : "",
    password: "",
    name: player ? player.name : "",
    isAdmin: player ? player.isAdmin : false,
    isAoo: player ? player.isAoo : false,
    role: player ? player.role : "",
    power: player ? player.power : "",
    civilization: player ? player.civilization : "",
    vip: player ? player.vip : "",
    timezone: player ? player.timezone : "",
    dp: player ? player.dp : "",
    kp: player ? player.kp : "",
  };

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(admin);
    }
  }, []);
  const formik = useFormik({
    validationSchema: playerSchema,
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (mode) {
          await axios
            .patch(`/api/player/${player?._id}`, values)
            .then((res) => {
              if (res.status == 200) {
                triggerSwal("Oyuncu başarıyla güncellendi", "", "success");
                resetForm();
                onClose();
                customClose();
              } else {
                triggerSwal("Something went wrong!", "", "error");
              }
            });
        } else {
          await axios.post(`/api/player`, values).then((res) => {
            triggerSwal("Oyuncu başarıyla oluşturuldu", "", "success");
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
      {isAdmin === "true" ? (
        <Button onClick={onOpen} border={mode ? "0px" : "1px"} display={"flex"}>
          {mode ? null : text} {mode ? <FiEdit2 /> : <FiPlus />}&nbsp;
        </Button>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Flex direction={"column"}>
                <FormControl display={"flex"}>
                  <FormLabel>Admin (player must be admin?)</FormLabel>
                  <Checkbox
                    id="isAdmin"
                    name="isAdmin"
                    onChange={formik.handleChange}
                    value={formik.values.isAdmin as any}
                    isChecked={player?.isAdmin}
                  />
                </FormControl>

                <FormControl display={"flex"}>
                  <FormLabel>is Aoo Player?</FormLabel>
                  <Checkbox
                    id="isAoo"
                    name="isAoo"
                    onChange={formik.handleChange}
                    value={formik.values.isAoo as any}
                    isChecked={player?.isAoo}
                  />
                </FormControl>

                <Flex gap={4} marginTop={4}>
                  <FormControl isRequired>
                    <FormLabel>Governor ID (in your game ID)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Governor ID"
                      id="governorID"
                      name="governorID"
                      onChange={formik.handleChange}
                      value={formik.values.governorID}
                    />
                    {formik.touched.governorID && formik.errors.governorID ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.governorID}
                      </Text>
                    ) : null}
                  </FormControl>

                  {/* <FormControl isRequired> */}
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.password}
                      </Text>
                    ) : null}
                  </FormControl>
                </Flex>

                <Flex gap={4} marginY={4}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.name}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Select Role"
                      id="role"
                      name="role"
                      onChange={formik.handleChange}
                      defaultValue={player?.role}
                    >
                      <option>Rally</option>
                      <option>Garrison</option>
                      <option>Open Field</option>
                    </Select>
                    {formik.touched.role && formik.errors.role ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.role}
                      </Text>
                    ) : null}
                  </FormControl>
                </Flex>

                <Flex gap={4} marginBottom={4}>
                  <FormControl isRequired>
                    <FormLabel>Power</FormLabel>
                    <Input
                      placeholder="Power"
                      id="power"
                      name="power"
                      onChange={formik.handleChange}
                      value={formik.values.power}
                    />
                    {formik.touched.power && formik.errors.power ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.power}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Civilization</FormLabel>
                    <Select
                      placeholder="Select Civilization"
                      id="civilization"
                      name="civilization"
                      onChange={formik.handleChange}
                      defaultValue={player?.civilization}
                    >
                      <option value="Greece">Greece</option>
                      <option value="Rome">Rome</option>
                      <option value="Germany">Germany</option>
                      <option value="Britain">Britain</option>
                      <option value="France">France</option>
                      <option value="China">China</option>
                      <option value="Vikings">Vikings</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Japan">Japan</option>
                      <option value="Korea">Korea</option>
                      <option value="Spain">Spain</option>
                      <option value="Arabia">Arabia</option>
                      <option value="Ottoman">Ottoman</option>
                      <option value="Byzantium">Byzantium</option>
                    </Select>
                    {formik.touched.civilization &&
                    formik.errors.civilization ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.civilization}
                      </Text>
                    ) : null}
                  </FormControl>
                </Flex>
                <Flex gap={4} marginBottom={4}>
                  <FormControl isRequired>
                    <FormLabel>VIP</FormLabel>
                    <Input
                      placeholder="VIP"
                      id="vip"
                      name="vip"
                      onChange={formik.handleChange}
                      value={formik.values.vip}
                    />
                    {formik.touched.vip && formik.errors.vip ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.vip}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Player Fight Timezone</FormLabel>
                    <Select
                      placeholder="Select Timezone"
                      id="timezone"
                      name="timezone"
                      onChange={formik.handleChange}
                      defaultValue={player?.timezone}
                    >
                      <option value="UTC 08:00 | UTC 16:00">
                        UTC 08:00 | UTC 16:00
                      </option>
                      <option value="UTC 16:00 | UTC 24:00">
                        UTC 16:00 | UTC 24:00
                      </option>
                      <option value="UTC 24:00 | UTC 08:00">
                        UTC 24:00 | UTC 08:00
                      </option>
                    </Select>
                    {formik.touched.timezone && formik.errors.timezone ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.timezone}
                      </Text>
                    ) : null}
                  </FormControl>
                </Flex>
                <Flex gap={4}>
                  <FormControl>
                    <FormLabel>Death Points</FormLabel>
                    <Input
                      type="text"
                      placeholder="Death Points"
                      id="dp"
                      name="dp"
                      onChange={formik.handleChange}
                      value={formik.values.dp}
                    />
                    {formik.touched.dp && formik.errors.dp ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.dp}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Kill Points</FormLabel>
                    <Input
                      placeholder="Kill Points"
                      id="kp"
                      name="kp"
                      onChange={formik.handleChange}
                      value={formik.values.kp}
                    />
                    {formik.touched.kp && formik.errors.kp ? (
                      <Text color={"red"} marginTop={2}>
                        {formik.errors.kp}
                      </Text>
                    ) : null}
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

export default PlayerForm;
