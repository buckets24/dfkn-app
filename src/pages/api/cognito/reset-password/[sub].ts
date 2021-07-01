import handler from 'next-connect';
import 'src/AmplifyConfig';
import { authAgentOrAdminMiddleware, authCanHandleCognitoBySubMiddleware } from 'src/modules/auth/authMiddleware';
import resetPasswordHandler from 'src/modules/auth/handlers/resetPasswordHandler';

export default handler()
  .use(authAgentOrAdminMiddleware)
  .use(authCanHandleCognitoBySubMiddleware)
  .patch(resetPasswordHandler);
