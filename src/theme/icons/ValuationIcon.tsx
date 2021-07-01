import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const ValuationIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6 14H4V7H6V14ZM10 14H8V4H10V14ZM14 14H12V10H14V14Z"
      fill="#424D79"
    />
  </Icon>
);
