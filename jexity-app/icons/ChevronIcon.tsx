import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface ChevronIconProps extends Omit<IconProps, 'children' | 'css'> {
  direction?: 'right' | 'bottom' | 'left' | 'top';
}

export const ChevronIcon: FC<ChevronIconProps> = ({ direction = 'bottom', ...props }) => {
  let rotateDeg = 0;
  if (direction === 'right') {
    rotateDeg = 270;
  } else if (direction === 'left') {
    rotateDeg = 90;
  } else if (direction === 'top') {
    rotateDeg = 180;
  }

  return (
    <Icon viewBox="0 0 12 8" w="12px" h="8px" transform={`rotate(${rotateDeg}deg)`} {...props}>
      <path d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z" fill="currentColor" />
    </Icon>
  );
};
