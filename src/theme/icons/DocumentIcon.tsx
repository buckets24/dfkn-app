import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const DocumentIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 2C11.2652 2 11.5196 2.10536 11.7071 2.29289L15.7071 6.29289C15.8946 6.48043 16 6.73478 16 7V15C16 16.6569 14.6569 18 13 18H7C5.34315 18 4 16.6569 4 15V5C4 3.34315 5.34315 2 7 2H11ZM9.999 4H7C6.44772 4 6 4.44772 6 5V15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15V8H11C10.4872 8 10.0645 7.61396 10.0067 7.11662L10 7L9.999 4Z"
      fill="#CFA571"
    />
  </Icon>
);
