import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
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
import { BsBell } from 'react-icons/bs';

const LeftSidebar = () => {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useProfile();

  return (
    <Flex
      as='aside'
      pos='fixed'
      bottom={0}
      h={{ lg: '100vh' }}
      zIndex={20}
      boxShadow=' sm'
      borderRightWidth={1}
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      w='17.5rem'
      pl={10}
    >
      <Flex direction='column' justify='space-between' pb={4}>
        <Box>
          <Link
            as={NavLink}
            _hover={{ textDecor: 'none' }}
            _focus={{ textDecor: 'none' }}
            to='/profile'
          >
            <Box
              pos='relative'
              borderWidth={1}
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
              rounded='sm'
            >
              <Box h={24} w='100%'>
                <Image
                  h='100%'
                  w='100%'
                  objectFit='cover'
                  src={user?.background_picture}
                />
              </Box>
              <Flex pos='absolute' top={16} left={4}>
                <Avatar
                  src={user?.profile_picture}
                  borderWidth={2}
                  borderColor='gray.400'
                />
              </Flex>
              <Box mt={4} fontWeight='bold' pl={4} py={2}>
                <Text fontSize={{ md: 'lg' }}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Box fontSize='sm' mt={-1}>
                  <Text as='span'>{user?.occupation}</Text>
                </Box>
              </Box>
            </Box>
          </Link>

          <Box pr={2} mt={6}>
            <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={1}>
              <Image
                src='https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
                rounded='sm'
              />
              <Image
                src='https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
                rounded='sm'
              />
              <Image
                src='https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
                rounded='sm'
              />
              <Image
                src='https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
                rounded='sm'
              />
            </Grid>
          </Box>

          <Box mt={6}>
            <Link
              as={NavLink}
              to='/'
              d='block'
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
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
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
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
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
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
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
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
              to='/notifications'
              d='block'
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
              fontWeight='bold'
              _hover={{
                textDecor: 'none',
                bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                rounded: '30px',
                transition: 'background-color .3s ease-in-out',
              }}
              px={4}
            >
              <Icon as={BsBell} boxSize={6} mr={3} />
              Notifications
            </Link>
            <Link
              as={NavLink}
              to='/settings'
              d='block'
              py={{ md: 2 }}
              fontSize={{ md: 'lg' }}
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
          </Box>

          <Flex
            align='center'
            py={{ md: 2 }}
            fontSize={{ md: 'lg' }}
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
          <Box
            d='block'
            py={{ md: 2 }}
            fontSize={{ md: 'lg' }}
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
