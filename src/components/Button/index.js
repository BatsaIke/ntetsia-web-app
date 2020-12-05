import React from 'react';
import { Button as ChakraButton, useColorMode } from '@chakra-ui/react';

const Button = ({ title, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <ChakraButton
      colorScheme={colorMode === 'dark' ? 'twitter' : 'facebook'}
      {...rest}
    >
      {title}
    </ChakraButton>
  );
};

export default Button;
