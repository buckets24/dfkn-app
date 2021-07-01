import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const VolumeIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => {
  return (
    <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M10.5001 6.82109C10.5001 5.44832 9.70676 4.26219 8.55566 3.69052V9.95552C9.70676 9.37999 10.5001 8.19385 10.5001 6.82109Z"
        fill="black"
      />
      <path d="M0 4.48775V9.15441H3.1111L7 13.0433V0.598846L3.1111 4.48775H0Z" fill="black" />
      <path
        d="M8.55566 0V1.6061C10.8034 2.275 12.4445 4.35553 12.4445 6.8211C12.4445 9.28667 10.8034 11.3672 8.55566 12.0361V13.6422C11.6707 12.9344 14.0001 10.1539 14.0001 6.8211C14.0001 3.48833 11.6707 0.707766 8.55566 0Z"
        fill="black"
      />
    </Icon>
  );
};
