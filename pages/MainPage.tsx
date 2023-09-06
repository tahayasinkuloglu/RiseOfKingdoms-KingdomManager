import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Stack, Flex, Heading } from "@chakra-ui/react";
import SimpleSidebar from "./components/menu";

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
        marginBottom={10}
      >
        <Heading>Kingdom: 3167</Heading>
        <Heading>Current UTC Time: {currentUTCHour} </Heading>
      </Flex>
      <Flex></Flex>
    </SimpleSidebar>
  );
};

export default MainPage;
