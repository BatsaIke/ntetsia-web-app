import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const Theme = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Box>
      <Box>
        <Heading as='h4' size='xl'>
          Change theme
        </Heading>
        <Text fontSize='sm' color='gray.600'>
          Make changes to the look and feel of your account.
        </Text>
      </Box>

      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        my={10}
      />

      <Flex>
        <Flex
          align='center'
          justify='center'
          as='button'
          role='button'
          aria-label='theme toggle button'
          bg='gray.800'
          color='white'
          onClick={() => toggleColorMode('dark')}
          h={24}
          w={48}
          rounded='md'
          cursor='pointer'
        >
          <Icon as={BiMoon} boxSize={6} mr={3} />
          <Text>Dark Mode</Text>
        </Flex>

        <Flex
          ml={{ md: 10 }}
          align='center'
          justify='center'
          as='button'
          role='button'
          aria-label='theme toggle button'
          bg='gray.200'
          color='gray.800'
          onClick={() => toggleColorMode('light')}
          h={24}
          w={48}
          rounded='md'
          cursor='pointer'
        >
          <Icon as={BiSun} boxSize={6} mr={3} />
          <Text>Light Mode</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Theme;
