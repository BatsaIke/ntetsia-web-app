import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Button from 'components/Button';
import useAPI from 'context/apiContext';
import React from 'react';
import { QueryClient, useMutation } from 'react-query';
import { useHover } from 'react-use';

const FollowCard = ({ data }) => {
  const { colorMode } = useColorMode();
  const queryClient = new QueryClient();
  const { follow, unfollow } = useAPI();

  const mutateFollow = useMutation(follow, {
    onSuccess: () => queryClient.invalidateQueries('follow'),
  });

  const mutateUnfollow = useMutation(unfollow, {
    onSuccess: () => queryClient.invalidateQueries('unfollow'),
  });

  const followUnfollow = () => {
    if (data.is_following === false) {
      mutateFollow.mutate({ member_id: data?.id });
    } else {
      mutateUnfollow.mutate({ member_id: data?.id });
    }
  };

  console.log('data', data);

  const FollowButton = (hovered) => (
    <Box>
      <Button
        title={
          data?.is_following ? (hovered ? 'Unfollow' : 'Following') : 'Follow'
        }
        rounded='30px'
        borderWidth={2}
        borderColor='blue.500'
        bg={data?.is_following ? 'blue.500' : 'transparent'}
        _hover={{ bg: 'transparent', color: 'blue.500' }}
        _active={{ bg: 'transparent', color: 'blue.500' }}
        color={data?.is_following ? 'white' : 'blue.500'}
        mt={2}
        fontSize='sm'
        onClick={followUnfollow}
      />
    </Box>
  );
  const [hoverable, hovered] = useHover(FollowButton);

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

        {hoverable}
      </Flex>

      <Divider orientation='horizontal' my={4} />
    </Box>
  );
};

export default FollowCard;
