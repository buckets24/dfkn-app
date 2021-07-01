import { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import { ChevronIconProps } from './ChevronIcon';

export const TriangleIcon: FC<ChevronIconProps> = ({ direction = 'bottom', ...props }) => {
  let rotateDeg = 0;
  if (direction === 'right') {
    rotateDeg = 270;
  } else if (direction === 'left') {
    rotateDeg = 90;
  } else if (direction === 'top') {
    rotateDeg = 180;
  }
  return (
    <Icon viewBox="0 0 9 6" w="9px" h="6px" transform={`rotate(${rotateDeg}deg)`} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.20001 6L8.20001 0H0.200012L4.20001 6Z" fill="currentColor" />
    </Icon>
  );
};
