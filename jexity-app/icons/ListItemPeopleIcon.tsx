import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ListItemPeopleIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon viewBox="0 0 16 16" w="16px" h="16px" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10H11C13.7614 10 16 12.2386 16 15C16 15.5523 15.5523 16 15 16C14.4872 16 14.0645 15.614 14.0067 15.1166L13.9949 14.8237C13.907 13.3072 12.6928 12.093 11.1763 12.0051L11 12H5C3.34315 12 2 13.3431 2 15C2 15.5523 1.55228 16 1 16C0.447715 16 0 15.5523 0 15C0 12.3112 2.12231 10.1182 4.78311 10.0046L5 10H11H5ZM8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5C3 2.23858 5.23858 0 8 0ZM8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2Z"
        fill="currentColor"
      />
    </Icon>
  );
};
