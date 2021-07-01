import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC } from 'react';
import { agentMsgExistingClientsErr, agentToastDeletingAgentErr, agentToastDeletingAgentSuccess } from '../agentMsg';
import { ExistingAgentType } from '../forms/AgentEditForm';
import { DeleteAgentByIdHandlerResponse } from '../handlers/deleteAgentbyIdHandler';

export interface AgentDeleteModalProps {
  agent: ExistingAgentType | undefined;
  disclosure: UseDisclosureProps;
  onDelete?: () => void;
}
export const AgentDeleteModal: FC<AgentDeleteModalProps> = ({ agent, disclosure, onDelete }) => {
  const toast = useToast();
  return (
    <DataTableModal
      {...disclosure}
      header="Datensatz löschen"
      body={`Sind Sie sicher, dass Sie ${agent?.firstName} ${agent?.lastName} löschen möchten?`}
      confirmText="Löschen"
      onConfirm={async (setIsLoading) => {
        setIsLoading(true);
        try {
          const response = await axios.delete<DeleteAgentByIdHandlerResponse>(`/api/agents/${agent?.id}`);
          log(LogLevel.info, 'DELETE_AGENT', {
            label: 'AgentDeleteModal',
            message: `A agent with an id of ${response.data.id} was successfully deleted`,
          });
          toast(agentToastDeletingAgentSuccess());
          onDelete?.();
        } catch (e) {
          if (e.response.data.type === 'DELETE_FAILED_AGENT_HAS_CLIENTS') {
            toast(agentMsgExistingClientsErr(e.response.data.errorCode));
            return;
          } else {
            toast(agentToastDeletingAgentErr(e.response.data.errorCode));
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
