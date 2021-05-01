import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Menu } from '@headlessui/react';
import Layout from 'container/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from 'hooks/useGlobalHooks';
import React from 'react';
import { BiCog } from 'react-icons/bi';
import { BsCheck, BsThreeDots } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
// import { QueryClient, useMutation } from 'react-query';

const MotionBox = motion(Box);

const Notifications = () => {
  const { notifications, isLoading } = useNotifications();
  const colorMode = useColorMode();
  // const queryClient = new QueryClient();
  // const mutateDeletePost = useMutation(deletePost, {
  //   onSuccess: () => queryClient.invalidateQueries('feeds'),
  // });

  return (
    <Layout pageTitle='Notifications'>
      <Box>
        <Flex>
          <AnimatePresence>
            <Menu as={Box} pos='absolute' right={4} zIndex={10}>
              {({ open }) => (
                <Box>
                  <Menu.Button
                    as={Flex}
                    align='center'
                    justify='center'
                    _focus={{ outline: 'none' }}
                    _hover={{
                      bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
                      rounded: '100%',
                    }}
                    w={10}
                    h={10}
                    cursor='pointer'
                  >
                    <Icon as={BsThreeDots} />
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      static
                      as={MotionBox}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                      pos='absolute'
                      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
                      w={56}
                      right={0}
                      rounded='sm'
                      mt={-8}
                      color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                      shadow='md'
                      zIndex={10}
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <Box
                            py={2}
                            px={6}
                            _hover={{
                              textDecor: 'none',
                              bg:
                                colorMode === 'dark' ? 'gray.700' : 'gray.200',
                            }}
                            bg={active && 'gray.100'}
                            d='block'
                            cursor='pointer'
                          >
                            <Icon as={BsCheck} boxSize={4} mr={2} /> Mark all as
                            read
                          </Box>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Box
                            py={2}
                            px={6}
                            _hover={{
                              textDecor: 'none',
                              bg:
                                colorMode === 'dark' ? 'gray.700' : 'gray.200',
                            }}
                            bg={active && 'gray.100'}
                            d='block'
                            cursor='pointer'
                          >
                            <Icon as={IoMdClose} boxSize={4} mr={2} /> Mark all
                            as unread
                          </Box>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Box
                            py={2}
                            px={6}
                            _hover={{
                              textDecor: 'none',
                              bg:
                                colorMode === 'dark' ? 'gray.700' : 'gray.200',
                            }}
                            bg={active && 'gray.100'}
                            d='block'
                            cursor='pointer'
                          >
                            <Icon as={BiCog} boxSize={4} mr={2} /> Notifications
                            settings
                          </Box>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  )}
                </Box>
              )}
            </Menu>
          </AnimatePresence>
        </Flex>
        {isLoading ? (
          <Grid gap={4} px={10}>
            <Skeleton height='60px' />
            <Skeleton height='60px' />
            <Skeleton height='60px' />
            <Skeleton height='60px' />
          </Grid>
        ) : (
          notifications?.data.map((notif) => {
            return (
              <Flex
                align='center'
                key={notif?.id}
                py={4}
                px={10}
                borderBottomWidth={1}
                borderBottomColor={
                  colorMode === 'dark' ? 'gray.800' : 'gray.200'
                }
              >
                <Avatar src={notif?.member?.profile_picture} />
                <Box ml={6}>
                  <Text fontWeight='bold'>{notif?.title}</Text>
                  <Text fontSize='sm'>{notif?.body}</Text>
                </Box>
              </Flex>
            );
          })
        )}
      </Box>
    </Layout>
  );
};

export default Notifications;
