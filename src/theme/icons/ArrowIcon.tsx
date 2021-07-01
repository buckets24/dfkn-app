import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface ArrowIconProps extends Omit<IconProps, 'children' | 'css'> {
  direction?: 'right' | 'bottom' | 'left' | 'top';
}

export const ArrowIcon: FC<ArrowIconProps> = ({ direction = 'right', ...props }) => {
  let rotateDeg = 0;
  if (direction === 'bottom') {
    rotateDeg = 90;
  } else if (direction === 'left') {
    rotateDeg = 180;
  } else if (direction === 'top') {
    rotateDeg = 270;
  }

  return (
    <Icon viewBox="0 0 11 9" w="11px" h="9px" transform={`rotate(${rotateDeg}deg)`} {...props}>
      <path
        d="M6.52699 9L10.9815 4.54545L6.52699 0.0909092L5.76136 0.856534L8.91335 3.99858H0.75V5.09233H8.91335L5.76136 8.24432L6.52699 9Z"
        fill="currentColor"
      />
    </Icon>
  );
};
