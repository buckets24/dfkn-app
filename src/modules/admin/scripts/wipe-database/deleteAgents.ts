import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { ListAgentModelsQuery } from 'src/API';
import { listAgentModels } from 'src/graphql/queries';
import AgentModel from 'src/modules/agent/api/AgentModel';

export const deleteAgents = async (): Promise<void> => {
  const res = (await API.graphql({
    query: listAgentModels,
  })) as GraphQLResult<ListAgentModelsQuery>;

  if (!res.data?.listAgentModels?.items) {
    return;
  }

  const agents = res.data.listAgentModels.items;
  const agentIds: AgentModel['id'][] = [];

  agents.forEach((agent) => {
    if (agent?.id) {
      agentIds.push(agent.id);
    }
  });
};

export default deleteAgents;
