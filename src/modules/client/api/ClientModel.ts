import { CreateClientActivityModelInput, CreateClientModelInput, GetClientBySubQuery } from 'src/API';
import { yupEmailRequired, yupOptions, yupString, yupStringRequired } from 'src/modules/common/yupSchemaFields';
import { AsyncReturnType } from 'type-fest';
import { object, SchemaOf } from 'yup';
import { createClientActivity } from '../clientService';

export type ClientModel = Omit<
  NonNullable<NonNullable<GetClientBySubQuery['getClientBySub']>['items']>[number] & { userType: 'CLIENT' },
  '__typename'
>;

export type GetClientBySubQueryResult = NonNullable<
  NonNullable<NonNullable<GetClientBySubQuery['getClientBySub']>['items']>[number]
>;

/**
 * Used for the DataTable
 */
export type ClientOverviewModel = Pick<
  ClientModel,
  | 'id'
  | 'salutation'
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'telephone'
  | 'email'
  | 'createdAt'
  | 'status'
  | 'cognitoStatus'
>;

export type ClientModelForm = Omit<
  ClientModel,
  'userType' | 'id' | 'sub' | 'createdAt' | 'owner' | 'editors' | 'meetings' | 'onlineDocuments' | 'agentDocuments'
>;

export type ClientEditFormValues = Omit<
  CreateClientModelInput,
  | 'id'
  | 'sub'
  | 'owner'
  | 'editors'
  | 'emailVerified'
  | 'active'
  | 'cognitoStatus'
  | 'status'
  | 'contractor'
  | 'productInfoImmposparen'
>;

export type ClientActivityFormValues = Omit<
  CreateClientActivityModelInput,
  'id' | 'owner' | 'editors' | 'clientId' | 'createdAt' | 'updatedBy'
>;

export type Contractor = CreateClientModelInput['contractor'];

export const clientEditFormSchemaShape = {
  title: yupString(),
  salutation: yupOptions(['Frau', 'Herr'], true),
  firstName: yupStringRequired(),
  lastName: yupStringRequired(),
  email: yupEmailRequired(),
  maritalStatus: yupOptions(
    ['ledig', 'verlobt', 'verheiratet', 'geschieden', 'verwitwet'],
    false,
    null,
    'Bitte wählen Sie einen Familienstand'
  ),
  birthPlace: yupString(),
  birthday: yupString(),
  taxId: yupString(),
  telephone: yupString(),
  fax: yupString(),
  mobile: yupString(),
  postCode: yupString(),
  place: yupString(),
  streetHouseNumber: yupString(),
  country: yupString(),
  addressValidDate: yupString(),
  nationality: yupString(),
  subsidiary: yupString(),
};

export const clientActivityFormSchemaShape = {
  dueDate: yupString(),
  description: yupStringRequired(),
  priority: yupOptions(['HIGH', 'NORMAL', 'LOW'], true, null, 'Bitte wählen Sie eine Priorität'),
  done: yupOptions(['Yes', 'No'], true, null, 'Bitte wählen Sie einen Status'),
};

export const clientEditFormYupSchema: SchemaOf<ClientEditFormValues> = object().shape(clientEditFormSchemaShape);

export const clientActivityFormYupSchema: SchemaOf<ClientActivityFormValues> = object().shape(
  clientActivityFormSchemaShape
);

export type ClientPersonalData = Pick<
  ClientModel,
  | 'firstName'
  | 'lastName'
  | 'birthday'
  | 'birthPlace'
  | 'maritalStatus'
  | 'nationality'
  | 'taxId'
  | 'streetHouseNumber'
  | 'salutation'
  | 'postCode'
  | 'place'
  | 'addressValidDate'
  | 'telephone'
  | 'fax'
  | 'mobile'
  | 'email'
  | 'title'
  | 'country'
>;

export default ClientModel;
