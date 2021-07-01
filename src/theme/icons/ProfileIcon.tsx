import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const ProfileIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 14L15 14C17.7614 14 20 16.2386 20 19C20 19.5523 19.5523 20 19 20C18.4872 20 18.0645 19.614 18.0067 19.1166L17.9949 18.8237C17.907 17.3072 16.6928 16.093 15.1763 16.0051L15 16L5 16C3.34315 16 2 17.3431 2 19C2 19.5523 1.55228 20 1 20C0.447715 20 0 19.5523 0 19C0 16.3112 2.12231 14.1182 4.78311 14.0046L5 14L15 14L5 14ZM10 0C13.3137 0 16 2.68629 16 6C16 9.31371 13.3137 12 10 12C6.68629 12 4 9.31371 4 6C4 2.68629 6.68629 0 10 0ZM10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2Z"
      fill="currentColor"
    />
  </Icon>
);
