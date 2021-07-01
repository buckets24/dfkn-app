import handler from 'next-connect';
import 'src/AmplifyConfig';
import { authAgentOrAdminMiddleware, authCanHandleCognitoBySubMiddleware } from 'src/modules/auth/authMiddleware';
import sendPasswordHandler from 'src/modules/auth/handlers/sendPasswordHandler';

export default handler()
  .use(authAgentOrAdminMiddleware)
  .use(authCanHandleCognitoBySubMiddleware)
  .post(sendPasswordHandler);
