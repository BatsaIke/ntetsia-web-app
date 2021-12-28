import React, {useEffect } from 'react'
import Logo from 'container/Logo'
import { Flex, Text, Stack, } from "@chakra-ui/react";
import { Link , NavLink } from 'react-router-dom';
import Type from 'components/Form/Type';
import PoweredBy from 'container/PoweredBy';
import useAPI from 'context/apiContext';
import useComponent, { userContext } from "context/componentContext";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";




export default function Contribute(props) {
    const [isByMember, setisByMember] = React.useState(false);
    const [RiskQuestions, setRiskQuestions] = React.useState(false);
    const [choice, setChoice] = React.useState("");
    const {riskQuestions} = useAPI();
    const [loading, setloading] = React.useState(false);


    const {setState}= useComponent() 
    

    useEffect(async() => {
        // Update the document title using the browser API
        console.log(props.location.state)
        setisByMember(props.location.state)

        try {
            let data = await riskQuestions()
           console.log("NEWWWWW",data);
           setloading(true)
           setRiskQuestions(data)
           } catch (error) {
             console.log(error)
           }
    }, []);

    
    const handleClick = (value) => {
        setChoice(value);
        
      };

      console.log(choice, choice)
      

    function Navigate() {

        // await setisByMember(true) 
        props.history.push({ pathname: "/competetionBelive", state: isByMember })


    }

    


    return (
        <userContext.Provider value={choice}>
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

           {loading?     <Text fontWeight="extrabold" fontSize="32px" color="#646464" > {RiskQuestions.length >= 1 && RiskQuestions[0].question}</Text> :<Dots/>}
                <Stack direction="row" spacing={4} align="center" w={220} h={20}>
                    <Type onClick={() => {setChoice("yes");Navigate() }}>
                        Yes
                       </Type>

                    <Type onClick={() => { setChoice("no"); Navigate() }}>
                        No
                    </Type>
                </Stack> 


            </Flex>
            <PoweredBy />

        </Flex>
        </userContext.Provider>

    )
}




