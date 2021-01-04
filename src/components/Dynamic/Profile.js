import React from 'react';
import { Heading, Text, Grid, Box, Flex, Divider } from '@chakra-ui/react';
import { Formik } from 'formik';
import { QueryClient, useMutation } from 'react-query';
import { useProfile } from 'hooks/useGlobalHooks';
import useAPI from 'context/apiContext';
import FormInput from 'components/Form/FormInput';
import FormTextArea from 'components/Form/FormTextArea';
import Button from 'components/Button';
import ProfileImage from 'components/Cards/ProfileImage';

const Profile = () => {
  const { user } = useProfile();
  const { patchUserProfile } = useAPI();
  const queryClient = new QueryClient();

  const mutatePatchProfile = useMutation((values) => patchUserProfile(values), {
    onSuccess: () => queryClient.invalidateQueries('profile'),
  });

  const onUserProfilePactch = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await mutatePatchProfile.mutateAsync(values);
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
      <Flex align='center' justify='space-between'>
        <Box>
          <Heading as='h4' size='xl'>
            Profile
          </Heading>
          <Text fontSize='sm' color='gray.600'>
            This information will be displayed publicly.
          </Text>
        </Box>

        <ProfileImage user={user} mt={0} size='2xl' bottom={2} />
      </Flex>

      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        my={10}
      />

      <Formik
        enableReinitialize
        initialValues={{
          first_name: user?.first_name,
          last_name: user?.last_name,
          occupation: user?.occupation,
          phone: user?.phone,
          city: user?.city,
          region: user?.region,
          country: user?.country,
          bio: user?.bio,
        }}
        onSubmit={onUserProfilePactch}
      >
        {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4}>
              <FormInput
                label='First Name'
                name='first_name'
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='Last Name'
                name='last_name'
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='Occupation'
                name='occupation'
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='Phone Number'
                name='phone'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='City'
                name='city'
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='Region'
                name='region'
                value={values.region}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormInput
                label='Country'
                name='country'
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Box mt={4}>
              <FormTextArea
                label='Bio'
                name='bio'
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                borderWidth={2}
                borderColor='gray.400'
                _hover={{ borderColor: 'gray.600' }}
                _focus={{ borderColor: 'gray.600' }}
              />
            </Box>

            <Box mt={6}>
              <Button
                title='Save'
                rounded='30px'
                w={40}
                type='submit'
                isLoading={isSubmitting}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
