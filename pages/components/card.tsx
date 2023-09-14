import { IFinalPlayer } from "@/utils/types";
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  const color = useColorModeValue("white", "gray.700");
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      rounded={"lg"}
      background={color}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function BasicStatistics() {
  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const [aooPlayer, setAooPlayer] = useState<IFinalPlayer[]>([]);

  const getData = async () => {
    const { data } = await axios.get("api/player");
    setPlayer(data.player);
    const filteredPlayer = data.player.filter((player: any) => {
      return player.isAoo === true;
    });
    setAooPlayer(filteredPlayer);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box maxW="7xl" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      ></chakra.h1> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Players"} stat={player.length as any} />
        <StatsCard title={"Aoo Players"} stat={aooPlayer.length as any} />
      </SimpleGrid>
    </Box>
  );
}