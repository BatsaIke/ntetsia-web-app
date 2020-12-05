import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { CgFeed } from 'react-icons/cg';
import { GiSuitcase, GiReceiveMoney } from 'react-icons/gi';
import { IoIosBulb } from 'react-icons/io';
import useAuth from 'context/userContext';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiCog, BiMoon, BiSun } from 'react-icons/bi';
import { useProfile } from 'hooks/useGlobalHooks';

const LeftSidebar = () => {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, loading } = useProfile();

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
      borderRightWidth={1}
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      w='17.5rem'
      pl={10}
    >
      <Flex direction='column' justify='space-between'>
        <Box>
          <Box mb={16}>
            <Image
              src={
                colorMode === 'dark'
                  ? require('../assets/images/logo.png').default
                  : require('../assets/images/dark-logo.png').default
              }
            />
          </Box>

          <Link
            as={NavLink}
            to='/'
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              textDecor: 'none',
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
          >
            <Icon as={CgFeed} boxSize={6} mr={3} /> Feeds
          </Link>
          <Link
            as={NavLink}
            to='/jobs'
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              textDecor: 'none',
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
          >
            <Icon as={GiSuitcase} boxSize={6} mr={3} />
            Jobs
          </Link>
          <Link
            as={NavLink}
            to='/contribution'
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              textDecor: 'none',
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
          >
            <Icon as={GiReceiveMoney} boxSize={6} mr={3} />
            Contribution
          </Link>
          <Link
            as={NavLink}
            to='/my-ideas'
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              textDecor: 'none',
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
          >
            <Icon as={IoIosBulb} boxSize={6} mr={3} />
            My Ideas
          </Link>
          <Link
            as={NavLink}
            to='/'
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              textDecor: 'none',
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
          >
            <Icon as={BiCog} boxSize={6} mr={3} />
            Settings
          </Link>

          <Flex
            align='center'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            px={4}
            onClick={toggleColorMode}
            cursor='pointer'
            _hover={{
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            as='button'
            role='button'
            aria-label='Theme button'
          >
            <Icon
              as={colorMode === 'dark' ? BiSun : BiMoon}
              boxSize={6}
              mr={3}
            />
            {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Flex>
        </Box>

        <Box>
          <Link
            as={NavLink}
            _hover={{ textDecor: 'none' }}
            _focus={{ textDecor: 'none' }}
            px={4}
            to='/profile'
          >
            {loading && (
              <Flex align='center' padding='3' boxShadow='lg'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' />
              </Flex>
            )}
            <Flex mb={{ md: 2 }} h={12}>
              <Avatar
                borderWidth={2}
                width={8}
                height={8}
                borderColor='white'
                src={user?.profile_picture}
              />
              <Box ml={3} fontWeight='bold'>
                <Text fontSize={{ md: 'xl' }}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Box fontSize='sm'>
                  <Text as='span'>{user?.occupation}</Text>
                </Box>
              </Box>
            </Flex>
          </Link>

          <Box
            d='block'
            py={{ md: 3 }}
            fontSize={{ md: 'xl' }}
            fontWeight='bold'
            _hover={{
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
              rounded: '30px',
              transition: 'background-color .3s ease-in-out',
            }}
            px={4}
            as='button'
            role='button'
            aria-label='Logout button'
            onClick={logout}
          >
            <Icon as={HiOutlineLogout} boxSize={6} mr={3} />
            Logout
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftSidebar;
