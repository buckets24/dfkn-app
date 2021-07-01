import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { GetCognitoUserResponse } from 'src/modules/auth/handlers/getCognitoUserByEmailHandler';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default function useFetchCognitoQuery(
  email: string | undefined
): UseQueryResult<GetCognitoUserResponse, SimpleError> {
  return useQuery<GetCognitoUserResponse, SimpleError>(
    ['cognito', email],
    async () => {
      if (email) {
        const response = await axios.get<GetCognitoUserResponse>(`/api/cognito/email?email=${email}`);
        return response.data;
      } else {
        return undefined;
      }
    },
    {
      enabled: !!email,
      refetchOnWindowFocus: false,
    }
  );
}
