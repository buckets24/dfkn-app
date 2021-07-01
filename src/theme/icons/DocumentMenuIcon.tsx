import { FC } from 'react';
import { IconProps, Icon } from '@chakra-ui/react';

export const DocumentMenuIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 4 16" w="4px" h="16px" {...props}>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="4" height="16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect x="-10" y="-4" width="24" height="24" fill="currentColor" />
    </g>
  </Icon>
);
