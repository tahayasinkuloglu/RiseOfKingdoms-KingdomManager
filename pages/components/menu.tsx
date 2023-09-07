import React, { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiLogOut,
  FiStar,
  FiSettings,
  FiMenu,
  FiUser,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { AiOutlineTeam, AiFillGithub } from "react-icons/ai";
import { GiCrossedSwords } from "react-icons/gi";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: IconType;
}

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  const handleClick = (link: any) => {
    if (link.name === "LogOut") {
      localStorage.setItem("isLogin", "false");
      router.push("/");
    }
    router.push(link.path);
  };

  const [link, setLink] = useState<Array<LinkItemProps>>();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");

    if (admin == "true") {
      const LinkItems: Array<LinkItemProps> = [
        { name: "Home", icon: FiHome, path: "/MainPage" },
        { name: "Players", icon: FiUser, path: "/Players" },
        { name: "Aoo Players", icon: FiUser, path: "/AooPlayers" },
        { name: "Teams", icon: AiOutlineTeam, path: "/Teams" },
        { name: "DKP Statistics", icon: FiTrendingUp, path: "/Statistics" },
        { name: "Kvk Rally/Garrison", icon: GiCrossedSwords, path: "/Kvk" },
        { name: "Settings", icon: FiSettings, path: "/Settings" },
        { name: "LogOut", icon: FiLogOut, path: "/" },
      ];
      setLink(LinkItems);
    } else {
      const LinkItems: Array<LinkItemProps> = [
        { name: "Home", icon: FiHome, path: "/MainPage" },
        { name: "Players", icon: FiUser, path: "/Players" },
        { name: "Aoo Players", icon: FiUser, path: "/AooPlayers" },
        { name: "Teams", icon: AiOutlineTeam, path: "/Teams" },
        { name: "DKP Statistics", icon: FiTrendingUp, path: "/Statistics" },
        { name: "Kvk Rally/Garrison", icon: GiCrossedSwords, path: "/Kvk" },
        { name: "LogOut", icon: FiLogOut, path: "/" },
      ];
      setLink(LinkItems);
    }
  }, []);

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          KD 3167
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {link &&
        link.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={() => handleClick(link as any)}
          >
            {link.name}
          </NavItem>
        ))}
      <Box
        borderTop="1px"
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
        py="4"
        px="6"
      >
        <Link href="https://github.com/Onurlulardan" isExternal>
          Contact the developer <ExternalLinkIcon mx="2px" />
        </Link>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        KD 3167
      </Text>
    </Flex>
  );
};
