import { Box, Link } from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const SimpleNextLink: FC<NextLinkProps & { showUnderline?: boolean }> = ({
  href,
  as,
  passHref = true,
  children,
  showUnderline = true,
}) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <NextLink passHref={passHref} href={href} as={as}>
      <Link
        pos="relative"
        fontFamily="heading"
        fontSize="sm"
        textAlign="center"
        fontWeight="500"
        _hover={{ textDecor: 'none' }}
        _focus={{ outline: 'none' }}
        color={isActive ? 'brand.primary.500' : 'inherit'}
      >
        {children}
        {showUnderline && (
          <Box
            opacity={isActive ? 1 : 0}
            transition="0.2s"
            backgroundColor="brand.primary.500"
            h="2px"
            w="100%"
            position="absolute"
            bottom="0"
            left="0"
          />
        )}
      </Link>
    </NextLink>
  );
};

export default SimpleNextLink;
