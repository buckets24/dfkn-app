import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const FinancialAnalysisStyle: FC = () => {
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

export const FinancialAnalysisIcon: FC<Omit<IconProps, 'children' | 'css'>> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 39.89 36.31" w="39.89px" h="36.31px" {...props}>
      <defs>
        <FinancialAnalysisStyle />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-1"
            d="M30.91,5.19l4.57,0,.05,4.49m-24,21.9H23.1M11.56,24.19h5.77M11.56,28H23.1M8.92,9.51H5.32V6h3.6Zm0,7.34H5.32V13.3h3.6Zm0,7.34H5.32V20.64h3.6Zm0,7.35H5.32V28h3.6Zm7.85-16.23,4.16-2.75,4.78.74L34.87,6M28.62,24.58v11H.75V.75H28.62V3m2.91,19L28.71,19.2m8.78,10.2,1.65-1.62L32.4,21.13l-1.65,1.63ZM18.66,17.66a6.23,6.23,0,0,0,1.66,1.05m3.33.41a6,6,0,0,0,5-4.85M26,8.39A6,6,0,0,0,24,7.56a6.12,6.12,0,0,0-5,1A6,6,0,0,0,16.77,12M29.33,8A8.71,8.71,0,0,0,19,5.51a8.46,8.46,0,0,0-4.37,11.22A8.67,8.67,0,0,0,26,21a8.46,8.46,0,0,0,5.05-8.81"
          />
        </g>
      </g>
    </Icon>
  );
};
