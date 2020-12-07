import { Box } from '@chakra-ui/react';
import React from 'react';
import FeedBox from 'components/Cards/FeedBox';
import Post from 'components/Cards/Post';
import PostSkeleton from 'components/Cards/PostSkeleton';

import { useFeeds } from 'hooks/useGlobalHooks';
import Layout from 'container/Layout';
import Button from 'components/Button';

const Home = () => {
  const [state, setState] = React.useState([]);
  const { feeds, isLoading } = useFeeds();

  // React.useEffect(() => {
  //   setState(feeds);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const fetchMore = () => {
    return feeds.links.next;
  };

  console.log('data', feeds);

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

        <Button
          onClick={() => fetchMore}
          // disabled={!canFetchMore || isFetchingMore}
          title='Loading more...'
        />
      </Box>
    </Layout>
  );
};

export default Home;
