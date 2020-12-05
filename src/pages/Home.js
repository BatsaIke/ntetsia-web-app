import { Box } from '@chakra-ui/react';
import React from 'react';
import FeedBox from 'components/Cards/FeedBox';
import Post from 'components/Cards/Post';
import PostSkeleton from 'components/Cards/PostSkeleton';

import { useFeeds } from 'hooks/useGlobalHooks';
import Layout from 'container/Layout';

const Home = () => {
  const { feeds, isLoading } = useFeeds();

  return (
    <Layout>
      <Box px={6} py={10}>
        <Box mb={14}>
          <Box mb={6}>
            <FeedBox />
          </Box>

          {isLoading && (
            <Box minW='100%'>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </Box>
          )}

          {feeds?.data.map((feed) => (
            <Post key={feed.id} feed={feed} user={feed?.member} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
