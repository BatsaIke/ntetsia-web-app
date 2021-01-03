import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import useAPI from 'context/apiContext';
import { useProfile } from 'hooks/useGlobalHooks';
import React from 'react';
import { BiCamera } from 'react-icons/bi';
import { QueryClient, useMutation } from 'react-query';

const CoverImage = ({ height = 56 }) => {
  const { user } = useProfile();
  const { backgroundImage } = useAPI();
  const toast = useToast();
  const queryClient = new QueryClient();

  const uploadBackgroundPhoto = useMutation(backgroundImage, {
    onSuccess: () => queryClient.invalidateQueries('profile'),
  });

  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file?.name);
    const res = await uploadBackgroundPhoto.mutateAsync(formData);
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
    <Box h={height} pos='relative'>
      <Image
        h='100%'
        w='100%'
        objectFit='cover'
        src={user?.background_picture}
        alt={user?.first_name}
      />
      {user?.is_self && (
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
  );
};

export default CoverImage;
