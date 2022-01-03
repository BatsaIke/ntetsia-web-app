import React, { useEffect } from 'react'
import Logo from 'container/Logo'
import { Flex, Text, Stack, } from "@chakra-ui/react";
import { Link, NavLink } from 'react-router-dom';
import Type from 'components/Form/Type';
import PoweredBy from 'container/PoweredBy';
import useAPI from 'context/apiContext';
import useComponent from "context/componentContext";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";




export default function JobCreations(props) {
    const [RiskQuestions, setRiskQuestions] = React.useState(false);
    const [choice, setChoice] = React.useState("");
    const { riskQuestions } = useAPI();
    const [loading, setloading] = React.useState(false);
   
    

function Navigate(param) {
    props.history.push({ pathname: "/register", state: param })
    localStorage.setItem("jobcreation", param)

}


    useEffect(async () => {

        try {
            let data = await riskQuestions()
            setloading(true)
            setRiskQuestions(data)
        } catch (error) {
            console.error(error)
        }
    }, []);


    


    return (

        <Flex  >

            <Flex
                alignItems="center"
                justifyContent='center'
                direction="column"
                h="100vh"
                w="100%"
                roundedBottom="none"
            >
                <Logo />

                {loading ? <Text fontWeight="extrabold" fontSize="32px" color="#646464" > {RiskQuestions.length >= 1 && RiskQuestions[0].question}</Text> : <Dots />}
                <Stack direction="row" spacing={4} align="center" w={220} h={20}>
                    <Type onClick={() => 
                        {Navigate(true) }}>
                        Yes
                    </Type>

                    <Type onClick={() => { Navigate(false)}}>
                        No
                    </Type>
                </Stack>


            </Flex>
            <PoweredBy />

        </Flex>


    )
}




