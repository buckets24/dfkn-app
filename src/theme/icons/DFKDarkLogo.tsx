import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const DFKDarkLogo: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon width="40px" height="40px" viewBox="0 0 60 60" {...props}>
      <path
        d="M0 0V60H60V0H0ZM33.6667 52.5L52.2917 33.875V52.5H33.6667ZM52.3333 23L22.8334 52.5H7.5V7.5H52.3333V23Z"
        fill="#0E1236"
      />
      <path d="M22.5 37.5V22.5H37.5L45 15H15V45L22.5 37.5Z" fill="#0E1236" />
    </Icon>
  );
};
