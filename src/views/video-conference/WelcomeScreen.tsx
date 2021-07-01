import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';

export const WelcomeScreen: FC = () => {
  return (
    <Flex
      pos="absolute"
      top={0}
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
      bg="url('../images/welcome-screen-bg.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <DFKLogo color="white" />
    </Flex>
  );
};
