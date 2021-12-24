import { Button, Flex, Heading, Stack, useColorMode, Select, Text, Divider, Box, HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAPI from 'context/apiContext';
import React, { useEffect } from 'react'
import { useToast } from "@chakra-ui/react";
import absa from "../../assets/images/absa.jpg"
import omni from "../../assets/images/omni.jpg"
import useComponent from "context/componentContext";


const AccountType = ({ state, onChange, type }) => {
  const { colorMode } = useColorMode;
  const { getAccountType, getAvailableBanks, createAccoutType } = useAPI();
  const [accountTypes, setAccountTypes] = React.useState([]);
  const [availableBanks, setAvailableBanks] = React.useState([]);
  const [respose, setResponse] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const { handleStepClick } = useComponent();

  const toast = useToast();
  console.log(accountTypes, "types")

  const updateDaysActive = async (day) => {
    console.log("Button active", day);
    try {
      let accounts = await createAccoutType({ "account_type_id": day })
      setResponse(accounts)
      if (respose.token!=""){
        toast({
        title: "account selected",
        status: "success",
        duration: 5000,
        position: "top"
      });
      }

    } catch (error) {
      console.log(error)
      // toast({
      //   title: error.message,
      //   status: "success",
      //   duration: 5000,
      //   position: "top-right",
      // });
    }

    let account = accountTypes.filter(tp => tp.type == day);
    console.log("FILTER", account);

    onChange(day);
  };
  useEffect(() => {
    getAccType();
    getBanks();

  }, [])

  async function getAccType() {
    try {
      let data = await getAccountType()
      console.log("NEWWWWW", data);
      setAccountTypes(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getBanks() {
    try {
      let bank = await getAvailableBanks()
      console.log("banks", bank);
      setAvailableBanks(bank)
    } catch (error) {
      console.log(error)
    }
  }




  const Type = ({ children, ...rest }) => (
    <Button

      colorScheme={colorMode === 'dark' ? 'twitter' : 'facebook'}
      rounded='0px'
      onClick={() => updateDaysActive(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  return (
    <Flex direction='column' align='center' justify='center'>
      <Heading as='h5' size='md' mb={4} textAlign='center'>
        Choose your account type
      </Heading>

      <Select placeholder='Select Category' onChange={(e) => updateDaysActive(e.target.value)} bg="#EAE7FD" w="300px" variant="outline" align="center"   >
        {accountTypes.map((item) => (
          <option value={item.id} key1={item.account_type_id} >
            {item.name}{' '}{item.currency} {item.fee}
          </option>

        ))}

      </Select>
      <Link> <Text mt={4} fontSize='sm'>Read more about membership categories...</Text> </Link>
      <Divider h="1px" bg="black" w="400px" mt={5} />
      <Box mt={4} align="center" justifyContent="center">
        <Text mt={4} fontSize='sm'>Choose a bank</Text>
        <HStack spacing='24px' align="center" justifyContent="center">
          <Box>
            <Image src={absa} alt='Dan Abramov' size="sm"
              boxSize='200px'
              objectFit="contain" />
          </Box>
          <Box><Text>or</Text> </Box>
          <Box >
            <Image src={omni} alt='Dan Abramov' size="sm"
              boxSize='200px'
              objectFit="contain" />
          </Box>
        </HStack>
        <Text fontSize="sm">it is required of every member to obtain a bank account from our partner banks, kindly choose one.
        </Text>
      </Box>

     
    </Flex>
  );
};

export default AccountType;
