import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC } from 'react';
import { GetCognitoUserResponse } from 'src/modules/auth/handlers/getCognitoUserByEmailHandler';
import { ToggleCognitoStatusBySubHandlerResponse } from 'src/modules/auth/handlers/toggleCognitoStatusBySubHandler';
import { agentToastUpdateStatusAgentErr, agentToastUpdatingAgentSuccess } from '../agentMsg';
import { ExistingAgentType } from '../forms/AgentEditForm';

export interface AgentToggleStatusModalProps {
  agent: ExistingAgentType | undefined;
  disclosure: UseDisclosureProps;
  onUpdate?: () => void;
}
export const AgentToggleStatusModal: FC<AgentToggleStatusModalProps> = ({ agent, disclosure, onUpdate }) => {
  const toast = useToast();
  return (
    <DataTableModal
      {...disclosure}
      header={agent?.status === 'DISABLED' ? 'Kunde aktivieren' : 'Kunde deaktivieren'}
      body={`Möchten Sie das Konto von ${agent?.firstName} ${agent?.lastName} wirklich ${
        agent?.status === 'DISABLED' ? 'aktivieren' : 'deaktivieren'
      }?`}
      confirmText={agent?.status === 'DISABLED' ? 'Aktivieren' : 'Deaktivieren'}
      onConfirm={async (setIsLoading) => {
        setIsLoading(true);
        try {
          const agentCognito = await axios.get<GetCognitoUserResponse>(`/api/cognito/email?email=${agent?.email}`);
          const isEnabled = !!agentCognito.data?.Enabled;
          await axios.patch<ToggleCognitoStatusBySubHandlerResponse>(`/api/cognito/toggle-status/${agent?.sub}`, {
            /**
             * If the account is already enabled invert it
             */
            setStatusTo: isEnabled ? false : true,
          });
          log(LogLevel.info, 'TOGGLE_AGENT_STATUS', {
            label: 'AgentToggleStatusModal',
            message: `Successfully updated the status of agent ${agent?.id}`,
          });
          toast(agentToastUpdatingAgentSuccess());
          onUpdate?.();
        } catch (e) {
          toast(agentToastUpdateStatusAgentErr(e.response.data.errorCode));
        } finally {
          setIsLoading(false);
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          disclosure.onClose && disclosure.onClose();
        }
      }}
    />
  );
};
