import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import Button from 'components/Button';
import FollowCard from 'components/Cards/FollowCard';
import Post from 'components/Cards/Post';
import PostSkeleton from 'components/Cards/PostSkeleton';
import Tabs from 'components/Tabs/Tabs';
import Layout from 'container/Layout';
import useAPI from 'context/apiContext';
import {
  useFeeds,
  useFetchUserSchools,
  useFetchUserWorks,
  useFollowers,
  useFollowing,
  useOthersProfile,
  useProfile,
} from 'hooks/useGlobalHooks';
import React from 'react';
import { BiCamera } from 'react-icons/bi';
import { QueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import CoverImage from 'components/Cards/CoverImage';

const Profile = () => {
  const { location } = useHistory();
  const state = location?.state;
  const { colorMode } = useColorMode();
  const queryClient = new QueryClient();
  const { user } = useProfile();
  const { profilePicture, follow, unfollow } = useAPI();
  const toast = useToast();
  const { user: others } = useOthersProfile(state?.member?.id);
  const { feeds, isLoading } = useFeeds();

  const newUser = location.pathname === '/profile' ? user : others;

  const { schools } = useFetchUserSchools(newUser?.id);
  const { works } = useFetchUserWorks(newUser?.id);

  const uploadProfilePhoto = useMutation(profilePicture, {
    onSuccess: () => queryClient.invalidateQueries('profile'),
  });

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file?.name);
    const res = await uploadProfilePhoto.mutateAsync(formData);
    if (res.status === 200) {
      toast({
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const filteredFeeds = feeds?.data.filter((e) => e.is_owner === true);

  const mutateFollow = useMutation(follow, {
    onSuccess: () => queryClient.invalidateQueries('profile'),
  });

  const mutateUnfollow = useMutation(unfollow, {
    onSuccess: () => queryClient.invalidateQueries('profile'),
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

  console.log('new user', newUser);
  // console.log('feeds', feeds);
  console.log('schools', schools);
  console.log('works', works);

  return (
    <Layout
      pageTitle={`${newUser?.first_name || 'firstname'} ${
        newUser?.last_name || 'lastname'
      }`}
      path='/'
      icon
      py={12}
      post={newUser?.posts_count}
    >
      <Box pos='relative'>
        <CoverImage />

        <Flex justify='space-between'>
          <Box mt={-16} ml={2} pos='relative'>
            <Avatar
              size='2xl'
              borderWidth={4}
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
              src={newUser?.profile_picture}
            />
            {newUser?.is_self && (
              <Flex
                as='label'
                align='center'
                justify='center'
                w={12}
                h={13}
                rounded='100%'
                pos='absolute'
                right={0}
                bottom={6}
                bg='white'
                color='gray.800'
                boxSize={8}
                cursor='pointer'
                shadow='md'
              >
                <Input
                  d='none'
                  type='file'
                  name='image'
                  id='profile'
                  onChange={handleChange}
                />
                <Icon as={BiCamera} />
              </Flex>
            )}
          </Box>
          {newUser?.is_self ? (
            <Box mr={4}>
              <Button
                title='My Ideas'
                rounded='30px'
                borderWidth={2}
                borderColor='blue.500'
                bg='transparent'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                color='blue.500'
                mt={2}
              />
            </Box>
          ) : (
            <Box mr={4}>
              <Button
                title={newUser?.is_following ? 'Following' : 'Follow'}
                rounded='30px'
                borderWidth={2}
                borderColor='blue.500'
                bg={newUser?.is_following ? 'blue.500' : 'transparent'}
                _hover={{
                  bg: newUser?.is_following ? 'blue.500' : 'transparent',
                }}
                _active={{
                  bg: newUser?.is_following ? 'blue.500' : 'transparent',
                }}
                color={newUser?.is_following ? 'white' : 'blue.500'}
                mt={2}
                onClick={followUnfollow}
              />
            </Box>
          )}
        </Flex>

        <Box px={4}>
          <Flex mt={4} justify='space-between'>
            <Box>
              <Text as='span' fontWeight='bold' fontSize='2xl'>
                {newUser?.first_name} {newUser?.last_name}
              </Text>
              <Text color='gray.500' mt={-2}>
                {newUser?.occupation}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Divider
          orientation='horizontal'
          borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
          my={4}
        />

        <Tabs>
          <Box label='Feeds'>
            {isLoading && (
              <Box minW='100%'>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </Box>
            )}
            {filteredFeeds?.map((feed) => (
              <Post key={feed.id} feed={feed} user={feed?.member} />
            ))}
          </Box>
          <Box label={`${newUser?.following_count} Following`}>
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
          <Box label='About'>
            <Box>
              <Flex align='center'>
                <Heading as='h6' w={40} fontSize={{ md: 'lg' }}>
                  Biography
                </Heading>
                <Divider />
              </Flex>
              <Text>{newUser?.bio}</Text>
            </Box>

            <Box my={10}>
              <Flex align='center'>
                <Heading as='h6' w={90} fontSize={{ md: 'lg' }}>
                  Educational Background
                </Heading>
                <Divider />
              </Flex>
              {schools?.map((school) => (
                <Flex
                  align='center'
                  justify='space-between'
                  key={school?.id}
                  mt={6}
                  borderBottomWidth={1}
                  pb={4}
                >
                  <Box>
                    <Text fontWeight={800} fontSize={{ md: 'lg' }}>
                      {school?.school_name}
                    </Text>
                    <Text>Business Admin</Text>
                  </Box>
                  <Box textAlign='center'>
                    <Text fontWeight={800} fontSize={{ md: 'lg' }}>
                      Class of
                    </Text>
                    <Text>{school?.year_completed}</Text>
                  </Box>
                  <Box h={14} w={14}>
                    <Image
                      h='100%'
                      w='100%'
                      src='https://mmarimamma.co.uk/wp-content/uploads/2017/03/MMA-logo.png'
                    />
                  </Box>
                </Flex>
              ))}
            </Box>

            <Box>
              <Flex align='center'>
                <Heading as='h6' w={90} fontSize={{ md: 'lg' }}>
                  Working Experience
                </Heading>
                <Divider />
              </Flex>

              {works?.map((work) => {
                const from = moment(work?.from);
                const to = moment(work?.to);
                from.to(to);
                console.log('from', from.format('Y'));
                // console.log('to', to);

                return (
                  <Flex
                    align='center'
                    justify='space-between'
                    key={work?.id}
                    mt={6}
                    borderBottomWidth={1}
                    pb={4}
                  >
                    <Box h={14} w={14}>
                      <Image
                        h='100%'
                        w='100%'
                        src='https://mmarimamma.co.uk/wp-content/uploads/2017/03/MMA-logo.png'
                      />
                    </Box>
                    <Box>
                      <Text fontWeight={800} fontSize={{ md: 'lg' }}>
                        {work?.company_name}
                      </Text>
                      <Text>{work?.position}</Text>
                    </Box>
                    <Box textAlign='center'>
                      <Text>{moment(work?.to).diff(work.from)} year ago</Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Profile;
