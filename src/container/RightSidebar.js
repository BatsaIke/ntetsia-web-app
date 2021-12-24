import React from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import FollowCard from "components/Cards/FollowCard";
import { usePeople } from "hooks/useGlobalHooks";

const RightSidebar = () => {
  const { colorMode } = useColorMode();
  const { people, isLoading } = usePeople();

  return (
    <Flex
      as="aside"
      pos="fixed"
      bottom={0}
      // right={}
      
      h={{ lg: "100vh" }}
      right={5}
      // zIndex={20}
      bg="##f9f9f9"
      pt={10}
      pb={5}
      boxShadow="sm"
      w="25%"
     overflowX="hidden"
     overscrollBehaviorX="none"

      rounded="none"
      _hover={{
        // textDecor: "none",
        // bg: colorMode === "dark" ? "gray.700" : "gray.200",
        overflow:"scroll"
      }}
    >
      <Flex direction="column">
        <Box
          bg={colorMode === "dark" ? "gray.700" : "gray.100"}
          p={6}
          w={85}
          rounded="md"
          shadow="sm"
        >
          <Heading as="h5" size="md">
            Advertisement Board
          </Heading>

          <Text mt={4}>
            Have a product to advertise? Contact Ntetsia today to show your
            products to our members.
          </Text>
        </Box>

        <Box
          bg={colorMode === "dark" ? "whiteAlpha.100" : "whiteAlpha.100"}
          p={6}
          w={85}
          rounded="md"
          mt={8}
          shadow="sm"
        >
          <Heading as="h5" size="md">
            Follow members
          </Heading>

          <Divider orientation="horizontal" my={3} />

          {isLoading ? (
            <Grid gap={4}>
              <Skeleton height="60px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
            </Grid>
          ) : (
            people
              ?.slice(0, 5)
              .map(
                (person) =>
                  person.is_following === false && (
                    <FollowCard key={person.id} data={person} />
                  )
              )
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default RightSidebar;
