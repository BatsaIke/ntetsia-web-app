import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@chakra-ui/react';
import FormInput from './FormInput';

const ThirdPartyInput = ({
  name,
  reference,
  handleChange,
  handleBlur,
  errors,
  touched,
  label,
  title,
}) => {
  const getForm = (title) => {
    switch (title) {
      case 'Schools':
        return (
          <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={6}>
            <FormInput
              type='text'
              id={`${name}school_name`}
              name={`${name}school_name`}
              placeholder={label}
              label='School name'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.school_name}
              touched={touched && touched.school_name}
              value={reference.school_name}
            />

            <FormInput
              type='year'
              id={`${name}year_admitted`}
              name={`${name}year_admitted`}
              placeholder={label}
              label='Year admitted'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.year_admitted}
              touched={touched && touched.year_admitted}
              value={reference.year_admitted}
            />

            <FormInput
              type='year'
              id={`${name}year_completed`}
              name={`${name}year_completed`}
              placeholder={label}
              label='Year completed'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.year_completed}
              touched={touched && touched.year_completed}
              value={reference.year_completed}
            />
          </Grid>
        );
      case 'Works':
        return (
          <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={6}>
            <FormInput
              id={`${name}company_name`}
              name={`${name}company_name`}
              placeholder='Company name'
              label='Company name'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.company_name}
              touched={touched && touched.company_name}
              value={reference.company_name}
            />

            <FormInput
              id={`${name}position`}
              name={`${name}position`}
              placeholder='Position'
              label='Position'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.position}
              touched={touched && touched.position}
              value={reference.position}
            />

            <FormInput
              id={`${name}from`}
              name={`${name}from`}
              placeholder='Start Date'
              label='Start Date'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.from}
              touched={touched && touched.from}
              value={reference.to}
              type='year'
            />

            <FormInput
              id={`${name}to`}
              name={`${name}to`}
              placeholder='End Date'
              label='End Date'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.to}
              touched={touched && touched.to}
              value={reference.to}
              type='year'
            />
          </Grid>
        );
      default:
        return null;
    }
  };

  return <Box>{getForm(title)}</Box>;
};

ThirdPartyInput.propTypes = {
  reference: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
  name: PropTypes.string.isRequired,
};

export default ThirdPartyInput;
