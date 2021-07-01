import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC } from 'react';
import { activityToastExistingActivitiesErr } from 'src/modules/activity/activityMsg';
import {
  clientToastDeletingClientErr,
  clientToastDeletingClientSuccess,
  clientToastExistingMeetingsErr,
} from '../clientMsg';
import { ExistingClientType } from '../forms/ClientEditForm';
import { DeleteClientByIdHandlerResponse } from '../handlers/deleteClientbyIdHandler';

export interface ClientDeleteModalProps {
  client: ExistingClientType | undefined;
  disclosure: UseDisclosureProps;
  onDelete?: () => void;
}
export const ClientDeleteModal: FC<ClientDeleteModalProps> = ({ client, disclosure, onDelete }) => {
  const toast = useToast();
  return (
    <DataTableModal
      {...disclosure}
      header="Kunden löschen"
      body={`Möchten Sie den Kunden wirklich löschen? Das kann nicht mehr rückgängig gemacht werden?`}
      confirmText="Löschen"
      onConfirm={async (setIsLoading) => {
        setIsLoading(true);
        try {
          const deleteResponse = await axios.delete<DeleteClientByIdHandlerResponse>(`/api/clients/${client?.id}`);
          const deletedClient = deleteResponse.data;
          log(LogLevel.info, 'DELETE_CLIENT', {
            label: 'ClientDeleteModal',
            message: `A client with an id of ${deletedClient.id} was successfully deleted`,
          });
          toast(
            clientToastDeletingClientSuccess({
              description: `${deletedClient.firstName} ${deletedClient.lastName} wurde gelöscht.`,
            })
          );
          onDelete?.();
        } catch (e) {
          /**
           * TODO: Delete this if the batch delete for client exist
           */
          if (e.response.data.type === 'CLIENT_HAS_EXISTING_MEETINGS') {
            toast(clientToastExistingMeetingsErr(e.response.data.errorCode));
            return;
          } else if (e.response.data.type === 'CLIENT_HAS_EXISTING_ACTIVITIES') {
            toast(activityToastExistingActivitiesErr(e.response.data.errorCode));
            return;
          } else {
            toast(clientToastDeletingClientErr(e.response.data.errorCode));
          }
        } finally {
          setIsLoading(false);
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          disclosure.onClose && disclosure.onClose();
        }
      }}
    />
  );
};
