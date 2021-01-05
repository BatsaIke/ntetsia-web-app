import React from 'react';
import { FieldArray } from 'formik';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import ThirdPartyInput from './ThirdPartyInput';
import { BsTrash } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import Button from 'components/Button';

const FormFieldArray = ({
  fieldName,
  fieldObj,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  label,
  title,
  isSubmitting,
}) => {
  return (
    <FieldArray name={fieldName}>
      {({ push, remove }) => (
        <>
          <Box mb={4} borderBottomWidth={1} borderBottomColor='gray.300' pb={6}>
            {values?.map((value, i) => (
              <>
                <ThirdPartyInput
                  key={i}
                  name={`${fieldName}.${i}.`}
                  reference={value}
                  label={label}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  title={title}
                  // errors={`${errors} && ${errors.fieldName} && ${errors.fieldName[i]}`}
                  // touched={`${touched} && ${touched.fieldName} && ${touched.fieldName[i]}`}
                />
                <Box mt={6}>
                  <Button
                    title={value?.id ? 'Save' : 'Submit'}
                    rounded='30px'
                    w={40}
                    type='submit'
                    isLoading={isSubmitting}
                  />
                </Box>
              </>
            ))}
          </Box>
          <Box float='right' mt={6}>
            {values?.length > 1 && (
              <Button
                leftIcon={<BsTrash size={20} />}
                onClick={() => remove(values?.length - 1)}
                title={`Remove ${label}`}
                bgColor='#E53E3E'
                color='#fff'
                _hover={{ bg: '#E53E3E' }}
                _active={{ bg: '#E53E3E' }}
              />
            )}

            <Button
              leftIcon={<IoIosAdd size={24} />}
              onClick={() => push(fieldObj)}
              isDisabled={values?.length === 6}
              title={`Add another ${label}`}
              marginLeft='10px'
            />
          </Box>
        </>
      )}
    </FieldArray>
  );
};

FormFieldArray.propTypes = {
  values: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldObj: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default FormFieldArray;
