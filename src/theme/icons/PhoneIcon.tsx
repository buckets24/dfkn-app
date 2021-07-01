import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const PhoneIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25 2.5L13.75 2.5C14.391 2.5 14.9194 2.98255 14.9916 3.60422L15 3.75L15 16.25C15 16.891 14.5174 17.4194 13.8958 17.4916L13.75 17.5H6.25C5.60896 17.5 5.08062 17.0174 5.00841 16.3958L5 16.25L5 3.75C5 3.10896 5.48255 2.58062 6.10422 2.50841L6.25 2.5L13.75 2.5L6.25 2.5ZM10 12.5C9.30964 12.5 8.75 13.0596 8.75 13.75C8.75 14.4404 9.30964 15 10 15C10.6904 15 11.25 14.4404 11.25 13.75C11.25 13.0596 10.6904 12.5 10 12.5Z"
      fill="currentColor"
    />
  </Icon>
);
