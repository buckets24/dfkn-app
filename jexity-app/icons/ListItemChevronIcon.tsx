import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ListItemChevronIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon viewBox="0 0 8 12" w="8px" h="12px" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 6L0 12L0 0L8 6Z" fill="currentColor" />
    </Icon>
  );
};
