import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Grid, Heading, Stack,} from '@chakra-ui/layout';
import PaymentCard from 'components/Cards/PaymentCard';
import PayWithCard from 'components/Modals/PayWithCard';
import PayWithMomo from 'components/Modals/PayWithMomo';
import useAPI from 'context/apiContext';
import React,{useEffect} from "react"
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import { useToast } from "@chakra-ui/react";
import "../index.css"
import { Select, Button } from '@chakra-ui/react'
import Fonts from "../container/Font"

const items = [
  { id: 1, img: 'mastercard.png', title: 'Pay with Card', type: 'card' },
  { id: 2, img: 'momo.jpg', title: 'Pay with Momo', type: 'momo' },
];

const Payment = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {getInvoice,makePayment} = useAPI();
  const [selected, setSelected] = React.useState({});
  const [invoice, setInvoince] = React.useState({});
  const [momoPay,setMomoPay]= React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [payMomo,setPay]= React.useState({});
  
  const toast = useToast();

  React.useEffect(()=>{
      console.log("State0000", props.location.state)
      //console.log("Type0000",props.type)
       setPay(props.location.state)
  },[])

  function getPaymentModal(value) {
    switch (value) {
      case 'card':
        return <PayWithCard isOpen={isOpen} onClose={onClose} />;
      case 'momo':
        return <PayWithMomo isOpen={isOpen} onClose={onClose} state={momoPay}  />;
      default:
        return null;
    }
  }

  function Navigate1() {
   
      toast({
          title: "Kindly select a payment type",
          status: "success",
          duration: 5000,
          position: "top-right",
        });
  }

  async function getinvo() {
    try {
      let data = await getInvoice()
      setLoading(true)
      localStorage.setItem("token-momo" ,data.token)
      console.log("invoice", data);
      setInvoince(data)
     
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
     getinvo()

  },[])

  const handleClick = (value) => {
    setSelected(value);
    onOpen();
  };

  return (
    <Flex
      align='center'
      justify='center'
      h={{ md: '100vh' }}
      w={{ md: '100%' }}
      direction='column'
      overflow="scroll"
    >
      <Heading>NTETSIA</Heading>
      <Box textAlign='center' mb={{ md: 6 }} mt={6}>
          <Heading as='h5' fontSize={{ md: 'md' }} fontFamily="JackFrost">
            Payment

          </Heading>
        </Box>
        {loading?    <Stack spacing={3} direction="column"
          align="center"
          justify="center"

          overflow="hidden"
          textAlign="center"
          mt={10}>
          <Flex align="center" bg="#EAE7FD" justify="center" height="150px" width="300px" borderRadius="10" borderWidth="1px">
            <Heading as='h6' fontSize="0.8rem">
              {payMomo.length >= 1 && payMomo[0].currency}
              
              
              <Heading as='h2' fontSize="3rem" mt={2} >
                {payMomo.length >= 1 && payMomo[0].fee}

                <Heading as='h6' fontSize="0.7rem" mt={2}>
                  {payMomo.length >= 1 && payMomo[0].name} Category

                </Heading>
              </Heading>
            </Heading>

          </Flex>
          </Stack> :<Dots/>}
      {getPaymentModal(selected.type)}
     {/* <Box
        filter='drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
        w={{ md: 108 }}
        h={{ md: 60 }}
        rounded='md'
        bg='white'
        mt={{ md: 10 }}
        px={{ md: 6 }}
        py={{ md: 10 }}
      > */}
        
        <Grid gap={3} mt={4}>
        
        {/* <Select placeholder='Pay with'  w="300px" variant="outline" align="center"> */}
       
        {items.map((item) => (
            <PaymentCard
              key={item.id}
              title={item.title}
              selected={selected.id === item.id}
              onClick={() => {
                setSelected(item);
                handleClick(item);
              }}>

                
            </PaymentCard>
          ))}
         
          
          
        {/* </Select> */}
          
          
        </Grid>

      
      {/* </Box> */}
   {loading ? <Box alignContent="center" marginBottom="4">
    <Button bg="#EAE7FD" mt="10" color="#646464" w="200px" type="button"
       onClick={() => { Navigate1() }}
      >
        Confirm
      </Button>
      </Box >:<Dots/>}
    </Flex>
  );
};

export default Payment;
