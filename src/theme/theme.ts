import { extendTheme, theme as chakraTheme, ThemeOverride } from '@chakra-ui/react';
import { BaseTheme } from 'jexity-app/baseTheme/baseTheme';
import { Form } from './component-styles/formFieldStyles';
import { Breadcrumb } from './component-styles/breadcrumbStyles';

const themeOverride: BaseTheme = {
  styles: {
    global: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      'html, body, #__next': {
        h: '100%',
      },
      '*::-webkit-scrollbar': {
        w: '5px',
        h: '5px',
      },
      '*::-webkit-scrollbar-track': {
        h: '100%',
        bg: 'gray.600',
        borderRadius: '2px',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: 'gray.500',
        borderRadius: '2px',
      },
      body: {
        // w: '100vw', // This is the scroll jump fix on windows
        w: '100%',
        overflowX: 'hidden',
        backgroundColor: 'brand.bodyBackground',
        fontFamily: 'body',
      },
      /**
       * Unusual way for chakra-ui but I checked the code for `radio.tsx` in chakra-ui's repo,
       * there is no way to pass a property to the wrapping component of the Radio component.
       */
      '.chakra-radio': {
        alignItems: 'baseline !important',
      },
      '.no-page-break': {
        pageBreakInside: 'avoid',
      },
      '.page-break': {
        pageBreakAfter: 'always',
      },
      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        background: '#5771DB',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
      },
    },
  },

  colors: {
    blue: {
      ...chakraTheme.colors.blue,
      50: '#7F98B5',
    },
    gray: {
      900: '#1A1A1A',
      800: '#3A3B3F',
      700: '#9EA0A5',
      600: '#C4C4C4',
      500: '#656565',
      400: '#A1A1A1',
      300: '#C7C7C7',
      200: '#E4E4E4',
      100: '#F1F1F1',
      50: '#F8F8F8',
    },
    brand: {
      bodyBackground: '#F6F9FD',
      gradientBackground: 'linear-gradient(90deg, #5771DB 0%, #5771DB 0.01%, #63D9CC 100%)',
      textColor: '',
      primary: {
        900: '#232D58',
        500: '#5771DB',
        400: '#798DE2',
        300: '#ABB8ED',
        200: '#DDE3F8',
        100: '#F6F8FD',
      },
      secondary: {
        900: '#285752',
        500: '#63D9CC',
        400: '#82E1D6',
        300: '#C1F0EB',
        200: '#D0F4F0',
        100: '#EFFBFA',
      },
      tertiary: {
        900: '#4D3D17',
        500: '#E6B843',
        400: '#FFCC4B',
        300: '#FFEBB7',
        200: '#FFF5DB',
        100: '#FFFAED',
      },
    },
    documents: {
      bodyBackground: '#F6F9FD',
      textColor: '',
      primary: {
        900: '#2648A4',
        700: '#0E1236',
        600: '#091630',
        500: '#1070CA',
        400: '#91ADFA',
        300: '#BFD0FD',
        200: '#F1F4F7',
        100: '#F6F9FD',
      },
      secondary: {
        900: '#0D1035',
        800: '#BFCBDA',
        700: '#424D79',
        600: '#F4F9FB',
        500: '#252849',
        400: '#6E7086',
        300: '#8B93B0',
        200: '#B6B7C2',
        100: '#E7E7EB',
      },
      tertiary: {
        900: '#685339',
        600: '#A6845A',
        500: '#CFA571',
        300: '#E7D2B8',
        200: '#F1E4D4',
        100: '#F5EDE3',
      },
    },
    support: {
      success: {
        600: '#086343',
        500: '#008556',
        100: '#D6F3E2',
      },
      warning: {
        600: '#A64F21',
        500: '#E86825',
        100: '#FFE1BE',
      },
      alert: {
        600: '#9F1B1F',
        500: '#EA6363',
        100: '#F9D3D4',
      },
    },
  },
  fontSizes: {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    md: '0.875rem', // 14px
    lg: '1rem', // 16px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    '4xl': '2.5rem', // 40px
    '5xl': '3rem', // 48px
    '6xl': '3.5rem', // 56px
  },
  fonts: {
    heading: `Poppins, ${chakraTheme.fonts.heading}`,
    body: `Roboto, ${chakraTheme.fonts.heading}`,
    mono: `Rubik, ${chakraTheme.fonts.heading}`,
  },
  components: {
    Form,
    Breadcrumb,
  },
};

/**
 * TODO BAD APPROACH
 */
const theme = extendTheme(themeOverride as ThemeOverride);

export default theme;
