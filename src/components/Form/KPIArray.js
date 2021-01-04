import React from 'react';
import { FieldArray } from 'formik';
import { Box, Grid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import ThirdPartyInput from './ThirdPartyInput';
import { BsTrash } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import Button from 'components/Button';

const KPIArray = ({
  fieldName,
  fieldObj,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  label,
  title,
}) => {
  return (
    <FieldArray name={fieldName}>
      {({ push, remove }) => (
        <>
          <Box mb={4}>
            {values?.map((value, i) => (
              <ThirdPartyInput
                key={i}
                name={`${fieldName}.${i}.`}
                reference={value}
                label={label}
                handleChange={handleChange}
                handleBlur={handleBlur}
                title={title}
                errors={
                  errors && errors.thirdPartyRef && errors.thirdPartyRef[i]
                }
                touched={
                  touched && touched.thirdPartyRef && touched.thirdPartyRef[i]
                }
              />
            ))}
          </Box>
          <Box float='right' mt={6}>
            {values?.length > 1 && (
              <Button
                startEnhancer={() => <BsTrash size={24} />}
                onClick={() => remove(values?.length - 1)}
                title={`Remove ${label}`}
                bgColor='#E53E3E'
                color='#fff'
                _hover={{ bg: '#E53E3E' }}
                _active={{ bg: '#E53E3E' }}
                type='button'
              />
            )}

            <Button
              startEnhancer={() => <IoIosAdd size={24} />}
              onClick={() => push(fieldObj)}
              disabled={values?.length === 6}
              title={`Add another ${label}`}
              marginLeft='10px'
              type='button'
            />
          </Box>
        </>
      )}
    </FieldArray>
  );
};

KPIArray.propTypes = {
  values: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldObj: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default KPIArray;
