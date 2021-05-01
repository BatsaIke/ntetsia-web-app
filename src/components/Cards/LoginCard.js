import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  useColorMode,
  Text,
  Image,
} from "@chakra-ui/react";
import { NavLink, Link as ReachLink } from "react-router-dom";
import { Formik } from "formik";
import { SignInSchema } from "utils/validation";
import FormInput from "components/Form/FormInput";
import Button from "components/Button";
import useAuth from "context/userContext";

const LoginCard = () => {
  const { colorMode } = useColorMode();
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
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      overflow="hidden"
      textAlign="center"
    >
      <Flex
        justify="center"
        direction="column"
        bg={colorMode === "dark" ? "black" : "gray.50"}
        rounded="lg"
        w={{ md: 108 }}
        h={{ md: 120 }}
        mx="auto"
        shadow="lg"
        p={10}
      >
        <Box mb={6}>
          <Image
            mx="auto"
            src={
              colorMode === "dark"
                ? require("../../assets/images/logo.png").default
                : require("../../assets/images/dark-logo.png").default
            }
          />
        </Box>
        <Flex direction="column" mb={8} textAlign="center">
          <Heading as="h3" fontWeight="bold" fontSize={{ md: "2xl" }}>
            Sign in to your account
          </Heading>
          <Text>
            New to Ntetsia?{" "}
            <Link
              as={NavLink}
              to="/register"
              _hover={{ textDecor: "none" }}
              color="blue.400"
            >
              Create an account here
            </Link>
          </Text>
        </Flex>
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
            <form onSubmit={handleSubmit}>
              <Grid gap={4}>
                <FormInput
                  label="Email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touch={touched.email}
                  value={values.email}
                  variant="filled"
                />

                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touch={touched.password}
                  value={values.password}
                  variant="filled"
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
                <Text>Forgot Password?</Text>
              </Link>

              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Logging you in"
                title="Sign In"
                w="100%"
                h={12}
                bg="blue.600"
                color="white"
                _hover={{ bg: "blue.700" }}
                _active={{ bg: "blue.700" }}
              />
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default LoginCard;
