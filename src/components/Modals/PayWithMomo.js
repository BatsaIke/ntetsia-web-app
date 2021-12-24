import React from 'react';
import { Modal, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { Formik, validateYupSchema, FormErrorMessage, ErrorMessage } from 'formik';
// import { Select } from 'baseui/select';
import FormInput from 'components/Form/FormInput';
import { MomoSchema, MomoOtp, } from "utils/validation";
import Button from 'components/Button';
import useAPI from 'context/apiContext';
import { useToast } from "@chakra-ui/react";
import { Select } from '@chakra-ui/select';
import useComponent from "context/componentContext";


import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";



  const token = localStorage.getItem("token-momo");
 


const PayWithMomo = ({ isOpen, onClose, state }) => {
  const { handleStepClick } = useComponent();
  const { getInvoice, paywithMomo, momoOtpVerify, verifyMomoPayment } = useAPI();
  const toast = useToast();
  const [response, setResponse] = React.useState([]);
  const [momopay, setPayMomo] = React.useState({});
  const [otpMessage, setOtpMessage] = React.useState({});
  const [verifyPayment, setVerifyPayment] = React.useState({});
  const [invoice, setInvoince] = React.useState({});
  const [isOpen1, setIsOpen] = React.useState(false);
  const [isOpenverify, setIsOpenverify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //const [onClose, setOnclose] = React.useState(false);




  const verifyOtp = async (
    values, {
      setSubmitting, setErrors, setStatus, resetForm }) => {
    console.log("YYYYYYYYYYVALUES", values);
    try {
      let res = await momoOtpVerify(values)
      setOtpMessage(res)
      resetForm({});
      setStatus({ success: true })
      setIsOpen(false)
      setIsOpenverify(true)
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.log(error.message)
    }
  }


  // async function getinvo() {
  //   try {
  //     let data = await getInvoice()
  //     setLoading(true)
  //     console.log("invoice", data);
  //     setInvoince(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const veriMomoPayment = async (
    values, {
      setSubmitting, setErrors, setStatus, resetForm }) => {
    console.log("YYYYYYYYYYVALUES", values);
    try {
      let verify = await verifyMomoPayment(values)
     // setResponse(verify)
      if (verify.status === "success") {
        toast({
          title: "payment up successful",
          description: verify.data.message,
          status: "success",
          duration: 9000,
          position: "top-right",
        });
        setStatus({ success: true })
        setIsOpenverify(false)
        handleStepClick(+1);
      }
    } catch (error) {
      toast({
        title: "error",
        description: error.data.message,
        status: "success",
        duration: 9000,
        position: "top-right",
      });
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.log(error.message)
    }
  }




  const makepaywithMomo = async (
    values, {
      setSubmitting, setErrors, setStatus, resetForm }) => {
    console.log("YYYYYYYYYYVALUES", values);
    try {
      let res = await paywithMomo(values)
      setResponse(res)
      if (res.status === "send_otp") {
        resetForm({});
        setStatus({ success: true })
        onClose(true)
        setIsOpen(true)
      }
      else{
      setIsOpenverify(true)
      }

    } catch (error) {
      toast({
        title: "error",
        description: error.data.message,
        status: "success",
        duration: 9000,
        position: "top-right",
      });
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.log(error.message)
    }
  }


 
  React.useEffect(() => {
   
    // getinvo()
    //  makepaywithMomo()
  }, [])

  return (
    <Box>
      <Modal
        onClose={onClose}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              padding: '20px',
            },
          },
        }}
      >
       <ModalBody align="center"
          justify="center" >

{/* {loading ?     */}
<Formik initialValues={{
            token: token,
            phone: '',
            provider: '',
          }}
            validationSchema={MomoSchema}
            onSubmit={makepaywithMomo}>
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

                {console.log("Formik", values)}
                {console.log("Erroes", errors)}
                


                     <Select
                  placeholder="Pay with"
                  width='100%'
                  name="provider"
                  value={values.provider}
                  textAlign='center'
                  color="#898989"
                  borderColor="#191191191"
                  onChange={handleChange}
                  error={errors.network}
                  touch={touched.network}
                >
                  <option value="MTN" id='mtn'>MTN</option>
                  <option value="Vodafone" id='vodafone'>Vodafone</option>
                  <option value="Airtel Tigo" id='AirtelTigo'>airtelTigo</option>
                  {/* <ErrorMessage name={errors} /> */}
                </Select>



                <FormInput
                  width='100%'
                  textAlign='center'
                  color="#898989"
                  borderColor="#191191191"
                  placeholder="enter phone number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone}
                  touch={touched.phone}
                />


                <Button
                  mt="3"
                  isLoading={isSubmitting}
                  loadingText="processing"
                  type="submit"

                  title="Pay"
                  w="50%"
                  bg="#EAE7FD"
                  color="#898989"
                  borderColor="#191191191"
                  _hover={{ bg: "#BEFEF2" }}
                  _active={{ bg: "#100213" }}

                />

              </form>



            )}

          </Formik>
          {/* :<Dots/>} */}

        </ModalBody>
      </Modal>
      <Modal
        onClose={onClose}
        closeable
        isOpen={isOpen1}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              padding: '20px',
            },
          },
        }}
      >
        <ModalBody align="center"
          justify="center" >
          <Box> <Text fontSize="sm" >Verify payment</Text></Box>

          <Formik initialValues={{
            otp: "",
            reference: otpMessage.reference

          }}
            validationSchema={MomoOtp}
            onSubmit={verifyOtp}>
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

                {console.log("Formik", values)}
                {console.log("Erroes", errors)}


                <FormInput
                  width='50%'
                  textAlign='center'
                  color="#898989"
                  borderColor="#191191191"
                  placeholder="enter code"
                  name="otp"
                  onChange={handleChange}
                  value={values.otp}
                  error={errors.otp}
                  touch={touched.otp}
                />



                <Button
                  mt="3"
                  isLoading={isSubmitting}
                  loadingText="processing"
                  type="submit"
                  title="verify"
                  w="50%"
                  bg="#EAE7FD"
                  color="#898989"
                  borderColor="#191191191"
                  _hover={{ bg: "#BEFEF2" }}
                  _active={{ bg: "#100213" }}

                />


              </form>



            )}

          </Formik>

        </ModalBody>
      </Modal>
      <Modal
        onClose={onClose}
        closeable
        isOpen={isOpenverify}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              padding: '20px',
            },
          },
        }}
      >
       <ModalBody align="center"
          justify="center" >
          <Box> <Text fontSize="sm" ></Text>
            <Text fontSize="sm" >Online deposit has been initiated on your phone. Please follow instructions on the prompt
              to complete the deposit. If you already done, tap on the "Completed" button to confirm</Text>
          </Box>

          <Formik initialValues={{
            reference: response.reference

          }}
            validationSchema=""
            onSubmit={veriMomoPayment}>
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

                {console.log("Formik response", values)}
                {console.log("E", errors)}

                <Stack align="center">
                  <Button
                    mt="3"
                    onCick={() => onClose(true)}
                    title="cancel"
                    w="50%"
                    bg="#EAE7FD"
                    color="#898989"
                    borderColor="#191191191"
                    _hover={{ bg: "#BEFEF2" }}
                    _active={{ bg: "#100213" }}
                  />

                  <Button
                    mt="3"
                    isLoading={isSubmitting}
                    loadingText="processing"
                    type="submit"
                    title="completed"
                    w="50%"
                    bg="#EAE7FD"
                    color="#898989"
                    borderColor="#191191191"
                    _hover={{ bg: "#BEFEF2" }}
                    _active={{ bg: "#100213" }}

                  />
                </Stack>

                <Box> <Text fontSize="sm" >{otpMessage.message}</Text></Box>
              </form>



            )}

          </Formik>

        </ModalBody> 
      </Modal>
    </Box>

  );
};

export default PayWithMomo;
