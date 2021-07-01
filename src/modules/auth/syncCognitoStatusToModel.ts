import { GraphQLAPIClass } from '@aws-amplify/api-graphql';
import { APIClass } from 'aws-amplify';
import { CognitoUserStatusType } from 'src/API';
import { PromiseValue } from 'type-fest';
import { updateAgentCognitoStatus } from '../agent/agentService';
import { updateClientCognitoStatus } from '../client/clientService';
import { getUserFromCognito } from './cognitoService';
import fetchModelBySub from './fetchModelBySub';

export type SyncCognitoStatusToModelResult =
  | PromiseValue<ReturnType<typeof updateClientCognitoStatus>>
  | PromiseValue<ReturnType<typeof updateAgentCognitoStatus>>;

/**
 * @param user SUB or Email
 * @param API
 */
const syncCognitoStatusToModel = async (
  user: string,
  API: APIClass | GraphQLAPIClass
): Promise<SyncCognitoStatusToModelResult> => {
  const cognitoUser = await getUserFromCognito(user);
  if (cognitoUser?.Username) {
    const model = await fetchModelBySub(cognitoUser.Username, API);
    const cognitoUserStatus = cognitoUser.UserStatus as CognitoUserStatusType;

    if (model?.type === 'CLIENT' && model.user?.id) {
      return await updateClientCognitoStatus(model.user.id, cognitoUserStatus, API);
    }
    if (model?.type === 'AGENT' && model.user?.id) {
      return await updateAgentCognitoStatus(model.user.id, cognitoUserStatus, API);
    }
  }
};

export default syncCognitoStatusToModel;
