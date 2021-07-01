import { Box } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { FC } from 'react';
import { AgentDocuments } from 'src/modules/agent/forms/AgentDocuments';
import { getAgentProfileLayout } from 'src/views/agents/profile/AgentProfileLayout';

const AgentProfileDocuments: FC & HasLayout = () => {
  return (
    <Box pos="relative" maxW="1000px" p={6}>
      <AgentDocuments />
    </Box>
  );
};

AgentProfileDocuments.getLayout = getAgentProfileLayout;

export default AgentProfileDocuments;
