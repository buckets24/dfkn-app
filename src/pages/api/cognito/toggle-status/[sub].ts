import handler from 'next-connect';
import 'src/AmplifyConfig';
import { authAgentOrAdminMiddleware, authCanHandleCognitoBySubMiddleware } from 'src/modules/auth/authMiddleware';
import toggleCognitoStatusByEmailHandler from 'src/modules/auth/handlers/toggleCognitoStatusBySubHandler';

export default handler()
  .use(authAgentOrAdminMiddleware)
  .use(authCanHandleCognitoBySubMiddleware)
  .patch(toggleCognitoStatusByEmailHandler);
