import { Box, Divider, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BiComment } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";

const PostItem = ({ likesCount, liked, postLike }) => {
  return (
    <Box>
      <Divider orientation="horizontal" mt={2} />
      <Flex align="center" fontSize="sm">
        <Flex align="center" mr={6}>
          <Box as="button" role="button" px={2} py={2} onClick={likesCount}>
            <Icon
              as={postLike || liked ? BsHeartFill : BsHeart}
              color={postLike || liked ? "red.600" : ""}
              boxSize={postLike || liked ? 5 : 4}
              mr={1}
            />{" "}
            Like
          </Box>
        </Flex>
        <Flex
          align="center"
          mr={6}
          as="button"
          role="button"
          aria-label="comment button"
        >
          <Box as="button" role="button" px={2} py={2}>
            <Icon as={BiComment} boxSize={4} mr={1} />
            Comment
          </Box>
        </Flex>
        <Flex align="center">
          <Box as="button" role="button" px={2} py={2}>
            <Icon as={AiOutlineRetweet} boxSize={4} mr={1} />
            Share
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostItem;
