import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Grid, Heading, Stack,} from '@chakra-ui/layout';
import PaymentCard from 'components/Cards/PaymentCard';
import PayWithCard from 'components/Modals/PayWithCard';
import PayWithMomo from 'components/Modals/PayWithMomo';
import useAPI from 'context/apiContext';
import React,{useEffect} from "react"
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

import { Select } from '@chakra-ui/react'

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

  React.useEffect(()=>{
      console.log("State0000", props.state)
      //console.log("Type0000",props.type)
      // setMomoPay(props.state)
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

  // const makepay = async (
  //   values, { 
  //     setSubmitting, setErrors, setStatus, resetForm }) => {
  //   console.log("YYYYYYYYYYVALUES", values);
  //   try {
  //   let res=  await makePayment( {"token":invoice})
  //     resetForm({});
  //     setStatus({ success: true })
  //            } catch (error) {
  //     setStatus({ success: false });
  //     setSubmitting(false);
  //     setErrors({ submit: error.message });
  //     console.log(error.message)
  //     // toast({
  //     //   title: "invalid code",
  //     //   duration: 5000,
  //     //   position: "top-right",
  //     // });

  //   }
  // }

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
    >
      <Heading>NTETSIA</Heading>
      <Box textAlign='center' mb={{ md: 6 }} mt={6}>
          <Heading as='h5' fontSize={{ md: 'md' }}>
            Payment

          </Heading>
        </Box>
        <Stack spacing={3} direction="column"
          align="center"
          justify="center"

          overflow="hidden"
          textAlign="center"
          mt={10}>
          <Flex align="center" bg="#EAE7FD" justify="center" height="150px" width="300px" borderRadius="10">
            <Heading as='h6' fontSize="0.6rem">
              {/* {payMomo.length >= 1 && payMomo[0].currency} */}
              momo
              
              <Heading as='h6' fontSize="2rem" mt={2} >
                {/* {payMomo.length >= 1 && payMomo[0].fee} */}momo

                <Heading as='h6' fontSize="0.7rem" mt={2}>
                  {/* {payMomo.length >= 1 && payMomo[0].type} Category */} Category

                </Heading>
              </Heading>
            </Heading>

          </Flex>
          </Stack>
      {getPaymentModal(selected.type)}
    {loading?  <Box
        filter='drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
        w={{ md: 108 }}
        h={{ md: 60 }}
        rounded='md'
        bg='white'
        mt={{ md: 10 }}
        px={{ md: 6 }}
        py={{ md: 10 }}
      >
        
        {/* <Grid gap={3} mt={4}> */}
        
        {/* <Select placeholder='Pay with'  w="300px" variant="outline" align="center"> */}
        
        {items.map((item) => (
            <PaymentCard
              key={item.id}
              title={item.title}
              image={item.img}
              selected={selected.id === item.id}
              onClick={() => {
                setSelected(item);
                handleClick(item);
              }}>

                
            </PaymentCard>
          ))}
         
          
          
        {/* </Select> */}
          
          
        {/* </Grid> */}
      </Box>:<Dots/>}
    </Flex>
  );
};

export default Payment;
