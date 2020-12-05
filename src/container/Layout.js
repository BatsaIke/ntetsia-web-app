import { Box, Container, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import useComponent from 'context/componentContext';
import PostModal from 'components/Modals/PostModal';
import UpdateProfileModal from 'components/Modals/updateProfileModal';

const Layout = ({ children, height, pt, px, ...rest }) => {
  const { colorMode } = useColorMode();
  const { showEmoji, setShowEmoji, isOpen, onClose, modal } = useComponent();

  const getModal = (value) => {
    switch (value) {
      case 'post':
        return (
          <PostModal
            isOpen={isOpen}
            onClose={onClose}
            setShowEmoji={setShowEmoji}
            showEmoji={showEmoji}
          />
        );
      case 'profile':
        return <UpdateProfileModal isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Container maxW='6xl' color={colorMode === 'dark' ? 'white' : 'gray.700'}>
      {getModal(modal)}
      <Grid
        templateColumns='25% 50% 25%'
        pos='relative'
        fontFamily='body'
        fontSize={{ md: 'md' }}
      >
        <GridItem>
          <LeftSidebar />
        </GridItem>
        <GridItem>
          <Box
            as='main'
            gridArea='main'
            w='100%'
            color='gray.800'
            pt={pt}
            px={px}
            h={height}
            fontFamily='body'
            {...rest}
          >
            {children}
          </Box>
        </GridItem>
        <GridItem>
          <RightSidebar />
        </GridItem>
      </Grid>
    </Container>
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
