import { ChakraProvider } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import React, { FC, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'src/AmplifyConfig';
import { Fonts } from 'src/theme/styles/fonts';
import theme from 'src/theme/theme';
import Head from 'next/head';
import { datadogLogs } from '@datadog/browser-logs';
import { QueryClientProvider } from 'react-query';
import queryClient from 'src/queryClient';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
/**
 * README ------------------------------------------------
 * Layout structure is a little different for this project.
 * Please read this article for a better understanding:
 * https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
 * Note that we use Option 4
 */

datadogLogs.init({
  /**
   * TODO: Add DataDog clientToken to env variables
   */
  clientToken: 'pub3e9cf1376a8482cd3e61681150bbf2df',
  site: 'datadoghq.eu',
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { getLayout } = Component as NextComponentType<NextPageContext, unknown, Record<string, unknown>> & HasLayout;

  useEffect(() => {
    const nprogressStart = () => NProgress.start();
    const nprogressDone = () => {
      NProgress.done();
    };
    router.events.on('routeChangeStart', nprogressStart);
    router.events.on('routeChangeComplete', nprogressDone);
    router.events.on('routeChangeError', nprogressDone);

    return () => {
      router.events.off('routeChangeStart', nprogressStart);
      router.events.off('routeChangeComplete', nprogressDone);
      router.events.off('routeChangeError', nprogressDone);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>NessyCloud - DFK Nord AG</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <Fonts />
          {getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
