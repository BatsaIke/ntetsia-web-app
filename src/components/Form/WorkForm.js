import React from 'react';
import { Grid, Flex } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';

const WorkForm = ({ initialValues, onSubmit, toggleDialog, onClose, mode }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid gap={6}>
            <FormInput
              label='Company Name'
              value={values.company_name}
              name='company_name'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormInput
              label='Position'
              value={values.position}
              name='position'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormInput
              label='Start Date'
              type='year'
              value={values.from}
              name='from'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormInput
              label='End Date'
              type='year'
              value={values.to}
              name='to'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Flex align='center' justify='space-between' my={10}>
            {mode === 'edit' ? (
              <Button
                bg='red.500'
                borderWidth={1}
                borderColor='red.500'
                color='white'
                rounded='30px'
                _hover={{ bg: 'transparent', color: 'red.500' }}
                _active={{ bg: 'transparent', color: 'red.500' }}
                title='Delete'
                onClick={() => {
                  toggleDialog();
                  onClose();
                }}
              />
            ) : (
              <Button
                bg='red.500'
                borderWidth={1}
                borderColor='red.500'
                color='white'
                rounded='30px'
                _hover={{ bg: 'transparent', color: 'red.500' }}
                _active={{ bg: 'transparent', color: 'red.500' }}
                title='Cancel'
                onClick={onClose}
              />
            )}

            <Button
              title='Submit'
              type='submit'
              rounded='30px'
              isLoading={isSubmitting}
            />
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default WorkForm;
