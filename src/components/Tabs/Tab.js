import React from "react";
import PropTypes from "prop-types";
import { Box, Text, useColorMode } from "@chakra-ui/react";

const Tab = ({ activeTab, label, onClick }) => {
  const { colorMode } = useColorMode();
  const handleClick = () => {
    onClick(label);
  };
  return (
    <Box
      as="li"
      textAlign="center"
      py={3}
      px={6}
      cursor="pointer"
      onClick={handleClick}
      borderBottomWidth={activeTab === label ? 3 : 0}
      borderBottomColor={activeTab === label ? "blue.500" : ""}
      color={
        activeTab === label
          ? colorMode === "dark"
            ? "white"
            : "gray.700"
          : "gray.500"
      }
      fontWeight="bold"
    >
      <Text fontFamily="body">{label}</Text>
    </Box>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
