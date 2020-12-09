import { Box } from '@chakra-ui/react';
import React from 'react';
import FeedBox from 'components/Cards/FeedBox';
import Post from 'components/Cards/Post';
import PostSkeleton from 'components/Cards/PostSkeleton';

import { useFeeds } from 'hooks/useGlobalHooks';
import Layout from 'container/Layout';

const Home = () => {
  const { feeds, isLoading } = useFeeds();

  // const fetchMore = () => {
  //   return feeds.links.next;
  // };

  return (
    <Layout pageTitle='Home' px={6}>
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

        {feeds?.data?.map((feed, i) => (
          <Post key={feed.id} feed={feed} user={feed?.member} />
        ))}
      </Box>
    </Layout>
  );
};

export default Home;
