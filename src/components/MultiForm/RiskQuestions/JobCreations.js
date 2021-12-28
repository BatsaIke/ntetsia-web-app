
import Type from 'components/Form/Type'
import { Flex, Text, Stack, Box, Grid, Checkbox, Button, CheckboxGroup } from "@chakra-ui/react";
import Logo from 'container/Logo';
import React, { useEffect } from 'react';
import PoweredBy from 'container/PoweredBy';
import useAPI from 'context/apiContext';
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";





export default function JobCreations(props) {
    const [loading, setloading] = React.useState(false);

    const [RiskQuestions, setRiskQuestions] = React.useState(false);
    const {riskQuestions} = useAPI();

    useEffect(async() => {
        // Update the document title using the browser API
        console.log(props.location.state)
        

        try {
            let data = await riskQuestions()
           console.log("NEWWWWW",data);
           setloading(true)
           setRiskQuestions(data)
           } catch (error) {
             console.log(error)
           }
    }, []);


    

    const handleEvent = () => {

        if (props.location.state === true) {
            window.location.href = "/referID"

        }
        else {

            window.location.href = "/register"
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

            {loading?    <Text fontWeight="extrabold" fontSize="32px" color="#646464" > {RiskQuestions.length >= 1 && RiskQuestions[2].question}</Text>:<Dots/>}
                <Stack direction="row" spacing={4} align="center" w={220} h={20}>
                    <Type onClick={handleEvent}>

                        Yes
                    </Type>

                    <Type onClick={handleEvent}>
                        No
                    </Type>
                </Stack>

            </Flex>
            <PoweredBy />
        </Flex>
    )
}
