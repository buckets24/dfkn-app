import { Center, CircularProgress } from '@chakra-ui/react';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Center mt={8} w="100%" height="100%" minW={['350px']} minHeight="320px">
      <CircularProgress isIndeterminate={true} color="green.400" />
    </Center>
  );
};
