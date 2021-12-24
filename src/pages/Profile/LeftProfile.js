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

import { QueryClient, } from "react-query";
import { useHistory } from "react-router-dom";
import useAPI from "context/apiContext";
import useComponent from "context/componentContext";
import useFeed from "hooks/useFeeds";
import Type from "components/Form/Type";
import { CgFeed, CgProfile } from "react-icons/cg";
import { AiFillPicture } from "react-icons/ai";



const LeftProfile = () => {
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
            w="20%"
            bg="#fbfbfb"
            left="5%"
            overflow="-moz-hidden-unscrollable"

            rounded="none"
            _hover={{
                // textDecor: "none",
                // bg: colorMode === "dark" ? "gray.700" : "gray.200",
                overflow: "scroll"
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

                        <Flex shadow="sm"
                            align="center"
                            justify="center"
                            direction="column"
                            bg={colorMode === "dark" ? "black" : "whiteAlpha.100"}
                            rounded="none"
                            overflow="hidden"
                            filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
                        >

                            <Image
                                h="100%"
                                w="100%"
                                objectFit="cover"
                                src={user?.background_picture}
                            />

                            <Flex position="absolute"
                                align='center'
                                justify='center' top="158px" >


                                <Avatar

                                    size="md"
                                    bw={2}
                                    src={user?.profile_picture}
                                    borderWidth={4}
                                    borderColor="white"

                                />
                                <Box>
                                    <Text fontSize={{ lg: "lg" }} color="#002060">
                                        {user?.first_name} {user?.last_name}
                                    </Text>
                                    <Text fontSize="12px" top="28px" position="absolute">
                                        {user?.occupation}</Text>

                                </Box>

                            </Flex>





                            <Box pl={4} textAlign="center"  >


                                <HStack spacing="44px" mt={20} marginBottom={10} >

                                    <Text flexDirection="column"
                                        as="span"
                                        fontSize="sm"
                                        color={colorMode === "dark" ? "gray.400" : "gray.400"}
                                        
                                    >
                                        following
                                        <br/>
                                      
                                        {`${user?.following_count} `}

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
                                        <br />
                                        {user?.posts_count}
                                    </Text>


                                </HStack >
                                <Type width="30" h="8" marginBottom="5">New Ideas</Type>
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
                        <Box><Icon as={AiFillPicture } boxSize={8}  color='black'  ><Text black>Gallery</Text> </Icon></Box>
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

                    
                </Box>


            </Flex>
        </Flex>
    );
};

export default LeftProfile;
