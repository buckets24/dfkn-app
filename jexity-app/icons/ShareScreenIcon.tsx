import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const ShareScreenIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 24 16" w="24px" h="16px" {...props}>
    <path
      d="M20 14C21.1 14 21.99 13.1 21.99 12L22 2C22 0.89 21.1 0 20 0H4C2.89 0 2 0.89 2 2V12C2 13.1 2.89 14 4 14H0V16H24V14H20ZM4 12V2H20V12.01L4 12ZM13 5.13C9.11 5.67 7.56 8.33 7 11C8.39 9.13 10.22 8.28 13 8.28V10.47L17 6.73L13 3V5.13Z"
      fill="currentColor"
    />
  </Icon>
);
