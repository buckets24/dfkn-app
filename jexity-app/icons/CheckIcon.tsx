import { FC } from 'react';
import { CheckboxProps, Icon, IconProps } from '@chakra-ui/react';

export const CheckIcon: FC<Omit<IconProps, 'children' | 'css'> & CheckboxProps> = (props) => {
  const { isIndeterminate, isChecked, ...rest } = props;

  return (
    <Icon viewBox="0 0 17 13" w="17px" h="13px" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.86009 12.9999C5.58292 12.9991 5.31856 12.8832 5.13009 12.6799L0.270089 7.50995H0.270089C-0.108226 7.10678 -0.0880795 6.47327 0.315089 6.09495C0.718257 5.71663 1.35177 5.73678 1.73009 6.13995L5.85009 10.5299L14.2601 1.32995V1.32995C14.6059 0.899326 15.2353 0.830573 15.6659 1.17638C16.0966 1.52219 16.1653 2.15161 15.8195 2.58223C15.7948 2.61301 15.7683 2.6423 15.7401 2.66994L6.60009 12.6699C6.41337 12.8769 6.14878 12.9965 5.87009 12.9999L5.86009 12.9999Z"
        fill="currentColor"
      />
    </Icon>
  );
};
