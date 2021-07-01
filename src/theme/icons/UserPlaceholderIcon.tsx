import { FC } from 'react';
import { IconProps, Icon } from '@chakra-ui/react';

export const UserPlaceholderIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 75 75" w="75px" h="75px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.3125 37.5H43.6875C60.7738 37.5 74.625 51.3512 74.625 68.4375C74.625 71.6107 72.2364 74.226 69.1591 74.5834L68.4375 74.625H6.5625C3.14524 74.625 0.375 71.8548 0.375 68.4375C0.375 51.8008 13.5068 38.2313 29.9705 37.5286L31.3125 37.5H43.6875H31.3125ZM37.5 0.375C47.7518 0.375 56.0625 8.68571 56.0625 18.9375C56.0625 29.1893 47.7518 37.5 37.5 37.5C27.2482 37.5 18.9375 29.1893 18.9375 18.9375C18.9375 8.68571 27.2482 0.375 37.5 0.375Z"
      fill="currentColor"
    />
  </Icon>
);
