import { NextPage } from "next";
import React, { useEffect, useState } from "react";
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
import { FiTrash } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { ITeams, IFinalPlayer } from "@/utils/types";
import TeamModal from "./components/TeamModal";
import swal from "sweetalert";

interface Props {}

const Teams: NextPage<Props> = () => {
  const router = useRouter();
  const [team, setTeam] = useState<ITeams[]>([]);
  const [isTeamSort, setIsTeamSort] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");

  const setModalRender = () => {
    getData();
  };

  const sortByTeamName = () => {
    const sortTeam = [...team];
    sortTeam.sort((a, z) => {
      if (isTeamSort) {
        return a.name.localeCompare(z.name);
      } else {
        return z.name.localeCompare(a.name);
      }
    });
    setTeam(sortTeam);
    setIsTeamSort(!isTeamSort);
  };

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const handleDelete = async (teamid: string) => {
    swal({
      title: "Are you sure you want to delete the Team?",
      text: "",
      icon: "warning",
      dangerMode: true,
      buttons: {
        confirm: "Delete",
        cancel: "Cancel",
      } as any,
    }).then(async (isDelete) => {
      if (isDelete) {
        await axios.delete(`/api/teams/${teamid}`).then((res) => {
          triggerSwal("Team successfully deleted!", "", "success");
          getData();
        });
      }
    });
  };

  const getData = async () => {
    axios.get("/api/teams").then((res) => {
      setTeam(res.data.team);
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
        align={"center"}
        justify={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={"1rem"}
      >
        <Flex flexDirection={"column"} gap={"20px"}>
          <Heading>AOO Team List</Heading>
          <Flex align={"center"}>
            <Box position={"absolute"} paddingLeft={"10px"} color={"black"}>
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

        <TeamModal setModalRender={setModalRender} />
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple" className="table">
            <TableCaption>Aoo Team List</TableCaption>
            <Thead>
              <Tr>
                {isAdmin === "true" ? <Th>Edit Team</Th> : null}
                <Th>
                  <Button onClick={sortByTeamName}>Team Name</Button>
                </Th>
                <Th>Player Count</Th>
                {isAdmin === "true" ? <Th>Delete Team</Th> : null}
              </Tr>
            </Thead>
            <Tbody>
              {team &&
                team
                  .filter((team) => {
                    return team.name
                      .toLocaleLowerCase()
                      .includes(searchQuery.toLocaleLowerCase());
                  })
                  .map((team) => {
                    return (
                      <Tr key={team._id}>
                        {isAdmin === "true" ? (
                          <Td display={"flex"} justifyContent={"center"}>
                            <TeamModal
                              mode={true}
                              team={team}
                              setModalRender={setModalRender}
                            />
                          </Td>
                        ) : null}
                        <Td> {team.name} </Td>
                        <Td>{team.players.length}</Td>
                        {isAdmin === "true" ? (
                          <Td display={"flex"} justifyContent={"center"}>
                            <Box cursor={"pointer"} width={"max-content"}>
                              <Button
                                onClick={() => handleDelete(team._id as any)}
                              >
                                <FiTrash />
                              </Button>
                            </Box>
                          </Td>
                        ) : null}
                      </Tr>
                    );
                  })}
            </Tbody>
            <Tfoot>
              <Tr>
                {isAdmin === "true" ? <Th>Edit Team</Th> : null}
                <Th>Team Name</Th>
                <Th>Player Count</Th>
                {isAdmin === "true" ? <Th>Delete Team</Th> : null}
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </SimpleSidebar>
  );
};

export default Teams;
