import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { updateUserCognitoGroup } from 'src/modules/auth/cognitoService';

const updateAgentGroup: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
  const { body, query } = req;
  const { email } = query;
  const { oldRole, newRole } = body;

  try {
    const updatedAgentRole = await updateUserCognitoGroup(email as string, oldRole, newRole);

    return res.status(200).json(updatedAgentRole);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'updateAgentGroup',
      message: 'There was an errpr updating the agent role',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'Unknown error in catch of updateAgentGroupHandler, see logs',
      errorCode,
    });
  }
};

export default updateAgentGroup;
