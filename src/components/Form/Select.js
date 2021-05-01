import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { Check, ChevronDown, ChevronUp } from "theme/Icons";
import React from "react";

const MotionBox = motion(Box);

const Select = ({
  label,
  placeholder,
  items,
  setFieldValue,
  fieldName,
  selected,
  setSelected,
  setFieldTouched,
  setFieldError,
  error,
  touch,
}) => {
  const [onOpen, setOnOpen] = React.useState(false);
  const ref = React.useRef();
  const { colorMode } = useColorMode();

  useOnClickOutside(ref, () => setOnOpen(false));

  const handleClickBtn = () => {
    setOnOpen(!onOpen);
  };

  const onOptionClicked = (value) => () => {
    setFieldValue(fieldName, value.name);
    setFieldTouched(fieldName, true);
    setFieldError(fieldName, true);
    setSelected(value);
    setOnOpen(false);
  };

  return (
    <FormControl pos="relative" isRequired isInvalid={error && touch}>
      <FormLabel>{label}</FormLabel>
      <Box as="span" d="inline-block" w="100%" rounded="md" shadow="sm">
        <MotionBox
          as="button"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          cursor="default"
          pos="relative"
          w="100%"
          borderWidth={2}
          borderColor="gray.400"
          pl={3}
          pr={10}
          py={2}
          h={12}
          _hover={{ borderColor: "brand.darkBlue" }}
          _focus={{ borderColor: "brand.darkBlue", outline: "none" }}
          textAlign="left"
          onClick={handleClickBtn}
        >
          <Flex align="center" ml={3}>
            {selected && selected?.flag && (
              <Image src={selected && selected?.flag} w={4} h={4} />
            )}
            <Text
              as="span"
              fontSize="md"
              fontFamily="body"
              fontWeight={500}
              d="block"
              isTruncated
              color={
                selected
                  ? colorMode === "dark"
                    ? "white"
                    : "gray.800"
                  : "gray.400"
              }
              ml={3}
            >
              {selected ? selected?.name : placeholder}
            </Text>
          </Flex>
          <Flex
            as="span"
            pos="absolute"
            top={0}
            bottom={0}
            right={0}
            align="center"
            pr={2}
            pointerEvents="none"
            transitionDuration={onOpen && "250ms"}
            color="gray.400"
          >
            <Icon as={onOpen ? ChevronUp : ChevronDown} boxSize={6} />
          </Flex>
        </MotionBox>
      </Box>

      {/* <!-- Select popover, show/hide based on select state. --> */}
      <AnimatePresence>
        {onOpen && (
          <MotionBox
            ref={ref}
            pos="absolute"
            mt={1}
            w="100%"
            rounded="md"
            bg="white"
            shadow="lg"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ y: -10, opacity: 0, transition: { duration: 0.3 } }}
            zIndex={10}
          >
            <Box
              as="ul"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              maxH={64}
              rounded="md"
              fontSize={{ base: "sm", md: "md" }}
              lineHeight={{ base: 6, md: 5 }}
              shadow="xs"
              overflow="auto"
              _focus={{ outline: "none" }}
            >
              {items.map((item) => (
                <Box
                  key={item.alpha2Code}
                  as="li"
                  id="listbox-item-0"
                  role="option"
                  color={selected?.name === item.name ? "white" : "gray.900"}
                  cursor="pointer"
                  userSelect="none"
                  pos="relative"
                  py={3}
                  pl={3}
                  pr={8}
                  bg={selected?.name === item.name && "brand.lightBlue"}
                  _hover={{
                    bg:
                      selected?.name === item.name
                        ? "brand.darkBlue"
                        : "gray.50",
                  }}
                  transition="background-color 250ms"
                  value={item}
                  onClick={onOptionClicked(item)}
                >
                  <Flex align="center" ml={3}>
                    {/* <Image src={item.flag} w={4} h={4} /> */}
                    <Text
                      as="span"
                      role="radio"
                      fontSize="md"
                      fontFamily="body"
                      fontWeight={500}
                      d="block"
                      isTruncated
                      ml={3}
                    >
                      {item.name}
                    </Text>
                  </Flex>
                  {selected?.name === item.name && (
                    <Flex
                      as="span"
                      pos="absolute"
                      top={0}
                      bottom={0}
                      right={0}
                      align="center"
                      pr={4}
                    >
                      <Icon as={Check} />
                    </Flex>
                  )}
                </Box>
              ))}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Select;
