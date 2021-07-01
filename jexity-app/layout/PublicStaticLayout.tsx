import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { FC, useEffect } from 'react';
import { useAuthStore } from 'src/modules/auth/authStore';
import Header from 'src/views/common/Header';
import { FooterLayout } from './FooterLayout';
import { GetLayout } from './layoutApi';

const PublicStaticLayout: FC<FlexProps> = ({ children, ...others }) => {
  const setCognitoUser = useAuthStore((state) => state.setCognitoUser);

  useEffect(() => {
    const init = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        setCognitoUser(cognitoUser);
      } catch (e) {
        // No ned to do anything if there is an error with authenticating. This is a public page
      }
    };
    void init();
  }, []);
  return (
    <Box overflow="hidden" h="100%">
      <Box w="100%" h="64px">
        <Header useCognitoUser={true} />
      </Box>
      <Box overflow="auto" h="calc(100% - 64px)">
        <Flex
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          px={[10, null, null, 0]}
          pt="40px"
          pb="1.5rem"
          position="relative"
          minH="100%"
          w="100%"
          bg="gray.200"
          {...others}
        >
          {children}
          <FooterLayout
            mt="3.5rem"
            mx="auto"
            maxW={['100%', null, null, '856px']}
            minW={['100%', null, null, '856px']}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export const getPublicStaticLayout: GetLayout = (page) => <PublicStaticLayout>{page}</PublicStaticLayout>;

export default PublicStaticLayout;
