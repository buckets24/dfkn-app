import { Logger, withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { requestClientActivitiesByClientId } from 'src/modules/activity/activityService';
import { deleteCognitoUser, getUserFromCognito } from 'src/modules/auth/cognitoService';
import { requestMeetingsByClientId } from 'src/modules/meetings/meetingsService';
import { isSimpleError, SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';
import { deleteClient } from '../clientService';

const logger = new Logger('Client Delete Handler');

export type DeleteClientByIdHandlerResponse = NonNullable<PromiseValue<ReturnType<typeof deleteClient>>>;

const deleteClientbyIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteClientByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const { query } = req;
  const { API } = withSSRContext({ req });
  const { id } = query;
  const clientId = id as string;

  try {
    if (!clientId) {
      const errorCode = log(LogLevel.error, 'INVALID_ID', {
        label: 'DeleteClientByIdHandler',
        message: 'Error deleting an client id undefined',
      });
      res.status(500).json({
        type: 'INVALID_ID',
        message: 'Error deleting an client id undefined',
        errorCode,
      });
      return;
    }

    /**
     * Delete Meetings
     * TODO: Batch Delete
     */
    log(LogLevel.info, 'REQUESTING_MEETINGS', {
      label: 'DeleteClientByIdHandler',
      message: 'Requesting an meetings by client id',
    });
    const meetings = await requestMeetingsByClientId(clientId, API);
    if (meetings && meetings.length > 0) {
      /**
       * TODO: Delete this if the batch delete for client exist
       */
      const errorCode = log(LogLevel.error, 'CLIENT_HAS_EXISTING_MEETINGS', {
        label: 'DeleteClientByIdHandler',
        message: 'This client still has meetings therefore it cannot be deleted.',
      });
      res.status(500).json({
        type: 'CLIENT_HAS_EXISTING_MEETINGS',
        message: 'This client still has meetings therefore it cannot be deleted.',
        errorCode,
      });
      return;
    }

    /**
     * Delete Activities
     * TODO: Batch Delete
     */
    log(LogLevel.info, 'REQUESTING_ACTIVITIES', {
      label: 'DeleteClientByIdHandler',
      message: 'Requesting activities by client id',
    });
    const activities = await requestClientActivitiesByClientId(clientId, API);
    if (activities && activities.length > 0) {
      /**
       * TODO: Delete this if the batch delete for client exist
       */
      const errorCode = log(LogLevel.error, 'CLIENT_HAS_EXISTING_ACTIVITIES', {
        label: 'DeleteClientByIdHandler',
        message: 'This client still has activities therefore it cannot be deleted.',
      });
      res.status(500).json({
        type: 'CLIENT_HAS_EXISTING_ACTIVITIES',
        message: 'This client still has activities therefore it cannot be deleted.',
        errorCode,
      });
      return;
    }

    /**
     * Delete Documents and Document Patches
     * TODO: Batch Delete
     */
    //  const documents = await requestOnlineDocumentsWithPatchesByClientId(clientId, API)
    //  if (documents && documents.length > 0) {
    //    documents.forEach(async (document) => {
    //      if (document.patches?.items) {
    //        document.patches.items.forEach(async (patch) => {
    //          if (patch) {
    //            await deleteDocumentPatches(patch.id, API);
    //          }
    //        });

    //      await deleteOnlineDocument(document.id, API);
    //    });
    //  }

    /**
     * Delete client in DynamoDB
     */
    log(LogLevel.info, 'DELETING_AGENT_DYNAMODB', {
      label: 'DeleteAgentByIdHandler',
      message: 'Deleting the agent in DynamoDB',
    });
    const deletedClient = await deleteClient(clientId, API);

    if (deletedClient) {
      /**
       * Delete client in Cognito
       */
      log(LogLevel.info, 'GET_USER_FROM_COGNITO', {
        label: 'DeleteAgentByIdHandler',
        message: 'Get user from cognito',
      });
      const cognitoUser = await getUserFromCognito(deletedClient.email);
      if (cognitoUser) {
        await deleteCognitoUser(deletedClient.email);
        log(LogLevel.info, 'DELETE_USER_COGNITO', {
          label: 'DeleteAgentByIdHandler',
          message: 'Delete user in cognito',
        });
      }
      res.status(200).json(deletedClient);
    } else {
      const errorCode = log(LogLevel.error, 'FAILED_DELETING_CLIENT', {
        label: 'DeleteAgentByIdHandler',
        message: 'Failed to delete client with that id',
      });
      res.status(500).json({
        type: 'FAILED_DELETING_CLIENT',
        message: 'Failed to delete client with that id',
        errorCode,
      });
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'DeleteAgentByIdHandler',
      ...e,
    });
    if (isSimpleError(e)) {
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: e.message,
        errorCode,
      });
    } else {
      logger.error('Unhandled error in catch of client API');
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'Unknown error in catch of client API, see logs',
        errorCode,
      });
    }
  }
};

export default deleteClientbyIdHandler;
