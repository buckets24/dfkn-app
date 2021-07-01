import React, { FC } from 'react';

export const Fonts: FC = () => (
  <style jsx global>
    {`
      /* roboto-regular - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/roboto-v20-latin-regular.eot'); /* IE9 Compat Modes */
        src: local('Roboto'), local('Roboto-Regular'),
          url('/fonts/roboto-v20-latin-regular.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/roboto-v20-latin-regular.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/roboto-v20-latin-regular.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/roboto-v20-latin-regular.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/roboto-v20-latin-regular.svg#Roboto') format('svg'); /* Legacy iOS */
      }
      /* roboto-500 - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: url('/fonts/roboto-v20-latin-500.eot'); /* IE9 Compat Modes */
        src: local('Roboto Medium'), local('Roboto-Medium'),
          url('/fonts/roboto-v20-latin-500.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/roboto-v20-latin-500.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/roboto-v20-latin-500.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/roboto-v20-latin-500.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/roboto-v20-latin-500.svg#Roboto') format('svg'); /* Legacy iOS */
      }
      /* roboto-700 - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: url('/fonts/roboto-v20-latin-700.eot'); /* IE9 Compat Modes */
        src: local('Roboto Bold'), local('Roboto-Bold'),
          url('/fonts/roboto-v20-latin-700.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/roboto-v20-latin-700.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/roboto-v20-latin-700.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/roboto-v20-latin-700.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/roboto-v20-latin-700.svg#Roboto') format('svg'); /* Legacy iOS */
      }

      /* poppins-regular - latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/poppins-v15-latin-regular.eot'); /* IE9 Compat Modes */
        src: local(''), url('/fonts/poppins-v15-latin-regular.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/poppins-v15-latin-regular.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/poppins-v15-latin-regular.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/poppins-v15-latin-regular.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/poppins-v15-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
      }
      /* poppins-500 - latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        src: url('/fonts/poppins-v15-latin-500.eot'); /* IE9 Compat Modes */
        src: local(''), url('/fonts/poppins-v15-latin-500.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/poppins-v15-latin-500.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/poppins-v15-latin-500.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/poppins-v15-latin-500.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/poppins-v15-latin-500.svg#Poppins') format('svg'); /* Legacy iOS */
      }
      /* poppins-700 - latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        src: url('/fonts/poppins-v15-latin-700.eot'); /* IE9 Compat Modes */
        src: local(''), url('/fonts/poppins-v15-latin-700.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/poppins-v15-latin-700.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/poppins-v15-latin-700.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/poppins-v15-latin-700.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/poppins-v15-latin-700.svg#Poppins') format('svg'); /* Legacy iOS */
      }

      /* rubik-300 - latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 300;
        font-display: fallback;
        src: url('/fonts/rubik-v9-latin-300.eot'); /* IE9 Compat Modes */
        src: local('Rubik Light'), local('Rubik-Light'),
          url('/fonts/rubik-v9-latin-300.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/rubik-v9-latin-300.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/rubik-v9-latin-300.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/rubik-v9-latin-300.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/rubik-v9-latin-300.svg#Rubik') format('svg'); /* Legacy iOS */
      }

      /* rubik-regular - latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/rubik-v9-latin-regular.eot'); /* IE9 Compat Modes */
        src: local('Rubik'), local('Rubik-Regular'),
          url('/fonts/rubik-v9-latin-regular.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/rubik-v9-latin-regular.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/rubik-v9-latin-regular.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/rubik-v9-latin-regular.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/rubik-v9-latin-regular.svg#Rubik') format('svg'); /* Legacy iOS */
      }
      /* rubik-500 - latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-display: fallback;
        src: url('/fonts/rubik-v9-latin-500.eot'); /* IE9 Compat Modes */
        src: local('Rubik Medium'), local('Rubik-Medium'),
          url('/fonts/rubik-v9-latin-500.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/rubik-v9-latin-500.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/rubik-v9-latin-500.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/rubik-v9-latin-500.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/rubik-v9-latin-500.svg#Rubik') format('svg'); /* Legacy iOS */
      }
      /* rubik-700 - latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/rubik-v9-latin-700.eot'); /* IE9 Compat Modes */
        src: local('Rubik Bold'), local('Rubik-Bold'),
          url('/fonts/rubik-v9-latin-700.eot?#iefix') format('embedded-opentype'),
          /* IE6-IE8 */ url('/fonts/rubik-v9-latin-700.woff2') format('woff2'),
          /* Super Modern Browsers */ url('/fonts/rubik-v9-latin-700.woff') format('woff'),
          /* Modern Browsers */ url('/fonts/rubik-v9-latin-700.ttf') format('truetype'),
          /* Safari, Android, iOS */ url('/fonts/rubik-v9-latin-700.svg#Rubik') format('svg'); /* Legacy iOS */
      }
    `}
  </style>
);
