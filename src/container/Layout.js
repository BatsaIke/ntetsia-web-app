import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import LeftMenu from "./LeftMenu";
import useComponent from "context/componentContext";
import PostModal from "components/Modals/PostModal";
import UpdateProfileModal from "components/Modals/updateProfileModal";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { Link as ReachLink } from "react-router-dom";
import PostImageModal from "components/Modals/PostImageModal";
import { CgSearch } from "react-icons/cg";

const Layout = ({ children, px, py, path, icon, pageTitle, post, ...rest }) => {
  const { colorMode } = useColorMode();
  const { showEmoji, setShowEmoji, isOpen, onClose, modal } = useComponent();

  const getModal = (value) => {
    switch (value) {
      case "post":
        return (
          <PostModal
            isOpen={isOpen}
            onClose={onClose}
            setShowEmoji={setShowEmoji}
            showEmoji={showEmoji}
          />
        );
      case "profile":
        return <UpdateProfileModal isOpen={isOpen} onClose={onClose} />;
      case "image":
        return <PostImageModal isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Box color={colorMode === "dark" ? "white" : "gray.700"} h="100vh"  overflowX="hidden" >
      {getModal(modal)}
      <Container maxW="8xl"  >
        <Grid
    
          templateColumns="7% 15% 55% 23%"
          pos="relative"
          fontFamily="body"
          fontSize={{ md: "md" }}
        >
    
          <GridItem  >
           <LeftMenu />
          </GridItem>

          <GridItem >
           <LeftSidebar/>
          </GridItem>

          <GridItem overflowX="hidden" w="100%"  >
            <Box as="main" gridArea="main" pos="relative" {...rest}  >
              <Flex
                justify="space-between"
                align="center"
                pos="fixed"
                top={0}
                w='45%'
                h={14}
                px={6}
                zIndex={999}
                bg={colorMode === "dark" ? "gray.800" : "white"}
              >
                <Box>
                  <Link
                    d="flex"
                    alignItems="center"
                    as={ReachLink}
                    to={path || "/home"}
                    _hover={{ textDecor: "none" }}
                    _focus={{ outline: "none" }}
                  >
                 {icon && <Icon as={BsArrowLeftShort} boxSize={6} />}

                    <Text fontWeight="bold" fontSize="xl" ml={path ? 5 : 0}>
                      {pageTitle}
                    </Text>
                  </Link>
                  {post && (
                    <Text
                      fontSize="xs"
                      color={colorMode === "dark" ? "gray.400" : "gray.500"}
                      ml={12}
                      mt={-2}
                      fontWeight="bold"
                    >
                      {post} {post > 1 ? "posts" : "post"}
                    </Text>
                  )}
                </Box>

                  <Icon as={CgSearch} boxSize={8} color="blue.900" />
                {/* <Image
                  height={8}
                  src={
                    colorMode === "dark"
                      ? require("../assets/images/logo.png").default
                      : require("../assets/images/dark-logo.png").default
                  }
                /> */}
              </Flex>

              <Box py={py || 20} px={px}>
                {children}
              </Box>
            </Box>
          </GridItem>
          <GridItem float="right">
            <RightSidebar />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.any,
  pt: PropTypes.any,
  px: PropTypes.any,
  rest: PropTypes.any,
};

export default Layout;
