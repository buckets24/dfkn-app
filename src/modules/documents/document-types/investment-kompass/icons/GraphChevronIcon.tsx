import { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import { ChevronIconProps } from './ChevronIcon';

export const GraphChevronIcon: FC<ChevronIconProps> = ({ direction = 'right', ...props }) => {
  let rotateDeg = 0;
  if (direction === 'bottom') {
    rotateDeg = 90;
  } else if (direction === 'left') {
    rotateDeg = 180;
  } else if (direction === 'top') {
    rotateDeg = 270;
  }

  return (
    <Icon viewBox="0 0 10 16" w="10px" h="16px" transform={`rotate(${rotateDeg}deg)`} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48172 7.99982L0.34172 14.2468C-0.0742807 14.6108 -0.116281 15.2428 0.24772 15.6578C0.61172 16.0738 1.24372 16.1158 1.65872 15.7528L9.65872 8.75182C10.1137 8.35382 10.1137 7.64582 9.65872 7.24782L1.65872 0.247816C1.24372 -0.116184 0.61172 -0.0741844 0.24772 0.340816C-0.116281 0.756816 -0.0742807 1.38882 0.34172 1.75182L7.48172 7.99982Z"
        fill="currentcolor"
      />
    </Icon>
  );
};
