
import React from 'react'
import { Stack, HStack, Avatar,Center, Box, Grid, Heading, GridItem } from '@chakra-ui/react'
import {
    useProfile,
} from "hooks/useGlobalHooks";
const DashboardDetails = () => {
    const { user } = useProfile();
    return (

        <Box>
            <Grid templateColumns='repeat(3, 1fr)'
                gap={10} mt="10px" marginBottom={0} h='300px' alignItems="center" justifyContent="center">
                <Box w='100%' h='200px' bg='#BDC3C7 ' boxShadow="lg" dropShadow="dark-lg" >
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm">Grand</Heading>
                        <Box w="1px" bg="black" h="30px" />
                        <Heading fontSize="sm">Bonus</Heading>
                    </HStack>

                    <Heading fontSize="5xl" textAlign="center">$10,000</Heading>
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm" color="green">+$200</Heading>
                        <Box w="1px" bg="green" h="15px" />
                        <Heading fontSize="sm" color="green">+$100</Heading>
                    </HStack>
                    <Heading fontSize="sm" mt={4} textAlign="center">10-20-2020</Heading>
                </Box>

                <Box w='100%' h='200px' bg='#BDC3C7' boxShadow="lg"  >
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm">Grand</Heading>
                        <Box w="1px" bg="black" h="30px" />
                        <Heading fontSize="sm">Profit</Heading>
                    </HStack>

                    <Heading fontSize="5xl" textAlign="center">$10,000</Heading>
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm" color="red.600">+$200</Heading>
                        <Box w="1px" bg="red.500" h="15px" />
                        <Heading fontSize="sm" color="red.600">+$100</Heading>
                    </HStack>
                    <Heading fontSize="sm" mt={4} textAlign="center">10-20-2020</Heading>
                </Box>


                <Box w='100%' h='200px' bg='#BDC3C7' boxShadow="lg"  >
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm">Grand</Heading>
                        <Box w="1px" bg="black" h="30px" />
                        <Heading fontSize="sm">Contribution</Heading>
                    </HStack>

                    <Heading fontSize="5xl" textAlign="center">$10,000</Heading>
                    <HStack mt="5" alignItems="center" justifyContent="center" >
                        <Heading fontSize="sm" color="blue.600">+$200</Heading>
                        <Box w="1px" bg="blue.500" h="15px" />
                        <Heading fontSize="sm" color="blue.600">+$100</Heading>
                    </HStack>
                    <Heading fontSize="sm" mt={4} textAlign="center">10-20-2020</Heading>
                </Box>

            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={2} h='300px'
                    boxShadow="lg"
                    borderWidth="1px"
                    rounded="20px" >
                      

                    <HStack spacing='24px'  alignItems="center" display="flex" >
                    <Center>
                        <Box w='40px'  ml="7"  bg='yellow.200'  >
                            <Avatar

                                size="md"
                                bw={2}
                                src={user?.profile_picture}
                                borderWidth={2}
                                borderColor="gray.400"
                            />
                        </Box>
                        <Box w='40px' h='40px' bg='tomato'>
                            2
                        </Box>
                        </Center>
                    </HStack>
                   
                </GridItem>


                <GridItem colStart={3} colEnd={6} h='300px'
                    boxShadow="lg"
                    borderWidth="1px"
                    rounded="20px"
                    mt="0">
                       
                </GridItem>
            </Grid>







        </Box>
    )
}
export default DashboardDetails;