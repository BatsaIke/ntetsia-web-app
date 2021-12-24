import React, { useState } from "react";

import {
  Box,
  Flex,
  Stack,
  Image,
  Icon,
  Link,
  Grid,
  GridItem

} from "@chakra-ui/react";
import LeftMenu from "../../container/LeftMenu";
import DashBoardRight from "./DashboardRight";
import DashboardDetails from "./DashboardDetails";

const DashBoard =()=>{
    return(
        <Box>
            <Grid

templateColumns="10%  75% 50%"
fontFamily="body"
fontSize={{ md: "md" }}
>
    <GridItem>
        <LeftMenu/>
    </GridItem>

    <GridItem>
        <DashboardDetails/>
    </GridItem>

    <GridItem>
        <DashBoardRight/>
    </GridItem>

</Grid>


        </Box>
    )

}

export default DashBoard;