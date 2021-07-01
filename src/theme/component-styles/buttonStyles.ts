import { Theme } from '@chakra-ui/react';
import theme from '../theme';

type VariantReturnType = ReturnType<Theme['components']['Button']['variants']['solid']>;

export const Button: Theme['components']['Button'] = {
  ...theme.components.Button,
  variants: {
    ...theme.components.Button.variants,
    solid: (): VariantReturnType => ({
      bg: 'brand.primary.500',
      _active: {
        bg: 'brand.primary.900',
      },
      _hover: {
        bg: 'brand.primary.900',
        _disabled: {
          /**
           * TODO Check if this is the correct disabled color
           */
          bg: 'gray.400',
        },
      },
    }),
  },
};
