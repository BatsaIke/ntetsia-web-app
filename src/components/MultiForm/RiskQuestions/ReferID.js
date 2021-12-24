
import React from 'react'
import {Flex, Text, Stack, Button} from "@chakra-ui/react";
import { ReferalSchema } from 'utils/validation';
import { Formik } from "formik";
import FormInput from "components/Form/FormInput";
import Logo from "container/Logo";
import PoweredBy from "container/PoweredBy";
import useAPI from "context/apiContext";



export default function ReferID(props) {

  const [state1, setState]= React.useState("");
  

  const { ckecKReferal } = useAPI();

  // const submit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
  //   console.log("YYYYYYYYYYVALUES", values);
  //   try {
  //   let res=  await ckecKReferal(values)
  //     if (res.status === 200) {
  //       resetForm({});
  //     setStatus({ success: true });
      
         
  //      }
       
       
  //   } catch (error) {
  //     setStatus({ success: false });
  //     setSubmitting(false);
  //     setErrors({ submit: error.message });
  //     console.log(error.message)
  //     //Navigate()
  //   }
  // }
  
  
  React.useEffect(() => {
    // setRefer(referer)
  

  }, [])
      



function Navigate(){
  
  props.history.push({pathname:"/register", state:state1})
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
               <Logo/>
               <Text flexDirection="column" fontFamily="Bahnschrift" fontSize="16px" textAlign='center' color="#898989" marginTop='10'>
                         Kindly provide the ID from the one who introduced you</Text>
                    <Formik
        initialValues={{
          referer: "",
          
         
        }}
        validationSchema={ReferalSchema}
      //  onSubmit={submit}
        
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
                    
                    <Stack direction="column" spacing={4} justifyContent='center'  alignSelf= 'center' alignItems='center'>
                <FormInput
                isRequired
                type="text"
                w='90'
                alignSelf='center'
                textAlign="center"
                borderWidth='thin'
                borderColor="black"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.referer}
                error={errors.referer}
                touch={touched.referer}
                name="referer"
                placeholder="Rferrer ID"
                variant='outlined'
                // onChange={e => setState(e.target.value)}
                
                
              />
                    <Button
                   
                    isLoading={isSubmitting}
                    borderColor="#191191191"
                    type="button"
                    // onClick={() => Navigate()}
                    title ="next"
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
        <PoweredBy/>
        </Flex>
            
       )
    
}
