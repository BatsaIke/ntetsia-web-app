import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  GridItem,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import Button from "components/Button";
import FollowCard from "components/Cards/FollowCard";
import Post from "components/Cards/Post";
import PostSkeleton from "components/Cards/PostSkeleton";
import Tabs from "components/Tabs/Tabs";
import Layout from "container/Layout";
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
import CoverImage from "components/Cards/CoverImage";
import ProfileImage from "components/Cards/ProfileImage";
import { BiPencil } from "react-icons/bi";
import useComponent from "context/componentContext";
import useFeed from "hooks/useFeeds";
import InfiniteScroll from "react-infinite-scroll-component";
import LeftMenu from "container/LeftMenu";
import RightSidebar from "container/RightSidebar";
import { CgFeed } from "react-icons/cg";
import LeftProfile from "./LeftProfile";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const { location } = useHistory();
  const state = location?.state;
  const { colorMode } = useColorMode();
  const queryClient = new QueryClient();
  const { user } = useProfile();
  const { follow, unfollow } = useAPI();
  const { user: others } = useOthersProfile(state?.member?.id);
  const { handleModalClick } = useComponent();
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

  return (
    
    <Box 
      // // pageTitle={`${newUser?.first_name || "firstname"} ${
      // //   newUser?.last_name || "lastname"
      // // }`}
      path="/home"
      icon
      color="#002060"

      // // py={12}
      // // post={newUser?.posts_count}
    >
     
      <Grid

templateColumns="10% 15% 48% 15%"
fontFamily="body"
fontSize={{ md: "md" }}
>
          <GridItem  position="static" top="0" >
           <LeftMenu />
          </GridItem>

          <GridItem position="sticky">
            <LeftProfile/>
            </GridItem>

            <GridItem position="relative" alignContent="center" justifyContent="center" ml="3px" resize="none" >
              <ProfileDetails/>
              </GridItem>
      
       
      
      
    <GridItem>
      <RightSidebar/>
    </GridItem>
    </Grid>
    
    </Box>
  );
};

export default Profile;
