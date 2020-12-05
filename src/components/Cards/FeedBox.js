import { Box, Flex, Icon, Text, useColorMode } from '@chakra-ui/react';
import useComponent from 'context/componentContext';
import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const FeedBox = () => {
  const { handleModalClick } = useComponent();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        pos='relative'
        borderWidth={1}
        p={2}
        rounded='md'
        color={colorMode === 'dark' ? 'white' : 'gray.700'}
      >
        <Flex
          align='center'
          w='100%'
          rounded='30px'
          h={{ md: 12 }}
          my={{ md: 4 }}
          _hover={{
            borderColor: 'gray.400',
            bg: colorMode === 'dark' ? 'gray.700' : 'gray.100',
          }}
          borderWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
          cursor='pointer'
          px={{ md: 6 }}
          as='button'
          role='button'
          aria-label='Post Modal'
          onClick={() => handleModalClick('post', null, null, null, 'post')}
        >
          <Icon as={HiOutlinePencilAlt} mr={2} boxSize={5} />{' '}
          <Text>Write a post</Text>
        </Flex>
      </Box>
    </>
  );
};

export default FeedBox;
