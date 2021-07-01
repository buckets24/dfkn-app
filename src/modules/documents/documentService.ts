import { GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { API, APIClass } from 'aws-amplify';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { Delta } from 'jsondiffpatch';
import {
  ContractorType,
  CreateDocumentPatchMutation,
  CreateDocumentPatchMutationVariables,
  CreateOnlineDocumentArchiveModelInput,
  CreateOnlineDocumentArchiveModelMutation,
  CreateOnlineDocumentArchiveModelMutationVariables,
  CreateOnlineDocumentModelMutation,
  CreateOnlineDocumentModelMutationVariables,
  DeleteDocumentPatchMutation,
  DeleteDocumentPatchMutationVariables,
  DeleteOnlineDocumentArchiveModelMutation,
  DeleteOnlineDocumentArchiveModelMutationVariables,
  DeleteOnlineDocumentModelMutation,
  DeleteOnlineDocumentModelMutationVariables,
  GetOnlineDocumentArchiveModelQuery,
  GetOnlineDocumentArchiveModelQueryVariables,
  GetOnlineDocumentModelWithPatchesQuery,
  GetOnlineDocumentModelWithPatchesQueryVariables,
  GetOnlineDocumentsArchiveByClientIdQuery,
  GetOnlineDocumentsArchiveByClientIdQueryVariables,
  GetOnlineDocumentsByClientIdQuery,
  GetOnlineDocumentsByClientIdQueryVariables,
  GetOnlineDocumentsWithLatestPatchByClientIdQuery,
  GetOnlineDocumentsWithLatestPatchByClientIdQueryVariables,
  ListOnlineDocumentModelsQuery,
  OnlineDocumentStatus,
  OnlineDocumentType,
  UpdateOnlineDocumentModelInput,
  UpdateOnlineDocumentModelMutation,
  UpdateOnlineDocumentModelMutationVariables,
} from 'src/API';
import {
  getOnlineDocumentModelWithPatches,
  getOnlineDocumentsWithLatestPatchByClientId,
} from 'src/graphql/customQueries';
import {
  createDocumentPatch,
  createOnlineDocumentArchiveModel,
  createOnlineDocumentModel,
  deleteDocumentPatch,
  deleteOnlineDocumentArchiveModel,
  deleteOnlineDocumentModel,
  updateOnlineDocumentModel,
} from 'src/graphql/mutations';
import {
  getOnlineDocumentArchiveModel,
  getOnlineDocumentsArchiveByClientId,
  getOnlineDocumentsByClientId,
} from 'src/graphql/queries';
import { PromiseValue } from 'type-fest';
import { ClientPersonalData } from '../client/api/ClientModel';
import { requestClientById } from '../client/clientService';
import DocumentModel, { DocumentPatchModel } from './api/DocumentModel';
import { Document } from './Document';
import { sortByCreatedAt } from './utils/patcher';

/**
 * READ FUNCTIONS
 */
export const requestDocumentsByClientId = async (
  clientId: string,
  alternatAPI: GraphQLAPIClass | APIClass = API
): Promise<
  | NonNullable<NonNullable<NonNullable<ListOnlineDocumentModelsQuery['listOnlineDocumentModels']>['items']>[number]>[]
  | undefined
> => {
  const variables: GetOnlineDocumentsByClientIdQueryVariables = {
    clientId: clientId,
  };
  const res = (await alternatAPI.graphql({
    query: getOnlineDocumentsByClientId,
    variables,
  })) as GraphQLResult<GetOnlineDocumentsByClientIdQuery>;
  const documents = res.data?.getOnlineDocumentsByClientId?.items;
  if (documents) {
    const filteredDocs: NonNullable<
      NonNullable<NonNullable<ListOnlineDocumentModelsQuery['listOnlineDocumentModels']>['items']>[number]
    >[] = [];
    documents.forEach((doc) => doc && filteredDocs.push(doc));
    return filteredDocs;
  }
};

/**
 * Request the document complete with all it's patches (values).
 * @param documentId
 * @param API
 * @returns
 */
export const requestDocumentWithPatchesById = async (
  documentId: string,
  API: GraphQLAPIClass | APIClass
): Promise<GetOnlineDocumentModelWithPatchesQuery['getOnlineDocumentModel']> => {
  let patchesNextToken: string | undefined | null = undefined;
  let document: NonNullable<GetOnlineDocumentModelWithPatchesQuery['getOnlineDocumentModel']> | undefined = undefined;

  do {
    const variables: GetOnlineDocumentModelWithPatchesQueryVariables = {
      id: documentId,
      nextToken: patchesNextToken,
    };
    const response = (await API.graphql({
      query: getOnlineDocumentModelWithPatches,
      variables,
    })) as GraphQLResult<GetOnlineDocumentModelWithPatchesQuery>;

    if (response.data?.getOnlineDocumentModel && document === undefined) {
      document = response.data.getOnlineDocumentModel;
    }

    if (patchesNextToken && document?.patches) {
      document.patches.items = [
        ...(document.patches.items ?? []),
        ...(response.data?.getOnlineDocumentModel?.patches?.items ?? []),
      ];
    }

    const nextPatchesNextToken = response.data?.getOnlineDocumentModel?.patches?.nextToken;
    if (nextPatchesNextToken && document?.patches) {
      patchesNextToken = nextPatchesNextToken;
    } else {
      patchesNextToken = undefined;
    }
  } while (patchesNextToken);

  if (document?.patches) {
    // Clear the next token
    document.patches.nextToken = undefined;
  }

  if (document?.patches?.items) {
    document.patches.items = document.patches.items.filter(removeEmptyArrayItems).sort(sortByCreatedAt);
  }

  return document;
};

type Patches = NonNullable<
  NonNullable<
    NonNullable<NonNullable<GetOnlineDocumentModelWithPatchesQuery['getOnlineDocumentModel']>['patches']>['items']
  >[number]
>[];
/**
 * Request ONLY the patches of a specific document
 */
export const requestPatchesByDocumentId = async (
  documentId: DocumentModel['id'],
  API: GraphQLAPIClass | APIClass
): Promise<Patches | undefined> => {
  const compiledPatches: Patches = [];
  let patchesNextToken: string | undefined = undefined;

  do {
    const variables: GetOnlineDocumentModelWithPatchesQueryVariables = {
      id: documentId,
      nextToken: patchesNextToken,
    };
    const res = (await API.graphql({
      query: getOnlineDocumentModelWithPatches,
      variables,
    })) as GraphQLResult<GetOnlineDocumentModelWithPatchesQuery>;

    const patches = res.data?.getOnlineDocumentModel?.patches?.items;
    if (patches) {
      patches.forEach((patch) => patch && compiledPatches.push(patch));
    }

    if (res.data?.getOnlineDocumentModel?.patches?.nextToken) {
      patchesNextToken = res.data.getOnlineDocumentModel.patches.nextToken;
    } else {
      patchesNextToken = undefined;
    }
  } while (patchesNextToken);
  compiledPatches.sort(sortByCreatedAt);
  return compiledPatches;
};

export const requestOnlineDocumentsWithLatestPatchByClientId = async (
  clientId: string,
  alternatAPI: GraphQLAPIClass | APIClass = API
): Promise<
  | NonNullable<
      NonNullable<
        NonNullable<GetOnlineDocumentsWithLatestPatchByClientIdQuery['getOnlineDocumentsByClientId']>['items']
      >[number]
    >[]
  | undefined
> => {
  const variables: GetOnlineDocumentsWithLatestPatchByClientIdQueryVariables = {
    clientId: clientId,
  };
  const res = (await alternatAPI.graphql({
    query: getOnlineDocumentsWithLatestPatchByClientId,
    variables,
  })) as GraphQLResult<GetOnlineDocumentsWithLatestPatchByClientIdQuery>;
  const documents = res.data?.getOnlineDocumentsByClientId?.items;

  if (documents) {
    const filteredDocumentsWithPatches: NonNullable<
      NonNullable<GetOnlineDocumentsWithLatestPatchByClientIdQuery['getOnlineDocumentsByClientId']>['items']
    > = [];
    documents.forEach((doc) => {
      if (doc) {
        filteredDocumentsWithPatches.push(doc);
      }
    });
    return filteredDocumentsWithPatches.filter(removeEmptyArrayItems);
  }
};

export const requestArchivedDocumentById = async (
  id: string,
  API: GraphQLAPIClass | APIClass
): Promise<GetOnlineDocumentArchiveModelQuery['getOnlineDocumentArchiveModel']> => {
  const variables: GetOnlineDocumentArchiveModelQueryVariables = {
    id,
  };
  const res = (await API.graphql({
    query: getOnlineDocumentArchiveModel,
    variables,
  })) as GraphQLResult<GetOnlineDocumentArchiveModelQuery>;

  return res.data?.getOnlineDocumentArchiveModel;
};

export const requestArchivedDocumentsByClientId = async (
  id: string,
  API: GraphQLAPIClass | APIClass
): Promise<
  NonNullable<GetOnlineDocumentsArchiveByClientIdQuery['getOnlineDocumentsArchiveByClientId']>['items'] | undefined
> => {
  const variables: GetOnlineDocumentsArchiveByClientIdQueryVariables = {
    clientId: id,
  };

  const res = (await API.graphql({
    query: getOnlineDocumentsArchiveByClientId,
    variables,
  })) as GraphQLResult<GetOnlineDocumentsArchiveByClientIdQuery>;

  return res.data?.getOnlineDocumentsArchiveByClientId?.items;
};

/**
 * CREATE FUNCTION
 */
export const createDocument = async (
  client: PromiseValue<ReturnType<typeof requestClientById>>,
  type: OnlineDocumentType,
  title: string,
  owner: string,
  initialValues: ClientPersonalData | null = null,
  contractorType: ContractorType = ContractorType.PRIMARY,
  editors: string[]
): Promise<Document | undefined> => {
  /**
   * Creates a DocumentModel if the client does not have one of the
   * selected type
   */
  if (client?.sub) {
    const variables: CreateOnlineDocumentModelMutationVariables = {
      input: {
        clientId: client.id,
        status: OnlineDocumentStatus.CLEAN,
        type,
        title,
        owner,
        editors: editors,
        version: 1, // Always version on when `createDocument` is called
        contractor: contractorType,
        isVisibleToClient: false,
        values: JSON.stringify({
          ...initialValues,
        }),
      },
    };
    const res = (await API.graphql({
      query: createOnlineDocumentModel,
      variables,
    })) as GraphQLResult<CreateOnlineDocumentModelMutation>;
    const newDocument = res.data?.createOnlineDocumentModel;
    if (newDocument) {
      return newDocument;
    }
  }
};

export const createArchivedDocument = async (
  input: CreateOnlineDocumentArchiveModelInput,
  API: GraphQLAPIClass | APIClass
): Promise<CreateOnlineDocumentArchiveModelMutation['createOnlineDocumentArchiveModel']> => {
  const variables: CreateOnlineDocumentArchiveModelMutationVariables = {
    input,
  };
  const archiveResponse = (await API.graphql({
    query: createOnlineDocumentArchiveModel,
    variables,
  })) as GraphQLResult<CreateOnlineDocumentArchiveModelMutation>;

  return archiveResponse.data?.createOnlineDocumentArchiveModel;
};

export const createPatch = async (
  documentId: string,
  patch: Delta,
  authorId: string,
  uniqueEditorInstance: NonNullable<DocumentPatchModel['uniqueEditorInstance']>,
  API: APIClass | GraphQLAPIClass
): Promise<CreateDocumentPatchMutation['createDocumentPatch'] | undefined> => {
  const variables: CreateDocumentPatchMutationVariables = {
    input: {
      patch: JSON.stringify(patch),
      documentId: documentId,
      // TODO: Rename to authorId
      author: authorId,
      uniqueEditorInstance,
    },
  };

  const res = (await API.graphql({
    query: createDocumentPatch,
    variables,
  })) as GraphQLResult<CreateDocumentPatchMutation>;

  return res.data?.createDocumentPatch;
};

/**
 * UPDATE FUNCTION
 */
export const updateDocument = async (
  input: UpdateOnlineDocumentModelInput,
  API: GraphQLAPIClass | APIClass
): Promise<UpdateOnlineDocumentModelMutation['updateOnlineDocumentModel']> => {
  const variables: UpdateOnlineDocumentModelMutationVariables = {
    input,
  };
  const updateResponse = (await API.graphql({
    query: updateOnlineDocumentModel,
    variables,
  })) as GraphQLResult<UpdateOnlineDocumentModelMutation>;
  return updateResponse.data?.updateOnlineDocumentModel;
};

/**
 * DELETE FUNCTION
 */
export const deleteDocumentPatches = async (
  id: DocumentPatchModel['id'],
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<NonNullable<DeleteDocumentPatchMutation['deleteDocumentPatch']> | undefined> => {
  const deleteDocumentPatchModelVariables: DeleteDocumentPatchMutationVariables = {
    input: { id },
  };
  const res = (await alternateAPI.graphql({
    query: deleteDocumentPatch,
    variables: deleteDocumentPatchModelVariables,
  })) as GraphQLResult<DeleteDocumentPatchMutation>;

  const deletedPatch = res.data?.deleteDocumentPatch;

  if (deletedPatch) {
    return deletedPatch;
  } else {
    throw new Error(`Document Patch with id: ${id} was not deleted or does not exist at all.`);
  }
};

export const deleteOnlineDocument = async (
  id: DocumentModel['id'],
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<NonNullable<DeleteOnlineDocumentModelMutation['deleteOnlineDocumentModel']> | undefined> => {
  const deleteOnlineDocumentModelVariables: DeleteOnlineDocumentModelMutationVariables = {
    input: { id },
  };
  const res = (await alternateAPI.graphql({
    query: deleteOnlineDocumentModel,
    variables: deleteOnlineDocumentModelVariables,
  })) as GraphQLResult<DeleteOnlineDocumentModelMutation>;

  const deletedDocument = res.data?.deleteOnlineDocumentModel;

  if (deletedDocument) {
    return deletedDocument;
  } else {
    throw new Error(`Document with id: ${id} was not deleted or does not exist at all.`);
  }
};

export const deleteArchivedDocument = async (
  id: string,
  API: GraphQLAPIClass | APIClass
): Promise<DeleteOnlineDocumentArchiveModelMutation['deleteOnlineDocumentArchiveModel']> => {
  const variables: DeleteOnlineDocumentArchiveModelMutationVariables = {
    input: {
      id,
    },
  };
  const deleteArchivedDocumentResponse = (await API.graphql({
    query: deleteOnlineDocumentArchiveModel,
    variables,
  })) as GraphQLResult<DeleteOnlineDocumentArchiveModelMutation>;
  return deleteArchivedDocumentResponse.data?.deleteOnlineDocumentArchiveModel;
};
