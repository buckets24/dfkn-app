import { FC } from 'react';
import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const Sidebar: FC = ({ children }) => {
  return (
    <Box d="grid" gridTemplateRows="min-content 1fr min-content" backgroundColor="white" h="100%" w="100%">
      <Box>{children}</Box>
      <Box mt="auto" pl={10} pb={3}>
        <Box mb={5}>
          <NextLink href="/impressum" passHref>
            <Link
              mb={6}
              color="gray.500"
              fontWeight="bold"
              _hover={{
                color: 'brand.primary.500',
                textDecoration: 'none',
              }}
            >
              Impressum
            </Link>
          </NextLink>
        </Box>
        <Box mb={6}>
          <NextLink href="/datenschutz" passHref>
            <Link
              mb={5}
              color="gray.500"
              fontWeight="bold"
              _hover={{
                color: 'brand.primary.500',
                textDecoration: 'none',
              }}
            >
              Datenschutz
            </Link>
          </NextLink>
        </Box>
        <Text fontFamily="heading" color="gray.500">
          © DFK NORD. {new Date().getFullYear()}
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
