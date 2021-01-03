import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  Link,
  useColorMode,
  Grid,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import React from 'react';
import { Menu } from '@headlessui/react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { BsBookmark, BsArchive, BsTrash } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import useAPI from 'context/apiContext';
import moment from 'moment';
import { QueryClient, useMutation } from 'react-query';
import PostItem from './PostItem';
import { Link as ReachLink } from 'react-router-dom';
import useComponent from 'context/componentContext';

const MotionBox = motion.custom(Box);

const Post = ({ user, feed, image }) => {
  const { colorMode } = useColorMode();
  const { postLike, postUnlike, deletePost } = useAPI();
  const { handleModalClick } = useComponent();
  const [liked, setLiked] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const handleZoomChange = React.useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);

  const queryClient = new QueryClient();

  const mutateDeletePost = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries('feeds'),
  });

  const mutateLikePost = useMutation(postLike, {
    onSuccess: () => queryClient.invalidateQueries('feeds'),
  });

  const mutateUnlikeLikePost = useMutation(postUnlike, {
    onSuccess: () => queryClient.invalidateQueries('feeds'),
  });

  const likesCount = () => {
    if (feed.is_liked === false) {
      setLiked(true);
      mutateLikePost.mutate({ post_id: feed?.id });
    } else {
      setLiked(false);
      mutateUnlikeLikePost.mutate({ post_id: feed?.id });
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
      <AnimatePresence>
        <Menu as={Box} pos='absolute' right={4} zIndex={10}>
          {({ open }) => (
            <Box>
              <Menu.Button
                as={Flex}
                align='center'
                justify='center'
                _focus={{ outline: 'none' }}
                _hover={{
                  bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                  rounded: '100%',
                }}
                w={10}
                h={10}
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
                  bg={colorMode === 'dark' ? 'gray.900' : 'white'}
                  w={48}
                  right={0}
                  rounded='sm'
                  mt={-8}
                  color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                  shadow='md'
                  zIndex={10}
                >
                  {feed.is_owner && (
                    <Menu.Item>
                      {({ active }) => (
                        <Box
                          py={2}
                          px={6}
                          _hover={{
                            textDecor: 'none',
                            bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                          }}
                          bg={active && 'gray.100'}
                          d='block'
                          cursor='pointer'
                          onClick={() =>
                            handleModalClick(
                              'post',
                              feed?.body,
                              feed?.id,
                              null,
                              'edit'
                            )
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
                        _hover={{
                          textDecor: 'none',
                          bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                        }}
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
                        _hover={{
                          textDecor: 'none',
                          bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                        }}
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
                          onClick={() => mutateDeletePost.mutate(feed?.id)}
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
      <Link
        as={ReachLink}
        to={{ pathname: `/comments/${feed?.id}`, state: feed }}
        _hover={{
          textDecor: 'none',
          bg: colorMode === 'dark' ? 'gray.700' : 'gray.100',
        }}
      >
        <Box>
          <Flex align='center' justify='space-between' pos='relative'>
            <Flex align='center'>
              <Link
                as={ReachLink}
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
          </Flex>

          <Box mt={4}>
            <Text mt={3}>{feed?.body}</Text>
            <Grid
              templateColumns={{
                md: feed?.files.length > 1 && 'repeat(2, 1fr)',
              }}
              mt={2}
            >
              {feed?.files?.map((file) => (
                <Box as='li' key={file.id} listStyleType='none'>
                  <ControlledZoom
                    isZoomed={isZoomed}
                    onZoomChange={handleZoomChange}
                    transitionDuration={450}
                    zoomMargin={150}
                    overlayBgColorEnd='rgba(0, 0, 0, 0.85)'
                  >
                    <Image
                      src={file.url}
                      alt={file.filename}
                      rounded='md'
                      h={isZoomed ? '100%' : 70}
                      objectFit='cover'
                      w='100%'
                    />
                  </ControlledZoom>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
      </Link>

      <PostItem
        likesCount={likesCount}
        likes={feed?.likes_count}
        comments={feed?.comments_count}
        shares={feed?.shares_count}
        liked={feed?.is_liked}
        postLike={liked}
        id={feed?.id}
        feed={feed}
      />
    </Box>
  );
};

export default Post;
