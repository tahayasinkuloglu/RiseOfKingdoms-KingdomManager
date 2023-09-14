import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SimpleSidebar from "./components/menu";

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
import { FiEye } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { IFinalPlayer } from "@/utils/types";

interface Props extends IFinalPlayer {
  password: string;
}

const Settings: NextPage<Props> = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [player, setPlayer] = useState<Props[]>([]);
  const getData = async () => {
    const { data } = await axios.get("api/settings");
    setPlayer(data.player);
    console.log(data.player);
  };

  const [isAscending, setIsAscending] = useState(true);
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
        align={"center"}
        justify={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={"1rem"}
      >
        <Flex flexDirection={"column"} gap={"20px"}>
          <Heading>Settings</Heading>
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
            <TableCaption>Settings</TableCaption>
            <Thead>
              <Tr>
                <Th>Governor ID</Th>
                <Th>
                  <Button onClick={sortByName}>Governor Name</Button>
                </Th>
                <Th>Governor Password</Th>
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
                      player._id.includes(searchQuery)
                    );
                  })
                  .map((player, index) => {
                    return (
                      <Tr key={index}>
                        <Td> {player.governorID} </Td>
                        <Td> {player.name} </Td>
                        <Td> {player.password} </Td>
                        <Td>
                          {" "}
                          <Link
                            href={`/playerdetails/${player._id}`}
                            display={"flex"}
                            justifyContent={"center"}
                            a
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
                <Th>Governor ID</Th>
                <Th>Governor Name</Th>
                <Th>Governor Password</Th>
                <Th>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export default Settings;
