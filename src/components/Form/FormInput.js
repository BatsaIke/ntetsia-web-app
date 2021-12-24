import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

  
const FormInput = ({
  label,
  name,
  variant,
  error,
  touch,
  setFieldTouched,
  ref,
  isRequired,
  ...rest
}) => {
  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <FormLabel htmlFor={name} fontSize="sm">
      </FormLabel>
      <Input
        h={12}
        name={name}
        variant={variant}
        ref={ref}
        fontFamily='Montserratitalics'
       // rounded="none"
        _hover={{ borderColor: "none" }}
        _focus={{ borderColor: "none" }}
        {...rest}
      />
      <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
