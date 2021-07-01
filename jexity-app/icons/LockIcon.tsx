import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const LockIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon viewBox="0 0 16 20" w="16px" h="20px" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C10.6888 0 12.8818 2.12231 12.9954 4.78311L13 5V8C14.6569 8 16 9.34315 16 11V17C16 18.6569 14.6569 20 13 20H3C1.34315 20 0 18.6569 0 17V11C0 9.34315 1.34315 8 3 8V5C3 2.23858 5.23858 0 8 0ZM13 10H3C2.44772 10 2 10.4477 2 11V17C2 17.5523 2.44772 18 3 18H13C13.5523 18 14 17.5523 14 17V11C14 10.4477 13.5523 10 13 10ZM8.17627 2.00509L8 2C6.40232 2 5.09634 3.24892 5.00509 4.82373L5 5V8H11V5C11 3.40232 9.75108 2.09634 8.17627 2.00509L8 2L8.17627 2.00509Z"
        fill="currentColor"
      />
    </Icon>
  );
};
