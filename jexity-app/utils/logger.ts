import { datadogLogs } from '@datadog/browser-logs';
import * as tg from 'generic-type-guard';
import { NextApiResponse } from 'next';
import * as securePin from 'secure-pin/index';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export const LogLevel = {
  debug: 'debug',
  error: 'error',
  info: 'info',
  warn: 'warn',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

interface ContextWithData {
  response?: {
    config?: {
      data: unknown;
    };
  };
}

const IsContextWithData: tg.TypeGuard<ContextWithData> = new tg.IsInterface()
  .withOptionalProperty(
    'response',
    new tg.IsInterface()
      .withOptionalProperty('config', new tg.IsInterface().withOptionalProperty('data', tg.isAny).get())
      .get()
  )
  .get();

export function log(logLevel: LogLevel, message: string, context: { [key: string]: unknown }): string {
  const code = securePin.generatePinSync(6);

  const logMessage = `${code}: ${message}`;
  const isBrowser = typeof window === 'object';
  switch (logLevel) {
    case 'info':
      /**
       * Example:
       * Agent/Client Creation.
       */
      // eslint-disable-next-line no-console
      isBrowser ? datadogLogs.logger.info(logMessage, context) : console.info(logMessage, context);
      break;
    case 'warn':
      /**
       * Example:
       * Anything unusual but does not crash the application.
       */
      // eslint-disable-next-line no-console
      isBrowser ? datadogLogs.logger.warn(logMessage, context) : console.warn(logMessage, context);
      break;
    case 'debug':
      /**
       * Development purposes.
       */
      // eslint-disable-next-line no-console
      isBrowser ? datadogLogs.logger.debug(logMessage, context) : console.log(logMessage, context);
      break;
    case 'error':
      /**
       * Anything that should never happen.
       */
      if (IsContextWithData(context) && context.response?.config?.data) {
        delete context.response.config.data;
      }
      const logContext = {
        errorCode: code,
        ...context,
      };
      isBrowser ? datadogLogs.logger.error(logMessage, logContext) : console.error(logMessage, logContext);
      break;
    default:
      isBrowser ? datadogLogs.logger.error('Unsupported log level!') : console.error('Unsupported log level!');
  }

  return code;
}

/**
 * A simple wrapper function for response and logger. This is not a catch all,
 * in the event you need more granular control over messages/label/context etc. just
 * use `log` and `res.status` as you normally would. This is only for simple use cases.
 */
export function responseErrorWithLogger(
  res: NextApiResponse<SimpleError>,
  options: { status: number; label: string; message: string; type: string }
): void {
  const { status, type, message, label } = options;
  const errorCode = log(LogLevel.error, type, { label, message });

  res.status(status).json({
    errorCode,
    message,
    type,
  });
}
