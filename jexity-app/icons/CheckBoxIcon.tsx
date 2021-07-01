import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const CheckBoxIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 12 10" w="12px" h="10px" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.91006 7.49585L1.7071 5.29291C1.31658 4.90239 0.683416 4.90239 0.292893 5.29291C-0.0976309 5.68343 -0.0976309 6.3166 0.292893 6.70712L3.29288 9.70709C3.7168 10.131 4.4159 10.0892 4.7863 9.61781L11.7863 1.61786C12.1275 1.18359 12.0521 0.554936 11.6178 0.213723C11.1835 -0.127489 10.5549 -0.0520504 10.2136 0.38222L3.91006 7.49585Z"
      fill="white"
    />
  </Icon>
);
