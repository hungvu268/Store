import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useState, useEffect } from "react";
import { getUserRole } from "../utils/auth";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setIsAdmin(getUserRole() === "admin");
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row" }}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          {isLoggedIn && isAdmin && (
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon fontSize={20}></PlusSquareIcon>
              </Button>
            </Link>
          )}
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun />}</Button>
          {isLoggedIn && (
            <Link to="/cart">
              <Button colorScheme="teal" variant="outline">
                Cart
              </Button>
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button colorScheme="blue" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="blue" variant="outline">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <Button colorScheme="red" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
