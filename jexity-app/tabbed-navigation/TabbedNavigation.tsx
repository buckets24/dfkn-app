import { Box, Flex, Link } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { FC } from 'react';

const TabLink: FC<NextLinkProps> = ({ children, href, as }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <NextLink passHref href={href} as={as}>
      <Link
        pos="relative"
        fontFamily="heading"
        fontSize="sm"
        textAlign="center"
        fontWeight="500"
        _hover={{ textDecor: 'none' }}
        _focus={{ outline: 'none' }}
        mr={4}
        pb={4}
        color={isActive ? 'brand.primary.500' : 'inherit'}
      >
        {children}
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
      </Link>
    </NextLink>
  );
};

export interface TabbedNavigationProps {
  links: ({ label: string } & NextLinkProps)[];
}

const TabbedNavigation: FC<TabbedNavigationProps> = ({ links }) => {
  return (
    <Flex pt={3}>
      {links.map((link) => {
        const { href, as, label } = link;
        return (
          <TabLink key={label} passHref href={href} as={as}>
            {label}
          </TabLink>
        );
      })}
    </Flex>
  );
};

export default TabbedNavigation;
