import { GetServerSidePropsContext, NextPage } from "next";
import SimpleSidebar from "../components/menu";
import { useRouter } from "next/router";
import {
  Flex,
  Heading,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { IFinalPlayer } from "@/utils/types";
import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import EqForm from "../components/EqForm";
import swal from "sweetalert";

interface Props {
  playerid: string;
}

const PlayerDetails: NextPage<Props> = ({ playerid }) => {
  const router = useRouter();
  const [player, setPlayer] = useState<IFinalPlayer>();
  const [playerMarches, setPlayerMarches] = useState<any>([]);

  const setModalRender = () => {
    getData();
  };

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const handleDelete = async (marchid: string) => {
    if (marchid) {
      swal({
        title: "Are you sure you want to delete the March?",
        text: "",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Delete",
          cancel: "Cancel",
        } as any,
      }).then(async (isDelete) => {
        if (isDelete) {
          await axios
            .delete(`/api/marches/${playerid}`, { data: marchid })
            .then(() => {
              triggerSwal("March successfully deleted!", "", "success");
              getData();
            });
        }
      });
    }
  };

  const getData = async () => {
    await axios
      .get(`/api/player/${playerid}`)
      .then((res) => {
        setPlayer(res.data.player);
      })
      .catch((err) => console.log("--", err));

    await axios
      .get(`/api/marches/${playerid}`)
      .then((res) => {
        setPlayerMarches(res.data.marches);
      })
      .catch((err) => console.log("--", err));
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "false") {
      router.push("/");
    }
    getData();
  }, []);

  return (
    <SimpleSidebar>
      <Flex
        minH={"full"}
        align={"flex-start"}
        justify={"space-between"}
        marginBottom={10}
      >
        <Heading>Governor: {player?.name} </Heading>
        <EqForm playerid={playerid} setModalRender={setModalRender}></EqForm>
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple">
            <TableCaption>Player March List</TableCaption>
            <Thead>
              <Tr>
                <Th>Edit March</Th>
                <Th>March Number</Th>
                <Th>March Type</Th>
                <Th>Primary Commander</Th>
                <Th>Secondary Commander</Th>
                <Th>Delete March</Th>
              </Tr>
            </Thead>
            <Tbody>
              {playerMarches && playerMarches && playerMarches.length > 0 ? (
                playerMarches.map((march: any, index: any) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <EqForm
                          mode={true}
                          march={march}
                          setModalRender={setModalRender}
                        />
                      </Td>
                      <Td> {index + 1} </Td>
                      <Td> {march.marchType} </Td>
                      <Td> {march.firstCommander} </Td>
                      <Td> {march.secondCommander} </Td>

                      <Td>
                        <Button
                          width={"max-content"}
                          onClick={() => handleDelete(march._id as any)}
                        >
                          <Box cursor={"pointer"}>
                            <FiTrash />
                          </Box>
                        </Button>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={6}>No marches available.</Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Edit March</Th>
                <Th>March Number</Th>
                <Th>March Type</Th>
                <Th>Primary Commander</Th>
                <Th>Secondary Commander</Th>
                <Th>Delete March</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const playerid = context?.params?.id;
  // const res = await axios.get(`${process.env.API_URL}/api/player/${id}`);
  // const player = res.data.player;

  return { props: { playerid } };
}

export default PlayerDetails;
