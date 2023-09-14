import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Stack, Flex, Heading, Card, CardBody, Text } from "@chakra-ui/react";
import SimpleSidebar from "./components/menu";
import BasicStatistics from "./components/card";

interface Props {}

const MainPage: NextPage<Props> = () => {
  const [currentUTCHour, setCurrentUTCHour] = useState("");

  const calculateFullUTC = () => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const utcMinute = now.getUTCMinutes();
    const formattedUTCHour = String(utcHour).padStart(2, "0");
    const formattedUTCMinute = String(utcMinute).padStart(2, "0");

    return `${formattedUTCHour}:${formattedUTCMinute}`;
  };

  const router = useRouter();
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "false") {
      router.push("/");
    }

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
        flexWrap={"wrap"}
        gap={"10px"}
        marginBottom={10}
      >
        <Heading>Kingdom: 3167</Heading>
        <Heading>Current UTC Time: {currentUTCHour} </Heading>
      </Flex>
      <BasicStatistics />
      <Heading
        textAlign={"start"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        mx={5}
        my={10}
      >
        Announcements
      </Heading>
      <Flex w={"100%"} mx={5} my={10}>
        <Card shadow={"xl"}>
          <CardBody>
            <Text fontWeight={"medium"}>Please dont forget to use it</Text>
            <Text py={3} fontWeight={"medium"}>
              50% troop capacity and 10% defense
            </Text>
            <Text fontWeight={"medium"}>
              Be in Discord Voice Chat 10 minutes before the battle!
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </SimpleSidebar>
  );
};

export default MainPage;