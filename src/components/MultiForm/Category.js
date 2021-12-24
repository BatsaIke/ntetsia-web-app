import { Box, Button, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { Flex } from "@chakra-ui/layout";
import RegisterForm from "./Register";
import { Link,NavLink } from "react-router-dom";

const Category = ({ state, onChange }) => {
  const updateDaysActive = (day) => {
    onChange(day);
  };

  const Type = ({ children, ...rest }) => (
    <Button
      // colorScheme={state.includes(children) ? 'twitter' : 'blue.600'}
      
      variant="outline"
      color="#898989"
      fontSize="14"
      borderColor="#191191191"
      bg={state.includes(children) ? "#EAE7FD" : ""}
      _hover={{ bg: "#BEFEF2" }}
      _active={{ bg: "#BEFEF2" }}
      rounded="4px"
      onClick={() => updateDaysActive(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  

  const handleClick=()=>{
    return (<RegisterForm/>)
  }

  return (
    <Flex >
    <Box mt="10">
      <Text  size="sm" mb={6} textAlign="center" color="#898989" fontFamily="Bahnschrift">
        Kindly Select Membership Type
      </Text>
      <Stack isInline >
        <Type onClick={handleClick}>
        {/* <Link
                as={NavLink}
                to = "/register"
                //bg="#285DAF"
                _hover={{ textDecor: "none" }}
                color="#285DAF"
              > */}
          
          Individual
          {/* </Link>  */}
          </Type>
        <Type >Corporate</Type>
        <Type >In-Trust-For</Type>
      </Stack>
    </Box>

    
    </Flex>
  );
};

export default Category;


// <Flex
//             align="center"
//             justify="center"
//             mt={10}
//             d={currentIndex === 1 ? "none" : "flex"}
//             mb={currentIndex === 1 ? 6 : ""}
//           >
           
//             <Button
//               title="Continue"
//               rounded="0px"
//               w={32}
//               isDisabled={state === "In-Trust-For"}
//               color="white"
//               bg="#ACA2F4"
//               _hover={{ bg: "#EAE7FD" }}
//               _active={{ bg: "#BEFEF2" }}
//               onClick={
//                 state === "Corporate"
//                   ? onOpen
//                   : state === "In-Trust-For"
//                   ? ""
//                   : () => handleStepClick(+1)
//               }
//             />
//           </Flex>
//           <Flex direction="column" mb={8} textAlign="center">
           
//             <Text color="#898989" >
//               Already a member?{" "}
//               <Link
//                 as={NavLink}
//                 to="/login"
//                 //bg="#285DAF"
//                 _hover={{ textDecor: "none" }}
//                 color="#285DAF"
//               >
//                 Login here
//               </Link>
//             </Text>
//           </Flex>