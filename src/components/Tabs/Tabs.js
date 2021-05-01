import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Tab from "./Tab";

const MotionBox = motion(Box);

const Tabs = ({ children, pt, direction = "column" }) => {
  const [activeTab, setActiveTab] = React.useState(children[0].props.label);

  const handleClickTabItem = React.useCallback((tab) => setActiveTab(tab), []);

  return (
    <Flex direction={direction} w="100%">
      <Flex
        justify="space-between"
        as="ol"
        listStyleType="none"
        w="100%"
        mx="auto"
        borderBottomWidth={1}
      >
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={handleClickTabItem}
            />
          );
        })}
      </Flex>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        w="100%"
        p={6}
        mx="auto"
        overflow="hidden"
        pt={pt}
        pos="relative"
        borderColor="gray.300"
        rounded="md"
      >
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </MotionBox>
    </Flex>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.any,
};

export default Tabs;
