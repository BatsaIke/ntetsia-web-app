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
    Stack,
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



const DashBoardRight = () => {
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
            float="right"
            pos="fixed"
            bottom={0}
            top={0}
            h={{ lg: "100vh" }}
            // zIndex={20}
            boxShadow="sm"
            w="12%"
            bg="#fbfbfb"
            right="0%"
            overflow="-moz-hidden-unscrollable"
            bg="#002060"
            rounded="none"
            align="center"
            justify="center"
            direction="column"
        // _hover={{
        //     // textDecor: "none",
        //     // bg: colorMode === "dark" ? "gray.700" : "gray.200",
        //     overflow: "scroll"
        // }}



        >



            <Link
                as={NavLink}
                _hover={{ textDecor: "none" }}
                _focus={{ textDecor: "none" }}
                to="/profile"
            >



                <Flex
                    direction="column"
                    align='center'
                    justify='center'
                // top="158px"
                >


                    <Avatar

                        size="lg"
                        bw={2}
                        src={user?.profile_picture}
                        borderWidth={4}
                        borderColor="white"

                    />
                    <Box>
                        <Text fontSize={{ lg: "lg" }} color="white">
                            {user?.first_name} {user?.last_name}
                        </Text>
                        <Text fontSize="12px" top="28px" color="#ffffff" textAlign="center">
                            {user?.occupation}</Text>

                    </Box>


                </Flex>
            </Link>







            <Box pl={4} textAlign="center"  >


                <Stack spacing="44px" mt={20} marginBottom={10} direction="column">

                    <Text flexDirection="column"
                        as="span"
                        fontSize="lg"
                        color="#ffffff"
                    >
                        Project
                        <br />

                        {`${user?.following_count} `}

                    </Text>

                    <Text
                        as="span"
                        fontSize="lg"
                        color="#ffffff"
                    >
                        Ideas
                        <br />
                        {`${user?.followers_count}`}

                    </Text>
                    <Text
                        direction="row"
                        as="span"
                        fontSize="lg"
                        color="#ffffff"
                    >
                        Referals
                        <br />
                        {user?.posts_count}
                    </Text>


                </Stack >
                <Type width="30" h="8" marginBottom="5">New Ideas</Type>
            </Box>

            <Box
                p={2}
                mt={6}
                bg={colorMode === "dark" ? "black" : "gray.50"}
                rounded="xl"
                overflow="hidden"
                filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
            >
                <Box><Icon as={AiFillPicture} boxSize={8} color='black'  ><Text black>Gallery</Text> </Icon></Box>

            </Box>






        </Flex>
    );
};

export default DashBoardRight;
