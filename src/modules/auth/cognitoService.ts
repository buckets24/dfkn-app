import {
  AdminAddUserToGroupCommandOutput,
  AdminDisableUserCommandOutput,
  AdminEnableUserCommandOutput,
  AdminGetUserCommandOutput,
  AdminListGroupsForUserCommandOutput,
  AdminResetUserPasswordCommandOutput,
  AdminSetUserPasswordCommandOutput,
  AdminUpdateUserAttributesCommandOutput,
  AttributeType,
  CognitoIdentityProvider,
  MessageActionType,
  UserType,
} from '@aws-sdk/client-cognito-identity-provider';
import { Logger } from 'aws-amplify';
import config from 'src/AmplifyConfig';
const logger = new Logger('Cognito service logger');

const cognitoIdentityServiceProvider = new CognitoIdentityProvider({
  region: config.aws_project_region,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
  },
});

/**
 *
 * @param emailOrSub Email or sub of the cognito user to be searched for.
 * @returns AdminGetUserCommandOutput or undefined if the user does not exist
 */
export const getUserFromCognito = async (emailOrSub: string): Promise<AdminGetUserCommandOutput | undefined> => {
  const getCognitoUserPromise = new Promise<AdminGetUserCommandOutput | undefined>((resolve, reject) => {
    cognitoIdentityServiceProvider.adminGetUser(
      {
        UserPoolId: config.aws_user_pools_id,
        Username: emailOrSub,
      },
      async (err: any, data: AdminGetUserCommandOutput | undefined) => {
        if (err || data === undefined) {
          if (err.name === 'UserNotFoundException') {
            /**
             * We expect this error to happen, since we handle
             * this by creating a new user
             */
            resolve(undefined);
          } else {
            /**
             * Log the error only if we do not expect it
             */
            logger.error(err);
            reject(err);
          }
        } else {
          resolve(data);
          return data;
        }
      }
    );
  });
  const user = await getCognitoUserPromise;
  return user;
};

/**
 * @param email Creates a cognito user entry given an email
 * @returns The sub of the user on the cognito user pool
 */
export const createCognitoUser = async (email: string, temporaryPassword?: string): Promise<UserType | undefined> => {
  const createUserResponse = await cognitoIdentityServiceProvider.adminCreateUser({
    UserPoolId: config.aws_user_pools_id,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
    TemporaryPassword: temporaryPassword,
    MessageAction: MessageActionType.SUPPRESS,
  });
  return createUserResponse.User;
};

export const setTemporaryPassword = async (
  email: string,
  temporaryPassword: string
): Promise<AdminSetUserPasswordCommandOutput> => {
  const setPasswordResponse = await cognitoIdentityServiceProvider.adminSetUserPassword({
    UserPoolId: config.aws_user_pools_id,
    Username: email,
    Password: temporaryPassword,
    Permanent: false,
  });

  return setPasswordResponse;
};

export const deleteCognitoUser = async (email: string): Promise<void> => {
  /**
   * Throws an error if it fails
   */
  await cognitoIdentityServiceProvider.adminDeleteUser({
    UserPoolId: config.aws_user_pools_id,
    Username: email,
  });
};

export const addUserToCognitoGroup = async (sub: string, role: string): Promise<AdminAddUserToGroupCommandOutput> => {
  const addToGroupResponse = await cognitoIdentityServiceProvider.adminAddUserToGroup({
    GroupName: role,
    UserPoolId: config.aws_user_pools_id,
    Username: sub,
  });
  return addToGroupResponse;
};

export const updateUserCognitoGroup = async (
  email: string,
  oldRole: string,
  newRole: string
): Promise<AdminAddUserToGroupCommandOutput> => {
  await cognitoIdentityServiceProvider.adminRemoveUserFromGroup({
    GroupName: oldRole,
    UserPoolId: config.aws_user_pools_id,
    Username: email,
  });
  return await addUserToCognitoGroup(email, newRole);
};

export const enableCognitoUserByEmailOrSub = async (emailOrSub: string): Promise<AdminEnableUserCommandOutput> => {
  return await cognitoIdentityServiceProvider.adminEnableUser({
    UserPoolId: config.aws_user_pools_id,
    Username: emailOrSub,
  });
};

export const disableCognitoUserByEmailOrSub = async (emailOrSub: string): Promise<AdminDisableUserCommandOutput> => {
  return await cognitoIdentityServiceProvider.adminDisableUser({
    UserPoolId: config.aws_user_pools_id,
    Username: emailOrSub,
  });
};

export const resetCognitoPasswordByEmailOrSub = async (
  emailOrSub: string
): Promise<AdminResetUserPasswordCommandOutput> => {
  return await cognitoIdentityServiceProvider.adminResetUserPassword({
    UserPoolId: config.aws_user_pools_id,
    Username: emailOrSub,
  });
};

export const updateUserAttributes = async (
  emailOrSub: string,
  attributes: AttributeType[]
): Promise<AdminUpdateUserAttributesCommandOutput> => {
  const updateUserAttributes = await cognitoIdentityServiceProvider.adminUpdateUserAttributes({
    UserPoolId: config.aws_user_pools_id,
    Username: emailOrSub,
    UserAttributes: attributes,
  });
  return updateUserAttributes;
};

export const getCognitoGroup = async (emailOrSub: string): Promise<(string | undefined)[] | undefined> => {
  const cognitoGroup = await cognitoIdentityServiceProvider.adminListGroupsForUser({
    UserPoolId: config.aws_user_pools_id,
    Username: emailOrSub,
  });
  if (cognitoGroup.Groups) {
    return cognitoGroup.Groups.map((group) => group.GroupName);
  }

  return undefined;
};
