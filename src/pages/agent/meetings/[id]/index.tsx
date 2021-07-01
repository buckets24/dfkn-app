import { Box, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { MeetingEditForm } from 'src/modules/meetings/forms/MeetingEditForm';
import { meetingToastLoadingUnknownErr } from 'src/modules/meetings/meetingsMsg';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import { getAgentMeetingManagementLayout } from 'src/views/agents/meeting-management/AgentMeetingLayout';
import { gotoAgentMeetings } from 'src/views/common/routing';

interface MeetingDetailsProps {
  agents: AgentPublicModel[];
}

const MeetingDetails: FC<MeetingDetailsProps> & HasLayout = () => {
  const router = useRouter();
  const id = router.query.id;
  const toast = useToast();
  const { isLoading, data, error } = useMeetingByIdQuery(typeof id === 'string' ? id : undefined, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoAgentMeetings(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'requestMeetingsByOwner() in MeetingDetails', e);
      toast(meetingToastLoadingUnknownErr(errorCode));
    },
  });
  const [agents, setAgents] = useState<AgentPublicModel[]>([]);

  useEffect(() => {
    const requestAgents = async () => {
      const agentResponse = await axios.get<AgentPublicModel[]>('/api/agents');
      if (agentResponse.data.length > 0) {
        setAgents(agentResponse.data);
      }
    };

    requestAgents().catch((e) => {
      const errorCode = log(LogLevel.error, e, {
        label: 'MeetingDetails',
        ...e,
      });
      toast(agentToastLoadingUnknowErr(errorCode));
    });
  }, [toast]);

  return (
    <Box maxW="1000px" p={6}>
      {!isLoading && <MeetingEditForm meeting={data} agents={agents} />}
    </Box>
  );
};

MeetingDetails.getLayout = getAgentMeetingManagementLayout;

export default MeetingDetails;
