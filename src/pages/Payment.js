import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Grid, Heading } from '@chakra-ui/layout';
import PaymentCard from 'components/Cards/PaymentCard';
import PayWithCard from 'components/Modals/PayWithCard';
import PayWithMomo from 'components/Modals/PayWithMomo';
import React from 'react';

const items = [
  { id: 1, img: 'mastercard.png', title: 'Pay with Card', type: 'card' },
  { id: 2, img: 'momo.jpg', title: 'Pay with Momo', type: 'momo' },
];

const Payment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = React.useState({});

  function getPaymentModal(value) {
    switch (value) {
      case 'card':
        return <PayWithCard isOpen={isOpen} onClose={onClose} />;
      case 'momo':
        return <PayWithMomo isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  }

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
      {getPaymentModal(selected.type)}
      <Box
        filter='drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
        w={{ md: 108 }}
        h={{ md: 80 }}
        rounded='md'
        bg='white'
        mt={{ md: 10 }}
        px={{ md: 6 }}
        py={{ md: 10 }}
      >
        <Box mb={{ md: 8 }} textAlign='center'>
          <Heading as='h4' fontSize={{ md: 'xl' }}>
            Please choose a payment method
          </Heading>
        </Box>
        <Grid gap={3}>
          {items.map((item) => (
            <PaymentCard
              key={item.id}
              title={item.title}
              image={item.img}
              selected={selected.id === item.id}
              onClick={() => {
                setSelected(item);
                handleClick(item);
              }}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Payment;
