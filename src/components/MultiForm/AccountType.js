import { Button, Flex, Heading, Stack, useColorMode } from '@chakra-ui/react';

const AccountType = ({ state, onChange, type }) => {
  const { colorMode } = useColorMode;
  const updateDaysActive = (day) => {
    onChange(day);
  };

  const Type = ({ children, ...rest }) => (
    <Button
      colorScheme={colorMode === 'dark' ? 'twitter' : 'facebook'}
      rounded='0px'
      onClick={() => updateDaysActive(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  return (
    <Flex direction='column' align='center' justify='center'>
      <Heading as='h5' size='md' mb={4} textAlign='center'>
        Choose your account type
      </Heading>
      <Stack isInline>
        {type.map((item) => (
          <Type key={item.id}>{item.type}</Type>
        ))}
      </Stack>
    </Flex>
  );
};

export default AccountType;
