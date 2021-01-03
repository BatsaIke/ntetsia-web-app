import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import useComponent from 'context/componentContext';
import PostModal from 'components/Modals/PostModal';
import UpdateProfileModal from 'components/Modals/updateProfileModal';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link as ReachLink } from 'react-router-dom';

const Layout = ({ children, px, py, path, icon, pageTitle, post, ...rest }) => {
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
        <GridItem overflow='hidden'>
          <Box
            as='main'
            gridArea='main'
            overflow='hidden'
            fontFamily='body'
            pos='relative'
            w='100%'
            {...rest}
          >
            <Flex
              justify='space-between'
              align='center'
              pos='fixed'
              top={0}
              w='34.2%'
              h={14}
              px={6}
              borderBottomWidth={1}
              zIndex={999}
              bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            >
              <Box>
                <Link
                  d='flex'
                  alignItems='center'
                  as={ReachLink}
                  to={path || '/'}
                  _hover={{ textDecor: 'none' }}
                  _focus={{ outline: 'none' }}
                >
                  {icon && <Icon as={BsArrowLeftShort} boxSize={6} />}

                  <Text fontWeight='bold' fontSize='xl' ml={path ? 5 : 0}>
                    {pageTitle}
                  </Text>
                </Link>
                {post && (
                  <Text
                    fontSize='xs'
                    color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
                    ml={12}
                    mt={-2}
                    fontWeight='bold'
                  >
                    {post} {post > 1 ? 'posts' : 'post'}
                  </Text>
                )}
              </Box>

              <Image
                height={8}
                src={
                  colorMode === 'dark'
                    ? require('../assets/images/logo.png').default
                    : require('../assets/images/dark-logo.png').default
                }
              />
            </Flex>

            <Box py={py || 20} px={px}>
              {children}
            </Box>
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
