import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SignatureIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 16 16" w="16px" h="16px" {...props}>
    <path
      d="M0 3V0.625C0 0.279785 0.279785 0 0.625 0H3C3.34521 0 3.625 0.279785 3.625 0.625C3.625 0.970215 3.34521 1.25 3 1.25H1.25V3C1.25 3.34521 0.970215 3.625 0.625 3.625C0.279785 3.625 0 3.34521 0 3ZM15.375 0H13C12.6548 0 12.375 0.279785 12.375 0.625C12.375 0.970215 12.6548 1.25 13 1.25H14.75V3C14.75 3.34521 15.0298 3.625 15.375 3.625C15.7202 3.625 16 3.34521 16 3V0.625C16 0.279785 15.7202 0 15.375 0ZM3 14.75H1.25V13C1.25 12.6548 0.970215 12.375 0.625 12.375C0.279785 12.375 0 12.6548 0 13V15.375C0 15.7202 0.279785 16 0.625 16H3C3.34521 16 3.625 15.7202 3.625 15.375C3.625 15.0298 3.34521 14.75 3 14.75ZM15.375 12.375C15.0298 12.375 14.75 12.6548 14.75 13V14.75H13C12.6548 14.75 12.375 15.0298 12.375 15.375C12.375 15.7202 12.6548 16 13 16H15.375C15.7202 16 16 15.7202 16 15.375V13C16 12.6548 15.7202 12.375 15.375 12.375ZM7.45312 3.07812V6.82812C7.45312 7.17334 7.17334 7.45312 6.82812 7.45312H3.07812C2.73291 7.45312 2.45312 7.17334 2.45312 6.82812V3.07812C2.45312 2.73291 2.73291 2.45312 3.07812 2.45312H6.82812C7.17334 2.45312 7.45312 2.73291 7.45312 3.07812ZM6.20312 3.70312H3.70312V6.20312H6.20312V3.70312ZM13.2344 7.45312H9.48438C9.13916 7.45312 8.85938 7.17334 8.85938 6.82812V3.07812C8.85938 2.73291 9.13916 2.45312 9.48438 2.45312H13.2344C13.5796 2.45312 13.8594 2.73291 13.8594 3.07812V6.82812C13.8594 7.17334 13.5796 7.45312 13.2344 7.45312ZM12.6094 3.70312H10.1094V6.20312H12.6094V3.70312ZM7.45312 9.48438V13.2344C7.45312 13.5796 7.17334 13.8594 6.82812 13.8594H3.07812C2.73291 13.8594 2.45312 13.5796 2.45312 13.2344V9.48438C2.45312 9.13916 2.73291 8.85938 3.07812 8.85938H6.82812C7.17334 8.85938 7.45312 9.13916 7.45312 9.48438ZM6.20312 10.1094H3.70312V12.6094H6.20312V10.1094ZM12.4297 13.0547H10.2891C9.94385 13.0547 9.66406 12.7749 9.66406 12.4297V10.2891C9.66406 9.94385 9.94385 9.66406 10.2891 9.66406H12.4297C12.7749 9.66406 13.0547 9.94385 13.0547 10.2891V12.4297C13.0547 12.7749 12.7749 13.0547 12.4297 13.0547ZM11.8047 10.9141H10.9141V11.8047H11.8047V10.9141Z"
      fill="black"
    />
  </Icon>
);
