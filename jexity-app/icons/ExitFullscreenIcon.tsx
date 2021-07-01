import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const ExitFullscreenIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      d="M0 14.1429H3.85714V18H6.42857V11.5714H0V14.1429ZM3.85714 3.85714H0V6.42857H6.42857V0H3.85714V3.85714ZM11.5714 18H14.1429V14.1429H18V11.5714H11.5714V18ZM14.1429 3.85714V0H11.5714V6.42857H18V3.85714H14.1429Z"
      fill="currentColor"
    />
  </Icon>
);
