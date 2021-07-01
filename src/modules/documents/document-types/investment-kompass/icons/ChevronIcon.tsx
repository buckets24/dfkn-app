import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface ChevronIconProps extends Omit<IconProps, 'children' | 'css'> {
  direction?: 'right' | 'bottom' | 'left' | 'top';
}

export const ChevronIcon: FC<ChevronIconProps> = ({ direction = 'right', ...props }) => {
  let rotateDeg = 0;
  if (direction === 'bottom') {
    rotateDeg = 90;
  } else if (direction === 'left') {
    rotateDeg = 180;
  } else if (direction === 'top') {
    rotateDeg = 270;
  }

  return (
    <Icon viewBox="8.75 0 35 35" w="35px" h="35px" transform={`rotate(${rotateDeg}deg)`} {...props}>
      <path
        d="M17.6815 26.2767V34.7476L34.6232 17.8059L17.6815 0.864266V9.33509L26.1523 17.8059L17.6815 26.2767Z"
        fill="currentColor"
      />
    </Icon>
  );
};
