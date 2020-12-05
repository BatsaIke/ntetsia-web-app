import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiComment } from 'react-icons/bi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import useComponent from 'context/componentContext';

const PostItem = ({ likes, comments, shares, likesCount, liked, id }) => {
  const { handleModalClick } = useComponent();

  return (
    <Box>
      <Divider orientation='horizontal' mt={4} />
      <Flex align='center' fontSize='sm'>
        <Flex align='center' mr={6}>
          <Text>{likes}</Text>
          <Box as='button' role='button' px={2} py={2} onClick={likesCount}>
            <Icon
              as={liked ? BsHeartFill : BsHeart}
              color={liked ? 'red.600' : ''}
              boxSize={liked ? 5 : 4}
              mr={1}
            />{' '}
            Like
          </Box>
        </Flex>
        <Flex
          align='center'
          mr={6}
          as='button'
          role='button'
          aria-label='comment button'
          onClick={() => handleModalClick('post', null, id, null, 'comment')}
        >
          <Text>{comments}</Text>
          <Box as='button' role='button' px={2} py={2}>
            <Icon as={BiComment} boxSize={4} mr={1} />
            Comment
          </Box>
        </Flex>
        <Flex align='center'>
          <Text>{shares}</Text>
          <Box as='button' role='button' px={2} py={2}>
            <Icon as={AiOutlineRetweet} boxSize={4} mr={1} />
            Share
          </Box>
        </Flex>
      </Flex>
      <Divider orientation='horizontal' />
    </Box>
  );
};

export default PostItem;
