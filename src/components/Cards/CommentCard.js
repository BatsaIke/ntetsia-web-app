import { Avatar, Box, Collapse, Flex, Icon, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import React from 'react';
import { Menu } from '@headlessui/react';
import { BsTrash } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import useAPI from 'context/apiContext';
import moment from 'moment';
import { useMutation, useQueryCache, useQuery } from 'react-query';
import useComponent from 'context/componentContext';
import PostSkeleton from './PostSkeleton';

const MotionBox = motion.custom(Box);

const CommentCard = ({ comment, user, id, pId }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { deleteComment, getReplies } = useAPI();
  const { handleModalClick } = useComponent();

  const queryCache = useQueryCache();

  const [mutate] = useMutation(deleteComment, {
    onSuccess: () => queryCache.invalidateQueries('comments'),
  });

  const { data, isLoading } = useQuery(['reply', id], () => getReplies(id));

  return (
    <Box>
      <Box p={3} rounded='md' my={2} borderWidth={1} pos='relative'>
        <Flex align='center' justify='space-between'>
          <Flex align='center'>
            <Avatar src={user?.profile_picture} size='sm' mr={2} />
            <Text fontSize='md' fontWeight={800}>
              {user?.first_name} {user?.last_name}
            </Text>
          </Flex>

          <Flex align='center'>
            <Text fontSize='xs' mr={2}>
              {moment(comment.created_at).fromNow()}
            </Text>
            <AnimatePresence>
              {comment.is_owner && (
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
                                  handleModalClick(
                                    'post',
                                    comment.body,
                                    comment.id,
                                    null,
                                    'editComment'
                                  )
                                }
                                fontSize='sm'
                              >
                                <Icon
                                  as={HiOutlinePencilAlt}
                                  boxSize={4}
                                  mr={2}
                                />{' '}
                                Edit Comment
                              </Box>
                            )}
                          </Menu.Item>
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
                                onClick={() => mutate(id)}
                                fontSize='sm'
                              >
                                <Icon as={BsTrash} boxSize={4} mr={2} />
                                Delete Comment
                              </Box>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Box>
                  )}
                </Menu>
              )}
            </AnimatePresence>
          </Flex>
        </Flex>

        <Box mt={1} ml={10}>
          <Collapse startingHeight={20} in={show}>
            <Flex align='start' justify='space-between'>
              <Box w={85}>
                <Text fontSize='sm'>{comment.body}</Text>
              </Box>
              <Box
                fontSize='xs'
                as='button'
                role='button'
                onClick={() =>
                  handleModalClick('post', null, id, null, 'reply')
                }
              >
                Reply
              </Box>
            </Flex>
          </Collapse>
          <Text fontSize='xs' onClick={handleToggle} mt={1}>
            Show {show ? 'Less' : 'More'}
          </Text>
        </Box>
      </Box>

      <Box ml={10} mt={1}>
        {isLoading ? (
          <Box minW='100%'>
            <PostSkeleton />
            <PostSkeleton />
          </Box>
        ) : (
          data?.data?.map((reply) => (
            <CommentCard key={reply.id} comment={reply} user={reply.member} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default CommentCard;
