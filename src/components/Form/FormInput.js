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
        {label}
      </FormLabel>
      <Input
        h={12}
        name={name}
        ref={ref}
        rounded="none"
        borderWidth={2}
        borderColor="gray.400"
        _hover={{ borderColor: "none" }}
        _focus={{ borderColor: "none" }}
        {...rest}
      />
      <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
