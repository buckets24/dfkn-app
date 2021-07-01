import NextLink from 'next/link';
import { ButtonProps, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

export interface NavigationItemProps extends ButtonProps {
  href: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ children, href, ...others }) => {
  const router = useRouter();

  let activeProps = {};
  const activeStyle = {
    color: 'brand.primary.500',
  };

  if (router.pathname.split('/')[1] === href.split('/')[1] && router.pathname.split('/')[2] === href.split('/')[2]) {
    activeProps = activeStyle;
  }

  return (
    <NextLink passHref href={href} as={href}>
      <Button
        w="100%"
        as="a"
        variant="ghost"
        justifyContent="flex-start"
        fontFamily="heading"
        fontWeight="bold"
        color="gray.500"
        {...activeProps}
        _hover={activeStyle}
        _focus={{
          outline: 'none',
        }}
        {...others}
      >
        {children}
      </Button>
    </NextLink>
  );
};

export default NavigationItem;
