import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { object, number, string } from "yup";
import { useFormik } from "formik";

interface ILogin {
  userGovernorID: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [errorText, setErrorText] = useState();

  let loginSchema = object({
    userGovernorID: number()
      .required("GovernorID can't be null!")
      .typeError("GovernorID must be number!"),
    password: string().required("Password can't be null!"),
  });

  const formik = useFormik<ILogin>({
    initialValues: {
      userGovernorID: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await axios.post("/api/login", { values }).then((res) => {
        if (res.data.login === true) {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("isAdmin", `${res.data.isAdmin}`);
          router.push("/MainPage");
        } else {
          setErrorText(res.data.error);
        }
      });
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="text">
                <FormLabel>Game ID</FormLabel>
                <Input
                  id="userGovernorID"
                  name="userGovernorID"
                  type="text"
                  placeholder="Your Game ID"
                  onChange={formik.handleChange}
                  value={formik.values.userGovernorID}
                />
                {formik.touched.userGovernorID &&
                formik.errors.userGovernorID ? (
                  <Text color={"red"} marginTop={2}>
                    {formik.errors.userGovernorID}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your Password (Sent it in your message)"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Text color={"red"} marginTop={2}>
                    {formik.errors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"flex-start"}
                >
                  {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                  <Text color={"red"}>{errorText && errorText}</Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
