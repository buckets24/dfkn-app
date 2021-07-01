import { FC, ReactNode } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FooterLayout } from './FooterLayout';

export interface LoginLayoutProps {
  logo?: ReactNode;
}

const LoginLayout: FC<LoginLayoutProps> = ({ children, logo }) => {
  return (
    <SimpleGrid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gridTemplateRows="1fr min-content"
      px={[10, null, null, 0]}
      pt={[10, null, 0]}
      position="relative"
      minH="100%"
      w="100%"
      bg="gray.200"
    >
      <SimpleGrid
        m="auto"
        columns={[1, null, null, 2]}
        mx="auto"
        bg="white"
        maxW={['100%', null, null, '960px']}
        minW={['100%', null, null, '960px']}
        minH="640px"
        h="auto"
        my={5}
        boxShadow="0px 0px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15)"
        borderRadius="4px"
      >
        <Box pos="relative" py={10} order={[2, null, null, 1]}>
          {logo}
          <Box px={[8, null, null, '59px']}>{children}</Box>
        </Box>
        <Box
          order={[1, null, null, 2]}
          minH={['200px', null, '300px']}
          bg="url('/images/login-image.png')"
          backgroundSize="cover"
          borderTopRightRadius="4px"
          borderBottomRightRadius="4px"
        />
      </SimpleGrid>
      <FooterLayout maxW={['100%', null, null, '960px']} minW={['100%', null, null, '960px']} mb={4} mt={8} />
    </SimpleGrid>
  );
};

export default LoginLayout;
