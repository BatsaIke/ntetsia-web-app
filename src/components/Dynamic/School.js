import { Box, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import KPIArray from 'components/Form/KPIArray';
import { Formik } from 'formik';
import React from 'react';

const School = () => {
  return (
    <Box>
      <Flex justify='space-between' align='flex-end'>
        <Box>
          <Heading as='h4' size='xl'>
            Education
          </Heading>
          <Text fontSize='sm' color='gray.600'>
            Update or add new educational info.
          </Text>
        </Box>

        <Box>
          <Button title='Add new school' />
        </Box>
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
          school_name: 'My School',
          year_admitted: '2007',
          year_completed: '2011',
        }}
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
            <KPIArray
              fieldName='schools'
              fieldObj={{
                school_name: '',
                year_admitted: '',
                year_completed: '',
              }}
              values={values.kpis}
              label='KPI'
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              title='Schools'
            />

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

export default School;
