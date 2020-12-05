import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const FormInput = ({
  label,
  name,
  value,
  error,
  touch,
  setFieldTouched,
  ref,
  isRequired,
  ...rest
}) => {
  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        h={12}
        name={name}
        ref={ref}
        rounded='none'
        borderWidth={2}
        {...rest}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
