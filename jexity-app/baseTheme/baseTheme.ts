import { Theme, ThemeOverride, useTheme } from '@chakra-ui/react';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * ChakraUI no longer includes this interface
 */
export interface ColorHues {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Copying type here because it is not exposed by Chakra.
 * Technically could use Pick but not sure how to better
 * extends Colors with Pick<Theme, 'colors'> values yet.
 */
export interface ChakraColors {
  transparent: string;
  current: string;
  black: string;
  white: string;
  whiteAlpha: ColorHues;
  blackAlpha: ColorHues;
  gray: ColorHues;
  red: ColorHues;
  orange: ColorHues;
  yellow: ColorHues;
  green: ColorHues;
  teal: ColorHues;
  blue: ColorHues;
  cyan: ColorHues;
  purple: ColorHues;
  pink: ColorHues;
  linkedin: ColorHues;
  facebook: ColorHues;
  messenger: ColorHues;
  whatsapp: ColorHues;
  twitter: ColorHues;
  telegram: ColorHues;
}

export interface BrandColors extends RecursivePartial<ChakraColors> {
  brand?: {
    bodyBackground: string;

    textColor: string;

    primary: Partial<ColorHues>;

    secondary: Partial<ColorHues>;

    tertiary: Partial<ColorHues>;

    [key: string]: string | Partial<ColorHues>;
  };
  documents?: {
    bodyBackground: string;

    textColor: string;

    primary: Partial<ColorHues>;

    secondary: Partial<ColorHues>;

    tertiary: Partial<ColorHues>;

    [key: string]: string | Partial<ColorHues>;
  };
  support?: {
    [key: string]: string | Partial<ColorHues>;
  };
}

/**
 * TODO Typings of the latest version are now more strict
 * consider refactoring brandcolors to match the new APi
 */
export interface BaseTheme extends Omit<ThemeOverride, 'colors'> {
  colors?: BrandColors;
}

export const useBaseTheme = (): BaseTheme => useTheme() as BaseTheme;
