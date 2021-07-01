import { Amplify } from 'aws-amplify';

let config: {
  aws_project_region: string | undefined;
  aws_appsync_graphqlEndpoint: string | undefined;
  aws_appsync_region: string | undefined;
  aws_appsync_authenticationType: string | undefined;
  aws_appsync_apiKey: string | undefined;
  aws_cognito_region: string | undefined;
  aws_user_pools_id: string | undefined;
  aws_user_pools_web_client_id: string | undefined;

  [key: string]: unknown;
};

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  config = require('./aws-exports').default;
  Amplify.configure({ ...config, ssr: true });
} else {
  config = {
    aws_project_region: process.env.NEXT_PUBLIC_aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.NEXT_PUBLIC_aws_appsync_region,
    aws_appsync_authenticationType: process.env.NEXT_PUBLIC_aws_appsync_authenticationType,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
    aws_cognito_region: process.env.NEXT_PUBLIC_aws_cognito_region,
    aws_user_pools_id: process.env.NEXT_PUBLIC_aws_user_pools_id,
    aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_aws_user_pools_web_client_id,

    oauth: {},
    ssr: true,
  };

  Amplify.configure(config);
}

export default config;
