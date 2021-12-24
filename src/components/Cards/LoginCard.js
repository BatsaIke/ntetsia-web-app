import React from "react";
import {
  Box,
  Flex,
  Grid,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavLink, Link as ReachLink } from "react-router-dom";
import { Formik } from "formik";
import { SignInSchema } from "utils/validation";
import FormInput from "components/Form/FormInput";
import Button from "components/Button";
import useAuth from "context/userContext";
import Logo from "container/Logo";
import PoweredBy from "container/PoweredBy";


const LoginCard = () => {
  const { signin } = useAuth();

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await signin(values);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (

    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      overflow="hidden"
      textAlign="center"
      mt={10}
    >
      <Flex

        justify="center"
        direction="column"
        w="20%"
        mx="auto"
      >
        <Box mb={9}>
          <Logo />

        </Box>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={onSubmit}

        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} >
              <Grid gap={4}  >
                <FormInput
                  textAlign='center'
                  variant="flushed"
                  borderBlockEndWidth='thin'
                  borderBottomColor='black'
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touch={touched.email}
                  value={values.email}

                />


                <FormInput
                  textAlign='center'
                  variant="flushed"
                  type="password"
                  borderBlockEndWidth='thin'
                  borderBottomColor='black'
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touch={touched.password}
                  value={values.password}

                />
              </Grid>

              <Link
                as={ReachLink}
                to="/forgot-password"
                textAlign="center"
                mt={4}
                d="block"
                mb={5}
              >
                <Text textUnderlineOffset="unset" color="#5660F4">Forgot Password? </Text>
              </Link>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Logging you in"
                title="Sign In"
                w="40%"
                bg="#EAE7FD"
                color="#898989"
                borderColor="#191191191"
                _hover={{ bg: "blue.700" }}
                _active={{ bg: "#100213" }}
              />
              <Flex direction="column" mb={8} textAlign="center">

                <Text marginTop='10' color="#898989">I want to join</Text>
                <Text bg="#EAE7FD"
                  w="40%"
                  h="8"
                  alignSelf='center'
                >
                  <Link
                    as={NavLink}
                    to="/refer"
                    _hover={{ textDecor: "none" }}
                    color="#898989"
                  >
                    Join us
                  </Link>
                </Text>
              </Flex>
            </form>
          )}
        </Formik>
      </Flex>
      <PoweredBy />
    </Flex>






  );
};

export default LoginCard;
