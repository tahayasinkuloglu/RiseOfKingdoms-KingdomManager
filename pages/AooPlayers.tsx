import { NextPage } from "next";
import SimpleSidebar from "./components/menu";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  Input,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { IFinalPlayer } from "@/utils/types";
import axios from "axios";

interface Props {}

const AooPlayers: NextPage<Props> = () => {
  const router = useRouter();
  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    const { data } = await axios.get("api/player");
    const filteredPlayer = data.player.filter((player: any) => {
      return player.isAoo === true;
    });
    setPlayer(filteredPlayer);
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
        justify={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={10}
      >
        <Flex alignItems={"center"}>
          <Heading width={"lg"}>Aoo Player List</Heading>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            border={"1px"}
          />
        </Flex>
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple">
            <TableCaption>Aoo Player List</TableCaption>
            <Thead>
              <Tr>
                <Th>Governor</Th>
                <Th>Power</Th>
                <Th>Role</Th>
                <Th>Civilization</Th>
                <Th isNumeric>VIP</Th>
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
                      player.vip.toString().includes(searchQuery)
                    );
                  })
                  .map((player, index) => {
                    return (
                      <Tr key={index}>
                        <Td> {player.name} </Td>
                        <Td>{player.power} (m)</Td>
                        <Td> {player.role} </Td>
                        <Td> {player.civilization} </Td>
                        <Td isNumeric> {player.vip} </Td>
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
                <Th>Governor</Th>
                <Th>Power</Th>
                <Th>Role</Th>
                <Th>Civilization</Th>
                <Th isNumeric>VIP</Th>
                <Th>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export default AooPlayers;
