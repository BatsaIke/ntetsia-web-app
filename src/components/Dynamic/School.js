import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import FormFieldArray from 'components/Form/FormFieldArray';
import { Formik } from 'formik';
import { useFetchUserSchools, useProfile } from 'hooks/useGlobalHooks';
import React from 'react';

const School = () => {
  const { user } = useProfile();
  const { schools } = useFetchUserSchools(user?.id);

  return (
    <Box>
      <Box>
        <Heading as='h4' size='xl'>
          Education
        </Heading>
        <Text fontSize='sm' color='gray.600'>
          Update or add new educational info.
        </Text>
      </Box>

      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        my={10}
      />

      <Formik
        enableReinitialize
        initialValues={{ schools }}
        // onSubmit={}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormFieldArray
              fieldName='schools'
              fieldObj={{
                school_name: '',
                year_admitted: '',
                year_completed: '',
              }}
              values={values.schools}
              label='School'
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              title='Schools'
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default School;
