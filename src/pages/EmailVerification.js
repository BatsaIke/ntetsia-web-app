import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Grid, Heading, Stack, } from '@chakra-ui/layout';
import {
    Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Link,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from 'components/Form/FormInput';
import useAPI from 'context/apiContext';
import React, { useEffect } from "react"
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import {
    useProfile,
} from "hooks/useGlobalHooks";
import { emailVerificationSchema } from 'utils/validation';
import { useToast } from "@chakra-ui/react";


import { Select, Button, Text } from '@chakra-ui/react'
import Logo from 'container/Logo';
import { NavLink } from "react-router-dom";


const Emailverification = () => {
    const { user } = useProfile();
    const { getEmailVirificaton, verifyEmail } = useAPI();
    const [loading, setLoading] = React.useState(false);
    const [invoice, setInvoince] = React.useState({});
    const [isOpen, setIsOpen] = React.useState(true);
    const toast = useToast();
    const [sms, setSMS] = React.useState("")


    async function getEmail() {
        try {
            let data = await getEmailVirificaton()
            setLoading(true)
            // localStorage.setItem("token-momo" ,data.token)
            console.log("invoice", data);
            setInvoince(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEmail()

    }, [])


    const onSubmit = async (
        values, {
            setSubmitting, setErrors, setStatus, resetForm }) => {
        // console.log("YYYYYYYYYYVALUES", values);
        try {
            let res = await verifyEmail(values)
            setSMS(res)
            // console.log("resss", res)
            resetForm({});
            setStatus({ success: true })
            setIsOpen(false)

        } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });
            toast({
                title: "invalid code",
                message: error.response.message,
                duration: 5000,
                position: "top-right",
            });

            setIsOpen(false)

        }
    }

    return (

        <Box>
            <Modal
                isOpen={isOpen}
                animate
                autoFocus>
                <ModalOverlay />
                <ModalContent>


                    <ModalBody p={14}>
                        <Flex direction='column' mb={8} textAlign='center'>
                            <Heading as='h3' fontWeight='bold' fontSize={{ md: '2xl' }}>
                                Email Verification
                            </Heading>
                            <Text>Check your email for a verification code</Text>


                            <Formik
                                initialValues={{
                                    code: ""
                                }}
                                validationSchema={emailVerificationSchema}
                                onSubmit={onSubmit}
                            >
                                {({
                                    values,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    errors,
                                    touched,
                                }) => (
                                    <form onSubmit={handleSubmit} >
                                        {console.log("Formik", values)}
                                        {console.log("Erroes", errors)}

                                        <Grid alignItems="center" justifyContent="center">
                                            <FormInput
                                                width='100%'
                                                textAlign='center'
                                                color="#898989"
                                                borderColor="#191191191"
                                                placeholder="enter code"
                                                name="code"
                                                onChange={handleChange}
                                                value={values.code}
                                                error={errors.code}
                                                touch={touched.code}

                                            />

                                        </Grid>

                                        <Button
                                            isLoading={isSubmitting}
                                            mt="3"
                                            loadingText="processing"
                                            type="submit"
                                            title='verify'
                                            w='40%'
                                            bg="#EAE7FD"
                                            color="#898989"
                                            borderColor="#191191191"
                                            _hover={{ bg: "#BEFEF2" }}
                                            _active={{ bg: "#100213" }}
                                        >
                                            Verify
                                        </Button>

                                    </form>
                                )}
                            </Formik>

                        </Flex>
                    </ModalBody>

                </ModalContent>
            </Modal>
            <Flex
                alignItems="center"
                justifyContent='center'
                direction="column"
                h="100vh"
                w="100%"
                roundedBottom="none"
            >
                <Logo />


                <Text fontSize="4xl" color="#002060">
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
                    <Link
                        as={NavLink}
                        _hover={{ textDecor: "none" }}
                        _focus={{ textDecor: "none" }}
                        to="/"
                    >

                        Next
                    </Link>

                </Button>
            </Flex>
        </Box>
    )
}
export default Emailverification;