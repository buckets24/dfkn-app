import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ShareStopIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon width="8px" height="8px" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="8px" height="8px" rx="2" fill="currentColor" />
    </Icon>
  );
};
