import Right from "../assets/images/right.png"
import { Box, Flex } from "@chakra-ui/layout"


export default function PoweredBy() {
    return (
        <Flex  justify="end" >
            <img className='' src = {Right} style={{width:"13%",height:"9%", position:'absolute', bottom:20, marginRight:30  }} alt='ntetsia-logo' />    
            </Flex>
    )
}
