import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import FollowCard from 'components/Cards/FollowCard';
import { usePeople } from 'hooks/useGlobalHooks';

const RightSidebar = () => {
  const { colorMode } = useColorMode();
  const { people } = usePeople();

  console.log('people', people);

  return (
    <Flex
      as='aside'
      pos='fixed'
      bottom={0}
      h={{ lg: '100vh' }}
      zIndex={20}
      pt={10}
      pb={5}
      boxShadow=' sm'
      pl={{ md: 5 }}
      borderLeftWidth={1}
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      w={85}
    >
      <Flex direction='column'>
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
          p={6}
          w={85}
          rounded='md'
          shadow='sm'
        >
          <Heading as='h5' size='md'>
            Advertisement Board
          </Heading>

          <Text mt={4}>
            Have a product to advertise? Contact Ntetsia today to show your
            products to our members.
          </Text>
        </Box>

        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
          p={6}
          w={85}
          rounded='md'
          mt={8}
          shadow='sm'
        >
          <Heading as='h5' size='md'>
            Who to follow
          </Heading>

          <Divider orientation='horizontal' my={3} />

          {people?.slice(0, 5).map((person) => {
            if (person.is_following === false) {
              return <FollowCard key={person.id} data={person} />;
            }
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default RightSidebar;
