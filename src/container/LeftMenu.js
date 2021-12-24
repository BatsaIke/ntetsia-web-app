import React, { useState } from "react";

import {
  Box,
  Flex,
  Stack,
  Image,
  Icon,
  Link,

} from "@chakra-ui/react";
import { CgFeed, CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { GiSuitcase } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosBulb } from "react-icons/io";
import { BsBell, BsFileBarGraphFill } from "react-icons/bs";
import { BiCog } from 'react-icons/bi'
import { HiOutlineLogout } from "react-icons/hi";






const LeftMenu = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };


  return (
    <Flex
      top="0"
      justify='center'
      as="aside"
      pos='fixed'
      bottom={0}
      h={{ lg: "100vh" }}
      left={0}
      boxShadow="sm"
      w="4%"
      bg="#002060"
      overflow="hidden"
    // _hover={{
    //   // textDecor: "none",
    //   // bg: colorMode === "dark" ? "gray.700" : "gray.200",
    //   overflow:"scroll",
    //   width:"5%",

    // }}


    >
      <Stack direction='column' spacing="5px" align='center' marginTop="5">

        <Box  >
          <Image
            height="80%"
            width="80%"

            src={

              require("../assets/images/1024.png").default

            }
          />
        </Box>
        <Box mt={2} >

          <Link
          align="center"
            as={NavLink}
            to="/home"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",
            }}
          >
            <Icon as={CgFeed} boxSize={8} color='white' />
            <hr />
            Feeds
          </Link>
        </Box>


        <Box mt={2} >

          <Link
            as={NavLink}
            to="/profile"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{

              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",
            }}
          >
            <Icon as={CgProfile} boxSize={8} color='white' />
            <br />
            Profile
          </Link>
        </Box>
      

        <Box mt={2} >

<Link
 align="center"
  as={NavLink}
  to="/dashboard"
  display="block"
  color="transparent"
  fontSize="0.75rem"
  _hover={{

    rounded: "30px",
    transition: "background-color .3s ease-in-out",
    color: "white",
    textDecoration: "white",
  }}
>
  <Icon as={BsFileBarGraphFill} boxSize={8} color='white' /><br />
  
  DashBoard
</Link>
</Box>


        <Box >
          <Link
            as={NavLink}
            to="/jobs"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",

            }}

          >


            {/* {hover ?  <Text color="white"> Jobs</Text>  : <Icon as={GiSuitcase} boxSize={8}  color="white" />} */}
            <Icon as={GiSuitcase} boxSize={8} color="white" />
            <br />
            Jobs
          </Link>
        </Box>

        <Box mt={2} align='center' >
          <Link
            as={NavLink}
            to="/contribution"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",
            }}

          >
            {/* {hover ?  <Text color="white"> Contribution</Text>  : <Icon as={GiReceiveMoney} boxSize={8}  color="white" />} */}
            <Icon as={GiReceiveMoney} boxSize={8} color="white" />
            Contribution

          </Link>

        </Box>

        <Box mt={2} align='center' >
          <Link
            as={NavLink}
            to="/my-ideas"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",



            }}

          >
            {/* {hover ?  <Text color="white"> My Ideas</Text>  : <Icon as={IoIosBulb} boxSize={8}  color="white" />} */}
            <Icon as={IoIosBulb} boxSize={8} color="white" />
            <br />
            My Ideas

          </Link>

        </Box>
        <Box mt={2} align='center' >
          <Link
            as={NavLink}
            to="/notifications"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",
            }}

          >
            {/* {hover ?  <Text color="white"> Notifications</Text>  : <Icon as={BsBell}  boxSize={8}  color="white" />} */}
            <Icon as={BsBell} boxSize={8} color="white" />
            Notifications

          </Link>

        </Box>
        <Box mt={2} align='center' >
          <Link
            as={NavLink}
            to="/settings"
            d="block"
            color="transparent"
            // py={{ md: 2 }}
            fontSize="0.8rem"
            _hover={{
              // textDecor: "none",
              // bg: colorMode === "dark" ? "gray.700" : "gray.200",
              rounded: "30px",
              transition: "background-color .3s ease-in-out",
              color: "white",
              textDecoration: "white",



            }}

          >
            {/* {hover ?  <Text color="white"> Settings</Text>  :  <Icon as={BiCog} boxSize={8}  color="white" /> } */}
            <Icon as={BiCog} boxSize={8} color="white" />
            Settings
          </Link>
        </Box>
        <Box mt={12} align='center' >

          <Link as={NavLink} to="/logout" _hover={{ textDecor: "none" }}>
            <Box
              d="block"
              py={{ md: 2 }}
              fontSize="0.8rem"
              _hover={{

                rounded: "30px",
                transition: "background-color .3s ease-in-out",
              }}
              px={4}
              as="button"
              role="button"
              aria-label="Logout button"
            >


              {/* {hover ?  <Text color="white">  Logout</Text>  : <Icon as={HiOutlineLogout} boxSize={8}  color="white" />} */}
              <Icon as={HiOutlineLogout} boxSize={8} color="white" />
              Logout
            </Box>
          </Link>
        </Box>

      </Stack>





    </Flex>
  )


}

export default LeftMenu;