import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  useColorMode,
  Text,
  Image,
  PinInput,
  PinInputField,
  HStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { ResetPasswordSchema } from 'utils/validation';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import useAuth from 'context/userContext';

const ResetPassword = () => {
  const { colorMode } = useColorMode();
  const { resetPassword } = useAuth();
  const [value, setValue] = React.useState('');

  const onHandleChange = (value) => {
    setValue(value);
  };

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      const data = {
        reset_code: value,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      await resetPassword(data);
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
            Reset your password
          </Heading>
          <Text>
            Please check your email for a message with your code. Your code is 5
            numbers long.
          </Text>
        </Flex>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={ResetPasswordSchema}
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
              {console.log('values', values)}
              <Grid gap={4} mb={6}>
                <HStack>
                  <PinInput
                    size='lg'
                    value={value}
                    onChange={onHandleChange}
                    name='reset_code'
                  >
                    <PinInputField
                      rounded='none'
                      borderWidth={2}
                      borderColor='gray.400'
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'gray.600' }}
                    />
                    <PinInputField
                      rounded='none'
                      borderWidth={2}
                      borderColor='gray.400'
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'gray.600' }}
                    />
                    <PinInputField
                      rounded='none'
                      borderWidth={2}
                      borderColor='gray.400'
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'gray.600' }}
                    />
                    <PinInputField
                      rounded='none'
                      borderWidth={2}
                      borderColor='gray.400'
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'gray.600' }}
                    />
                    <PinInputField
                      rounded='none'
                      borderWidth={2}
                      borderColor='gray.400'
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'gray.600' }}
                    />
                  </PinInput>
                </HStack>

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

                <FormInput
                  label='Password'
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touch={touched.password}
                  value={values.password}
                  variant='filled'
                />

                <FormInput
                  label='Confirm Password'
                  type='password'
                  placeholder='Confirm Password'
                  name='password_confirmation'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password_confirmation}
                  touch={touched.password_confirmation}
                  value={values.password_confirmation}
                  variant='filled'
                />
              </Grid>

              <Button
                type='submit'
                isLoading={isSubmitting}
                loadingText='Resetting password'
                title='Reset Password'
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

export default ResetPassword;
