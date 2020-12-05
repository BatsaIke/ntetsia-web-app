import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';
import AccountType from 'components/Cards/AccountType';
import Button from 'components/Button';
import useComponent from 'context/componentContext';
import AuthModal from 'components/Modals/AuthModal';

const Register = () => {
  const { colorMode } = useColorMode();
  const [step, setStep] = React.useState('type');
  const [state, setState] = React.useState('Individual');
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('state', state);

  const getFormStep = (value) => {
    switch (value) {
      case 'type':
        return <AccountType state={state} onChange={setState} />;
      default:
        return null;
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      h='100vh'
      w='100vw'
      overflow='hidden'
    >
      <AuthModal isOpen={isOpen} onClose={onClose} />
      <Box mb={6}>
        <Image
          src={
            colorMode === 'dark'
              ? require('../assets/images/logo.png').default
              : require('../assets/images/dark-logo.png').default
          }
        />
      </Box>
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : 'white'}
        rounded='lg'
        w={{ md: 108 }}
        mx='auto'
        shadow='lg'
        p={10}
      >
        <Flex direction='column' mb={8} textAlign='center'>
          <Heading as='h3' fontWeight='bold' fontSize={{ md: '2xl' }}>
            Create an account with Ntetia
          </Heading>
          <Text>
            Already a member?{' '}
            <Link
              as={NavLink}
              to='/login'
              _hover={{ textDecor: 'none' }}
              color='blue.400'
            >
              Login here
            </Link>
          </Text>
        </Flex>

        <Box>{getFormStep(step)}</Box>

        <Flex align='center' justify='center' mt={10}>
          <Button
            title='Previous'
            rounded='30px'
            w={32}
            bg='transparent'
            color='blue.500'
            borderWidth={2}
            borderColor='blue.500'
            _hover={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent' }}
            mr={4}
          />
          <Button title='Continue' rounded='30px' w={32} onClick={onOpen} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;
