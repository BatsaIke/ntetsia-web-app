import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const Category = ({ state, onChange }) => {
  const updateDaysActive = (day) => {
    onChange(day);
  };

  const Type = ({ children, ...rest }) => (
    <Button
      // colorScheme={state.includes(children) ? 'twitter' : 'blue.600'}
      color="white"
      bg={state.includes(children) ? "blue.600" : "gray.600"}
      _hover={{ bg: "blue.700" }}
      _active={{ bg: "blue.700" }}
      rounded="0px"
      onClick={() => updateDaysActive(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  return (
    <Box>
      <Heading as="h5" size="md" mb={4} textAlign="center">
        Choose your account type
      </Heading>
      <Stack isInline>
        <Type>Individual</Type>
        <Type>Corporate</Type>
        <Type>In-Trust-For</Type>
      </Stack>
    </Box>
  );
};

export default Category;
