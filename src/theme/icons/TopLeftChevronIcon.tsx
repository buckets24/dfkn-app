import { FC } from 'react';
import { IconProps, Icon } from '@chakra-ui/react';

export const TopLeftChevronIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 61 61" w="61px" h="61px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 30.225V60.45L7.5 53L15 45.55V30.275V15H30.275H45.55L53 7.5L60.45 0H30.225H0V30.225Z"
      fill="#0E1236"
    />
  </Icon>
);
