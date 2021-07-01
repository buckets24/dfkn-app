import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const RatierlichZeichnungsscheinFooter: FC = () => {
  return (
    <Box mb={5} p={3} fontSize="12px" bg="#103B67" textAlign="center">
      <Text color="white">Deutsches Finanzkontor S.A., Compartment DFK 2020-2</Text>
    </Box>
  );
};
