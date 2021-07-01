import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SquarePlusIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 18" w="18px" h="18px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 4.52987e-07H3H3C1.34315 5.2541e-07 0 1.34315 0 3V15C-2.50178e-07 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0V4.52987e-07ZM12 10H10V12C10 12.5523 9.55229 13 9 13C8.44771 13 8 12.5523 8 12V10H6C5.44771 10 5 9.55229 5 9C5 8.44771 5.44771 8 6 8H8V6C8 5.44772 8.44771 5 9 5C9.55229 5 10 5.44772 10 6V8H12C12.5523 8 13 8.44772 13 9C13 9.55229 12.5523 10 12 10Z"
      fill="currentColor"
    />
  </Icon>
);
