import { FC } from 'react';
import { Box, Avatar, Text, Link, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import { getAgentRoleLabel } from 'src/modules/agent/api/role';

interface AgentContactCard {
  agent: AgentPublicModel | undefined;
}

export const AgentContactCard: FC<AgentContactCard> = ({ agent }) => {
  return (
    <Card d="grid" gridTemplateColumns="max-content 1fr" gridGap={4} px={6} py={4} minH="152px">
      <Box>
        <SkeletonCircle w="88px" h="88px" mb={3} isLoaded={!!agent}>
          <Avatar
            w="88px"
            h="88px"
            mb={3}
            bg="brand.primary.900"
            color="white"
            name={`${agent?.firstName} ${agent?.lastName}`}
          />
        </SkeletonCircle>
        <SkeletonText noOfLines={1} isLoaded={!!agent}>
          <Link
            d="block"
            href={`mailto:${agent?.email}`}
            color="brand.primary.500"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.996px"
            _hover={{ color: 'brand.primary.900', textDecor: 'none' }}
          >
            Kontaktieren
          </Link>
        </SkeletonText>
      </Box>
      <Box>
        <Text
          color="brand.primary.500"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing={1}
          fontFamily="heading"
        >
          Ihr Berater
        </Text>
        <SkeletonText my={!!agent ? 0 : 3} noOfLines={2} isLoaded={!!agent}>
          <Text my={1} color="gray.900" fontSize="2xl" fontWeight="bold" lineHeight="30px" fontFamily="heading">
            {agent?.firstName} <br />
            {agent?.lastName}
          </Text>
        </SkeletonText>
        <SkeletonText mt={!!agent ? 0 : 5} noOfLines={2} isLoaded={!!agent}>
          <Text
            color="gray.500"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing={1}
            fontFamily="heading"
          >
            {agent?.role && getAgentRoleLabel(agent.role)}
          </Text>
        </SkeletonText>
      </Box>
    </Card>
  );
};
