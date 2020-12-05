import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Heading,
  Grid,
} from '@chakra-ui/react';
import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import { SignInSchema } from 'utils/validation';
import { Formik } from 'formik';
import useAuth from 'context/userContext';

const AuthModal = ({ isOpen, onClose }) => {
  const { signin } = useAuth();

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await signin(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction='column' mb={8} textAlign='center'>
            <Heading as='h3' fontWeight='bold' fontSize={{ md: '2xl' }}>
              Sign into your account
            </Heading>
          </Flex>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
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
                <Grid gap={4} mb={8}>
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
                </Grid>

                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  loadingText='Logging you in'
                  title='Sign In'
                  w='100%'
                  h={12}
                />
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
