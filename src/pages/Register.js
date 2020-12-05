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
import AccountType from 'components/MultiForm/AccountType';
import Button from 'components/Button';
import useComponent from 'context/componentContext';
import AuthModal from 'components/Modals/AuthModal';
import RegisterForm from 'components/MultiForm/Register';
import Category from 'components/MultiForm/Category';

const accountType = [
  {
    id: 'STANDARD',
    type: 'Standard',
    fee: 10,
    currency: 'GHS',
  },
  {
    id: 'PLATINUM',
    type: 'Platinum',
    fee: 30,
    currency: 'GHS',
  },
  {
    id: 'GOLD',
    type: 'Gold',
    fee: 50,
    currency: 'GHS',
  },
];

const Register = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentIndex, handleStepClick } = useComponent();
  const [state, setState] = React.useState('Individual');
  const [type, setType] = React.useState(accountType[0]);

  console.log('type', type);
  console.log('state', state);

  const getFormStep = (value) => {
    switch (value) {
      case 0:
        return <Category state={state} onChange={setState} />;
      case 1:
        return <RegisterForm />;
      case 2:
        return (
          <AccountType state={type} onChange={setType} type={accountType} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={onClose} />
      <Flex
        direction='column'
        align='center'
        justify='center'
        h='100vh'
        w='100vw'
        overflow='hidden'
      >
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
          w={{ md: currentIndex === 1 ? 120 : 108 }}
          overflowY='scroll'
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

          <Box>{getFormStep(currentIndex)}</Box>

          <Flex
            align='center'
            justify='center'
            mt={10}
            d={currentIndex === 1 ? 'none' : 'flex'}
            mb={currentIndex === 1 ? 6 : ''}
          >
            <Button
              title='Previous'
              rounded='30px'
              w={32}
              bg='transparent'
              color='blue.500'
              borderWidth={2}
              borderColor='blue.500'
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
              mr={4}
              isDisabled={currentIndex === 0}
              onClick={currentIndex === 0 ? null : () => handleStepClick(-1)}
            />
            <Button
              title='Continue'
              rounded='30px'
              w={32}
              isDisabled={state === 'In-Trust-For'}
              onClick={
                state === 'Corporate'
                  ? onOpen
                  : state === 'In-Trust-For'
                  ? ''
                  : () => handleStepClick(+1)
              }
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
