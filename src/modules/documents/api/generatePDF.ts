import chrome from 'chrome-aws-lambda';
import puppeteerCore, { LaunchOptions } from 'puppeteer-core';
import puppeteer from 'puppeteer';
import { log, LogLevel } from 'jexity-app/utils/logger';

export type PrintResponse = {
  base64?: ReturnType<Buffer['toString']>;
  dataUrl: string;
};

export type DocumentsRequestError = {
  code: string;
  message: string;
};

const timezone = 'Europe/Berlin';
const ROOT_URL = process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

const generatePDF = async (documentId: string, cookie: string | undefined): Promise<Buffer | undefined> => {
  if (!cookie) {
    return;
  }

  await chrome.font(`${ROOT_URL}/fonts/roboto-v20-latin-regular.ttf`);
  await chrome.font(`${ROOT_URL}/fonts/roboto-v20-latin-500.ttf`);
  await chrome.font(`${ROOT_URL}/fonts/roboto-v20-latin-700.ttf`);

  const launchOpt: LaunchOptions | undefined =
    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
          env: {
            TZ: timezone,
            ...process.env,
          },
        };
  const puppet = process.env.NODE_ENV === 'development' ? puppeteer : puppeteerCore;

  const browser = await puppet.launch(launchOpt);
  const page = await browser.newPage();

  /**
   * Setting of headers
   */
  const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
  const chromeUserAgent = headlessUserAgent.replace('HeadlessChrome', 'Chrome');
  await page.setUserAgent(chromeUserAgent);
  await page.setExtraHTTPHeaders({
    'accept-language': 'de-DE,de;q=0.8',
  });
  await page.emulateTimezone(timezone);
  await page.setRequestInterception(true);
  // add header for the navigation requests
  page.on('request', (request) => {
    // Do nothing in case of non-navigation requests.
    if (!request.isNavigationRequest()) {
      request.continue().catch((e) => {
        log(LogLevel.error, e, { label: 'PDF_Non-Navigation', ...e });
      });
      return;
    }
    // Add a new header for navigation request.
    const headers = request.headers();
    headers['cookie'] = cookie;
    request.continue({ headers }).catch((e) => {
      log(LogLevel.error, e, { label: 'PDF_NewHeaderNavigation', ...e });
    });
  });

  await page.goto(`${ROOT_URL}/documents/print?documentId=${documentId}`, {
    waitUntil: 'networkidle2',
  });
  const buffer = await page.pdf({ format: 'A4', printBackground: true });

  browser.close().catch((e) => {
    log(LogLevel.error, e, { label: 'PDF_BrowserClose', ...e });
  });

  return buffer;
};

export default generatePDF;
