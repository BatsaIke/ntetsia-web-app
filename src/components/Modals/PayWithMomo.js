import React,{useEffect} from 'react';
import { Modal, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { Formik, validateYupSchema, FormErrorMessage, ErrorMessage } from 'formik';
// import { Select } from 'baseui/select';
import IdleTimer from "react-idle-timer"
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



const PayWithMomo = ({ isOpen, onClose, state },props) => {
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
  const submitref = React.useRef(null)
  const [onClose1, setOnclose1] = React.useState(false);

  const [timeLeft, setTimeLeft] = React.useState(true);

  const processErrors = (errors) => {
    //error.response.data.errors.country_code[0],
    let errorsStr = "";

    Object.values(errors).map((err, index) => {
      errorsStr += err[0] + "\n";
    })

    return errorsStr;
  }

  const verifyOtp = async (
    values, {
      setSubmitting, setErrors, setStatus, resetForm }) => {
    console.log("YYYYYYYYYYVALUES", values);
    try {
      let data = await momoOtpVerify(values);
      if (data.data.status === "pay_offline") {
        setOtpMessage(data)
        resetForm({});
        setStatus({ success: true })
        setIsOpen(false)
        setIsOpenverify(true)
        setTimeout(() =>{ submitref.current.click();setTimeLeft(false)}, 30000);
      }
    } catch (error) {
      toast({
        title: "otp verification failed",
        description: processErrors(error.response.data.message),
        status: "error",
        duration: 5000,
        position: "top-right",
      });
      setIsOpen(false)
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.log(error.message)
    }
  }

  const veriMomoPayment = async (
    values, {
      setSubmitting, setErrors, setStatus}) => {
    //console.log("YYYYYYYYYYVALUES", values);
    try {
      let data = await verifyMomoPayment(values)
      setVerifyPayment(data.data.message)
      if (data.data.status === "success") {
        toast({
          title: "payment successful",
          description:  data.data.message,
          status: "success",
          duration: 9000,
          position: "top-right",
        });
        setStatus({ success: true })
        window.location.href = "/email"
      }
    } catch (error) {
      toast({
        title: "error",
        description: processErrors(error.response.data.message),
        status: "success",
        duration: 9000,
        position: "top-right",
      });
      setIsOpenverify(false)
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
      let data = await paywithMomo(values)
      setResponse(data.data.reference)
      if (data.data.status === "send_otp") {
        toast({
          title: "otp verificationsent",
          description: data.data.message, 
          status: "success",
          duration: 5000,
          position: "top-right",
        });
        resetForm({});
        setStatus({ success: true })
        onClose(true)
        setIsOpen(true)
      }
      else {
        toast({
          title: "payment initiated",
          description: data.data.message, 
          status: "success",
          duration: 5000,
          position: "top-right",
        });
        onClose(true)
        setIsOpenverify(true)
        setTimeLeft(true)
        setTimeout(() =>{ submitref.current.click();setTimeLeft(false)}, 30000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: processErrors(error.response.data.message),
        status: "success",
        duration: 9000,
        position: "top-right",
      });
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.error(error.message)
    }
  };

  console.log("RESPONSE",verifyPayment)

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
            onSubmit={makepaywithMomo}
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

              <form onSubmit={handleSubmit}  
              //ref={submitref} type="submit"
              >

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
        <ModalBody align="center "
          justify="center" >
          <Box> <Text fontSize="sm" >check your phone for verification code</Text></Box>

          <Formik initialValues={{
            otp: "",
            reference: response

          }}
            validationSchema={MomoOtp}
            onSubmit={verifyOtp}>
            {({
              values,
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
        onClose={onClose1}
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
            reference: response
          }}
            validationSchema=""
            onSubmit={veriMomoPayment}>
            {({
              values,
              handleSubmit,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>

                {console.log("Formik response verify", values)}
                {console.log("E", errors)}

                {timeLeft?<Dots/>:"" }

               
                <button type="submit" ref={submitref}></button>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Box>

  );
};

export default PayWithMomo;
