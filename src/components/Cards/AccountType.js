import { Box, Button, Heading, Stack } from '@chakra-ui/react';

const AccountType = ({ state, onChange }) => {
  const updateDaysActive = (day) => {
    onChange(day);
  };

  const Type = ({ children, ...rest }) => (
    <Button
      colorScheme={state.includes(children) ? 'teal' : 'gray'}
      rounded='0px'
      onClick={() => updateDaysActive(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  return (
    <Box>
      <Heading as='h5' size='md' mb={4} textAlign='center'>
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

export default AccountType;
