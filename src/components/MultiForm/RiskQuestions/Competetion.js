import React, { Component, 
    useEffect } from 'react'

import {Flex, Text,Stack} from "@chakra-ui/react";
import Type from 'components/Form/Type';
import Logo from 'container/Logo';
import PoweredBy from 'container/PoweredBy';
import useAPI from 'context/apiContext';
import { Link, NavLink } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";


export default function Competetion(props , ...rest) {
    const [isByMember,setisByMember]= React.useState(false);
    const [RiskQuestions, setRiskQuestions] = React.useState("Yes");
    const {riskQuestions} = useAPI();
    const [loading, setloading] = React.useState(false);

    useEffect(async() => {
        // Update the document title using the browser API
        // console.log(props.location.state)
        setisByMember(props.location.state)

        try {
            let data = await riskQuestions()
            setloading(true)
           setRiskQuestions(data)
           } catch (error) {
           }
    }, []);


    
    // async 
    
function Navigate(){
    props.history.push({pathname:"/jobBelieve", state:isByMember})
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
                    
                    
             {loading?   <Text fontWeight="extrabold" fontSize="32px" color="#646464" > {RiskQuestions.length >= 1 && RiskQuestions[1].question}</Text> :<Dots/>}
                <Stack direction="row" spacing={4} align="center"  w={220} h={20}>
                    <Type onClick={() => { setRiskQuestions("yes",{...rest}) }}>
                    <Link
                        as={NavLink}
                        
                        to="/jobBelieve"
                    >
                        Yes
                        </Link>
                    </Type>

                    <Type onClick={() => { setRiskQuestions("no") }}>
                    <Link
                        as={NavLink}
                        
                        to="/jobBelieve"
                    >
                        No
                        </Link>
                    </Type>
                </Stack>
                    
            
            </Flex>
            <PoweredBy/>
            </Flex>

        )
    }




