import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SimpleSidebar from "./components/menu";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

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
  background,
} from "@chakra-ui/react";
import { FiEye, FiTrash } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { IFinalPlayer } from "@/utils/types";
import PlayerForm from "./components/playerForm";

interface Props {}

const Players: NextPage<Props> = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const setModalRender = () => {
    getData();
  };

  const [player, setPlayer] = useState<IFinalPlayer[]>([]);
  const getData = async () => {
    const { data } = await axios.get("api/player");
    setPlayer(data.player);
  };

  const [isAscending, setIsAscending] = useState(true);
  const [powerSort, setPowerSort] = useState(1);
  const [vipSort, setVipSort] = useState(1);
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

  const triggerSwal = async (title: string, text: string, status: string) => {
    swal(title, text, status);
  };

  const handleDelete = async (playerid: string) => {
    swal({
      title: "Are you sure you want to delete the Player?",
      text: "",
      icon: "warning",
      dangerMode: true,
      buttons: {
        confirm: "Delete",
        cancel: "Cancel",
      } as any,
    }).then(async (isDelete) => {
      if (isDelete) {
        await axios.delete(`/api/player/${playerid}`).then((res) => {
          triggerSwal("Player successfully deleted!", "", "success");
          getData();
        });
      }
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

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = player.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(player.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % player.length;
    setItemOffset(newOffset);
  };

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
          <Heading>Kingdom Player List</Heading>
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

        <PlayerForm setModalRender={setModalRender} />
      </Flex>
      <Flex mx={"auto"} w={"full"} justify={"center"} align={"center"}>
        <TableContainer w={"full"} bg={useColorModeValue("white", "gray.700")}>
          <Table variant="simple" className="table">
            <TableCaption>Kingdom Player List</TableCaption>
            <Thead>
              <Tr>
                {isAdmin === "true" ? <Th>Edit Player</Th> : null}
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
                {isAdmin === "true" ? <Th>Delete Player</Th> : null}
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems &&
                currentItems
                  .filter((player) => {
                    return (
                      player.name
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()) ||
                      player._id.includes(searchQuery) ||
                      player.vip.toString().includes(searchQuery) ||
                      player.power.toString().includes(searchQuery)
                    );
                  })
                  .map((player) => {
                    return (
                      <Tr key={player._id}>
                        {isAdmin === "true" ? (
                          <Td display={"flex"} justifyContent={"center"}>
                            <PlayerForm
                              mode={true}
                              player={player}
                              setModalRender={setModalRender}
                            />
                          </Td>
                        ) : null}
                        <Td> {player.name} </Td>
                        <Td> {player.power.toLocaleString()} </Td>
                        <Td> {player.role} </Td>
                        <Td> {player.civilization} </Td>
                        <Td> {player.vip} </Td>
                        {isAdmin === "true" ? (
                          <Td display={"flex"} justifyContent={"center"}>
                            <Box cursor={"pointer"} width={"max-content"}>
                              <Button onClick={() => handleDelete(player._id)}>
                                <FiTrash />
                              </Button>
                            </Box>
                          </Td>
                        ) : null}
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
                {isAdmin === "true" ? <Th>Edit Player</Th> : null}
                <Th>Governor</Th>
                <Th>Power</Th>
                <Th>Role</Th>
                <Th>Civilization</Th>
                <Th>VIP</Th>
                {isAdmin === "true" ? <Th>Delete Player</Th> : null}
                <Th>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      <Flex justifyContent={"center"} mt={"16px"}>
        <ReactPaginate
          className="test"
          breakLabel="..."
          nextLabel={<IoIosArrowForward size={30} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel={<IoIosArrowBack size={30} />}
          renderOnZeroPageCount={null}
        />
      </Flex>
    </SimpleSidebar>
  );
};

export default Players;
