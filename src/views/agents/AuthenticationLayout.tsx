import { FC } from 'react';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import LoginLayout from 'jexity-app/layout/LoginLayout';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';

const AuthenticationLayout: FC = ({ children }) => {
  return <LoginLayout logo={NessyCloudLogo}>{children}</LoginLayout>;
};

export const getAuthenticationLayout: GetLayout = (page) => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default AuthenticationLayout;
