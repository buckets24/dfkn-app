import { CreateAgentModelInput, GetAgentBySubQuery, ROLES, UpdateAgentModelInput } from 'src/API';
import { yupEmail, yupOptions, yupString } from 'src/modules/common/yupSchemaFields';
import { object, SchemaOf } from 'yup';
import SUBSIDIARIES from './subsidiaries';

export type AgentModel = Omit<
  NonNullable<NonNullable<GetAgentBySubQuery['getAgentBySub']>['items']>[number] & { userType: 'AGENT' },
  '__typename'
>;

export type GetAgentBySubQueryResult = NonNullable<
  NonNullable<NonNullable<GetAgentBySubQuery['getAgentBySub']>['items']>[number]
>;

/**
 * Used for the DataTable
 */
export type AgentOverviewModel = Pick<
  AgentModel,
  'id' | 'firstName' | 'lastName' | 'phone' | 'email' | 'createdAt' | 'status' | 'cognitoStatus'
>;

export type AgentPublicModel = Pick<
  AgentModel,
  'id' | 'sub' | 'email' | 'firstName' | 'lastName' | 'salutation' | 'role'
>;

export type AgentModelForm = Omit<AgentModel, 'userType' | 'id' | 'sub' | 'createdAt' | 'updatedAt'>;

export type AgentEditFormValues = Omit<
  CreateAgentModelInput,
  'id' | 'sub' | 'owner' | 'editors' | 'emailVerified' | 'active' | 'role'
>;

export const agentEditFormYupSchema: SchemaOf<
  Omit<UpdateAgentModelInput, 'id' | 'sub' | 'active' | 'emailVerified' | 'cognitoStatus' | 'status' | 'role'>
> = object().shape({
  firstName: yupString(true),
  lastName: yupString(true),
  salutation: yupOptions(['Frau', 'Herr'], true),
  email: yupEmail(true),
  phone: yupString(),
  streetHouseNumber: yupString(),
  postCode: yupString(),
  place: yupString(),
  role: yupOptions(
    [
      ROLES.Director,
      ROLES.OfficeManager,
      ROLES.AgentLR2,
      ROLES.AgentLR1,
      ROLES.AgentR,
      ROLES.FinancialAdvisor,
      ROLES.InsuranceAdvisor,
    ],
    true
  ),
  subsidiary: yupOptions(
    SUBSIDIARIES.map((subsidiary) => subsidiary.value),
    true
  ),
  owner: yupString(),
});

export default AgentModel;
