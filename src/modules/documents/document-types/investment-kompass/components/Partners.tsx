import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { DFKLogo } from '../icons/DFKLogo';

export const Partners: FC = () => {
  const iconPath = '/svg/investment-kompass';

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={5} mt={5}>
      <Box pos="relative">
        <Flex alignItems="flex-end">
          <Image src={`${iconPath}/to-build.svg`} w="70px" />
          <Text
            ml={1}
            mb={2}
            color="documents.secondary.700"
            fontFamily="mono"
            fontWeight="bold"
            fontSize="lg"
            textTransform="uppercase"
          >
            Bauen
          </Text>
        </Flex>
        <Flex ml={4}>
          <Box h="127px" borderLeftWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
          <Box mt={12}>
            <Flex alignItems="center" mb={2}>
              <Box w="30px" borderTopWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
              <Image ml={2} mb={3} w="100px" src={`${iconPath}/dfk-bau.svg`} />
            </Flex>
            <Flex alignItems="center">
              <Box w="30px" borderTopWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
              <Image ml={2} mb={3} w="150px" src={`${iconPath}/dfk-kuchenwelt.svg`} />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex alignItems="flex-end">
          <Image src={`${iconPath}/to-rent.svg`} w="60px" />
          <Text
            ml={1}
            mb={2}
            color="documents.secondary.700"
            fontFamily="mono"
            fontWeight="bold"
            fontSize="lg"
            textTransform="uppercase"
          >
            VERMIETEN
          </Text>
        </Flex>
        <Flex ml={4}>
          <Box h="130px" borderLeftWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
          <Box mt={12}>
            <Flex alignItems="center" mb={4}>
              <Box w="30px" borderTopWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
              <Image ml={2} mb={3} w="150px" src={`${iconPath}/miag-gmbh.svg`} />
            </Flex>
            <Flex alignItems="center">
              <Box mb={4} w="30px" borderTopWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
              <Image ml={2} mb={3} w="150px" src={`${iconPath}/dfk-pro-energy.svg`} />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex alignItems="flex-end">
          <Image src={`${iconPath}/to-connect.svg`} w="70px" />
          <Text
            ml={1}
            mb={2}
            color="documents.secondary.700"
            fontFamily="mono"
            fontWeight="bold"
            fontSize="lg"
            textTransform="uppercase"
          >
            VERBINDEN
          </Text>
        </Flex>
        <Flex ml={4}>
          <Box h="103px" borderLeftWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
          <Box mt={4}>
            <Flex alignItems="center">
              <Box w="30px" borderTopWidth="2px" borderStyle="dotted" borderColor="documents.secondary.800" />
              <DFKLogo ml={5} w="100px" color="documents.primary.700" />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Grid>
  );
};
