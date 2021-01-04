import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Work = () => {
  return (
    <Box>
      <Box>
        <Heading as='h4' size='xl'>
          Profile
        </Heading>
        <Text fontSize='sm' color='gray.600'>
          This information will be displayed publicly.
        </Text>
      </Box>
    </Box>
  );
};

export default Work;
