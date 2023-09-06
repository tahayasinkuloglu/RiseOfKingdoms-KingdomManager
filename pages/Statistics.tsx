import { NextPage } from "next";
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
  Button,
  Input,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { IFinalPlayer } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import DKPModal from "./components/DKPModal";
import moment from "moment";
import { log } from "console";

interface Props {}

const Statistics: NextPage<Props> = () => {
  const router = useRouter();
  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const [DKP, setDKP] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const setModalRender = () => {
    getData();
  };

  const [isAscending, setIsAscending] = useState(true);
  const [isKP, setIsKP] = useState(1);
  const [isKPAfter, setIsKPAfter] = useState(1);
  const [isDP, setIsDP] = useState(1);
  const [isDPAfter, setIsDPAfter] = useState(1);
  const [isDKP, setIsDKP] = useState(1);
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

  const sortByKP = () => {
    const sortedPlayer = [...player];

    sortedPlayer.sort((a: any, b: any) => {
      return (a.kp - b.kp) * isKP;
    });

    setPlayer(sortedPlayer);
    setIsKP(-isKP);
  };

  const sortByKPAfter = () => {
    const sortedPlayer = [...player];

    sortedPlayer.sort((a: any, b: any) => {
      return (a.kpAfter - b.kpAfter) * isKPAfter;
    });

    setPlayer(sortedPlayer);
    setIsKPAfter(-isKPAfter);
  };

  const sortByDP = () => {
    const sortedPlayer = [...player];
    sortedPlayer.sort((a: any, b: any) => {
      return (a.dp - b.dp) * isDP;
    });
    setPlayer(sortedPlayer);
    setIsDP(-isDP);
  };

  const sortByDPAfter = () => {
    const sortedPlayer = [...player];

    sortedPlayer.sort((a: any, b: any) => {
      return (a.dpAfter - b.dpAfter) * isDPAfter;
    });

    setPlayer(sortedPlayer);
    setIsDPAfter(-isDPAfter);
  };

  // const sortByDKP = () => {
  //   const sortedPlayer = [...player];

  //   sortedPlayer.map((a) => {
  //     const dkpA =
  //       parseInt(a.killt4) * 2 +
  //       parseInt(a.killt5) * 4 +
  //       parseInt(a.dp) * 6 -
  //       a.power * 0.2;
  //     const dkpB =
  //       parseInt(a.killt4) * 2 +
  //       parseInt(a.killt5) * 4 +
  //       parseInt(a.dp) * 6 -
  //       a.power * 0.2;

  //     const dkpAA: any = dkpA.toFixed();
  //     const dkpBB: any = dkpB.toFixed();

  //     let finalVal = dkpAA - dkpBB;
  //     let finalVal2 = dkpBB - dkpAA;

  //   });

  //   setPlayer(sortedPlayer);
  //   setIsAscendingu(!isAscendingu);
  // };

  const sortByDKP = () => {
    let arr: any = [];
    player.map((player) => {
      let value = calculateDKP(
        player.killt4,
        player.killt5,
        player.dp,
        player.power
      );
      let intValue = parseInt(value);
      arr.push(intValue);
    });

    let a = arr.sort((a: any, b: any) => {
      return b - a;
    });
    console.log(a);
  };

  const calculateDKP = (t4: string, t5: string, dp: string, power: number) => {
    const DKP =
      parseInt(t4) * 2 + parseInt(t5) * 4 + parseInt(dp) * 6 - power * 0.2;
    const dkpFinal = DKP.toFixed();
    const formattedDKP = parseFloat(dkpFinal).toLocaleString();
    return formattedDKP;
  };

  const getData = async () => {
    const { data } = await axios.get("api/player");
    console.log(data.player);
    setPlayer(data.player);
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
          <Heading width={"lg"}>KvK Player Stats</Heading>
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
            <TableCaption>KvK Player Stats</TableCaption>
            <Thead>
              <Tr>
                {isAdmin === "true" ? <Th>Edit</Th> : null}
                <Th>Governor ID</Th>
                <Th>
                  <Button onClick={sortByName}>Name</Button>
                </Th>
                <Th>
                  <Button onClick={sortByKP}>Kill Points before</Button>
                </Th>
                <Th>
                  <Button onClick={sortByKPAfter}>Kill Points after</Button>
                </Th>
                <Th>
                  <Button onClick={sortByDP}>Death Points before</Button>
                </Th>
                <Th>
                  <Button onClick={sortByDPAfter}>Death Points after</Button>
                </Th>
                <Th>
                  <Button onClick={sortByDKP}>DKP</Button>
                </Th>
                <Th>Last Updated Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {player &&
                player
                  .filter((player) => {
                    return player.name
                      .toLocaleLowerCase()
                      .includes(searchQuery.toLocaleLowerCase());
                  })
                  .map((player, index) => {
                    return (
                      <Tr key={index}>
                        {isAdmin === "true" ? (
                          <Td>
                            <DKPModal
                              player={player}
                              setModalRender={setModalRender}
                            />
                          </Td>
                        ) : null}
                        <Td> {player.governorID} </Td>
                        <Td>{player.name}</Td>
                        <Td> {parseInt(player.kp).toLocaleString()} </Td>
                        <Td> {parseInt(player.kpAfter).toLocaleString()} </Td>
                        <Td> {parseInt(player.dp).toLocaleString()} </Td>
                        <Td> {parseInt(player.dpAfter).toLocaleString()} </Td>
                        <Td>
                          {" "}
                          {calculateDKP(
                            player.killt4,
                            player.killt5,
                            player.dpAfter,
                            player.power
                          )}{" "}
                        </Td>
                        <Td>
                          {" "}
                          {moment(new Date(player.updatedAt)).fromNow()}{" "}
                        </Td>
                      </Tr>
                    );
                  })}
            </Tbody>
            <Tfoot>
              <Tr>
                {isAdmin === "true" ? <Th>Edit</Th> : null}
                <Th>Governor ID</Th>
                <Th>Name</Th>
                <Th>Kill Points before</Th>
                <Th>Kill Points after</Th>
                <Th>Death Points before</Th>
                <Th>Death Points after</Th>
                <Th>DKP</Th>
                <Th>Last Updated Time</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export default Statistics;
