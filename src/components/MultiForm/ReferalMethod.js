import { Flex, Text, Stack, Box } from '@chakra-ui/layout'
import { NavLink, Link,useHistory,} from "react-router-dom";

import { Button } from "@chakra-ui/react"
import Contribution from 'pages/Contribution'
import Logo from 'container/Logo'
import React, { Component } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { GiThink } from 'react-icons/gi'
import { IoMdMan } from 'react-icons/io'
import Questions from './QuestionContribution'
import Router from 'routes/router';
import { useSetState } from 'react-use';




//export default function ReferalMethod(props, onChange) {
 

export default function ReferalMethod(props) {
    // let history = useHistory()
   const [isByMember,setisByMember]= React.useState(false);
   const [isOnline,setisOnline]= React.useState()

   const txtStyle ={
    colorScheme:"black", variant:"outline", fontFamily:"MontserratBold", fontSize:"19"
   }
   
   
// async 
function Navigate(param){

    // await setisByMember(true) 
    props.history.push({pathname:"/contributionBelieve", state:param})
    

}

function NavigatetoRegister(param){

    // await setisByMember(true) 
    props.history.push({pathname:"/contributionBelieve", state:param})
    

}



    // const updateDaysActive = (day) => {
    //         onChange(day);
    //     };
    
        const Type = ({ children, ...rest }) => (
            <Button
                // colorScheme={state.includes(children) ? 'twitter' : 'blue.600'}
                color="#898989"
                borderColor="#191191191"
                //bg={state.includes(children) ? "#EAE7FD" : ""}
                variant="outline"
                _hover={{ bg: "#BEFEF2" }}
                _active={{ bg: "#BEFEF2" }}
                rounded="4px"
               // onChange={() => updateDaysActive(children)}
                {...rest}
            >
                {children}
               
            </Button>
        );
    return (

        <Flex

            alignItems="center"
            justifyContent='center'
            direction="column"
            h="100vh"
            w="100vw"
            roundedBottom="none"
        >

            <Box>
                <Logo />
            </Box>
            <Text  fontWeight="extrabold" fontSize="32px" color="#646464" >How did you hear about us?</Text>

            <Stack direction='column' spacing={1}  >
                <Type styles={txtStyle} color="#898989" >  
                <Link as={NavLink}
                to="/referID"
                >            
                     Introduced by a member
                     </Link>  
                </Type>
            

                <Type txtStyle onClick={()=>{NavigatetoRegister(false)} }  color="#898989"  >
                
                    Found you online/Conference
                
                </Type>
                <Type onClick={()=>{NavigatetoRegister(false)}  } color="#898989">
                
                    By someone but i have forgotten
                    
                </Type>

            </Stack>

        </Flex>
    )
}
