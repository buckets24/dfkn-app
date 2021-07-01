import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const FullscreenIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      d="M2.57143 11.5714H0V18H6.42857V15.4286H2.57143V11.5714ZM0 6.42857H2.57143V2.57143H6.42857V0H0V6.42857ZM15.4286 15.4286H11.5714V18H18V11.5714H15.4286V15.4286ZM11.5714 0V2.57143H15.4286V6.42857H18V0H11.5714Z"
      fill="currentColor"
    />
  </Icon>
);
