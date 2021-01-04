import {
  Avatar,
  Box,
  Flex,
  Icon,
  Input,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import useAPI from 'context/apiContext';
import React from 'react';
import { BiCamera } from 'react-icons/bi';
import { QueryClient, useMutation } from 'react-query';

const ProfileImage = ({ user, mt = -16, size = '2xl', bottom = 6 }) => {
  const { profilePicture } = useAPI();
  const queryClient = new QueryClient();
  const { colorMode } = useColorMode();
  const toast = useToast();

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

  return (
    <Box mt={mt} ml={2} pos='relative'>
      <Avatar
        size={size}
        borderWidth={4}
        borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        src={user?.profile_picture}
      />
      {user?.is_self && (
        <Flex
          as='label'
          align='center'
          justify='center'
          w={12}
          h={13}
          rounded='100%'
          pos='absolute'
          right={0}
          bottom={bottom}
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
  );
};

export default ProfileImage;
