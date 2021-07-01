import { Box } from '@chakra-ui/react';
import { Spinner, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const LoadingScreen: FC = () => {
  return (
    <Box
      d="flex"
      position="absolute"
      top={0}
      left={0}
      zIndex={1000}
      /**
       * TODO brand.gradientBackground doesn't work for some reason
       */
      bg="linear-gradient(90deg, #5771DB 0%, #5771DB 0.01%, #63D9CC 100%)"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        <Text textTransform="uppercase" size="xl" fontWeight="bold" color="white">
          Loading
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
