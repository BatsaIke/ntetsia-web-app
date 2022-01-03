import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';

const PaymentCard = ({ title, selected, onClick }) => {
  return (
    <Box
      as='button'
      role='button'
      aria-label='payment button'
      borderWidth={1}
      borderColor={selected ? 'gray.600' : 'gray.300'}
      rounded='md'
      p={{ md: 5 }}
      w='100%'
      onClick={onClick}
    >
      <Flex align='center' justify='space-between'>
        
        <Heading
          as='h6'
          fontSize={{ md: 'md' }}
          color={selected ? 'gray.800' : 'gray.500'}
        >
          {title}
        </Heading>
      </Flex>
    </Box>
  );
};

export default PaymentCard;
