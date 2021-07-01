import { FC } from 'react';
import { IconProps, Icon } from '@chakra-ui/react';

export const CirclePlusIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 21 20" w="21px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 0C16.0228 0 20.5 4.47715 20.5 10C20.5 15.5228 16.0228 20 10.5 20C4.97715 20 0.5 15.5228 0.5 10C0.5 4.47715 4.97715 0 10.5 0ZM10.5 2C6.08172 2 2.5 5.58172 2.5 10C2.5 14.4183 6.08172 18 10.5 18C14.9183 18 18.5 14.4183 18.5 10C18.5 5.58172 14.9183 2 10.5 2ZM10.5 4C11.0523 4 11.5 4.44772 11.5 5V9H15.5C16.0523 9 16.5 9.44771 16.5 10C16.5 10.5523 16.0523 11 15.5 11H11.5V15C11.5 15.5523 11.0523 16 10.5 16C9.94771 16 9.5 15.5523 9.5 15V11H5.5C4.94772 11 4.5 10.5523 4.5 10C4.5 9.44771 4.94772 9 5.5 9H9.5V5C9.5 4.44772 9.94771 4 10.5 4Z"
      fill="currentColor"
    />
  </Icon>
);
