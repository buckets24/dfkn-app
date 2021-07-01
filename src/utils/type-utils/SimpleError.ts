import * as tg from 'generic-type-guard';
import { NextApiResponse } from 'next';
import { hasOwnProperty } from './hasOwnProperty';

export type SimpleError = {
  type: string;
  message: string;
  errorCode: string;
};

export const isSimpleError: tg.TypeGuard<SimpleError> = new tg.IsInterface()
  .withProperty('type', tg.isString)
  .withProperty('message', tg.isString)
  .withProperty('errorCode', tg.isString)
  .get();

export const getAxiosSimpleError = (error: unknown): SimpleError | undefined => {
  if (typeof error === 'object' && error !== null) {
    if (hasOwnProperty(error, 'response')) {
      const response = error.response;
      if (typeof response === 'object' && response !== null && hasOwnProperty(response, 'data')) {
        const data = response.data;
        if (isSimpleError(data)) {
          return data;
        }
      }
    }
  }
};
