import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const DisableIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 16 16" w="16px" h="16px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM12.8906 4.52332L4.52332 12.8906C5.50417 13.5892 6.70411 14 8 14C11.3137 14 14 11.3137 14 8C14 6.70411 13.5892 5.50417 12.8906 4.52332ZM8 2C4.68629 2 2 4.68629 2 8C2 9.29589 2.41083 10.4958 3.10935 11.4767L11.4767 3.10935C10.4958 2.41083 9.29589 2 8 2Z"
      fill="currentColor"
    />
  </Icon>
);
