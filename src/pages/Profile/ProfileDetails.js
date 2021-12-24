
import {
    Box,
    Divider,
    Flex,
    Grid,
    Heading,
    Icon,
    Image,
    Text,
    useColorMode,
  } from "@chakra-ui/react";
  import moment from "moment";
  import FollowCard from "components/Cards/FollowCard";
  import Post from "components/Cards/Post";
  import PostSkeleton from "components/Cards/PostSkeleton";
  import Tabs from "components/Tabs/Tabs";
  import useAPI from "context/apiContext";
  import {
    useFetchUserSchools,
    useFetchUserWorks,
    useFollowers,
    useFollowing,
    useOthersProfile,
    useProfile,
  } from "hooks/useGlobalHooks";
  import React from "react";
  import { QueryClient, useMutation } from "react-query";
  import { useHistory } from "react-router-dom";
  import { BiArrowBack} from "react-icons/bi";
  import useComponent from "context/componentContext";
  import useFeed from "hooks/useFeeds";
  import InfiniteScroll from "react-infinite-scroll-component";


  
  const ProfileDetails = () => {
    const { location } = useHistory();
    const state = location?.state;
   
    const queryClient = new QueryClient();
    const { user } = useProfile();
    const { follow, unfollow } = useAPI();
    const { user: others } = useOthersProfile(state?.member?.id);
    const { feedsData, page, setPage } = useFeed();
  
    const newUser = location.pathname === "/profile" ? user : others;
  
    const { schools } = useFetchUserSchools(newUser?.id);
    const { works } = useFetchUserWorks(newUser?.id);
  
    const filteredFeeds = feedsData.filter((e) => e.is_owner === true);
  
    const mutateFollow = useMutation(follow, {
      onSuccess: () => queryClient.invalidateQueries("profile"),
    });
  
    const mutateUnfollow = useMutation(unfollow, {
      onSuccess: () => queryClient.invalidateQueries("profile"),
    });
  
    const followUnfollow = () => {
      if (newUser.is_following === false) {
        mutateFollow.mutate({ member_id: newUser?.id });
      } else {
        mutateUnfollow.mutate({ member_id: newUser?.id });
      }
    };
  
    const { userFollowing } = useFollowing(newUser?.id);
    const { userFollowers } = useFollowers(newUser?.id);


    return(
<Box  > 
<Box  
    flexDirection="row"
    shadow="sm"
      zIndex="999999"
      position="fixed"
      w="49%"
      path="/home"
      icon
      bg="white"

      >
          {<Icon as={BiArrowBack} boxSize={6} mr={3} color="black" />}
          {<Text color="#002060" fontSize="18px" fontWeight="bold" textAlign="center">NTETSIA</Text>}
    </Box>
    <Box  >
        <Box height="50">

        </Box>
        

<Tabs position="relative" top="100">
          <Box label="Posts">
            <InfiniteScroll
              next={() => setPage(page + 1)}
              hasMore={true}
              dataLength={filteredFeeds.length}
              loader={
                <Box minW="100%">
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </Box>
              }
            >
              {filteredFeeds.map((feed) => (
                <Post key={feed.id} feed={feed} user={feed?.member} />
              ))}
            </InfiniteScroll>
          </Box >
          <Box label="About Me">
            <Box shadow="sm" >
              <Flex align="center">
                <Heading as="h6" w={40} fontSize={{ md: "lg" }}>
                  Biography
                </Heading>
                <Divider />
              </Flex>
              <Text>{newUser?.bio}</Text>
            </Box>

            <Box my={10} shadow="sm" >
              <Flex align="center">
                <Heading as="h6" w={90} fontSize={{ md: "lg" }}>
                  Educational Background
                </Heading>
                <Divider />
              </Flex>
              {schools?.map((school) => (
                <Flex
                  align="center"
                  justify="space-between"
                  key={school?.id}
                  mt={6}
                  borderBottomWidth={1}
                  pb={4}
                >
                  <Box>
                    <Text fontWeight={800} fontSize={{ md: "lg" }}>
                      {school?.school_name}
                    </Text>
                    <Text>Business Admin</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontWeight={800} fontSize={{ md: "lg" }}>
                      Class of
                    </Text>
                    <Text>{school?.year_completed}</Text>
                  </Box>
                  <Box h={14} w={14}>
                    <Image
                      h="100%"
                      w="100%"
                      src="https://mmarimamma.co.uk/wp-content/uploads/2017/03/MMA-logo.png"
                    />
                  </Box>
                </Flex>
              ))}
            </Box>

            <Box>
              <Flex align="center">
                <Heading as="h6" w={90} fontSize={{ md: "lg" }}>
                  Working Experience
                </Heading>
                <Divider  width="90%"/>
              </Flex>

              {works?.map((work) => {
                const from = moment(work?.from);
                const to = moment(work?.to);
                from.to(to);
                console.log("from", from.format("Y"));
                // console.log('to', to);

                return (
                  <Flex
                    align="center"
                    justify="space-between"
                    key={work?.id}
                    mt={6}
                    borderBottomWidth={1}
                    pb={4}
                  >
                    <Box h={14} w={14}>
                      <Image
                        h="100%"
                        w="100%"
                        src="https://mmarimamma.co.uk/wp-content/uploads/2017/03/MMA-logo.png"
                      />
                    </Box>
                    <Box>
                      <Text fontWeight={800} fontSize={{ md: "lg" }}>
                        {work?.company_name}
                      </Text>
                      <Text>{work?.position}</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text>{moment(work?.to).diff(work.from)} year ago</Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>

          <Box label="Branch" >
           <Heading>Branch</Heading>
            </Box>

          <Box 
          label={`${newUser?.following_count} Following`}
          >
            <Grid gap={4} p={6}>
              {userFollowing?.data.map(
                (item) =>
                  !item?.is_self && <FollowCard key={item?.id} data={item} />
              )}
            </Grid>
          </Box>
          <Box label={`${newUser?.followers_count} Followers`}>
            <Grid gap={4} p={6}>
              {userFollowers?.data.map(
                (item) => !item?.is_self && <FollowCard data={item} />
              )}
            </Grid>
          </Box>
          
        </Tabs>
        </Box>
        
</Box>
    )
}
export default ProfileDetails;