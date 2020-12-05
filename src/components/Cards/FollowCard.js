import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Button from 'components/Button';
import React from 'react';

const FollowCard = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Flex align='start' justify='space-between'>
        <Flex>
          <Avatar
            borderWidth={2}
            borderColor={colorMode === ' dark' ? 'gray.600' : 'gray.200'}
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
            size='md'
          />
          <Box ml={2} w={40}>
            <Text fontWeight='bold' isTruncated>
              Felix Yeboah - Jefferson
            </Text>
            <Text mt={-1} color='gray.400'>
              Developer
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button
            title='Follow'
            rounded='30px'
            borderWidth={2}
            borderColor='blue.500'
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            color='blue.500'
            mt={2}
            fontSize='sm'
          />
        </Box>
      </Flex>

      <Divider orientation='horizontal' my={4} />
    </Box>
  );
};

export default FollowCard;
