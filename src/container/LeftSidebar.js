import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Text,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import {
  useFetchUserSchools,
  useFetchUserWorks,
  useFollowers,
  useFollowing,
  useOthersProfile,
  useProfile,
} from "hooks/useGlobalHooks";
import { NavLink } from "react-router-dom";
import { QueryClient, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import useAPI from "context/apiContext";
import useComponent from "context/componentContext";
import useFeed from "hooks/useFeeds";
import FollowCard from "components/Cards/FollowCard";


const LeftSidebar = () => {
  const { colorMode } = useColorMode();

  const { location } = useHistory();
  const state = location?.state;
  const queryClient = new QueryClient();
  const { user } = useProfile();
  const { follow, unfollow } = useAPI();
  const { user: others } = useOthersProfile(state?.member?.id);
  const { handleModalClick } = useComponent();
  const { feedsData, page, setPage } = useFeed();

  const newUser = location.pathname === "/profile" ? user : others;

  const { schools } = useFetchUserSchools(newUser?.id);
  const { works } = useFetchUserWorks(newUser?.id);

  const { userFollowing } = useFollowing(newUser?.id);
  const { userFollowers } = useFollowers(newUser?.id);


  return (
    <Flex
      as="aside"
      float="left"
      pos="fixed"
      bottom={0}
      top={0}
      h={{ lg: "100vh" }}
      // zIndex={20}
      boxShadow="sm"
      w="18%"
      bg="#fbfbfb"
      left="5%"
      overflow="hidden"

      rounded="none"
      _hover={{
        // textDecor: "none",
        // bg: colorMode === "dark" ? "gray.700" : "gray.200",
        overflow:"scroll"
      }}
      


    >

      <Flex direction="column" justify="space-between" pb={4}>
        <Box mt={3}>
          <Link
            as={NavLink}
            _hover={{ textDecor: "none" }}
            _focus={{ textDecor: "none" }}
            to="/profile"
          >

            <Flex
              align="center"
              justify="center"
              direction="column"
              // pos="relative"
              bg={colorMode === "dark" ? "black" : "whiteAlpha.100"}
              rounded="xl"
              overflow="hidden"
              filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
            >
              {/* <Flex align='center' justify='center' direction="column" top={2}> */}
              <Avatar
                w="110px"
                h="110px"
                size="lg"
                bw={2}
                src={user?.profile_picture}
                borderWidth={2}
                borderColor="gray.400"
              />

              {/* </Flex> */}


              {/* <Box h={24} w="100%">
                <Image
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  src={user?.background_picture}
                />
              </Box> */}

              <Box pl={4} textAlign="center"  >
                <Text fontSize={{ md: "md" }}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Box mt={-1}>
                  <Text
                    as="span"
                    fontSize="sm"
                    color={colorMode === "dark" ? "gray.400" : "gray.400"}
                  >
                    {user?.occupation}

                  </Text>

                </Box>
                <HStack spacing="24px" mt={6} >

                  <Text
                    as="span"
                    fontSize="sm"
                    color={colorMode === "dark" ? "gray.400" : "gray.400"}
                  >
                    following
                    <br />
                    {`${user?.following_count}`}

                  </Text>

                  <Text
                    as="span"
                    fontSize="sm"
                    color={colorMode === "dark" ? "gray.400" : "gray.400"}
                  >
                    followers
                    <br />
                    {`${user?.followers_count}`}

                  </Text>
                  <Text
                  direction="row"
                    as="span"
                    fontSize="sm"
                    color={colorMode === "dark" ? "gray.400" : "gray.400"}
                  >
                    post
                    <br/>
                    {user?.posts_count}
                  </Text>


                </HStack>
              </Box>

            </Flex>
          </Link>





          <Box
            p={2}
            mt={6}
            bg={colorMode === "dark" ? "black" : "gray.50"}
            rounded="xl"
            overflow="hidden"
            filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
          >
            <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={1}>
              <Image
                src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                rounded="sm"
              />
              <Image
                src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                rounded="sm"
              />
              <Image
                src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                rounded="sm"
              />
              <Image
                src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                rounded="sm"
              />
            </Grid>
          </Box>

          <Box mt={6}>
            {/* <Link
              as={NavLink}
              to="/"
              d="block"
              py={{ md: 2 }}
              fontSize={{ md: "md" }}
              _hover={{
                textDecor: "none",
                bg: colorMode === "dark" ? "gray.700" : "gray.200",
                rounded: "30px",
                transition: "background-color .3s ease-in-out",
              }}
              px={4}
            >
              <Icon as={CgFeed} boxSize={6} mr={3} /> Feeds
            </Link>
            <Link
              as={NavLink}
              to="/jobs"
              d="block"
              py={{ md: 2 }}
              fontSize={{ md: "md" }}
              
            >
              <Icon as={GiSuitcase} boxSize={6} mr={3} />
              Jobs
            </Link> */}
            {/* <Link
              as={NavLink}
              to="/contribution"
              d="block"
              py={{ md: 2 }}
              fontSize={{ md: "md" }}
              _hover={{
                textDecor: "none",
                bg: colorMode === "dark" ? "gray.700" : "gray.200",
                rounded: "30px",
                transition: "background-color .3s ease-in-out",
              }}
              px={4}
            >
              <Text> <Icon as={GiReceiveMoney} boxSize={6} mr={3} /> Contribution </Text>
            </Link> */}
            {/* <Link
              as={NavLink}
              to="/my-ideas"
              d="block"
              py={{ md: 2 }}
              fontSize={{ md: "md" }}
              _hover={{
                textDecor: "none",
                bg: colorMode === "dark" ? "gray.700" : "gray.200",
                rounded: "30px",
                transition: "background-color .3s ease-in-out",
              }}
              px={4}
            >
              <Icon as={IoIosBulb} boxSize={6} mr={3} />
              My Ideas
            </Link> */}
            
            
          </Box>
        </Box>

        
      </Flex>
    </Flex>
  );
};

export default LeftSidebar;
