import Layout from 'container/Layout';
import { Box, Icon, Link, Text, useColorMode } from '@chakra-ui/react';
import { useFetchComment } from 'hooks/useGlobalHooks';
import React from 'react';
import { Link as ReachRouter, useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PostCard from 'components/Cards/PostCard';
import PostSkeleton from 'components/Cards/PostSkeleton';
import CommentCard from 'components/Cards/CommentCard';

const Feed = () => {
  const { location } = useHistory();
  const feed = location?.state;
  const { colorMode } = useColorMode();

  const { comments, isLoading: loading } = useFetchComment(feed?.id);

  return (
    <Layout>
      <Box
        mb={14}
        py={{ md: 10 }}
        px={4}
        color={colorMode === 'dark' ? 'white' : 'gray.700'}
      >
        <Box borderY='1px' py={3} borderColor='gray.600' mb={4}>
          <Link as={ReachRouter} to='/' _hover={{ textDecor: 'none' }}>
            <Icon as={BsArrowLeft} boxSize={6} />
            <Text as='span' ml={5} fontWeight='bold'>
              Feeds
            </Text>
          </Link>
        </Box>

        <PostCard user={feed?.member} feed={feed} />

        {loading && (
          <>
            <PostSkeleton />
          </>
        )}

        <Box>
          {comments?.data?.data?.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              comment={comment}
              user={comment.member}
              replies={comment.replies}
              pId={feed?.id}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Feed;
