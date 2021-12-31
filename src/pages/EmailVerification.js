import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Grid, Heading, Stack, } from '@chakra-ui/layout';
import PaymentCard from 'components/Cards/PaymentCard';
import PayWithCard from 'components/Modals/PayWithCard';
import PayWithMomo from 'components/Modals/PayWithMomo';
import useAPI from 'context/apiContext';
import React, { useEffect } from "react"
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import {
    useProfile,
} from "hooks/useGlobalHooks";
import { useToast } from "@chakra-ui/react";


import { Select, Button, Text } from '@chakra-ui/react'
import Logo from 'container/Logo';

const Emailverification = () => {
    const { user } = useProfile();
    const register = localStorage.getItem("register");
    console.log("register", register)
    return (
        <Box>
            <Flex
                alignItems="center"
                justifyContent='center'
                direction="column"
                h="100vh"
                w="100%"
                roundedBottom="none"
            >
                <Logo />

                
                <Text fontSize={{ lg: "lg" }} color="#002060">
                    Welcome {user?.last_name}
                </Text>

                <Button
                    mt="3"
                    loadingText="processing"
                    type="button"
                    title='next'
                    w="19%"
                    bg="#EAE7FD"
                    color="#898989"
                    borderColor="#191191191"
                    _hover={{ bg: "#BEFEF2" }}
                    _active={{ bg: "#100213" }}

                >
                    Next
                </Button>
            </Flex>
        </Box>
    )
}
export default Emailverification;