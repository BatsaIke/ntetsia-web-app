import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link as ReachRouter } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import React from 'react';
import { Menu } from '@headlessui/react';
import { BsBookmark, BsArchive, BsTrash } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import useAPI from 'context/apiContext';
import moment from 'moment';
import { useMutation, useQueryCache } from 'react-query';
import PostItem from './PostItem';

const MotionBox = motion.custom(Box);

const PostCard = ({ user, feed, image }) => {
  const { colorMode } = useColorMode();
  const { postLike, postUnlike, deletePost, handleModalClick } = useAPI();

  const queryCache = useQueryCache();

  const [mutateDeletePost] = useMutation(deletePost, {
    onSuccess: () => queryCache.invalidateQueries('feeds'),
  });

  const [mutateLikePost] = useMutation(postLike, {
    onSuccess: () => queryCache.invalidateQueries('feeds'),
  });

  const [mutateUnlikeLikePost] = useMutation(postUnlike, {
    onSuccess: () => queryCache.invalidateQueries('feeds'),
  });

  const likesCount = () => {
    if (feed.is_liked === false) {
      mutateLikePost({ post_id: feed?.id });
    } else {
      mutateUnlikeLikePost({ post_id: feed?.id });
    }
  };

  return (
    <Box
      borderWidth={1}
      p={4}
      mb={6}
      rounded='md'
      pos='relative'
      color={colorMode === 'dark' ? 'white' : 'gray.700'}
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Link
            as={ReachRouter}
            _hover={{ textDecor: 'none' }}
            to={{
              pathname: `/profile/${feed?.member?.id}`,
              state: feed,
            }}
          >
            <Avatar
              src={user?.profile_picture}
              size='md'
              borderWidth={2}
              borderColor='gray.300'
            />
          </Link>
          <Box ml={4}>
            <Text fontSize='md' fontWeight={800}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text
              mt={-1}
              fontSize='xs'
              color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
            >
              {moment(feed?.created_at).fromNow()}
            </Text>
          </Box>
        </Flex>

        <AnimatePresence>
          <Menu as={Box} ml={2}>
            {({ open }) => (
              <Box>
                <Menu.Button
                  as={Box}
                  _focus={{ outline: 'none' }}
                  cursor='pointer'
                >
                  <Icon as={BsThreeDots} />
                </Menu.Button>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0 }}
                    pos='absolute'
                    bg='white'
                    w={48}
                    right={4}
                    rounded='sm'
                    mt={-4}
                    color='gray.600'
                    shadow='md'
                    zIndex={10}
                  >
                    {feed.is_owner && (
                      <Menu.Item>
                        {({ active }) => (
                          <Box
                            py={2}
                            px={6}
                            _hover={{ textDecor: 'none' }}
                            bg={active && 'gray.100'}
                            d='block'
                            cursor='pointer'
                            onClick={() =>
                              handleModalClick('editpost', feed?.body, feed?.id)
                            }
                          >
                            <Icon as={HiOutlinePencilAlt} boxSize={4} mr={2} />{' '}
                            Edit post
                          </Box>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Box
                          py={2}
                          px={6}
                          _hover={{ textDecor: 'none' }}
                          bg={active && 'gray.100'}
                          d='block'
                          cursor='pointer'
                        >
                          <Icon as={BsBookmark} boxSize={4} mr={2} /> Save post
                        </Box>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Box
                          py={2}
                          px={6}
                          _hover={{ textDecor: 'none' }}
                          bg={active && 'gray.100'}
                          d='block'
                          cursor='pointer'
                        >
                          <Icon as={BsArchive} boxSize={4} mr={2} />
                          Archive post
                        </Box>
                      )}
                    </Menu.Item>
                    {feed.is_owner && (
                      <Menu.Item>
                        {({ active }) => (
                          <Box
                            py={2}
                            px={6}
                            _hover={{
                              textDecor: 'none',
                              bg: 'red.600',
                              color: 'white',
                            }}
                            bg={active && 'gray.100'}
                            d='block'
                            cursor='pointer'
                            onClick={() => mutateDeletePost(feed?.id)}
                          >
                            <Icon as={BsTrash} boxSize={4} mr={2} />
                            Delete post
                          </Box>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                )}
              </Box>
            )}
          </Menu>
        </AnimatePresence>
      </Flex>
      <Box mt={4}>
        {image && <Image src={image} rounded='md' />}
        <Text mt={3} fontSize='xl'>
          {feed?.body}
        </Text>
      </Box>

      <PostItem
        likesCount={likesCount}
        likes={feed?.likes_count}
        comments={feed?.comments_count}
        shares={feed?.shares_count}
        liked={feed?.is_liked}
        id={feed?.id}
      />
    </Box>
  );
};

export default PostCard;
