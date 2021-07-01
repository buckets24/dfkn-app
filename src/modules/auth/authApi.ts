import * as tg from 'generic-type-guard';
import { CognitoUserInterface } from '@aws-amplify/ui-components';

export const IsCognitoUserInterfaceHasChallenge: tg.TypeGuard<CognitoUserInterface> = new tg.IsInterface()
  .withProperty('challengeName', tg.isString)
  .withProperty('challengeParam', tg.isObjectLike)
  .get();
