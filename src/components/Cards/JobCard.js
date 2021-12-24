import { Box, Avatar, Grid, Text } from "@chakra-ui/react"
import Type from "components/Form/Type";
import ApplyJob from "components/Modals/JobApplyModal";
import { Link, NavLink } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/hooks';
import React, { useEffect } from 'react'

const JobCard = (props) => {
const { isOpen, onOpen, onClose } = useDisclosure();
const [modal, setModal] = React.useState(false);

  useEffect(() => {
    setModal(props.state)
  }, []);

  function getPaymentModal(value) {
    return <ApplyJob isOpen={isOpen} onClose={onClose} />;
  }

  const property = {
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,9",
    reviewCount: 34,
    rating: 4,
  }

  return (

    <Box maxW="sm" overflow="hidden" bw='1PX' ml={9} boxShadow="md" w='35%' align="center" h="20rem" shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      rounded="none"
    >
      <Box
        borderBottomRight="10px"
        borderBottomLeft="10px "
        borderBottom="10px"
        borderBottomLeft="10px"
        height="10"
        left="64"
        bg="yellow.400"
        position="absolute">
        new
      </Box>

      <Avatar
        position="absolute"
        left="7"
        top="16"
        bw={2}
        borderColor="gray.400"
      />

      <Box>
        <Text
          mt="3"
          w="50%" h="5%"
          align="center"
          fontSize="18"
          color="black"> Accountant </Text>
      </Box>

      <Text
        w="50%" h="5%"
        align="center"
        fontSize="12"
        color="black.200"> needed </Text>

      <Text bg="blue.300"
        w="50%" h="5%"
        align="center"
        fontSize="12"
        color="white"> Full time </Text>

      <Box p="2" bw="1px"  >
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            bg="blue.100"
            bottom="0"
          >
            Date
          </Box>
        </Box>

        <Box
          bw="10px"
          borderColor="black"
          bg="#f9f9f9"
          height="80px"
          lineHeight="tight"
          borderColor="blue.800"
          borderWidth="1px"
          borderRadius="lg"
          rounded="none"
        >
          <Text color="gray.500" >
            {property.title}
          </Text>
        </Box>

        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <Box w="100%"    >
            Salary {property.formattedPrice}
          </Box>
          <Box w="100%"   >
            Experience {property.formattedPrice}
          </Box>
          <Box w="100%"  >
            Location {property.formattedPrice}
          </Box>
        </Grid>

        {/* <Box display="flex" mt="2" alignItems="center">
        </Box> */}

        <Box mt={8}>
          <Type w="40%" mr="30px" h="30px" bg="blue.900" color="white" onClick={() => modal} >
            Apply</Type>
          <Type w="40%" h="30px" h="30px" color="blue">
            <Link
              as={NavLink}
              to="/jobdetails"
              //bg="#285DAF"
              _hover={{ textDecor: "none" }}
              color="#285DAF"
            >
              Details

            </Link> </Type>
        </Box>
      </Box>
    </Box>

  )
}
export default JobCard;