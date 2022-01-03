import { Button, Flex, Heading, useColorMode, Select, Text, Divider, Box, HStack, Image } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import useAPI from 'context/apiContext';
import React, { useEffect } from 'react'
import { useToast } from "@chakra-ui/react";
import absa from "../../assets/images/absa.jpg"
import omni from "../../assets/images/omni.jpg"
import useComponent from "context/componentContext";


const AccountType = (props,) => {
  const { colorMode } = useColorMode;
  const { getAccountType, getAvailableBanks, createAccoutType } = useAPI();
  const [accountTypes, setAccountTypes] = React.useState([]);
  const [availableBanks, setAvailableBanks] = React.useState([]);
  const [respose, setResponse] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const { handleStepClick } = useComponent();

  const toast = useToast();
 // console.log(accountTypes, "types")

  const updateDaysActive = async (day) => {
    let account = accountTypes.filter(tp => tp.id == day);
   // console.log("FILTER", account);
    setValue(account)
    //  console.log("Button active", account);
    try {
      let accounts = await createAccoutType({ "account_type_id": account[0].id })
      setResponse(accounts)
      if (respose.token !== "") {
        toast({
          title: "account selected",
          status: "success",
          duration: 5000,
          position: "top"
        });
      }

    } catch (error) {
      console.error(error)
      // toast({
      //   title: error.message,
      //   status: "success",
      //   duration: 5000,
      //   position: "top-right",
      // });
    }






  };
  useEffect(() => {
    getAccType();
    getBanks();

  }, [])

  async function getAccType() {
    try {
      let data = await getAccountType()
      //console.log("NEWWWWW", data);
      setAccountTypes(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function getBanks() {
    try {
      let bank = await getAvailableBanks()
     // console.log("banks", bank);
      setAvailableBanks(bank)
    } catch (error) {
      console.error(error)
    }
  }





  function Navigate1() {
    if(value.length<1){
      toast({
          title: "Select a category to continue",
          status: "success",
          duration: 5000,
          position: "top-right",
        });
    }
    else{
    props.history.push({ pathname: "/paymentpage", state: value })
    }

  }
  //console.log(value, "VALUEEEE")

  return (
    <Flex direction='column' align='center' justify='center'>
      <Box mt={5}>
        <Heading as='h5' size='md' mb={4} textAlign='center'>
          NTETSIA
        </Heading>
        <Text top={0}> Possible tegether</Text>
      </Box>
      <Heading as='h5' size='md' mb={4} textAlign='center'>
        Choose your account type
      </Heading>

      <Select placeholder='Select Category' onChange={(e) => { updateDaysActive(e.target.value) }} 
      bg="#EAE7FD" w="300px" variant="outline" align="center"  textAlign="center"  >
        {accountTypes.map((item) => (
          <option value={item.id}  >
            {item.name}{' '}{item.currency} {item.fee}
          </option>

        ))}

      </Select>
      <Link> <Text mt={4} fontSize='sm'>Read more about membership categories...</Text> </Link>
      <Divider h="1px" bg="black" w="400px" mt={5} />
      <Box mt={4} align="center" justifyContent="center">
        <Text mt={4} fontSize='sm'>Choose a bank</Text>
        <HStack spacing='24px' align="center" justifyContent="center">
          <Box borderColor="black" borderWidth="1px">
            <Image src={absa} alt='Dan Abramov' size="sm"
              boxSize='150px'
              objectFit="contain" />
          </Box>
          <Box><Text>or</Text> </Box>
          <Box borderColor="black" borderWidth="1px" >
            <Image src={omni} alt='Dan Abramov' size="sm"
              boxSize='150px'
              objectFit="contain" />
          </Box>
        </HStack>
        <Text fontSize="sm">it is required of every member to obtain a bank account from our partner banks, kindly choose one.
        </Text>
      </Box>

      <Button bg="#EAE7FD" mt="10" color="#646464" w="200px" type="button"
        onClick={() => { Navigate1() }}
      >
        Next
      </Button>

    </Flex>
  );
};

export default AccountType;
