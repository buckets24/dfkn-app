import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const WorkGraph: FC<Omit<IconProps, 'children' | 'css'>> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 182 155" w="182px" h="155px" {...props}>
      <path d="M4.5 154.5V125L10 94L64.5 79.5L118 51.5L178 5V96.5V154.5H4.5Z" fill="#D9D9DE" />
      <rect x="5" y="124.359" width="27.5457" height="2" transform="rotate(-83.3203 5 124.359)" fill="#CFA571" />
      <rect x="10" y="93.8766" width="56.9178" height="2" transform="rotate(-16.1969 10 93.8766)" fill="#CFA571" />
      <rect x="68" y="76.5374" width="56.9178" height="2" transform="rotate(-26.6584 68 76.5374)" fill="#CFA571" />
      <rect x="118" y="51.2505" width="75.9942" height="2" transform="rotate(-38.4451 118 51.2505)" fill="#CFA571" />
      <path
        d="M119 55C121.209 55 123 53.2091 123 51C123 48.7909 121.209 47 119 47C116.791 47 115 48.7909 115 51C115 53.2091 116.791 55 119 55Z"
        fill="white"
        stroke="#CFA571"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M177 9C179.209 9 181 7.20914 181 5C181 2.79086 179.209 1 177 1C174.791 1 173 2.79086 173 5C173 7.20914 174.791 9 177 9Z"
        fill="white"
        stroke="#CFA571"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M64 83C66.2091 83 68 81.2091 68 79C68 76.7909 66.2091 75 64 75C61.7909 75 60 76.7909 60 79C60 81.2091 61.7909 83 64 83Z"
        fill="white"
        stroke="#CFA571"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M10 98C12.2091 98 14 96.2091 14 94C14 91.7909 12.2091 90 10 90C7.79086 90 6 91.7909 6 94C6 96.2091 7.79086 98 10 98Z"
        fill="white"
        stroke="#CFA571"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="0" width="2" height="154">
        <path
          d="M5.00001 153L5 1"
          stroke="#C4C4C4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2.98 2.98"
        />
      </mask>
      <g mask="url(#mask0)">
        <rect x="4" y="125" width="2" height="29" fill="#C4C4C4" />
      </g>
      <path
        d="M5 128C7.20914 128 9 126.209 9 124C9 121.791 7.20914 120 5 120C2.79086 120 1 121.791 1 124C1 126.209 2.79086 128 5 128Z"
        fill="white"
        stroke="#CFA571"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </Icon>
  );
};
