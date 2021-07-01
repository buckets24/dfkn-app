import { Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const SizeToggleButton: FC<FlexProps & { isActive?: boolean }> = ({ children, isActive = false, ...props }) => {
  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      w="24px"
      h="24px"
      minW="initial"
      lineHeight="20px"
      borderRadius="50%"
      pl={0}
      pr={0}
      bg={isActive ? 'brand.primary.500' : 'gray.600'}
      color={isActive ? 'white' : 'gray.400'}
      fontFamily="heading"
      fontWeight="bold"
      textAlign="center"
      _hover={{
        bg: 'brand.primary.500',
        color: 'white',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default SizeToggleButton;
