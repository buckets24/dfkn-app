import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const HatIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 40 26" w="40px" h="26px" fill="none" {...props}>
    <path
      d="M32.0036 20.4995C33.4372 10.2576 29.7098 3.91056 28.1329 1.60254C41.4367 5.41078 40.7486 17.0374 39.1716 23.9615C39.0282 23.8653 37.3939 23.0383 32.0036 20.4995Z"
      fill="currentColor"
    />
    <path
      d="M30.8568 20.0667C32.4337 9.10359 28.8497 3.91054 26.556 1.31404C14.9438 0.304275 10.2129 7.66118 9.06602 13.5754C17.2375 11.7001 22.3985 17.0374 30.8568 20.0667Z"
      fill="currentColor"
    />
    <path
      d="M3.0449 17.9029C5.68272 16.8643 8.73151 18.7204 9.92618 19.7782C9.63944 20.4995 4.76518 25.5483 1.75466 25.2598C-1.15616 24.9808 -0.252385 19.2012 3.0449 17.9029Z"
      fill="currentColor"
    />
    <path
      d="M10.2128 13.7197C15.0871 12.9653 21.5383 16.6047 31.4301 21.0766C19.6746 30.5971 16.5207 23.9616 12.9367 20.6438C10.0695 17.9896 7.05894 16.4604 4.19174 16.4604C3.80945 15.9796 6.05542 14.3633 10.2128 13.7197Z"
      fill="currentColor"
    />
    <path
      d="M27.1294 0.0157209C28.0469 0.131122 28.3718 0.736978 28.4196 1.02548C28.1902 1.25628 26.5081 0.929332 25.6958 0.736978C25.6958 0.44853 26.2119 -0.0996802 27.1294 0.0157209Z"
      fill="currentColor"
    />
  </Icon>
);
