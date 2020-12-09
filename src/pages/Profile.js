import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import Button from 'components/Button';
import FollowCard from 'components/Cards/FollowCard';
import Post from 'components/Cards/Post';
import PostSkeleton from 'components/Cards/PostSkeleton';
import Tabs from 'components/Tabs/Tabs';
import Layout from 'container/Layout';
import useAPI from 'context/apiContext';
import useComponent from 'context/componentContext';
import {
  useFeeds,
  useFollowers,
  useFollowing,
  useOthersProfile,
  useProfile,
} from 'hooks/useGlobalHooks';
import React from 'react';
import { BiCamera } from 'react-icons/bi';
import { useMutation, useQueryCache } from 'react-query';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const { location } = useHistory();
  const state = location?.state;
  const { colorMode } = useColorMode();
  const queryCache = useQueryCache();
  const { user } = useProfile();
  const { handleModalClick } = useComponent();
  const { profilePicture, backgroundImage, follow, unfollow } = useAPI();
  const toast = useToast();
  const { user: others } = useOthersProfile(state?.member?.id);
  const { feeds, isLoading } = useFeeds();

  const newUser = location.pathname === '/profile' ? user : others;

  const [uploadProfilePhoto] = useMutation(profilePicture, {
    onSuccess: () => queryCache.invalidateQueries('profile'),
  });

  const [uploadBackgroundPhoto] = useMutation(backgroundImage, {
    onSuccess: () => queryCache.invalidateQueries('profile'),
  });

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file?.name);
    const res = await uploadProfilePhoto(formData);
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

  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file?.name);
    const res = await uploadBackgroundPhoto(formData);
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

  const [mutateFollow] = useMutation(follow, {
    onSuccess: () => queryCache.invalidateQueries('profile'),
  });

  const [mutateUnfollow] = useMutation(unfollow, {
    onSuccess: () => queryCache.invalidateQueries('profile'),
  });

  const followUnfollow = () => {
    if (newUser.is_following === false) {
      mutateFollow({ member_id: newUser?.id });
    } else {
      mutateUnfollow({ member_id: newUser?.id });
    }
  };

  const { userFollowing } = useFollowing(newUser?.id);
  const { userFollowers } = useFollowers(newUser?.id);

  // console.log('new user', newUser);
  // console.log('feeds', feeds);

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
        <Box h={56} pos='relative'>
          <Image
            h='100%'
            w='100%'
            objectFit='cover'
            src={newUser?.background_picture}
            alt={newUser?.first_name}
          />
          {newUser?.is_self && (
            <Flex
              as='label'
              rounded='md'
              align='center'
              pos='absolute'
              left={4}
              top={4}
              py={1}
              px={3}
              bg='white'
              color='gray.800'
              cursor='pointer'
            >
              <Input
                d='none'
                type='file'
                name='profile'
                id='profile'
                onChange={handleUploadChange}
              />
              <Icon as={BiCamera} boxSize={5} />
              <Text as='span' ml={2} fontSize='sm'>
                Change background image
              </Text>
            </Flex>
          )}
        </Box>

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
                title='Edit profile'
                rounded='30px'
                borderWidth={2}
                borderColor='blue.500'
                bg='transparent'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                color='blue.500'
                mt={2}
                onClick={() =>
                  handleModalClick('profile', newUser, newUser?.id)
                }
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
            <Flex align='center' my={1}>
              <Text mr={12} fontWeight='bold'>
                {newUser?.following_count}{' '}
                <Text
                  as='span'
                  color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                >
                  Following
                </Text>
              </Text>
              <Text fontWeight='bold'>
                {newUser?.followers_count}{' '}
                <Text
                  as='span'
                  color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                >
                  {newUser?.followers_count > 1 ? 'Followers' : 'Follower'}
                </Text>
              </Text>
            </Flex>
          </Flex>

          <Divider
            orientation='horizontal'
            borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
            my={4}
          />

          <Box mt={4} fontWeight='semibold'>
            <Flex
              fontWeight='bold'
              color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
            >
              <Text mr={10}>
                Referer ID:{' '}
                <Text as='span' color='white'>
                  {newUser?.referer_id}
                </Text>
              </Text>
              <Text>
                Email:{' '}
                <Text as='span' color='white'>
                  {newUser?.email}
                </Text>
              </Text>
            </Flex>

            <Flex align='center' fontWeight='semibold'>
              <Text>City: {newUser?.city || 'No City'}</Text>
              <Text mx={12}>Region: {newUser?.region || 'No Region'}</Text>
              <Text>Country: {newUser?.country || 'No Country'}</Text>
            </Flex>

            <Box mt={6} fontWeight='normal'>
              <Text>{newUser?.bio || 'You have no bio'}</Text>
            </Box>
          </Box>
        </Box>

        <Divider
          orientation='horizontal'
          borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
          my={4}
        />

        <Tabs>
          <Box label='My Feeds'>
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
          <Box label='Following'>
            <Grid gap={4} p={6}>
              {userFollowing?.data.map(
                (item) =>
                  !item?.is_self && <FollowCard key={item?.id} data={item} />
              )}
            </Grid>
          </Box>
          <Box label='Followers'>
            <Grid gap={4} p={6}>
              {userFollowers?.data.map(
                (item) =>
                  !item?.is_self && (
                    <FollowCard data={item} onClick={followUnfollow} />
                  )
              )}
            </Grid>
          </Box>
          <Box label='Contributions'>contributions</Box>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Profile;
