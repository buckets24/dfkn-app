import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const FolderMinusIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.38367 4C8.68571 4 8.97157 4.13652 9.16143 4.37144L10.4776 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H10C9.69795 8 9.41209 7.86348 9.22224 7.62856L7.90609 6H5C4.44772 6 4 6.44772 4 7V13C4 13.5523 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15C10 15.5523 9.55228 16 9 16H5C3.34315 16 2 14.6569 2 13V7C2 5.34315 3.34315 4 5 4H8.38367Z"
      fill="currentColor"
    />
    <path
      d="M16 12H14.5H14H13C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H14H16H17C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12H16Z"
      fill="currentColor"
    />
  </Icon>
);
