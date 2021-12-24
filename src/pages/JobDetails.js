import { Box, Grid, GridItem, Heading, HStack } from "@chakra-ui/layout";
import LeftMenu from "container/LeftMenu";
import { Image, } from "@chakra-ui/image";
import { Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import Type from "components/Form/Type";
import { HiLocationMarker } from "react-icons/hi";
import ApplyJob from "components/Modals/JobApplyModal";




const JobDetails = () => {
    const [state, setState]= useState(false)


    
    return (
        <Box alignItems="center" justifyContent="center">
            <Grid

                templateColumns="10% 90%"
                fontFamily="body"
                fontSize={{ md: "md" }}
            >

                <GridItem float="left" >
                    <LeftMenu />
                </GridItem>

            </Grid>

            <GridItem alignContent="center" justifyContent="center">
                <Box>
                    <Box >
                        <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" height="500px" w="100%" />

                    </Box>
                    <Box position="absolute" top="40" ml="200" >
                        <Box bg="#dedede" w="150px">
                            <Text color="green.900"> Ending: 12/45/6060</Text>
                        </Box>
                        <Text color='white' fontSize="6xl" fontWeight="black">We’re hiring
                        <br/> 2
                            Accountant
                        </Text>
                    </Box>
                    <Box position="absolute" top="56" right="44">
                        {state?<ApplyJob/>:"null"}
                        <Type w="200" bg="#002060" color="white"  >Apply now</Type>
                    </Box>

                </Box>
                <HStack spacing="24px" align="center" justify="center">
                    <Box w="300px" h="200px" shadow="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        rounded="none">
                        <Icon as={HiLocationMarker} boxSize={8} color='blue.800' />
                        <Heading textAlign="center">Location</Heading>
                        <Text textAlign="center">Have a product to advertise? Contact Ntetsia today to show your products to our members.</Text>

                    </Box>
                    <Box w="300px" h="200px" shadow="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        rounded="none">
                        <Icon as={HiLocationMarker} boxSize={8} color='blue.800' />
                        <Heading textAlign="center">Experience</Heading>
                        <Text textAlign="center">Have a product to advertise? Contact Ntetsia today to show your products to our members.</Text>

                    </Box>
                    <Box w="300px" h="200px" shadow="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        rounded="none"
                        dropShadow="lg" >
                        <Icon as={HiLocationMarker} boxSize={8} color='blue.800' />
                        <Heading textAlign="center">Salary</Heading>
                        <Text textAlign="center">Have a product to advertise? Contact Ntetsia today to show your products to our members.</Text>
                    </Box>
                </HStack>
                <Box mt="10">
                    <Grid templateColumns="60% 40%"
                        fontFamily="body" gap={4}>

                        <Box w="100%" h="300px" align="center" >
                            <Heading mt="10">" make income and impact"</Heading>
                            <Text w="300px">is our job creation mantra. Everyone in Ntetsia knows we take our work serious and your job is secured until you stop performing</Text>
                        </Box>
                        <Box w="100%" h="400" position="relative" marginBottom="10">
                        <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" height="200px" w="180px"  ml="59"/>
                        <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" height="200px" w="180px" ml="200"/>
                        <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" height="200px" w="180px" ml="330" position="absolute" top="10" />



                            </Box>
                    </Grid>
                </Box>
            </GridItem>
            <Box align="center" bg="#dedede" >
                <Heading >Brief Description</Heading>
                <Text w="70%">The role of the accountant in this new company is generally to record, keep and produce accurate accounting information in diverse forms as would be required by the stakeholders. Successful applicants would be required to demonstrate high levels of integrity, loyalty to the shareholders, accountability, vigilance and professionalism. Again, the job requires that the role holder should have the necessary requisite technical know-how to execute the role effectively.
                </Text>
            </Box>
            <Box mt="10">
                {/* <Grid templateColumns="50% 50%"
                    fontFamily="body"  > */}

                    <Box w="100%" h="300px" align="center" bg="#002060" >
                        <Grid templateColumns="20% 80%" spacing={3} mt="6">
                            <Box ml="35"> <Text color="white">01</Text></Box>
                            
                            <Box borderWidth="1px" 
                            borderColor="white" 
                            height="50px" 
                            lineHeight="tall" 
                            justifyContent="center"
                            alignContent="center"> 
                            <Text color="white">To build and create a record of accounts for all transaction
                            </Text></Box>

                            <Box bg="white" height="300px" align="center" justifyContent="center" w="3px"
                            position="absolute" 
                             />


                        </Grid>
                    </Box>



                    <Box w="100%" h="300" bg="#00206" >


                    </Box>
                {/* </Grid> */}
            </Box>

        </Box>
    )

}
export default JobDetails;