import { FC } from 'react';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';

export const CommonChallenges: FC = () => {
  const { printMode } = useDocFormMeta();
  return (
    <Grid templateColumns="max-content 1fr" my={printMode ? 12 : 16} px={10}>
      <Flex
        alignItems="center"
        maxH="100px"
        borderRightWidth="3px"
        borderStyle="dotted"
        borderColor="documents.secondary.800"
      >
        <Image w="80px" h="75px" src="/svg/investment-kompass/own-property.svg" />
        <Box ml={3} mr={1} w="50px" borderTopWidth="3px" borderStyle="dotted" borderColor="documents.secondary.800" />
      </Flex>
      <Flex flexDir="column" justifyContent="space-between">
        <Grid mb={5} templateColumns="max-content 1fr">
          <Box ml={1} mr={3} w="40px" borderTopWidth="3px" borderStyle="dotted" borderColor="documents.secondary.800" />
          <Box mt={-10}>
            <Text mb={2} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
              Junge Menschen
            </Text>
            <Flex>
              <Box px={2} py="2px" w="250px" bg="blue.50" color="white" fontSize="sm" fontWeight={500}>
                Zeit
              </Box>
              <Box px={2} py="2px" w="110px" bg="documents.secondary.700" color="white" fontSize="sm" fontWeight={500}>
                Kapital
              </Box>
            </Flex>
          </Box>
        </Grid>
        <Grid templateColumns="max-content 1fr">
          <Box
            mt={12}
            ml={1}
            mr={3}
            w="40px"
            borderTopWidth="3px"
            borderStyle="dotted"
            borderColor="documents.secondary.800"
          />
          <Box mb={-10}>
            <Text mb={2} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
              Alte Menschen
            </Text>
            <Flex>
              <Box px={2} py="2px" w="250px" bg="documents.secondary.700" color="white" fontSize="sm" fontWeight={500}>
                Kapital
              </Box>
              <Box px={2} py="2px" w="110px" bg="blue.50" color="white" fontSize="sm" fontWeight={500}>
                Zeit
              </Box>
            </Flex>
          </Box>
        </Grid>
      </Flex>
    </Grid>
  );
};
