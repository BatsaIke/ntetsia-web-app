import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import FormFieldArray from 'components/Form/FormFieldArray';
import { Formik } from 'formik';
import { useFetchUserWorks, useProfile } from 'hooks/useGlobalHooks';
import React from 'react';

const Work = () => {
  const { user } = useProfile();
  const { works } = useFetchUserWorks(user?.id);

  return (
    <Box>
      <Box>
        <Heading as='h4' size='xl'>
          Work Experience
        </Heading>
        <Text fontSize='sm' color='gray.600'>
          Update or add new work info.
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
        initialValues={{ works }}
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
              fieldName='works'
              fieldObj={{
                company_name: '',
                position: '',
                from: '',
                to: '',
              }}
              values={values.works}
              label='Work'
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              title='Works'
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Work;
