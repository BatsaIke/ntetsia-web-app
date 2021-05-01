import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  GridItem,
  Avatar,
  Text,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import useComponent from "context/componentContext";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import moment from "moment";
import { useProfile } from "../../hooks/useGlobalHooks";
import { Link as ReachLink } from "react-router-dom";

const PostImageModal = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const { user } = useProfile();
  const { selectedData } = useComponent();
  console.log("selectedData", selectedData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxH={120} h={120} minW={140} overflow="hidden">
        <ModalCloseButton />
        <ModalBody p={0}>
          <Grid templateColumns={{ md: "repeat(6, 1fr)" }}>
            <GridItem colSpan={4}>
              <Flex h={120} align="center" justify="center" bg="black">
                {selectedData?.files?.map((file) => (
                  <Image
                    h="100%"
                    w="100%"
                    objectFit="scale-down"
                    src={file?.url}
                  />
                ))}
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <Box p={{ md: 3 }}>
                <Flex>
                  <Avatar
                    src={selectedData?.member?.profile_picture}
                    size="md"
                    borderWidth={2}
                    borderColor="gray.300"
                  />
                  <Box ml={4}>
                    <Link
                      as={ReachLink}
                      to={{
                        pathname: `/profile/${selectedData?.member?.id}`,
                        state: selectedData,
                      }}
                      _hover={{
                        // textDecor: "none",
                        bg: colorMode === "dark" ? "gray.700" : "gray.100",
                      }}
                      onClick={onClose}
                    >
                      <Text fontSize="md" fontWeight={800}>
                        {selectedData?.member?.first_name}{" "}
                        {selectedData?.member?.last_name}
                      </Text>
                    </Link>
                    <Box mt={-1}>
                      <Text as="span" fontSize="sm">
                        {user?.occupation}
                      </Text>
                      <Text
                        mt={-1}
                        fontSize="xs"
                        color={colorMode === "dark" ? "gray.400" : "gray.500"}
                      >
                        {moment(selectedData?.created_at).fromNow()}
                      </Text>
                    </Box>
                  </Box>
                </Flex>

                <Box mt={5}>
                  <Text>{selectedData?.body}</Text>

                  <Flex
                    align="center"
                    justify="space-between"
                    borderTopWidth={1}
                    pt={1}
                    mt={4}
                    fontSize="sm"
                  >
                    <Text>
                      {selectedData?.likes_count}{" "}
                      {selectedData?.likes_count > 1 ? "likes" : "like"}
                    </Text>
                    <Flex>
                      <Text>
                        {selectedData?.comments_count}{" "}
                        {selectedData?.comments_count > 1
                          ? "comments"
                          : "comment"}{" "}
                      </Text>
                      <Text ml={4}>
                        {selectedData?.shares_count}{" "}
                        {selectedData?.shares_count > 1 ? "shares" : "share"}{" "}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostImageModal;
