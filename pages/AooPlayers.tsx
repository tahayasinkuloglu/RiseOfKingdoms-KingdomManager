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
  Box,
  Button,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
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

  const [isAscending, setIsAscending] = useState(true);
  const [powerSort, setPowerSort] = useState(1);
  const [vipSort, setVipSort] = useState(1);

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

  return (
    <SimpleSidebar>
      <Flex
        minH={"full"}
        align={"flex-start"}
        justify={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={"1rem"}
      >
        <Flex flexDirection={"column"} gap={"20px"}>
          <Heading>AOO Player List</Heading>
          <Flex align={"center"}>
            <Box position={"absolute"} paddingLeft={"10px"}>
              <BsSearch />
            </Box>
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              paddingLeft={"34px"}
              placeholder="Search.."
              border={"1px"}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple" className="table">
            <TableCaption>Aoo Player List</TableCaption>
            <Thead>
              <Tr>
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
                        <Td> {player.vip} </Td>
                        <Td>
                          {" "}
                          <Link
                            href={`/playerdetails/${player._id}`}
                            display={"flex"}
                            justifyContent={"center"}
                          >
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
