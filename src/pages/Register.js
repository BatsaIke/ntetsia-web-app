import {
  Box,
  Flex,
  Link,
  Text,
  useDisclosure,

} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import AccountType from "components/MultiForm/AccountType";
import Button from "components/Button";
import useComponent from "context/componentContext";
import AuthModal from "components/Modals/AuthModal";
import RegisterForm from "components/MultiForm/Register";
import Category from "components/MultiForm/Category";
import Logo from "../container/Logo";
import PoweredBy from "container/PoweredBy";
import Payment from "./Payment";
import Verification from "./Verification";

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentIndex, handleStepClick, handleClick } = useComponent();
  const [state, setState] = React.useState("Individual");

  const [type, setType] = React.useState(null);

  const getFormStep = (value) => {
    switch (value) {
      case 0:
        return <Category state={state} onChange={setState} />;
      case 1:
        return <RegisterForm fstate={handleStepClick} />;
      case 2:
        return <Verification />;
      case 3:
        return (
          <AccountType onChange={setType} fstate={handleStepClick} />
        );
      case 4:
        return <Payment state={type} />
      default:
        return null;
    }
  };

  return (
    <>

      <AuthModal isOpen={isOpen} onClose={onClose} />

      <Flex>

        <Flex
          marginTop="10%"
          direction="column"
          align="center"
          justify="center"
          h="100vh"
          w="100vw"
        // overflowY="scroll"
        >
          <Logo style={{ top: 0 }} />
          <Box>{getFormStep(currentIndex)}</Box>
          <Flex
            align="center"
            justify="center"
            mt={10}
            d={currentIndex === 1 ? "none" : "flex"}
            mb={currentIndex === 1 ? 6 : ""}
          >

            <Button
              title="Continue"
              rounded="0px"
              w={32}
              isDisabled={state === "In-Trust-For"}
              color="white"
              bg="#ACA2F4"
              _hover={{ bg: "#EAE7FD" }}
              _active={{ bg: "#BEFEF2" }}
              onClick={
                state === "Corporate"
                  ? onOpen
                  : state === "In-Trust-For"
                    ? ""
                    : () => handleStepClick(+1)
              }
            />
          </Flex>
          <Flex direction="column" mb={8} textAlign="center">

            <Text color="#898989" >
              Already a member?{" "}
              <Link
                as={NavLink}
                to="/login"
                //bg="#285DAF"
                _hover={{ textDecor: "none" }}
                color="#285DAF"
              >
                Login here
              </Link>
            </Text>
          </Flex>

        </Flex>
        <PoweredBy />
      </Flex>


    </>

  );
};

export default Register;
