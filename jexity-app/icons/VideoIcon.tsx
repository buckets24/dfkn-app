import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const VideoIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 18 12" w="18px" h="12px" {...props}>
    <path
      d="M14 4.5V1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5Z"
      fill="currentColor"
    />
  </Icon>
);
