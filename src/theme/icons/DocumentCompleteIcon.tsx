import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const DocumentCompleteIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
      fill="#81DB73"
    />
  </Icon>
);
