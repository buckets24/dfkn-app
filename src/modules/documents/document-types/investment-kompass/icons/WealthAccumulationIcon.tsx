import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const WealthAccumulationStyle: FC = () => {
  return (
    <style jsx global>
      {`
        .cls-1,
        .cls-3 {
          fill: none;
        }
        .cls-2 {
          clip-path: url(#clip-path);
        }
        .cls-3 {
          stroke: #424d79;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5px;
        }
      `}
    </style>
  );
};

export const WealthAccumulationIcon: FC<Omit<IconProps, 'children' | 'css'>> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 42.82 46.05" w="42.82px" h="46.05" {...props}>
      <defs>
        <WealthAccumulationStyle />
        <clipPath id="clip-path" transform="translate(0 0)">
          <rect className="cls-1" width="42.82" height="46.05" />
        </clipPath>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g className="cls-2">
            <path
              className="cls-3"
              d="M24.8,20.27a3.73,3.73,0,0,0,2.08-.89,3.92,3.92,0,0,0,1.33-1.58m-4.93,5.3a3.67,3.67,0,0,1-2.07-.89,3.87,3.87,0,0,1-1.34-1.58m7-9.37-.15.21a3.07,3.07,0,0,1-2.51,1.29h-.6a3,3,0,0,1-3-2.89V6.63a3,3,0,0,1,3-2.88h.6A3,3,0,0,1,26.75,5l.15.21m-8.36,4.5h5.22m-5.22-3h5.22m7.32,1.5a7.68,7.68,0,0,1-7.84,7.51A7.68,7.68,0,0,1,15.4,8.25,7.68,7.68,0,0,1,23.24.75,7.68,7.68,0,0,1,31.08,8.25Zm-7.84,7.51s.94,1.41.94,4.76a12.6,12.6,0,0,1-.94,4.81M35.1,30.5a38.19,38.19,0,0,0-8.38-4.59A8.07,8.07,0,0,0,20,26.2a69.38,69.38,0,0,0-6.69,3.93M4.41,35.8v-4H.75V45.3H4.41v-4m23.51-5.5,10.47-4.6a2.68,2.68,0,0,1,3.29.95,2.43,2.43,0,0,1-.87,3.45l-12,6.9a16.52,16.52,0,0,1-12.35,1.66A43.12,43.12,0,0,0,5.78,42.8H4.41m0-8.51L9,32.62a6.37,6.37,0,0,1,4.45,0,17.47,17.47,0,0,0,6.24,1.15h6.17a2,2,0,1,1,0,4H15.94"
              transform="translate(0 0)"
            />
          </g>
        </g>
      </g>
    </Icon>
  );
};
