
import React from 'react'
import { Flex, Text, Stack, Button } from "@chakra-ui/react";
import { ReferalSchema } from 'utils/validation';
import { Formik } from "formik";
import FormInput from "components/Form/FormInput";
import Logo from "container/Logo";
import PoweredBy from "container/PoweredBy";
import useAPI from "context/apiContext";
import { useToast } from "@chakra-ui/react";


export default function ReferID(props) {

  const [state1, setState] = React.useState([]);


  const { ckecKReferal } = useAPI();
  const toast = useToast();
  const submit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    try {
      let res = await ckecKReferal(values);
      setState(res)
      if (res.id !== "") {
        localStorage.setItem("referid", values.code)
        props.history.push({ pathname: "/register" })
        resetForm({});
        setStatus({ success: true });
      }
    } catch (error) {
      toast({
        title: "invalid referal id",
        // description: error.response.data.errors.referer_id[0],
        status: "success",
        duration: 5000,
        position: "top-right",
      });
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
      console.error(error.message)
    }
  }


  return (
    <Flex>
      <Flex
        alignItems="center"
        justifyContent='center'
        direction="column"
        h="100vh"
        w="100vw"
        roundedBottom="none"
      >
        <Logo />
        <Text flexDirection="column" fontFamily="Bahnschrift" fontSize="16px" textAlign='center' color="#898989" marginTop='10'>
          Kindly provide the ID from the one who introduced you</Text>
        <Formik
          initialValues={{
            code: "",


          }}
          validationSchema={ReferalSchema}
          onSubmit={submit}

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

              <Stack direction="column" spacing={4} justifyContent='center' alignSelf='center' alignItems='center'>
                <FormInput
                  type="text"
                  w='90'
                  alignSelf='center'
                  textAlign="center"
                  borderWidth='thin'
                  borderColor="black"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                  error={errors.code}
                  touch={touched.code}
                  name="code"
                  placeholder="Referrer ID"
                />
                <Button
                  isLoading={isSubmitting}
                  borderColor="#191191191"
                  type="submit"
                  title="next"
                  w='40%'
                  bg='#EAE7FD'
                  color="black.100"
                  rounded='4px'
                  _hover={{ bg: "#BEFEF2" }}

                >Next


                </Button>

              </Stack>


            </form>
          )}

        </Formik>

      </Flex>
      <PoweredBy />
    </Flex>

  )

}
