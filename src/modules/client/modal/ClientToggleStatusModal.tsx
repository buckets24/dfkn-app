import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC } from 'react';
import { GetCognitoUserResponse } from 'src/modules/auth/handlers/getCognitoUserByEmailHandler';
import { ToggleCognitoStatusBySubHandlerResponse } from 'src/modules/auth/handlers/toggleCognitoStatusBySubHandler';
import { clientToastUpdateStatusClientErr, clientToastUpdatingClientSuccess } from '../clientMsg';
import { ExistingClientType } from '../forms/ClientEditForm';

export interface ClientToggleStatusModalProps {
  client: ExistingClientType | undefined;
  disclosure: UseDisclosureProps;
  onUpdate?: () => void;
}
export const ClientToggleStatusModal: FC<ClientToggleStatusModalProps> = ({ client, disclosure, onUpdate }) => {
  const toast = useToast();

  return (
    <DataTableModal
      {...disclosure}
      header={client?.status === 'DISABLED' ? 'Kunde aktivieren' : 'Kunde deaktivieren'}
      body={`Möchten Sie das Konto von ${client?.firstName} ${client?.lastName} wirklich ${
        client?.status === 'DISABLED' ? 'aktivieren' : 'deaktivieren'
      }?`}
      confirmText={client?.status === 'DISABLED' ? 'Aktivieren' : 'Deaktivieren'}
      onConfirm={async (setIsLoading) => {
        setIsLoading(true);
        try {
          const clientCognito = await axios.get<GetCognitoUserResponse>(`/api/cognito/email?email=${client?.email}`);
          const isEnabled = !!clientCognito.data?.Enabled;
          await axios.patch<ToggleCognitoStatusBySubHandlerResponse>(`/api/cognito/toggle-status/${client?.sub}`, {
            /**
             * If the account is already enabled invert it
             */
            setStatusTo: isEnabled ? false : true,
          });
          log(LogLevel.info, 'TOGGLE_AGENT_STATUS', {
            label: 'ClientToggleStatusModal',
            message: `Successfully updated the status of client ${client?.id}`,
          });
          toast(clientToastUpdatingClientSuccess());
          onUpdate?.();
        } catch (e) {
          toast(clientToastUpdateStatusClientErr(e.response.data.errorCode));
        } finally {
          setIsLoading(false);
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          disclosure.onClose && disclosure.onClose();
        }
      }}
    />
  );
};
