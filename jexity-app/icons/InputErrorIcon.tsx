import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const InputErrorIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
      fill="currentColor"
    />
  </Icon>
);
