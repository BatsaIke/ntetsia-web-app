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

const FollowCard = ({ data, onClick }) => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Flex align='start' justify='space-between'>
        <Flex>
          <Avatar
            borderWidth={2}
            borderColor={colorMode === ' dark' ? 'gray.600' : 'gray.200'}
            src={data?.profile_picture}
            size='md'
          />
          <Box ml={2} w={40}>
            <Text fontWeight='bold' isTruncated>
              {data?.first_name} {data?.last_name}
            </Text>
            <Text mt={-1} color='gray.400'>
              Developer
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button
            title={data?.is_following ? 'Following' : 'Follow'}
            rounded='30px'
            borderWidth={2}
            borderColor='blue.500'
            bg={data?.is_following ? 'blue.500' : 'transparent'}
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            color={data?.is_following ? 'white' : 'blue.500'}
            mt={2}
            fontSize='sm'
            onClick={onClick}
          />
        </Box>
      </Flex>

      <Divider orientation='horizontal' my={4} />
    </Box>
  );
};

export default FollowCard;
