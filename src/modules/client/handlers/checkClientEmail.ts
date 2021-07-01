import { GraphQLResult } from '@aws-amplify/api-graphql';
import Amplify, { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { ListClientModelsQuery, ListClientModelsQueryVariables } from 'src/API';
import { listClientModels } from 'src/graphql/queries';
import config from 'src/AmplifyConfig';

const checkClientEmail: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
  const { API } = withSSRContext({ req });
  const { query } = req;
  const { email } = query;

  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  try {
    if (typeof email === 'string') {
      const variables: ListClientModelsQueryVariables = {
        filter: { email: { eq: email } },
      };

      const clientResponse = (await API.graphql({
        query: listClientModels,
        variables,
      })) as GraphQLResult<ListClientModelsQuery>;

      const clientList = clientResponse.data?.listClientModels?.items;
      if (clientList && clientList.length > 0) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'checkClientEmail',
      message: 'There was an error checking the email on the DynamoDB',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'Unknown error in catch of checkClientEmailHandler, see logs',
      errorCode,
    });
  }
};

export default checkClientEmail;
