import { FC, useEffect } from "react";
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
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { object, number, string, boolean } from "yup";
import { IFinalPlayer } from "@/utils/types";
import swal from "sweetalert";

let playerSchema = object({
  dpAfter: number().typeError("Death Points must be number!"),
  kpAfter: number().typeError("Kill Points must be number!"),
  killt1: number().typeError("T1 Kill Points must be number!"),
  killt2: number().typeError("T2 Kill Points must be number!"),
  killt3: number().typeError("T3 Kill Points must be number!"),
  killt4: number().typeError("T4 Kill Points must be number!"),
  killt5: number().typeError("T5 Kill Points must be number!"),
});

interface Props {
  player: IFinalPlayer;
  setModalRender?: any;
}

const DKPModal: FC<Props> = ({ player, setModalRender }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const customClose = () => {
    setModalRender();
  };

  let initialFormValues = {
    dpAfter: player?.dpAfter ? player?.dpAfter : "0",
    kpAfter: player?.kpAfter ? player?.kpAfter : "0",
    killt1: player?.killt1 ? player?.killt1 : "0",
    killt2: player?.killt2 ? player?.killt2 : "0",
    killt3: player?.killt3 ? player?.killt3 : "0",
    killt4: player?.killt4 ? player?.killt4 : "0",
    killt5: player?.killt5 ? player?.killt5 : "0",
  };

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const formik = useFormik({
    validationSchema: playerSchema,
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.patch(`/api/player/${player._id}`, values).then((res) => {
          triggerSwal("DKP başarıyla güncellendi", "", "success");
          resetForm();
          onClose();
          customClose();
        });
      } catch (error) {
        console.log("Hata:", error);
      }
    },
  });

  return (
    <>
      <Button onClick={onOpen}>
        <FiEdit2 />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update DKP Stats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Flex gap={4}>
                <FormControl>
                  <FormLabel>Death Points (*6)</FormLabel>
                  <Input
                    placeholder="Death Points"
                    id="dpAfter"
                    name="dpAfter"
                    onChange={formik.handleChange}
                    value={formik.values.dpAfter}
                  />
                  {formik.touched.dpAfter && formik.errors.dpAfter ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.dpAfter}
                    </Text>
                  ) : null}
                </FormControl>

                <FormControl>
                  <FormLabel>Kill Points</FormLabel>
                  <Input
                    placeholder="Kill Points"
                    id="kpAfter"
                    name="kpAfter"
                    onChange={formik.handleChange}
                    value={formik.values.kpAfter}
                  />
                  {formik.touched.kpAfter && formik.errors.kpAfter ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.kpAfter}
                    </Text>
                  ) : null}
                </FormControl>
              </Flex>

              <Flex gap={4} mt={2}>
                <FormControl>
                  <FormLabel>T1 kill Points</FormLabel>
                  <Input
                    placeholder="T1 kill Points"
                    id="killt1"
                    name="killt1"
                    onChange={formik.handleChange}
                    value={formik.values.killt1}
                  />
                  {formik.touched.killt1 && formik.errors.killt1 ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.killt1}
                    </Text>
                  ) : null}
                </FormControl>

                <FormControl>
                  <FormLabel>T2 Kill Points</FormLabel>
                  <Input
                    placeholder="T2 kill Points"
                    id="killt2"
                    name="killt2"
                    onChange={formik.handleChange}
                    value={formik.values.killt2}
                  />
                  {formik.touched.killt2 && formik.errors.killt2 ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.killt2}
                    </Text>
                  ) : null}
                </FormControl>
              </Flex>

              <Flex gap={4} mt={2}>
                <FormControl>
                  <FormLabel>T3 Kill Points</FormLabel>
                  <Input
                    placeholder="T3 Kill Points"
                    id="killt3"
                    name="killt3"
                    onChange={formik.handleChange}
                    value={formik.values.killt3}
                  />
                  {formik.touched.killt3 && formik.errors.killt3 ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.killt3}
                    </Text>
                  ) : null}
                </FormControl>

                <FormControl>
                  <FormLabel>T4 Kill Points (*2)</FormLabel>
                  <Input
                    placeholder="T4 Kill Points"
                    id="killt4"
                    name="killt4"
                    onChange={formik.handleChange}
                    value={formik.values.killt4}
                  />
                  {formik.touched.killt4 && formik.errors.killt4 ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.killt4}
                    </Text>
                  ) : null}
                </FormControl>
              </Flex>

              <Flex gap={4} mt={2}>
                <FormControl>
                  <FormLabel>T5 Kill Points (*4)</FormLabel>
                  <Input
                    placeholder="T5 Kill Points"
                    id="killt5"
                    name="killt5"
                    onChange={formik.handleChange}
                    value={formik.values.killt5}
                  />
                  {formik.touched.killt5 && formik.errors.killt5 ? (
                    <Text color={"red"} marginTop={2}>
                      {formik.errors.killt5}
                    </Text>
                  ) : null}
                </FormControl>
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

export default DKPModal;
