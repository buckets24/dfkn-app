import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const CalendarIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C15.5523 0 16 0.447715 16 1V2L17 2C18.6569 2 20 3.34315 20 5L20 17C20 18.6569 18.6569 20 17 20L3 20C1.34315 20 0 18.6569 0 17L0 5C0 3.34315 1.34315 2 3 2L4 2L4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1L6 2L14 2V1C14 0.447715 14.4477 0 15 0ZM2 10L2 17C2 17.5523 2.44772 18 3 18L17 18C17.5523 18 18 17.5523 18 17V10L2 10ZM2 8L18 8L18 5C18 4.44772 17.5523 4 17 4H16V5C16 5.55228 15.5523 6 15 6C14.4477 6 14 5.55228 14 5V4L6 4V5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5V4H3C2.44772 4 2 4.44772 2 5L2 8Z"
        fill="currentColor"
      />
    </Icon>
  );
};
