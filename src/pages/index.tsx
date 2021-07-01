import React, { FC } from 'react';
import { getAuthenticationLayout } from '../views/agents/AuthenticationLayout';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { Box } from '@chakra-ui/react';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { Loading } from 'src/views/common/Loading';

const Home: FC & HasLayout = () => {
  return (
    <>
      {/* Added display="none" so that the function of AuthGuard still runs but hide the loader */}
      <Box d="none">
        <AuthGuard />
      </Box>
      <Loading />
    </>
  );
};

export default Home;

Home.getLayout = getAuthenticationLayout;
