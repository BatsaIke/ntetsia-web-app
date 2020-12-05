import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const PostSkeleton = () => {
  return (
    <Box padding='6' boxShadow='lg' mb={4} rounded='lg'>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </Box>
  );
};

export default PostSkeleton;
