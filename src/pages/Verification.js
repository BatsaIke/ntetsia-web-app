import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Center,
  Heading,
  Grid,
  Text,
  Box
} from '@chakra-ui/react';
import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import { smsVerificationSchema } from 'utils/validation';
import useComponent from "context/componentContext";
import { Formik } from 'formik';
import useAPI from 'context/apiContext';
import { useToast } from "@chakra-ui/react";
import useAuth from 'context/userContext';
import { Link, NavLink, Redirect } from 'react-router-dom';


const Verification = (props) => {
  const [sms, setSMS] = React.useState("")
  const { smsVerification, sendVerification } = useAPI();
  const { handleStepClick } = useComponent();
  const toast = useToast();

  // const onSubmit = async (
  //   values,
  //   { setSubmitting, setErrors, setStatus, resetForm }
  // ) => {
  //   try {
  //     let res= await sendVerification(values);
  //     if (res.status === 200) {
  //     resetForm({});
  //     setStatus({ success: true });
  //     handleStepClick(+1);
  //   } }catch (error) {
  //     setStatus({ success: false });
  //     setSubmitting(false);
  //     setErrors({ submit: error.message });
  //   }
  // };

  const smsVerify = () => {

    try {
      let data = smsVerification()
      setSMS(data)
    } catch (error) {
      console.error(error)
    }

  }


  const onSubmit = async (
    values, {
      setSubmitting, setErrors, setStatus, resetForm }) => {
   // console.log("YYYYYYYYYYVALUES", values);
    try {
      let res = await sendVerification(values)
      window.location.href = "/accounttype"
      setSMS(res)
    //  console.log("resss", res)
      resetForm({});
      setStatus({ success: true })
            // setIsOpen(false)
     
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      toast({
        title: "invalid code",
        message: error.response.message,
        duration: 5000,
        position: "top-right",
      });
     
      setIsOpen(true)
      
    }
  }

  useEffect(async () => {
    smsVerify()
  }, [])

  const [isOpen, setIsOpen] = React.useState(true);
  return (


    <Center>
      <Modal
        isOpen={isOpen}
        animate
        autoFocus>
        <ModalOverlay />
        <ModalContent>


          <ModalBody p={14}>
            <Flex direction='column' mb={8} textAlign='center'>
              <Heading as='h3' fontWeight='bold' fontSize={{ md: '2xl' }}>
                Phone Verification
              </Heading>
              <Text>Check your phone number for a verification code</Text>


              <Formik
                initialValues={{
                  code: ""
                }}
                validationSchema={smsVerificationSchema}
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

                    <Grid alignItems="center" justifyContent="center">
                      <FormInput
                        width='100%'
                        textAlign='center'
                        color="#898989"
                        borderColor="#191191191"
                        placeholder="enter code"
                        name="code"
                        onChange={handleChange}
                        value={values.code}
                        error={errors.code}
                        touch={touched.code}

                      />



                    </Grid>
                    <Button mt={4}
                      isLoading={isSubmitting}
                      loadingText="processing"
                      type='submit'
                      borderColor="#191191191"
                      title="verify"
                      w='40%'
                      bg='#EAE7FD'
                      color="black.100"
                      rounded='4px'
                      _hover={{ bg: "#BEFEF2" }}

                    />



                  </form>
                )}
              </Formik>

            </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
    </Center>

  );
};

export default Verification;
