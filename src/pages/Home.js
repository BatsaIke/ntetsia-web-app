import { Box } from "@chakra-ui/react";
import React from "react";
import FeedBox from "components/Cards/FeedBox";
import Post from "components/Cards/Post";
import PostSkeleton from "components/Cards/PostSkeleton";

import Layout from "container/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import useFeeds from "hooks/useFeeds";

const Home = () => {
  const { feedsData, page, setPage } = useFeeds();
  return (
    <Layout pageTitle="NTETSIA" px={6} color="blue.900"  >
      <Box mb={14} >
        <Box mb={6}>
          <FeedBox />
        </Box>

        <InfiniteScroll
        
        overflowX="hidden"
          next={() => setPage(page + 1)}
          hasMore={true}
          dataLength={feedsData.length}
          loader={
            <Box minW="100%"  >
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </Box>
          }
        >
          {feedsData.map((feed) => (
            <Post key={feed.id} feed={feed} user={feed?.member} />
          ))}
        </InfiniteScroll>
      </Box>
    </Layout>
  );
};

export default Home;
