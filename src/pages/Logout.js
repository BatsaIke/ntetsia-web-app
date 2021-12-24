import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Link as ReachRouter } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Button from "../components/Button";
import useAuth from "../context/userContext";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <Flex align="center" justify="center" h="100vh" w="100%">
      <Flex
        align="center"
        justify="center"
        bg="black"
        color="white"
        w={85}
        h={85}
        rounded="lg"
        direction="column"
        p={10}
        textAlign="center"
      >
        <Image src={require("../assets/images/logo.png").default} />
        <Box mt={6}>
          <Heading as="h4" fontWeight={900} fontSize="2xl">
            Logging out of Ntetsia?
          </Heading>
          <Box mt={2}>
            <Text fontSize="sm" color="gray.300">
              You can always log back in at any time. If you just want to switch
              accounts, you can do that by adding an existing account.{" "}
            </Text>
          </Box>

          <Flex align="center" justify="space-between" mt={6}>
            <Link as={ReachRouter} to="/home">
              <Button
                title="Cancel"
                rounded="30px"
                px={8}
                h={12}
                bg="gray.600"
                color="white"
                _hover={{ bg: "gray.700" }}
                _active={{ bg: "gray.700" }}
              />
            </Link>
            <Button
              title="Log out"
              rounded="30px"
              px={10}
              h={12}
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.700" }}
              _active={{ bg: "blue.700" }}
              onClick={logout}
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Logout;
