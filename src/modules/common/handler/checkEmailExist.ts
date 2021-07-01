import { GraphQLResult } from '@aws-amplify/api-graphql';
import Amplify, { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import config from 'src/AmplifyConfig';
import {
  GetAgentByEmailQuery,
  GetAgentByEmailQueryVariables,
  GetClientByEmailQuery,
  GetClientByEmailQueryVariables,
} from 'src/API';
import { getAgentByEmail, getClientByEmail } from 'src/graphql/queries';

const checkEmailExist: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
  const { API } = withSSRContext({ req });
  const { query } = req;
  const { email } = query;

  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  try {
    if (email.length > 0 && typeof email === 'string') {
      const variables: GetClientByEmailQueryVariables | GetAgentByEmailQueryVariables = {
        email: email,
      };

      const clientResponse = (await API.graphql({
        query: getClientByEmail,
        variables,
      })) as GraphQLResult<GetClientByEmailQuery>;

      const agentResponse = (await API.graphql({
        query: getAgentByEmail,
        variables,
      })) as GraphQLResult<GetAgentByEmailQuery>;

      const clientList = clientResponse.data?.getClientByEmail?.items;
      const agentList = agentResponse.data?.getAgentByEmail?.items;
      if ((clientList && clientList.length > 0) || (agentList && agentList.length > 0)) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    } else {
      return res.status(200).json(false);
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'checkEmailExist',
      message: e.message ?? 'There was an error checking the email on the DynamoDB',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: e.message,
      errorCode,
    });
  }
};

export default checkEmailExist;
