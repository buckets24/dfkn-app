import { Box } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { Impressum } from 'src/views/impressum/Impressum';
import PublicStaticLayout from 'jexity-app/layout/PublicStaticLayout';

export const ImpressumPage: FC & HasLayout = () => (
  <PublicStaticLayout bg={['white', null, null, 'gray.200']}>
    <Box
      m="0 auto"
      bg={['transparent', null, null, 'white']}
      maxW={['100%', null, null, '856px']}
      minW={['100%', null, null, '856px']}
      h="100%"
      boxShadow={[null, null, null, '0px 0px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15)']}
      borderRadius={[0, null, null, '4px 0 0 4px']}
      p={[0, null, null, '40px']}
    >
      <Impressum />
    </Box>
  </PublicStaticLayout>
);

export default ImpressumPage;
