import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Logger } from 'aws-amplify';
import { ROLES } from 'src/API';
const logger = new Logger('hasCognitoGroup');

const hasCognitoGroup = (cognitoUser: CognitoUser, role: ROLES | ROLES[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    /**
     * TODO
     * Investigate if this is an async call.
     * Need to fix it if it attempts to make a new API call
     */
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err instanceof Error) {
        logger.error(err);
        reject('Error in hasCognitoGroup when calling cognitoUser.getSession');
      } else if (session instanceof CognitoUserSession) {
        const payload = session.isValid() ? session.getIdToken().payload : null;
        if (payload?.['cognito:groups']) {
          const group = payload['cognito:groups'];
          logger.debug('current groups', group);
          if (Array.isArray(group)) {
            if (Array.isArray(role)) {
              let includeAnyRoles = false;
              for (const roleItem of role) {
                includeAnyRoles = group.includes(roleItem);
                if (includeAnyRoles) {
                  break;
                }
              }
              resolve(includeAnyRoles);
            } else {
              resolve(group.includes(role));
            }
          }
        }
      }
      resolve(false);
    });
  });
};

export default hasCognitoGroup;
