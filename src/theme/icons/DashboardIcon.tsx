import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const DashboardIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 24 24" w="24px" h="24px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 13C20.6569 13 22 14.3431 22 16V19C22 20.6569 20.6569 22 19 22H16C14.3431 22 13 20.6569 13 19V16C13 14.3431 14.3431 13 16 13H19ZM8 13C9.65685 13 11 14.3431 11 16V19C11 20.6569 9.65685 22 8 22H5C3.34315 22 2 20.6569 2 19L2 16C2 14.3431 3.34315 13 5 13L8 13ZM19 15H16C15.4477 15 15 15.4477 15 16V19C15 19.5523 15.4477 20 16 20H19C19.5523 20 20 19.5523 20 19V16C20 15.4477 19.5523 15 19 15ZM8 15L5 15C4.44772 15 4 15.4477 4 16V19C4 19.5523 4.44772 20 5 20H8C8.55228 20 9 19.5523 9 19V16C9 15.4477 8.55228 15 8 15ZM8 2C9.65685 2 11 3.34315 11 5L11 8C11 9.65685 9.65685 11 8 11L5 11C3.34315 11 2 9.65685 2 8L2 5C2 3.34315 3.34315 2 5 2L8 2ZM19 2C20.6569 2 22 3.34315 22 5V8C22 9.65685 20.6569 11 19 11H16C14.3431 11 13 9.65685 13 8L13 5C13 3.34315 14.3431 2 16 2L19 2ZM8 4L5 4C4.44772 4 4 4.44772 4 5L4 8C4 8.55228 4.44772 9 5 9L8 9C8.55228 9 9 8.55228 9 8L9 5C9 4.44772 8.55228 4 8 4ZM19 4L16 4C15.4477 4 15 4.44772 15 5L15 8C15 8.55228 15.4477 9 16 9H19C19.5523 9 20 8.55228 20 8V5C20 4.44772 19.5523 4 19 4Z"
      fill="currentColor"
    />
  </Icon>
);