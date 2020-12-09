import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

const FormTextArea = ({
  label,
  name,
  error,
  touch,
  setFieldTouched,
  isRequired,
  borderWidth = 2,
  borderColor = 'gray.400',
  ref,
  ...rest
}) => {
  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        // h={12}
        name={name}
        ref={ref}
        rounded='none'
        borderWidth={borderWidth}
        borderColor={borderColor}
        _focus={{ outline: 'none' }}
        {...rest}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextArea;
