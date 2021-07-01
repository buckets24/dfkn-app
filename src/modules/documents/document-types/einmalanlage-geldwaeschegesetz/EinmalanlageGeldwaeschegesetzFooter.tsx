import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export const EinmalanlageGeldwaeschegesetzFooter: FC = () => {
  return (
    <>
      <Box p={3} mt={1} fontSize="12px" bg="#103B67" textAlign="center">
        <Text color="white">Deutsches Finanzkontor S.A., Compartment DFK 2020-1</Text>
      </Box>
      <Flex mt={1} justifyContent="space-between">
        <Text color="gray.300" fontSize="10px">
          AG0180220v.2
        </Text>
        <Text color="gray.300" fontSize="10px">
          Blatt 1 (Original): Zentrale, Blatt 2: Kunde
        </Text>
      </Flex>
    </>
  );
};
