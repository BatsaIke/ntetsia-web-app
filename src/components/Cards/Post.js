import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  Link,
  useColorMode,
  Grid,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import React from "react";
import { Menu } from "@headlessui/react";
import { BsBookmark, BsArchive, BsTrash } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import useAPI from "context/apiContext";
import moment from "moment";
import { QueryClient, useMutation } from "react-query";
import PostItem from "./PostItem";
import { Link as ReachLink } from "react-router-dom";
import useComponent from "context/componentContext";

const MotionBox = motion(Box);

const Post = ({ user, feed }) => {
  const { colorMode } = useColorMode();
  const { postLike, postUnlike, deletePost } = useAPI();
  const { handleModalClick } = useComponent();
  const [liked, setLiked] = React.useState(false);

  const queryClient = new QueryClient();

  const mutateDeletePost = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries("feeds"),
  });

  const mutateLikePost = useMutation(postLike, {
    onSuccess: () => queryClient.invalidateQueries("feeds"),
  });

  const mutateUnlikeLikePost = useMutation(postUnlike, {
    onSuccess: () => queryClient.invalidateQueries("feeds"),
  });

  const likesCount = () => {
    if (feed.is_liked === false) {
      setLiked(true);
      mutateLikePost.mutateAsync({ post_id: feed?.id });
    } else {
      setLiked(false);
      mutateUnlikeLikePost.mutateAsync({ post_id: feed?.id });
    }
  };

  return (
    <Box
      overscrollX="none"
      borderWidth={1}
      p={4}
      mb={6}
      rounded="md"
      pos="relative"
      color={colorMode === "dark" ? "white" : "gray.700"}
    >
      <AnimatePresence>
        <Menu as={Box} pos="absolute" right={4} zIndex={10}>
          {({ open }) => (
            <Box>
              <Menu.Button
                as={Flex}
                align="center"
                justify="center"
                _focus={{ outline: "none" }}
                _hover={{
                  bg: colorMode === "dark" ? "gray.700" : "gray.200",
                  rounded: "100%",
                }}
                w={10}
                h={10}
                cursor="pointer"
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
                  pos="absolute"
                  bg={colorMode === "dark" ? "gray.900" : "white"}
                  w={48}
                  right={0}
                  rounded="sm"
                  mt={-8}
                  color={colorMode === "dark" ? "gray.400" : "gray.600"}
                  shadow="md"
                  zIndex={10}
                >
                  {feed.is_owner && (
                    <Menu.Item>
                      {({ active }) => (
                        <Box
                          py={2}
                          px={6}
                          _hover={{
                            textDecor: "none",
                            bg: colorMode === "dark" ? "gray.700" : "gray.200",
                          }}
                          bg={active && "gray.100"}
                          d="block"
                          cursor="pointer"
                          onClick={() =>
                            handleModalClick(
                              "post",
                              feed?.body,
                              feed?.id,
                              null,
                              "edit"
                            )
                          }
                        >
                          <Icon as={HiOutlinePencilAlt} boxSize={4} mr={2} />{" "}
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
                          textDecor: "none",
                          bg: colorMode === "dark" ? "gray.700" : "gray.200",
                        }}
                        bg={active && "gray.100"}
                        d="block"
                        cursor="pointer"
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
                          textDecor: "none",
                          bg: colorMode === "dark" ? "gray.700" : "gray.200",
                        }}
                        bg={active && "gray.100"}
                        d="block"
                        cursor="pointer"
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
                            textDecor: "none",
                            bg: "red.600",
                            color: "white",
                          }}
                          bg={active && "gray.100"}
                          d="block"
                          cursor="pointer"
                          onClick={() => mutateDeletePost.mutateAsync(feed?.id)}
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
          textDecor: "none",
          bg: colorMode === "dark" ? "gray.700" : "gray.100",
        }}
      >
        <Box>
          <Flex align="center" justify="space-between" >
            <Flex align="center">
              <Link
                as={ReachLink}
                to={{
                  pathname: `/profile/${feed?.member?.id}`,
                  state: feed,
                }}
              >
                <Avatar
                  float='left'
                  align="left"
                  marginLeft="0"
                  src={user?.profile_picture}
                  size="lg"
                  borderWidth={2}
                  borderColor="gray.300"
                />
              </Link>
              <Box ml={4} >
                <Text fontSize="md" fontWeight={800}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text
                  mt={-1}
                  fontSize="xs"
                  color={colorMode === "dark" ? "gray.400" : "gray.500"}
                >
                  {moment(feed?.created_at).fromNow()}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Box mt={4} left={6} pos="relative" left={16}>
            <Text w="90%" mt={3}>{feed?.body}</Text>
          </Box>
        </Box>
      </Link>

      <Grid position="relative" left={16}
        templateColumns={{
          md: feed?.files.length > 1 && "repeat(2, 1fr)",
        }}
        my={2}
      >
        {feed?.files?.map((file) => (
          <Box
            as="li"
            key={file.id}
            listStyleType="none"
            onClick={() =>
              handleModalClick("image", feed, feed?.id, null, null)
            }
            cursor="pointer"
          >
            <Image
              src={file.url}
              alt={file.filename}
              rounded="md"
              h={70}
              objectFit="cover"
              w="90%"
            />
          </Box>
        ))}
      </Grid>

      <Flex align="center" justify="space-between" pt={1} fontSize="sm" >
        <Text pos="relative" left={16}>
          {feed?.likes_count} {feed?.likes_count > 1 ? "likes" : "like"}
        </Text>
        <AvatarGroup size="sm" max={2} left={0} isTruncated  >
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>
        <Flex>
          <Text>
            {feed?.comments_count}{" "}
            {feed?.comments_count > 1 ? "comments" : "comment"}{" "}
          </Text>
          <Text ml={4}>
            {feed?.shares_count} {feed?.shares_count > 1 ? "shares" : "share"}{" "}
          </Text>
        </Flex>
      </Flex>

      <PostItem pos="relative" left={16}
        likesCount={likesCount}
        liked={feed?.is_liked}
        postLike={liked}
        id={feed?.id}
        feed={feed}
      />
    </Box>
  );
};

export default Post;
