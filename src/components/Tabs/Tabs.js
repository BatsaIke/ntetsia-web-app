import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Tab from './Tab';

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);

const Tabs = ({ children, width, borderWidth, px, pt }) => {
  const [activeTab, setActiveTab] = React.useState(children[0].props.label);

  const handleClickTabItem = React.useCallback((tab) => setActiveTab(tab), []);

  return (
    <Flex direction='column' w='100%'>
      <Flex
        justify='space-between'
        as='ol'
        listStyleType='none'
        w='100%'
        mx='auto'
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

      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        w={{ md: width }}
        // h={{ md: height }}
        mx='auto'
        // px={px || 16}
        // py={10}
        overflow='hidden'
        pt={pt}
        bg='white'
        pos='relative'
        borderWidth={borderWidth || 1}
        borderColor='gray.300'
        rounded='md'
      >
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </MotionFlex>
    </Flex>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.any,
};

export default Tabs;
