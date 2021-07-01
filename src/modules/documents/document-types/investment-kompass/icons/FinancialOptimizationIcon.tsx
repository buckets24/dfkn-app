import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const FinancialOptimizationStyle: FC = () => {
  return (
    <style jsx global>
      {`
        .cls-1 {
          fill: none;
          stroke: #424d79;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5px;
        }
      `}
    </style>
  );
};

export const FinancialOptimizationIcon: FC<Omit<IconProps, 'children' | 'css'>> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 42.04 37.88" w="42.04px" h="37.88px" {...props}>
      <defs>
        <FinancialOptimizationStyle />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-1"
            d="M18.85,36.9V29.32h5.24m0,7.42V25.92h5.23m0,10.82V22.51h5.24V36.68M8.77,34.76l-1.2,1-1.21-1,.31-5h1.8Zm-.3-5H6.66V28.22H8.47Zm2.44-2.36a6.52,6.52,0,0,1-6.68,0A6.59,6.59,0,0,0,.75,33.14v4H14.39v-4A6.61,6.61,0,0,0,10.91,27.35Zm1.2-5.29a4.48,4.48,0,0,1-4.54,4.43,4.43,4.43,0,1,1,0-8.86A4.49,4.49,0,0,1,12.11,22.06ZM30.88,4.48l1.6,3.16,3.57.5L33.47,10.6l.61,3.47-3.2-1.64-3.19,1.64.61-3.47L25.71,8.14l3.58-.5ZM22.8,9.84,21.66,11.4,20.33,10m1.36,1.34A8.78,8.78,0,0,1,23,5,9.39,9.39,0,0,1,35.7,2.11m3.13,7.6L40,8.15l1.33,1.41M39.93,8.23a8.78,8.78,0,0,1-1.25,6.31,9.35,9.35,0,0,1-9.33,4.15c-.27,0-.54-.1-.8-.16L28,18.39a9.18,9.18,0,0,1-2.1-.95m12.24,1.77V36.9H16.69M9,14.25V3.88H20.56"
          />
        </g>
      </g>
    </Icon>
  );
};
