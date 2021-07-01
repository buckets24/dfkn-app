import { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import 'src/AmplifyConfig';
import { requestAgentBySub } from 'src/modules/agent/agentService';
import { requestClientBySub } from 'src/modules/client/clientService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { LogLevel, log } from 'jexity-app/utils/logger';
import { AuthUserType, Me } from 'src/modules/auth/authStore';

export default handler<NextApiRequest, NextApiResponse<Me | SimpleError>>().get(async (req, res) => {
  let user: AuthUserType | undefined = undefined;
  const { API, Auth } = withSSRContext({ req });

  if (!(Auth instanceof AuthClass)) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'MeEndpoint',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      errorCode,
    });
    return;
  }

  try {
    const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
    const sub = cognitoUser.getUsername();

    /**
     * Check if sub is an agent
     */
    log(LogLevel.info, 'REQUESTING_AGENT', {
      label: 'MeEndpoint',
      message: 'Requesting agent by sub',
    });
    user = await requestAgentBySub(sub, API);

    if (user && sub) {
      res.status(200).json({ ...user, sub, userType: 'AGENT', title: null });
      return;
    }

    /**
     * Check if sub is a client
     */
    log(LogLevel.info, 'REQUESTING_CLIENT', {
      label: 'MeEndpoint',
      message: 'Requesting client by sub',
    });
    user = await requestClientBySub(sub, API);
    if (user) {
      res.status(200).json({ ...user, userType: 'CLIENT' });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (user === undefined) {
      const errorCode = log(LogLevel.error, 'USER_NOT_FOUND', {
        label: 'MeEndpoint',
        message: `The sub: ${sub} could not be found in our records`,
      });
      res.status(404).json({
        type: 'USER_NOT_FOUND',
        message: `The sub: ${sub} could not be found in our records`,
        errorCode,
      });
      return;
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'MeEndpoint',
      ...e,
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: `Error getting user data`,
      errorCode,
    });
  }
});
