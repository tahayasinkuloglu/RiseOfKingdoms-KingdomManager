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
  Switch,
  Text,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { object, number, string, boolean } from "yup";
import { IFinalPlayer, ITeams } from "@/utils/types";
import swal from "sweetalert";

let playerSchema = object({
  name: string().required("Name can't be null!"),
});

interface Props {
  mode?: boolean;
  team?: ITeams;
  setModalRender?: any;
}

const TeamModal: FC<Props> = ({ mode, team, setModalRender }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdmin, setIsAdmin] = useState("false");
  const [player, setPlayer] = useState<IFinalPlayer[]>();
  const text = "Add Team";

  let initialFormValues = {
    name: team ? team.name : "",
    players: team ? team.players : [],
  };

  const customClose = () => {
    setModalRender();
  };

  const getPlayers = async () => {
    await axios.get(`/api/player`).then((res) => {
      const filteredPlayer = res.data.player.filter((player: IFinalPlayer) => {
        return player.isAoo === true;
      });
      setPlayer(filteredPlayer);
    });
  };

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(admin);
    }
    getPlayers();
  }, []);

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const formik = useFormik({
    validationSchema: playerSchema,
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (mode) {
          await axios.patch(`/api/teams/${team?._id}`, values).then((res) => {
            triggerSwal("Takım başarıyla güncellendi", "", "success");
            onClose();
            customClose();
          });
        } else {
          await axios.post(`/api/teams`, values).then((res) => {
            triggerSwal("Takım başarıyla oluşturuldu", "", "success");
            onClose();
            customClose();
            resetForm();
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
          <ModalHeader>Add Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Flex direction={"column"}>
                <FormControl isRequired>
                  <FormLabel>Team Name</FormLabel>
                  <Input
                    placeholder="Team Name"
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
                {mode && (
                  <Flex mt={4}>
                    <FormControl isRequired>
                      <FormLabel>Select Team players (Max 15)</FormLabel>

                      {player &&
                        player.map((player, index) => {
                          return (
                            <FormControl
                              gap={4}
                              my={4}
                              key={index}
                              display="flex"
                              alignItems="center"
                            >
                              <FormLabel htmlFor="players" mb="1">
                                {player.name}
                              </FormLabel>
                              <Switch
                                id="players"
                                name="players"
                                onChange={formik.handleChange}
                                value={player._id}
                                isChecked={formik.values.players.includes(
                                  player._id as any
                                )}
                              />
                            </FormControl>
                          );
                        })}
                    </FormControl>
                  </Flex>
                )}
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

export default TeamModal;
