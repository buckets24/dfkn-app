import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDocFormMeta } from '../../useDocFormMeta';

export const RBSScheinFooter: FC = () => {
  const { printMode } = useDocFormMeta();
  return (
    <>
      <Box p={3} mb={printMode ? 5 : 0} fontSize="12px" bg="#103B67" textAlign="center">
        <Text color="white">Deutsches Finanzkontor S.A.</Text>
      </Box>
    </>
  );
};
