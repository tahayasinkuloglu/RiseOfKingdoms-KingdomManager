import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SimpleSidebar from "./components/menu";
import swal from "sweetalert";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  useColorModeValue,
  Heading,
  Link,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { FiEye, FiTrash } from "react-icons/fi";
import axios from "axios";
import { IFinalPlayer } from "@/utils/types";
import PlayerForm from "./components/playerForm";

interface Props {}

const Players: NextPage<Props> = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const setModalRender = () => {
    getData();
  };

  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const getData = async () => {
    const { data } = await axios.get("api/player");
    setPlayer(data.player);
  };

  const [isAscending, setIsAscending] = useState(true);
  const [powerSort, setPowerSort] = useState(1);
  const [vipSort, setVipSort] = useState(1);
  const [isAdmin, setIsAdmin] = useState("false");

  const sortByName = () => {
    const sortedPlayer = [...player];
    sortedPlayer.sort((a, z) => {
      if (isAscending) {
        return a.name.localeCompare(z.name);
      } else {
        return z.name.localeCompare(a.name);
      }
    });
    setPlayer(sortedPlayer);
    setIsAscending(!isAscending);
  };

  const sortByPower = () => {
    const sortedPlayer = [...player];
    sortedPlayer.sort((a, b) => {
      return (a.power - b.power) * powerSort;
    });
    setPlayer(sortedPlayer);
    setPowerSort(-powerSort);
  };

  const sortByVIP = () => {
    const sortedPlayer = [...player];
    sortedPlayer.sort((a, b) => {
      return (a.vip - b.vip) * vipSort;
    });
    setPlayer(sortedPlayer);
    setVipSort(-vipSort);
  };

  const handleDelete = async (playerid: string) => {
    swal({
      title: "Delete Player",
      text: "This process is irreversible.",
      icon: "warning",
      dangerMode: true,
      buttons: {
        confirm: "Delete",
        cancel: "Cancel",
      } as any,
    }).then(async (isDelete) => {
      if (isDelete) {
        await axios.delete(`/api/player/${playerid}`).then((res) => {
          getData();
        });
      }
    });
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const admin = localStorage.getItem("isAdmin");

    if (isLogin === "false") {
      router.push("/");
    }
    if (admin === "true") {
      setIsAdmin(admin);
    }
    getData();
  }, []);

  return (
    <SimpleSidebar>
      <Flex
        minH={"full"}
        align={"flex-start"}
        justify={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={10}
      >
        <Flex alignItems={"center"}>
          <Heading width={"2xl"}>Kingdom Player List</Heading>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            border={"1px"}
          />
        </Flex>
        <PlayerForm setModalRender={setModalRender} />
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple">
            <TableCaption>Kingdom Player List</TableCaption>
            <Thead>
              <Tr>
                {isAdmin === "true" ? <Th>Edit Player</Th> : null}
                <Th>
                  <Button onClick={sortByName}>Governor</Button>
                </Th>
                <Th>
                  <Button onClick={sortByPower}>Power</Button>
                </Th>
                <Th>Role</Th>
                <Th>Civilization</Th>
                <Th>
                  <Button onClick={sortByVIP}>VIP</Button>
                </Th>
                {isAdmin === "true" ? <Th>Delete Player</Th> : null}
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {player &&
                player
                  .filter((player) => {
                    return (
                      player.name
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()) ||
                      player._id.includes(searchQuery) ||
                      player.vip.toString().includes(searchQuery) ||
                      player.power.toString().includes(searchQuery)
                    );
                  })
                  .map((player, index) => {
                    return (
                      <Tr key={index}>
                        {isAdmin === "true" ? (
                          <Td>
                            <PlayerForm
                              mode={true}
                              player={player}
                              setModalRender={setModalRender}
                            />
                          </Td>
                        ) : null}
                        <Td> {player.name} </Td>
                        <Td> {player.power.toLocaleString()} </Td>
                        <Td> {player.role} </Td>
                        <Td> {player.civilization} </Td>
                        <Td> {player.vip} </Td>
                        {isAdmin === "true" ? (
                          <Td>
                            <Box cursor={"pointer"} width={"max-content"}>
                              <Button onClick={() => handleDelete(player._id)}>
                                <FiTrash />
                              </Button>
                            </Box>
                          </Td>
                        ) : null}
                        <Td>
                          {" "}
                          <Link href={`/playerdetails/${player._id}`}>
                            {" "}
                            <FiEye />{" "}
                          </Link>{" "}
                        </Td>
                      </Tr>
                    );
                  })}
            </Tbody>
            <Tfoot>
              <Tr>
                {isAdmin === "true" ? <Th>Edit Player</Th> : null}
                <Th>Governor</Th>
                <Th>Power</Th>
                <Th>Role</Th>
                <Th>Civilization</Th>
                <Th>VIP</Th>
                {isAdmin === "true" ? <Th>Delete Player</Th> : null}
                <Th>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export default Players;
