import { FormLabelProps, SystemStyleObject } from '@chakra-ui/react';

export const flushedLabelStyle = (
  variant: string | undefined,
  defaultStyle: SystemStyleObject,
  value: string | undefined
): FormLabelProps => {
  /**
   * FIXME, there might be a better way to properly type these
   */
  if (variant === 'flushed') {
    if (value) {
      return {
        ...defaultStyle,
        top: 2,
        fontSize: 'xs',
        maxW: '210px',
        color: 'documents.primary.500',
      } as FormLabelProps;
    } else {
      return { ...defaultStyle, top: 4 } as FormLabelProps;
    }
  } else {
    return defaultStyle as FormLabelProps;
  }
};
