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
          <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4}>
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
              inputType
              value={reference}
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
              inputType
              value={reference}
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
              inputType
              value={reference}
            />
          </Grid>
        );
      case 'Works':
        return (
          <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4}>
            <FormInput
              type='text'
              id={`${name}item`}
              name={`${name}item`}
              placeholder='Item'
              label='Item'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.item}
              touched={touched && touched.item}
              inputType
              value={reference.item}
            />

            <FormInput
              type='number'
              width='90px'
              id={`${name}quantity`}
              name={`${name}quantity`}
              placeholder='Quantity'
              label='Quantity'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.quantity}
              touched={touched && touched.quantity}
              inputType
              value={reference.quantity}
            />

            <FormInput
              type='number'
              width='90px'
              id={`${name}quantity`}
              name={`${name}quantity`}
              placeholder='Quantity'
              label='Quantity'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.quantity}
              touched={touched && touched.quantity}
              inputType
              value={reference.quantity}
            />

            <FormInput
              type='number'
              width='90px'
              id={`${name}quantity`}
              name={`${name}quantity`}
              placeholder='Quantity'
              label='Quantity'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.quantity}
              touched={touched && touched.quantity}
              inputType
              value={reference.quantity}
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
