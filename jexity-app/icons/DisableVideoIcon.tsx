import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const DisableVideoIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 19 19" w="19px" h="19px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.514709 1.51455L1.92892 0.100342L5.82849 3.99991H14C14.55 3.99991 15 4.44991 15 4.99991V8.49991L19 4.49991V15.4999L15 11.4999V13.1714L18.8995 17.0709L17.4853 18.4851L14.7063 15.7061C14.7063 15.7062 14.7062 15.7062 14.7062 15.7062L2.9999 3.99991H3.00006L0.514709 1.51455ZM1.01268 4.84111C1.00434 4.89286 1 4.9459 1 4.99991V14.9999C1 15.5499 1.45 15.9999 2 15.9999H12.1715L1.01268 4.84111Z"
      fill="white"
    />
  </Icon>
);
