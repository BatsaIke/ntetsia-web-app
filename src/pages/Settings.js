import React from 'react';
import {
  Flex,
  Text,
  Box,
  Container,
  useColorMode,
  Avatar,
  Image,
  Link,
  Icon,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import useAPI from 'context/apiContext';
import { useMutation, useQueryCache } from 'react-query';
import { useProfile } from 'hooks/useGlobalHooks';
import DynamicSections from 'components/Dynamic';
import {
  BiBell,
  BiBriefcase,
  BiCog,
  BiColorFill,
  BiUser,
} from 'react-icons/bi';

const Settings = () => {
  const { createSchool, createWorkExperiences, patchUserProfile } = useAPI();
  const queryCache = useQueryCache();
  const colorMode = useColorMode();
  const { user } = useProfile();
  const [tab, setTab] = React.useState('compA');

  const [mutateCreateSchool] = useMutation((values) => createSchool(values), {
    onSuccess: () => queryCache.invalidateQueries('schools'),
  });

  const [mutateCreateWorks] = useMutation(
    (values) => createWorkExperiences(values),
    {
      onSuccess: () => queryCache.invalidateQueries('works'),
    }
  );

  const [mutatePatchProfile] = useMutation(
    (values) => patchUserProfile(values),
    {
      onSuccess: () => queryCache.invalidateQueries('profile'),
    }
  );

  const onUserProfilePactch = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      mutatePatchProfile(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const onSchoolsSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      mutateCreateSchool(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const onWorksSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      mutateCreateWorks(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <Box>
      <Flex
        align='center'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor={colorMode === 'dark' ? 'gray.500' : 'gray.200'}
        py={3}
        px={{ md: 16 }}
      >
        <Link as={ReachLink} to='/'>
          <Image
            height={10}
            src={
              colorMode === 'dark'
                ? require('../assets/images/logo.png').default
                : require('../assets/images/dark-logo.png').default
            }
          />
        </Link>
        <Flex align='center'>
          <Text fontWeight={800} mr={4} fontSize={{ md: 'lg' }}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Avatar src={user?.profile_picture} />
        </Flex>
      </Flex>
      <Container
        maxW={{ md: '6xl' }}
        bg='white'
        color='gray.800'
        rounded='md'
        py={16}
        my={24}
      >
        <Flex>
          <Box w='20%' mr={{ md: '5%' }}>
            <Flex
              bg={tab === 'compA' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compA' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compA' && 'white'}
              align='center'
              py={3}
              fontSize={{ md: 'lg' }}
              px={6}
              cursor='pointer'
              onClick={() => setTab('compA')}
            >
              <Icon as={BiUser} mr={2} /> Profile
            </Flex>

            <Flex
              align='center'
              bg={tab === 'compB' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compB' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compB' && 'white'}
              px={6}
              py={3}
              cursor='pointer'
              fontSize={{ md: 'lg' }}
              onClick={() => setTab('compB')}
            >
              <Icon as={BiUser} mr={2} /> Education
            </Flex>
            <Flex
              align='center'
              bg={tab === 'compC' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compC' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compC' && 'white'}
              px={6}
              py={3}
              cursor='pointer'
              fontSize={{ md: 'lg' }}
              onClick={() => setTab('compC')}
            >
              <Icon as={BiBriefcase} mr={2} /> Work Experience
            </Flex>
            <Flex
              align='center'
              bg={tab === 'compD' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compD' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compD' && 'white'}
              px={6}
              py={3}
              cursor='pointer'
              fontSize={{ md: 'lg' }}
              onClick={() => setTab('compD')}
            >
              <Icon as={BiCog} mr={2} /> Account
            </Flex>
            <Flex
              align='center'
              bg={tab === 'compE' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compE' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compE' && 'white'}
              px={6}
              py={3}
              cursor='pointer'
              fontSize={{ md: 'lg' }}
              onClick={() => setTab('compE')}
            >
              <Icon as={BiBell} mr={2} /> Notifications
            </Flex>
            <Flex
              align='center'
              bg={tab === 'compF' ? 'brand.dark' : 'none'}
              borderLeftWidth={tab === 'compF' && 4}
              borderLeftColor='gray.400'
              color={tab === 'compF' && 'white'}
              px={6}
              py={3}
              cursor='pointer'
              fontSize={{ md: 'lg' }}
              onClick={() => setTab('compF')}
            >
              <Icon as={BiColorFill} mr={2} /> Theme
            </Flex>
          </Box>
          <Box w='75%' px={24}>
            <DynamicSections tab={tab} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Settings;
