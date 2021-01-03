import Layout from 'container/Layout';
import { Box } from '@chakra-ui/react';
import { useFetchComment } from 'hooks/useGlobalHooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PostCard from 'components/Cards/PostCard';
import PostSkeleton from 'components/Cards/PostSkeleton';
import CommentCard from 'components/Cards/CommentCard';

const Feed = () => {
  const { location } = useHistory();
  const feed = location?.state;

  const { comments, isLoading: loading } = useFetchComment(feed?.id);

  return (
    <Layout px={6} pageTitle='Comments' path='/' icon>
      <Box mb={14}>
        <PostCard user={feed?.member} feed={feed} />

        {loading ? (
          <>
            <PostSkeleton />
          </>
        ) : (
          comments?.data?.data?.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              comment={comment}
              user={comment.member}
              pId={feed?.id}
            />
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Feed;
