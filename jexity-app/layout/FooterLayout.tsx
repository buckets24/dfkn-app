import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import SimpleNextLink from 'jexity-app/link/SimpleNextLink';
import React, { FC } from 'react';

export const FooterLayout: FC<FlexProps> = ({ ...others }) => (
  <Flex flexDir={['column', null, 'row']} alignItems="center" justifyContent="space-between" {...others}>
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      mb={[4, null, 0]}
      maxW={['160px', null, '200px']}
      w="100%"
    >
      <SimpleNextLink as="/impressum" href="/impressum">
        Impressum
      </SimpleNextLink>
      <SimpleNextLink as="/datenschutz" href="/datenschutz">
        Datenschutz
      </SimpleNextLink>
    </Flex>
    <Box>
      <Text fontFamily="body" fontWeight={400} fontSize="sm">
        &#169; {new Date().getFullYear()} DFK Nessy. All Rights Reserved.{' '}
      </Text>
    </Box>
  </Flex>
);
