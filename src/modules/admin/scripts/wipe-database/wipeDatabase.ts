import {
  ListAgentModelsQuery,
  ListClientModelsQuery,
  ListMeetingModelsQuery,
  ListOnlineDocumentModelsQuery,
} from 'src/API';
import {
  deleteAgentModel,
  deleteClientModel,
  // deleteDocumentPatch,
  deleteMeetingModel,
  deleteOnlineDocumentModel,
} from 'src/graphql/mutations';
import {
  listAgentModels,
  listClientModels,
  // listDocumentPatchs,
  listMeetingModels,
  listOnlineDocumentModels,
} from 'src/graphql/queries';
import { wipeEntityFactory } from './wipeEntityFactory';

export const wipeDatabase = async (): Promise<void> => {
  /**
   * FOR NOW MANUALLY DELETE ALL COGNITO USERS
   */
  /**
   * Delete all agents
   */
  // await wipeEntityFactory<ListAgentModelsQuery>(listAgentModels, 'listAgentModels', deleteAgentModel);
  /**
   * Delete all clients
   */
  // await wipeEntityFactory<ListClientModelsQuery>(listClientModels, 'listClientModels', deleteClientModel);
  /**
   * Delete all Meetings
   */
  // await wipeEntityFactory<ListMeetingModelsQuery>(listMeetingModels, 'listMeetingModels', deleteMeetingModel);
  /**
   * Delete all OnlineDocuments
   */
  // await wipeEntityFactory<ListOnlineDocumentModelsQuery>(
  //   listOnlineDocumentModels,
  //   'listOnlineDocumentModels',
  //   deleteOnlineDocumentModel
  // );
  /**
   * Delete all DocumentPatches
   */
  // await wipeEntityFactory<ListDocumentPatchsQuery>(listDocumentPatchs, 'listDocumentPatchs', deleteDocumentPatch);
};
