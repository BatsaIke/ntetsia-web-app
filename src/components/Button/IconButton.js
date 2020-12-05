import { Box, Icon } from '@chakra-ui/react';
import React from 'react';

const IconButton = ({
  state,
  setState,
  emoji,
  outlineEmoji,
  size,
  ...rest
}) => {
  return (
    <Box _focus={{ outline: 'none' }} color='brand.darkblue' {...rest}>
      <Icon as={emoji} boxSize={size || 8} />
    </Box>
  );
};

export default IconButton;
