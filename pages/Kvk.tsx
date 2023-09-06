import { NextPage } from "next";
import SimpleSidebar from "./components/menu";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IFinalPlayer } from "@/utils/types";
import axios from "axios";
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

interface Props {}

const Kvk: NextPage<Props> = () => {
  const router = useRouter();
  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const [activePlayer, setActivePlayer] = useState<IFinalPlayer[]>([]);
  const [currentUTCHour, setCurrentUTCHour] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    const { data } = await axios.get("api/player");
    const filteredPlayer = data.player.filter((player: IFinalPlayer) => {
      return (
        (player.role === "Garrison" && player.isAoo === true) ||
        (player.role === "Rally" && player.isAoo === true)
      );
    });
    const activePlayers = filteredPlayer.filter(isUserActiveAtCurrentTime);
    setActivePlayer(activePlayers);
    setPlayer(filteredPlayer);
  };

  const calculateFullUTC = () => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const utcMinute = now.getUTCMinutes();
    const formattedUTCHour = String(utcHour).padStart(2, "0");
    const formattedUTCMinute = String(utcMinute).padStart(2, "0");

    return `${formattedUTCHour}:${formattedUTCMinute}`;
  };

  const getCurrentHoursInUTC = () => {
    const now = new Date();
    return now.getUTCHours();
  };

  const isUserActiveAtCurrentTime = (user: IFinalPlayer) => {
    if (!user.timezone) {
      return true;
    }

    const currentHour = getCurrentHoursInUTC();
    const timezones = user.timezone.split(" | ");
    const startUTC = parseInt(timezones[0].replace("UTC ", ""));
    const endUTC = parseInt(timezones[1].replace("UTC ", ""));

    if (startUTC < endUTC) {
      return currentHour >= startUTC && currentHour < endUTC;
    } else {
      return currentHour >= startUTC || currentHour < endUTC;
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "false") {
      router.push("/");
    }
    getData();
    setCurrentUTCHour(calculateFullUTC());
    const intervalId = setInterval(() => {
      setCurrentUTCHour(calculateFullUTC());
    }, 60000);

    return () => clearInterval(intervalId);
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
          <Heading width={"4xl"}>Players who can fight now </Heading>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            border={"1px"}
          />
        </Flex>

        <Heading>Current UTC Time: {currentUTCHour} </Heading>
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple">
            <TableCaption>Online Player List</TableCaption>
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
              {activePlayer &&
                activePlayer
                  .filter((activePlayer) => {
                    return activePlayer.name
                      .toLocaleLowerCase()
                      .includes(searchQuery.toLocaleLowerCase());
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
      <Flex alignItems={"center"}>
        <Heading my={4} width={"xl"}>
          KvK Rally and Garrison List
        </Heading>
        <Input
          width={"xl"}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search"
          border={"1px"}
        />
      </Flex>

      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple">
            <TableCaption>Rally & Garrison Player List</TableCaption>
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
                    return player.name
                      .toLocaleLowerCase()
                      .includes(searchQuery.toLocaleLowerCase());
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

export default Kvk;
