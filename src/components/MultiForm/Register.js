import { Box, Grid, Checkbox, Flex } from "@chakra-ui/react";
import Button from "components/Button";
import FormInput from "components/Form/FormInput";
import useComponent from "context/componentContext";
import { userContext } from "context/componentContext";
import useAuth from "context/userContext";
import { Formik } from "formik";
import React,{useContext} from "react";
import { SignupSchema } from "utils/validation";
import { Heading, Stack } from "@chakra-ui/layout";
import CountriesLib from "./CountriesLib";
import { useToast } from "@chakra-ui/react";
import FormPhone from "components/Form/FormPhone";
import  { Component, 
  
  useEffect, } from 'react'
  import useAPI from 'context/apiContext';
import PoweredBy from "container/PoweredBy";






const RegisterForm = (props) => {
 const {data} = useComponent();
  const { signup } = useAuth();
  const toast = useToast();


  useEffect(async() => {
}, []);


  const { handleStepClick } = useComponent();
 const msg =useContext(userContext)
 const  {smsVerification}= useAPI();


  const [checkedItems, setCheckedItems] = React.useState([false,])
  const [sms, setSMS] = React.useState("")
  const allChecked = checkedItems.every(Boolean)
  const alChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !checkedItems
  const isIndeterminates = checkedItems.some(Boolean) && !checkedItems

  const [phone, setPhone] = React.useState('')

  const handlePChange = (e) => {
   
    //setData(data.dialCode)
  }
  

  const processErrors = (errors) => {
    //error.response.data.errors.country_code[0],
    let errorsStr = "";

    Object.values(errors).map((err, index) => {
      errorsStr += err[0] + "\n";
    })

    return errorsStr;
  }



  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    if (!allChecked && !alChecked) {
      toast({
        description: "Accept our privacy policy and constitution",
        tatus: "error",
        duration: 5000,
        position: "top-right",
        color: "#646464"
      })
    } else {
      try {
        var s = values.phone
        
        while (s.charAt(0) === '0')  {
          s = values.country_code.substring(1) + s.substring(1)
          values.phone =s
        }
          let res = await signup(values);
        if (res.status === 200) {
          toast({
            title: "Sign up successful",
            description: res.data.message,
            status: "success",
            duration: 5000,
            position: "top-right",
          });
          
          localStorage.setItem("token-ds" ,res.data.data.token)
         // resetForm({});
          setStatus({ success: true });
         // smsVerify();
          handleStepClick(+1);
          
        }
      } catch (error) {
        toast({
          title: "Error occured.",
          description: processErrors(error.response.data.errors),
          status: "error",
          duration: 5000,
          position: "top-right",
        });
        setStatus({ success: false });
        setSubmitting(false);
        
      }

    }

  };




  return (
    <Flex

    >

      <Box w='85' >
        <Heading as="h4" size="md" mb={4} textAlign="center" color="#898989" >
          Enter Personal Details
        </Heading>
        <Formik
          initialValues={{
            referer: "kweku",
            first_name: "",
            last_name: "",
            email: "",
            dob: "",
            phone: "",
            country: "",
            country_code: "",
            password: "",
            password_confirmation: "",
            risk_assessment: [
              {
                  "question_id": 1,
                  "answer": true
              },
              {
                  "question_id": 2,
                  "answer": false
              },
              {
                  "question_id": 3,
                  "answer": true
              }
          ]

          }}
          validationSchema={SignupSchema}
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
             <Grid w='100%' gap={1} mb={4}>
                <FormInput
                  type="text"
                  color="#898989"
                  borderColor="#191191191"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  error={errors.first_name}
                  touch={touched.first_name}
                  name="first_name"
                  placeholder="John"
                />

                <FormInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  error={errors.last_name}
                  touch={touched.last_name}
                  name="last_name"
                  placeholder="Doe"
                  color="#898989"
                  borderColor="#191191191"
                />

                <FormInput
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touch={touched.email}
                  value={values.email}
                  color="#898989"
                  borderColor="#191191191"
                />


                <FormInput
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dob}
                  error={errors.dob}
                  touch={touched.dob}

                  name="dob"
                  placeholder="2020-10-08"
                  color="#898989"
                  borderColor="#191191191"
                />




                <FormPhone
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  error={errors.phone}
                  touch={touched.phone}
                  setCountryCode={(code) => values.country_code = code}
                  name="phone"
                  color="#898989"
                  borderColor="#191191191"


                />
                
                <CountriesLib 
                onChange={handleChange}
                  text="country"
                  placeholder="select a country"
                  value={values.country}
                  error={errors.country}
                  touch={touched.country}
                  color="#898989"
                  borderColor="#191191191" />


                <FormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touch={touched.password}
                  value={values.password}
                  color="#898989"
                  borderColor="#191191191"
                />

                <FormInput
                  type="password"
                  color="#898989"
                  borderColor="#191191191"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  error={errors.password_confirmation}
                  touch={touched.password_confirmation}
                  name="password_confirmation"
                  placeholder="*************"
                />

                <Stack spacing={2}>
                  <Checkbox size="md" colorScheme="green" mt={4}
                    color="#898989"
                    onClick={handleStepClick}
                    isCheck={allChecked}
                    isIndeterminate={isIndeterminate}
                    value={values.check}
                    error={errors.check}
                    isRequired
                    name="check"
                    touch={touched.check}
                    onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}> Accept privacy policy</Checkbox>

                  <Checkbox size="md" colorScheme="green" mt={4}
                    color="#898989"
                    isCheck={alChecked}
                    isRequired
                    isIndeterminate={isIndeterminates}
                    value={values.check}
                    error={errors.check}
                    name='check'
                    touch={touched.check}
                    onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}> Accept our constitution</Checkbox>
                </Stack>

                <Button
                  title="I have read and accept the privacy policy"
                  color="#898989"
                  borderColor="#191191191"
                  bg=""
                  _hover={{ color: "blue.700" }}
                />

              </Grid>

              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Signing you up"
                title="Sign up"
                w="100%"
                h={12}
                bg="#ACA2F4"
                color="white"
                // color="#898989"
                borderColor="#191191191"
                _hover={{ bg: "blue.700" }}
                _active={{ bg: "blue.700" }}
              />
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
