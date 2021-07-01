import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ShareArrowIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon width="10px" height="8px" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 8C0.56 5.33 2.11 2.67 6 2.13V0L10 3.73L6 7.47V5.28C3.22 5.28 1.39 6.13 0 8Z" fill="currentColor" />
    </Icon>
  );
};
