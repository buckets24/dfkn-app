import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SearchIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 20 20" w="20px" h="20px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0C13.9706 0 18 4.02944 18 9C18 11.1248 17.2637 13.0776 16.0323 14.6172L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3466 20.0676 18.7794 20.0953 18.3871 19.7903L18.2929 19.7071L14.6172 16.0323C13.0776 17.2637 11.1248 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2Z"
      fill="currentColor"
    />
  </Icon>
);
