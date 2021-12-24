import { Flex, Icon, useColorMode } from '@chakra-ui/react';
import useComponent from 'context/componentContext';
import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const FeedBox = () => {
  const { handleModalClick } = useComponent();
  const { colorMode } = useColorMode();

  return (
    <>
      {/* <Box
        pos='relative'
        float="inherit"
       // borderWidth={1}
       // p={2}
       // rounded='md'
        color={colorMode === 'dark' ? 'white' : 'gray.700'}
      > */}
        <Flex
        position="fixed"
        bottom="3"
        ml="40%"
        zIndex="999"
        float="none"
       // align="right"
          align='center'
         // w='100%'
          // rounded='30px'
          // h={{ md: 12 }}
          // my={{ md: 4 }}
          // _hover={{
          //   borderColor: 'gray.400',
          //   bg: colorMode === 'dark' ? 'gray.700' : 'gray.100',
          // }}
          
          // borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
          // cursor='pointer'
          // px={{ md: 6 }}
          as='button'
          role='button'
          aria-label='Post Modal'
          onClick={() => handleModalClick('post', null, null, null, 'post')}
        >
          <Icon as={HiOutlinePencilAlt} mr={2} boxSize="3rem" color="white"  bg="blue.900" borderRadius="50%" bw={10} />{' '}
          {/* <Text>Write a post</Text> */}
        </Flex>
      {/* </Box> */}
    </>
  );
};

export default FeedBox;
