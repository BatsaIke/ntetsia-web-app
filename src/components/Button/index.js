import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ title, ...rest }) => {
  return (
    <ChakraButton colorScheme='facebook' {...rest}>
      {title}
    </ChakraButton>
  );
};

export default Button;
