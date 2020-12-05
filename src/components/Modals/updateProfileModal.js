import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Heading,
  Text,
  Grid,
  Box,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from 'components/Form/FormInput';
import FormTextArea from 'components/Form/FormTextArea';
import useComponent from 'context/componentContext';
import Button from 'components/Button';

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { selectedData } = useComponent();

  console.log('selectedData', selectedData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalBody my={10}>
          <Flex direction='column' align='center' justify='center'>
            <Heading as='h4' size='md'>
              Update your profile
            </Heading>
            <Text fontSize='sm'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Text>
          </Flex>

          <Formik
            initialValues={{
              first_name: selectedData?.first_name,
              last_name: selectedData?.last_name,
              occupation: selectedData?.occupation,
              phone: selectedData?.phone,
              city: selectedData?.city,
              region: selectedData?.region,
              country: selectedData?.country,
              bio: selectedData?.bio,
            }}
            enableReinitialize
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
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
                  />
                </Box>

                <Flex align='center' justify='center' mt={4}>
                  <Button
                    title='Cancel'
                    rounded='30px'
                    borderWidth={2}
                    borderColor='blue.500'
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                    color='blue.500'
                    mr={6}
                    w={32}
                    onClick={onClose}
                  />
                  <Button
                    title='Save profile'
                    rounded='30px'
                    w={40}
                    type='submit'
                    isLoading={isSubmitting}
                  />
                </Flex>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
