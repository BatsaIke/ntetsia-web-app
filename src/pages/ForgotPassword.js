import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  useColorMode,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { RecoverPassword } from "utils/validation";
import FormInput from "components/Form/FormInput";
import Button from "components/Button";
import useAuth from "context/userContext";
import { Link as ReachLink } from "react-router-dom";

const ForgotPassword = () => {
  const { colorMode } = useColorMode();
  const { recoverPassword } = useAuth();

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await recoverPassword(values);
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
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        bg={colorMode === "dark" ? "black" : "gray.50"}
        rounded="lg"
        w={{ md: 108 }}
        mx="auto"
        shadow="lg"
        p={10}
        textAlign="center"
      >
        <Box mb={6}>
          <Image
            src={
              colorMode === "dark"
                ? require("../assets/images/logo.png").default
                : require("../assets/images/dark-logo.png").default
            }
          />
        </Box>
        <Flex direction="column" mb={8} textAlign="center">
          <Heading as="h3" fontWeight="bold" fontSize={{ md: "2xl" }}>
            Find your account
          </Heading>
          <Text>Please enter your email to search for your account.</Text>
        </Flex>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={RecoverPassword}
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
              <Grid gap={4} mb={6}>
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
              </Grid>

              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Recovering account"
                title="Recover account"
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

        <Link
          as={ReachLink}
          to="/login"
          textAlign="center"
          mt={4}
          d="block"
          mb={5}
        >
          <Text>Remembered your password?</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
