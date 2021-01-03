import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  useColorMode,
  Text,
  Image,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { RecoverPassword } from 'utils/validation';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import useAuth from 'context/userContext';

const ForgotPassword = () => {
  const { colorMode } = useColorMode();
  const { recoverPassword } = useAuth();

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await recoverPassword(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      h='100vh'
      w='100vw'
      overflow='hidden'
    >
      <Box mb={6}>
        <Image
          src={
            colorMode === 'dark'
              ? require('../assets/images/logo.png').default
              : require('../assets/images/dark-logo.png').default
          }
        />
      </Box>
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : 'white'}
        rounded='lg'
        w={{ md: 108 }}
        mx='auto'
        shadow='lg'
        p={10}
      >
        <Flex direction='column' mb={8} textAlign='center'>
          <Heading as='h3' fontWeight='bold' fontSize={{ md: '2xl' }}>
            Find your account
          </Heading>
          <Text>Please enter your email to search for your account.</Text>
        </Flex>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={RecoverPassword}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid gap={4} mb={6}>
                <FormInput
                  label='Email'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touch={touched.email}
                  value={values.email}
                  variant='filled'
                />
              </Grid>

              <Button
                type='submit'
                isLoading={isSubmitting}
                loadingText='Recovering account'
                title='Recover account'
                w='100%'
                h={12}
              />
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
