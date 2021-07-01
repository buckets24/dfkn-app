/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelMeetingModelFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  meetingDateTime?: ModelStringInput | null,
  moderatorId?: ModelIDInput | null,
  moderatorName?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  editors?: ModelStringInput | null,
  activeDocumentId?: ModelIDInput | null,
  scrollPos?: ModelFloatInput | null,
  scrollPosPercent?: ModelFloatInput | null,
  and?: Array< ModelMeetingModelFilterInput | null > | null,
  or?: Array< ModelMeetingModelFilterInput | null > | null,
  not?: ModelMeetingModelFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelMeetingModelConnection = {
  __typename: "ModelMeetingModelConnection",
  items?:  Array<MeetingModel | null > | null,
  nextToken?: string | null,
};

export type MeetingModel = {
  __typename: "MeetingModel",
  id?: string,
  owner?: string,
  meetingDateTime?: string,
  moderatorId?: string,
  moderatorName?: string | null,
  clientId?: string,
  editors?: Array< string | null > | null,
  activeDocumentId?: string | null,
  scrollPos?: number | null,
  scrollPosPercent?: number | null,
  createdAt?: string,
  updatedAt?: string,
  client?: ClientModel,
  guestAgents?: ModelGuestAgentMeetingModelConnection,
};

export type ClientModel = {
  __typename: "ClientModel",
  id?: string,
  sub?: string | null,
  firstName?: string,
  lastName?: string,
  salutation?: string | null,
  email?: string,
  telephone?: string | null,
  fax?: string | null,
  mobile?: string | null,
  maritalStatus?: string | null,
  country?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  addressValidDate?: string | null,
  birthPlace?: string | null,
  birthday?: string | null,
  title?: string | null,
  nationality?: string | null,
  taxId?: string | null,
  emailVerified?: boolean | null,
  active?: boolean | null,
  contractor?: Contractor,
  subsidiary?: string | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  productInfoImmposparen?: ProductInfoImmposparen,
  createdAt?: string,
  updatedAt?: string,
  meetings?: ModelMeetingModelConnection,
  onlineDocuments?: ModelOnlineDocumentModelConnection,
  agentDocuments?: ModelOnlineDocumentModelConnection,
};

export type Contractor = {
  __typename: "Contractor",
  firstName?: string | null,
  lastName?: string | null,
  salutation?: string | null,
  email?: string | null,
  telephone?: string | null,
  fax?: string | null,
  mobile?: string | null,
  maritalStatus?: string | null,
  country?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  addressValidDate?: string | null,
  birthPlace?: string | null,
  birthday?: string | null,
  title?: string | null,
  nationality?: string | null,
  taxId?: string | null,
};

export enum CognitoUserStatusType {
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  CONFIRMED = "CONFIRMED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
  RESET_REQUIRED = "RESET_REQUIRED",
  UNCONFIRMED = "UNCONFIRMED",
  UNKNOWN = "UNKNOWN",
}


export enum AccountStatus {
  EMAIL_SENT = "EMAIL_SENT",
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}


export type ProductInfoImmposparen = {
  __typename: "ProductInfoImmposparen",
  oneTimeInvestment?: boolean | null,
  proportionalInvestment?: boolean | null,
};

export type ModelOnlineDocumentModelConnection = {
  __typename: "ModelOnlineDocumentModelConnection",
  items?:  Array<OnlineDocumentModel | null > | null,
  nextToken?: string | null,
};

export type OnlineDocumentModel = {
  __typename: "OnlineDocumentModel",
  id?: string,
  title?: string,
  type?: OnlineDocumentType,
  status?: OnlineDocumentStatus,
  values?: string,
  clientId?: string,
  contractor?: ContractorType | null,
  owner?: string,
  editors?: Array< string | null > | null,
  isVisibleToClient?: boolean | null,
  version?: number | null,
  createdAt?: string,
  updatedAt?: string,
  client?: ClientModel,
  patches?: ModelDocumentPatchConnection,
};

export enum OnlineDocumentType {
  INVESTMENT_KOMPASS = "INVESTMENT_KOMPASS",
  EINMALANLAGE_ZEICHNUNGSSCHEIN = "EINMALANLAGE_ZEICHNUNGSSCHEIN",
  EINMALANLAGE_GELDWAESCHEGESETZ = "EINMALANLAGE_GELDWAESCHEGESETZ",
  RATIERLICH_ZEICHNUNGSSCHEIN = "RATIERLICH_ZEICHNUNGSSCHEIN",
  RATIERLICH_GELDWAESCHEGESETZ = "RATIERLICH_GELDWAESCHEGESETZ",
  ANGEBOT_IMMOSPAREN = "ANGEBOT_IMMOSPAREN",
  RBS_SCHEIN = "RBS_SCHEIN",
  RBS_SCHEIN_FUNDING = "RBS_SCHEIN_FUNDING",
  RBS_SCHEIN_OTHER = "RBS_SCHEIN_OTHER",
  RBS_SCHEIN_FULLSERVICE = "RBS_SCHEIN_FULLSERVICE",
  RBS_SCHEIN_DFK_HOME = "RBS_SCHEIN_DFK_HOME",
  RBS_SCHEIN_DFK_SAFE = "RBS_SCHEIN_DFK_SAFE",
}


export enum OnlineDocumentStatus {
  CLEAN = "CLEAN",
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  LOCK = "LOCK",
}


export enum ContractorType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}


export type ModelDocumentPatchConnection = {
  __typename: "ModelDocumentPatchConnection",
  items?:  Array<DocumentPatch | null > | null,
  nextToken?: string | null,
};

export type DocumentPatch = {
  __typename: "DocumentPatch",
  id?: string,
  patch?: string,
  documentId?: string,
  uniqueEditorInstance?: string | null,
  author?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelGuestAgentMeetingModelConnection = {
  __typename: "ModelGuestAgentMeetingModelConnection",
  items?:  Array<GuestAgentMeetingModel | null > | null,
  nextToken?: string | null,
};

export type GuestAgentMeetingModel = {
  __typename: "GuestAgentMeetingModel",
  id?: string,
  meetingId?: string,
  agentId?: string,
  createdAt?: string,
  updatedAt?: string,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type AgentModel = {
  __typename: "AgentModel",
  id?: string,
  sub?: string | null,
  firstName?: string,
  lastName?: string,
  salutation?: string,
  email?: string,
  phone?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  role?: ROLES,
  subsidiary?: string | null,
  active?: boolean | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
  createdAt?: string,
  updatedAt?: string,
  meetingsAsModerator?: ModelMeetingModelConnection,
};

export enum ROLES {
  Admin = "Admin",
  Director = "Director",
  OfficeManager = "OfficeManager",
  AgentLR2 = "AgentLR2",
  AgentLR1 = "AgentLR1",
  AgentR = "AgentR",
  FinancialAdvisor = "FinancialAdvisor",
  InsuranceAdvisor = "InsuranceAdvisor",
  Client = "Client",
}


export type ModelClientModelFilterInput = {
  id?: ModelIDInput | null,
  sub?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  salutation?: ModelStringInput | null,
  email?: ModelStringInput | null,
  telephone?: ModelStringInput | null,
  fax?: ModelStringInput | null,
  mobile?: ModelStringInput | null,
  maritalStatus?: ModelStringInput | null,
  country?: ModelStringInput | null,
  streetHouseNumber?: ModelStringInput | null,
  postCode?: ModelStringInput | null,
  place?: ModelStringInput | null,
  addressValidDate?: ModelStringInput | null,
  birthPlace?: ModelStringInput | null,
  birthday?: ModelStringInput | null,
  title?: ModelStringInput | null,
  nationality?: ModelStringInput | null,
  taxId?: ModelStringInput | null,
  emailVerified?: ModelBooleanInput | null,
  active?: ModelBooleanInput | null,
  subsidiary?: ModelStringInput | null,
  cognitoStatus?: ModelCognitoUserStatusTypeInput | null,
  status?: ModelAccountStatusInput | null,
  owner?: ModelStringInput | null,
  editors?: ModelStringInput | null,
  and?: Array< ModelClientModelFilterInput | null > | null,
  or?: Array< ModelClientModelFilterInput | null > | null,
  not?: ModelClientModelFilterInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelCognitoUserStatusTypeInput = {
  eq?: CognitoUserStatusType | null,
  ne?: CognitoUserStatusType | null,
};

export type ModelAccountStatusInput = {
  eq?: AccountStatus | null,
  ne?: AccountStatus | null,
};

export type ModelClientModelConnection = {
  __typename: "ModelClientModelConnection",
  items?:  Array<ClientModel | null > | null,
  nextToken?: string | null,
};

export type ModelOnlineDocumentModelFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelOnlineDocumentTypeInput | null,
  status?: ModelOnlineDocumentStatusInput | null,
  values?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  contractor?: ModelContractorTypeInput | null,
  owner?: ModelStringInput | null,
  editors?: ModelStringInput | null,
  isVisibleToClient?: ModelBooleanInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelOnlineDocumentModelFilterInput | null > | null,
  or?: Array< ModelOnlineDocumentModelFilterInput | null > | null,
  not?: ModelOnlineDocumentModelFilterInput | null,
};

export type ModelOnlineDocumentTypeInput = {
  eq?: OnlineDocumentType | null,
  ne?: OnlineDocumentType | null,
};

export type ModelOnlineDocumentStatusInput = {
  eq?: OnlineDocumentStatus | null,
  ne?: OnlineDocumentStatus | null,
};

export type ModelContractorTypeInput = {
  eq?: ContractorType | null,
  ne?: ContractorType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CreateAgentModelInput = {
  id?: string | null,
  sub?: string | null,
  firstName: string,
  lastName: string,
  salutation: string,
  email: string,
  phone?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  role: ROLES,
  subsidiary?: string | null,
  active?: boolean | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
};

export type ModelAgentModelConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  salutation?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  streetHouseNumber?: ModelStringInput | null,
  postCode?: ModelStringInput | null,
  place?: ModelStringInput | null,
  role?: ModelROLESInput | null,
  subsidiary?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  cognitoStatus?: ModelCognitoUserStatusTypeInput | null,
  status?: ModelAccountStatusInput | null,
  and?: Array< ModelAgentModelConditionInput | null > | null,
  or?: Array< ModelAgentModelConditionInput | null > | null,
  not?: ModelAgentModelConditionInput | null,
};

export type ModelROLESInput = {
  eq?: ROLES | null,
  ne?: ROLES | null,
};

export type UpdateAgentModelInput = {
  id: string,
  sub?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  salutation?: string | null,
  email?: string | null,
  phone?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  role?: ROLES | null,
  subsidiary?: string | null,
  active?: boolean | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
};

export type DeleteAgentModelInput = {
  id?: string | null,
};

export type CreateClientModelInput = {
  id?: string | null,
  sub?: string | null,
  firstName: string,
  lastName: string,
  salutation?: string | null,
  email: string,
  telephone?: string | null,
  fax?: string | null,
  mobile?: string | null,
  maritalStatus?: string | null,
  country?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  addressValidDate?: string | null,
  birthPlace?: string | null,
  birthday?: string | null,
  title?: string | null,
  nationality?: string | null,
  taxId?: string | null,
  emailVerified?: boolean | null,
  active?: boolean | null,
  contractor?: ContractorInput | null,
  subsidiary?: string | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  productInfoImmposparen?: ProductInfoImmposparenInput | null,
};

export type ContractorInput = {
  firstName?: string | null,
  lastName?: string | null,
  salutation?: string | null,
  email?: string | null,
  telephone?: string | null,
  fax?: string | null,
  mobile?: string | null,
  maritalStatus?: string | null,
  country?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  addressValidDate?: string | null,
  birthPlace?: string | null,
  birthday?: string | null,
  title?: string | null,
  nationality?: string | null,
  taxId?: string | null,
};

export type ProductInfoImmposparenInput = {
  oneTimeInvestment?: boolean | null,
  proportionalInvestment?: boolean | null,
};

export type ModelClientModelConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  salutation?: ModelStringInput | null,
  email?: ModelStringInput | null,
  telephone?: ModelStringInput | null,
  fax?: ModelStringInput | null,
  mobile?: ModelStringInput | null,
  maritalStatus?: ModelStringInput | null,
  country?: ModelStringInput | null,
  streetHouseNumber?: ModelStringInput | null,
  postCode?: ModelStringInput | null,
  place?: ModelStringInput | null,
  addressValidDate?: ModelStringInput | null,
  birthPlace?: ModelStringInput | null,
  birthday?: ModelStringInput | null,
  title?: ModelStringInput | null,
  nationality?: ModelStringInput | null,
  taxId?: ModelStringInput | null,
  emailVerified?: ModelBooleanInput | null,
  active?: ModelBooleanInput | null,
  subsidiary?: ModelStringInput | null,
  cognitoStatus?: ModelCognitoUserStatusTypeInput | null,
  status?: ModelAccountStatusInput | null,
  and?: Array< ModelClientModelConditionInput | null > | null,
  or?: Array< ModelClientModelConditionInput | null > | null,
  not?: ModelClientModelConditionInput | null,
};

export type DeleteClientModelInput = {
  id?: string | null,
};

export type CreateClientActivityModelInput = {
  id?: string | null,
  clientId: string,
  dueDate?: string | null,
  description: string,
  done?: string | null,
  priority?: string | null,
  editors?: Array< string | null > | null,
  createdAt?: string | null,
  owner: string,
  updatedBy: string,
};

export type ModelClientActivityModelConditionInput = {
  clientId?: ModelIDInput | null,
  dueDate?: ModelStringInput | null,
  description?: ModelStringInput | null,
  done?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedBy?: ModelIDInput | null,
  and?: Array< ModelClientActivityModelConditionInput | null > | null,
  or?: Array< ModelClientActivityModelConditionInput | null > | null,
  not?: ModelClientActivityModelConditionInput | null,
};

export type ClientActivityModel = {
  __typename: "ClientActivityModel",
  id?: string,
  clientId?: string,
  dueDate?: string | null,
  description?: string,
  done?: string | null,
  priority?: string | null,
  editors?: Array< string | null > | null,
  createdAt?: string,
  owner?: string,
  updatedBy?: string,
  updatedAt?: string,
  client?: ClientModel,
};

export type UpdateClientActivityModelInput = {
  id: string,
  clientId?: string | null,
  dueDate?: string | null,
  description?: string | null,
  done?: string | null,
  priority?: string | null,
  editors?: Array< string | null > | null,
  createdAt?: string | null,
  owner?: string | null,
  updatedBy?: string | null,
};

export type DeleteClientActivityModelInput = {
  id?: string | null,
};

export type CreateMeetingModelInput = {
  id?: string | null,
  owner: string,
  meetingDateTime: string,
  moderatorId: string,
  moderatorName?: string | null,
  clientId: string,
  editors?: Array< string | null > | null,
  activeDocumentId?: string | null,
  scrollPos?: number | null,
  scrollPosPercent?: number | null,
};

export type ModelMeetingModelConditionInput = {
  meetingDateTime?: ModelStringInput | null,
  moderatorId?: ModelIDInput | null,
  moderatorName?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  activeDocumentId?: ModelIDInput | null,
  scrollPos?: ModelFloatInput | null,
  scrollPosPercent?: ModelFloatInput | null,
  and?: Array< ModelMeetingModelConditionInput | null > | null,
  or?: Array< ModelMeetingModelConditionInput | null > | null,
  not?: ModelMeetingModelConditionInput | null,
};

export type UpdateMeetingModelInput = {
  id: string,
  owner?: string | null,
  meetingDateTime?: string | null,
  moderatorId?: string | null,
  moderatorName?: string | null,
  clientId?: string | null,
  editors?: Array< string | null > | null,
  activeDocumentId?: string | null,
  scrollPos?: number | null,
  scrollPosPercent?: number | null,
};

export type DeleteMeetingModelInput = {
  id?: string | null,
};

export type CreateGuestAgentMeetingModelInput = {
  id?: string | null,
  meetingId: string,
  agentId: string,
};

export type ModelGuestAgentMeetingModelConditionInput = {
  meetingId?: ModelIDInput | null,
  agentId?: ModelIDInput | null,
  and?: Array< ModelGuestAgentMeetingModelConditionInput | null > | null,
  or?: Array< ModelGuestAgentMeetingModelConditionInput | null > | null,
  not?: ModelGuestAgentMeetingModelConditionInput | null,
};

export type UpdateGuestAgentMeetingModelInput = {
  id: string,
  meetingId?: string | null,
  agentId?: string | null,
};

export type DeleteGuestAgentMeetingModelInput = {
  id?: string | null,
};

export type CreateOnlineDocumentModelInput = {
  id?: string | null,
  title: string,
  type: OnlineDocumentType,
  status: OnlineDocumentStatus,
  values: string,
  clientId: string,
  contractor?: ContractorType | null,
  owner: string,
  editors?: Array< string | null > | null,
  isVisibleToClient?: boolean | null,
  version?: number | null,
};

export type ModelOnlineDocumentModelConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelOnlineDocumentTypeInput | null,
  status?: ModelOnlineDocumentStatusInput | null,
  values?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  contractor?: ModelContractorTypeInput | null,
  isVisibleToClient?: ModelBooleanInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelOnlineDocumentModelConditionInput | null > | null,
  or?: Array< ModelOnlineDocumentModelConditionInput | null > | null,
  not?: ModelOnlineDocumentModelConditionInput | null,
};

export type DeleteOnlineDocumentModelInput = {
  id?: string | null,
};

export type DeleteDocumentPatchInput = {
  id?: string | null,
};

export type ModelDocumentPatchConditionInput = {
  patch?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  uniqueEditorInstance?: ModelStringInput | null,
  author?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDocumentPatchConditionInput | null > | null,
  or?: Array< ModelDocumentPatchConditionInput | null > | null,
  not?: ModelDocumentPatchConditionInput | null,
};

export type CreateOnlineDocumentArchiveModelInput = {
  id?: string | null,
  documentId: string,
  title: string,
  type: OnlineDocumentType,
  values: string,
  clientId: string,
  contractor?: ContractorType | null,
  owner: string,
  editors?: Array< string | null > | null,
  version?: number | null,
};

export type ModelOnlineDocumentArchiveModelConditionInput = {
  documentId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelOnlineDocumentTypeInput | null,
  values?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  contractor?: ModelContractorTypeInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelOnlineDocumentArchiveModelConditionInput | null > | null,
  or?: Array< ModelOnlineDocumentArchiveModelConditionInput | null > | null,
  not?: ModelOnlineDocumentArchiveModelConditionInput | null,
};

export type OnlineDocumentArchiveModel = {
  __typename: "OnlineDocumentArchiveModel",
  id?: string,
  documentId?: string,
  title?: string,
  type?: OnlineDocumentType,
  values?: string,
  clientId?: string,
  contractor?: ContractorType | null,
  owner?: string,
  editors?: Array< string | null > | null,
  version?: number | null,
  createdAt?: string,
  updatedAt?: string,
  client?: ClientModel,
};

export type UpdateOnlineDocumentArchiveModelInput = {
  id: string,
  documentId?: string | null,
  title?: string | null,
  type?: OnlineDocumentType | null,
  values?: string | null,
  clientId?: string | null,
  contractor?: ContractorType | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  version?: number | null,
};

export type DeleteOnlineDocumentArchiveModelInput = {
  id?: string | null,
};

export type CreateSignatureTokenModelInput = {
  id?: string | null,
  pin?: string | null,
  documentId: string,
  fieldName?: string | null,
  authorId: string,
};

export type ModelSignatureTokenModelConditionInput = {
  pin?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  fieldName?: ModelStringInput | null,
  authorId?: ModelIDInput | null,
  and?: Array< ModelSignatureTokenModelConditionInput | null > | null,
  or?: Array< ModelSignatureTokenModelConditionInput | null > | null,
  not?: ModelSignatureTokenModelConditionInput | null,
};

export type SignatureTokenModel = {
  __typename: "SignatureTokenModel",
  id?: string,
  pin?: string | null,
  documentId?: string,
  fieldName?: string | null,
  authorId?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateClientModelInput = {
  id: string,
  sub?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  salutation?: string | null,
  email?: string | null,
  telephone?: string | null,
  fax?: string | null,
  mobile?: string | null,
  maritalStatus?: string | null,
  country?: string | null,
  streetHouseNumber?: string | null,
  postCode?: string | null,
  place?: string | null,
  addressValidDate?: string | null,
  birthPlace?: string | null,
  birthday?: string | null,
  title?: string | null,
  nationality?: string | null,
  taxId?: string | null,
  emailVerified?: boolean | null,
  active?: boolean | null,
  contractor?: ContractorInput | null,
  subsidiary?: string | null,
  cognitoStatus?: CognitoUserStatusType | null,
  status?: AccountStatus | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  productInfoImmposparen?: ProductInfoImmposparenInput | null,
};

export type UpdateOnlineDocumentModelInput = {
  id: string,
  title?: string | null,
  type?: OnlineDocumentType | null,
  status?: OnlineDocumentStatus | null,
  values?: string | null,
  clientId?: string | null,
  contractor?: ContractorType | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  isVisibleToClient?: boolean | null,
  version?: number | null,
};

export type CreateDocumentPatchInput = {
  id?: string | null,
  patch: string,
  documentId: string,
  uniqueEditorInstance?: string | null,
  author: string,
  createdAt?: string | null,
};

export type UpdateDocumentPatchInput = {
  id: string,
  patch?: string | null,
  documentId?: string | null,
  uniqueEditorInstance?: string | null,
  author?: string | null,
  createdAt?: string | null,
};

export type UpdateSignatureTokenModelInput = {
  id: string,
  pin?: string | null,
  documentId?: string | null,
  fieldName?: string | null,
  authorId?: string | null,
};

export type DeleteSignatureTokenModelInput = {
  id?: string | null,
};

export type ModelClientActivityModelFilterInput = {
  id?: ModelIDInput | null,
  clientId?: ModelIDInput | null,
  dueDate?: ModelStringInput | null,
  description?: ModelStringInput | null,
  done?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  editors?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelIDInput | null,
  updatedBy?: ModelIDInput | null,
  and?: Array< ModelClientActivityModelFilterInput | null > | null,
  or?: Array< ModelClientActivityModelFilterInput | null > | null,
  not?: ModelClientActivityModelFilterInput | null,
};

export type ModelClientActivityModelConnection = {
  __typename: "ModelClientActivityModelConnection",
  items?:  Array<ClientActivityModel | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelAgentModelFilterInput = {
  id?: ModelIDInput | null,
  sub?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  salutation?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  streetHouseNumber?: ModelStringInput | null,
  postCode?: ModelStringInput | null,
  place?: ModelStringInput | null,
  role?: ModelROLESInput | null,
  subsidiary?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  cognitoStatus?: ModelCognitoUserStatusTypeInput | null,
  status?: ModelAccountStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelAgentModelFilterInput | null > | null,
  or?: Array< ModelAgentModelFilterInput | null > | null,
  not?: ModelAgentModelFilterInput | null,
};

export type ModelAgentModelConnection = {
  __typename: "ModelAgentModelConnection",
  items?:  Array<AgentModel | null > | null,
  nextToken?: string | null,
};

export type ModelGuestAgentMeetingModelFilterInput = {
  id?: ModelIDInput | null,
  meetingId?: ModelIDInput | null,
  agentId?: ModelIDInput | null,
  and?: Array< ModelGuestAgentMeetingModelFilterInput | null > | null,
  or?: Array< ModelGuestAgentMeetingModelFilterInput | null > | null,
  not?: ModelGuestAgentMeetingModelFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelDocumentPatchFilterInput = {
  id?: ModelIDInput | null,
  patch?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  uniqueEditorInstance?: ModelStringInput | null,
  author?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDocumentPatchFilterInput | null > | null,
  or?: Array< ModelDocumentPatchFilterInput | null > | null,
  not?: ModelDocumentPatchFilterInput | null,
};

export type ModelOnlineDocumentArchiveModelFilterInput = {
  id?: ModelIDInput | null,
  documentId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelOnlineDocumentTypeInput | null,
  values?: ModelStringInput | null,
  clientId?: ModelIDInput | null,
  contractor?: ModelContractorTypeInput | null,
  owner?: ModelStringInput | null,
  editors?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelOnlineDocumentArchiveModelFilterInput | null > | null,
  or?: Array< ModelOnlineDocumentArchiveModelFilterInput | null > | null,
  not?: ModelOnlineDocumentArchiveModelFilterInput | null,
};

export type ModelOnlineDocumentArchiveModelConnection = {
  __typename: "ModelOnlineDocumentArchiveModelConnection",
  items?:  Array<OnlineDocumentArchiveModel | null > | null,
  nextToken?: string | null,
};

export type ModelSignatureTokenModelFilterInput = {
  id?: ModelIDInput | null,
  pin?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  fieldName?: ModelStringInput | null,
  authorId?: ModelIDInput | null,
  and?: Array< ModelSignatureTokenModelFilterInput | null > | null,
  or?: Array< ModelSignatureTokenModelFilterInput | null > | null,
  not?: ModelSignatureTokenModelFilterInput | null,
};

export type ModelSignatureTokenModelConnection = {
  __typename: "ModelSignatureTokenModelConnection",
  items?:  Array<SignatureTokenModel | null > | null,
  nextToken?: string | null,
};

export type ListMeetingModelsWithClientNamesQueryVariables = {
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingModelsWithClientNamesQuery = {
  listMeetingModels?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      meetingDateTime: string,
      moderatorId: string,
      clientId: string,
      createdAt: string,
      updatedAt: string,
      client:  {
        __typename: "ClientModel",
        title?: string | null,
        firstName: string,
        lastName: string,
      },
      activeDocumentId?: string | null,
      scrollPos?: number | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingsByOwnerWithClientNamesQueryVariables = {
  owner?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMeetingsByOwnerWithClientNamesQuery = {
  getMeetingsByOwner?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      owner: string,
      meetingDateTime: string,
      moderatorId: string,
      moderatorName?: string | null,
      clientId: string,
      editors?: Array< string | null > | null,
      activeDocumentId?: string | null,
      scrollPos?: number | null,
      scrollPosPercent?: number | null,
      client:  {
        __typename: "ClientModel",
        salutation?: string | null,
        title?: string | null,
        firstName: string,
        lastName: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAgentModelWithMeetingsQueryVariables = {
  id?: string,
};

export type GetAgentModelWithMeetingsQuery = {
  getAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      items?:  Array< {
        __typename: "MeetingModel",
        id: string,
        owner: string,
        meetingDateTime: string,
        moderatorId: string,
        clientId: string,
        activeDocumentId?: string | null,
        scrollPos?: number | null,
        scrollPosPercent?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetClientBySubWithMeetingIdsQueryVariables = {
  sub?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetClientBySubWithMeetingIdsQuery = {
  getClientBySub?:  {
    __typename: "ModelClientModelConnection",
    items?:  Array< {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      meetings?:  {
        __typename: "ModelMeetingModelConnection",
        items?:  Array< {
          __typename: "MeetingModel",
          id: string,
        } | null > | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingsByClientIdWithClientNameQueryVariables = {
  clientId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMeetingsByClientIdWithClientNameQuery = {
  getMeetingsByClientId?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      owner: string,
      meetingDateTime: string,
      moderatorId: string,
      clientId: string,
      editors?: Array< string | null > | null,
      activeDocumentId?: string | null,
      scrollPos?: number | null,
      scrollPosPercent?: number | null,
      createdAt: string,
      updatedAt: string,
      client:  {
        __typename: "ClientModel",
        title?: string | null,
        firstName: string,
        lastName: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentModelWithPatchesQueryVariables = {
  id?: string,
  nextToken?: string | null,
  limit?: number | null,
};

export type GetOnlineDocumentModelWithPatchesQuery = {
  getOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    version?: number | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    createdAt: string,
    updatedAt: string,
    contractor?: ContractorType | null,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      contractor?:  {
        __typename: "Contractor",
        firstName?: string | null,
        lastName?: string | null,
        salutation?: string | null,
        email?: string | null,
        telephone?: string | null,
        fax?: string | null,
        mobile?: string | null,
        maritalStatus?: string | null,
        country?: string | null,
        streetHouseNumber?: string | null,
        postCode?: string | null,
        place?: string | null,
        addressValidDate?: string | null,
        birthPlace?: string | null,
        birthday?: string | null,
        title?: string | null,
        nationality?: string | null,
        taxId?: string | null,
      } | null,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
      items?:  Array< {
        __typename: "DocumentPatch",
        id: string,
        patch: string,
        documentId: string,
        uniqueEditorInstance?: string | null,
        author: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
    } | null,
  } | null,
};

export type GetOnlineDocumentsWithPatchesByClientIdQueryVariables = {
  clientId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOnlineDocumentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOnlineDocumentsWithPatchesByClientIdQuery = {
  getOnlineDocumentsByClientId?:  {
    __typename: "ModelOnlineDocumentModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentModel",
      id: string,
      title: string,
      type: OnlineDocumentType,
      status: OnlineDocumentStatus,
      values: string,
      clientId: string,
      owner: string,
      editors?: Array< string | null > | null,
      isVisibleToClient?: boolean | null,
      createdAt: string,
      updatedAt: string,
      version?: number | null,
      contractor?: ContractorType | null,
      patches?:  {
        __typename: "ModelDocumentPatchConnection",
        nextToken?: string | null,
        items?:  Array< {
          __typename: "DocumentPatch",
          id: string,
          patch: string,
          documentId: string,
          uniqueEditorInstance?: string | null,
          author: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentsWithLatestPatchByClientIdQueryVariables = {
  clientId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOnlineDocumentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOnlineDocumentsWithLatestPatchByClientIdQuery = {
  getOnlineDocumentsByClientId?:  {
    __typename: "ModelOnlineDocumentModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentModel",
      id: string,
      title: string,
      type: OnlineDocumentType,
      status: OnlineDocumentStatus,
      values: string,
      clientId: string,
      owner: string,
      editors?: Array< string | null > | null,
      isVisibleToClient?: boolean | null,
      createdAt: string,
      updatedAt: string,
      version?: number | null,
      contractor?: ContractorType | null,
      patches?:  {
        __typename: "ModelDocumentPatchConnection",
        nextToken?: string | null,
        items?:  Array< {
          __typename: "DocumentPatch",
          id: string,
          patch: string,
          documentId: string,
          uniqueEditorInstance?: string | null,
          author: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnAgentCreateSubscription = {
  onCreateAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    status?: AccountStatus | null,
    cognitoStatus?: CognitoUserStatusType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnAgentUpdateSubscription = {
  onUpdateAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    status?: AccountStatus | null,
    cognitoStatus?: CognitoUserStatusType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnAgentDeleteSubscription = {
  onDeleteAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    status?: AccountStatus | null,
    cognitoStatus?: CognitoUserStatusType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAgentModelMutationVariables = {
  input?: CreateAgentModelInput,
  condition?: ModelAgentModelConditionInput | null,
};

export type CreateAgentModelMutation = {
  createAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateAgentModelMutationVariables = {
  input?: UpdateAgentModelInput,
  condition?: ModelAgentModelConditionInput | null,
};

export type UpdateAgentModelMutation = {
  updateAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteAgentModelMutationVariables = {
  input?: DeleteAgentModelInput,
  condition?: ModelAgentModelConditionInput | null,
};

export type DeleteAgentModelMutation = {
  deleteAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateClientModelMutationVariables = {
  input?: CreateClientModelInput,
  condition?: ModelClientModelConditionInput | null,
};

export type CreateClientModelMutation = {
  createClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteClientModelMutationVariables = {
  input?: DeleteClientModelInput,
  condition?: ModelClientModelConditionInput | null,
};

export type DeleteClientModelMutation = {
  deleteClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateClientActivityModelMutationVariables = {
  input?: CreateClientActivityModelInput,
  condition?: ModelClientActivityModelConditionInput | null,
};

export type CreateClientActivityModelMutation = {
  createClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateClientActivityModelMutationVariables = {
  input?: UpdateClientActivityModelInput,
  condition?: ModelClientActivityModelConditionInput | null,
};

export type UpdateClientActivityModelMutation = {
  updateClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteClientActivityModelMutationVariables = {
  input?: DeleteClientActivityModelInput,
  condition?: ModelClientActivityModelConditionInput | null,
};

export type DeleteClientActivityModelMutation = {
  deleteClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateMeetingModelMutationVariables = {
  input?: CreateMeetingModelInput,
  condition?: ModelMeetingModelConditionInput | null,
};

export type CreateMeetingModelMutation = {
  createMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateMeetingModelMutationVariables = {
  input?: UpdateMeetingModelInput,
  condition?: ModelMeetingModelConditionInput | null,
};

export type UpdateMeetingModelMutation = {
  updateMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteMeetingModelMutationVariables = {
  input?: DeleteMeetingModelInput,
  condition?: ModelMeetingModelConditionInput | null,
};

export type DeleteMeetingModelMutation = {
  deleteMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateGuestAgentMeetingModelMutationVariables = {
  input?: CreateGuestAgentMeetingModelInput,
  condition?: ModelGuestAgentMeetingModelConditionInput | null,
};

export type CreateGuestAgentMeetingModelMutation = {
  createGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGuestAgentMeetingModelMutationVariables = {
  input?: UpdateGuestAgentMeetingModelInput,
  condition?: ModelGuestAgentMeetingModelConditionInput | null,
};

export type UpdateGuestAgentMeetingModelMutation = {
  updateGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGuestAgentMeetingModelMutationVariables = {
  input?: DeleteGuestAgentMeetingModelInput,
  condition?: ModelGuestAgentMeetingModelConditionInput | null,
};

export type DeleteGuestAgentMeetingModelMutation = {
  deleteGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOnlineDocumentModelMutationVariables = {
  input?: CreateOnlineDocumentModelInput,
  condition?: ModelOnlineDocumentModelConditionInput | null,
};

export type CreateOnlineDocumentModelMutation = {
  createOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteOnlineDocumentModelMutationVariables = {
  input?: DeleteOnlineDocumentModelInput,
  condition?: ModelOnlineDocumentModelConditionInput | null,
};

export type DeleteOnlineDocumentModelMutation = {
  deleteOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteDocumentPatchMutationVariables = {
  input?: DeleteDocumentPatchInput,
  condition?: ModelDocumentPatchConditionInput | null,
};

export type DeleteDocumentPatchMutation = {
  deleteDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOnlineDocumentArchiveModelMutationVariables = {
  input?: CreateOnlineDocumentArchiveModelInput,
  condition?: ModelOnlineDocumentArchiveModelConditionInput | null,
};

export type CreateOnlineDocumentArchiveModelMutation = {
  createOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateOnlineDocumentArchiveModelMutationVariables = {
  input?: UpdateOnlineDocumentArchiveModelInput,
  condition?: ModelOnlineDocumentArchiveModelConditionInput | null,
};

export type UpdateOnlineDocumentArchiveModelMutation = {
  updateOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteOnlineDocumentArchiveModelMutationVariables = {
  input?: DeleteOnlineDocumentArchiveModelInput,
  condition?: ModelOnlineDocumentArchiveModelConditionInput | null,
};

export type DeleteOnlineDocumentArchiveModelMutation = {
  deleteOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateSignatureTokenModelMutationVariables = {
  input?: CreateSignatureTokenModelInput,
  condition?: ModelSignatureTokenModelConditionInput | null,
};

export type CreateSignatureTokenModelMutation = {
  createSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClientModelMutationVariables = {
  input?: UpdateClientModelInput,
  condition?: ModelClientModelConditionInput | null,
};

export type UpdateClientModelMutation = {
  updateClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateOnlineDocumentModelMutationVariables = {
  input?: UpdateOnlineDocumentModelInput,
  condition?: ModelOnlineDocumentModelConditionInput | null,
};

export type UpdateOnlineDocumentModelMutation = {
  updateOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateDocumentPatchMutationVariables = {
  input?: CreateDocumentPatchInput,
  condition?: ModelDocumentPatchConditionInput | null,
};

export type CreateDocumentPatchMutation = {
  createDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDocumentPatchMutationVariables = {
  input?: UpdateDocumentPatchInput,
  condition?: ModelDocumentPatchConditionInput | null,
};

export type UpdateDocumentPatchMutation = {
  updateDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSignatureTokenModelMutationVariables = {
  input?: UpdateSignatureTokenModelInput,
  condition?: ModelSignatureTokenModelConditionInput | null,
};

export type UpdateSignatureTokenModelMutation = {
  updateSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSignatureTokenModelMutationVariables = {
  input?: DeleteSignatureTokenModelInput,
  condition?: ModelSignatureTokenModelConditionInput | null,
};

export type DeleteSignatureTokenModelMutation = {
  deleteSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetClientActivityModelQueryVariables = {
  id?: string,
};

export type GetClientActivityModelQuery = {
  getClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListClientActivityModelsQueryVariables = {
  filter?: ModelClientActivityModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClientActivityModelsQuery = {
  listClientActivityModels?:  {
    __typename: "ModelClientActivityModelConnection",
    items?:  Array< {
      __typename: "ClientActivityModel",
      id: string,
      clientId: string,
      dueDate?: string | null,
      description: string,
      done?: string | null,
      priority?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      owner: string,
      updatedBy: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetActivitiesByOwnerSortedByCreatedAtQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientActivityModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetActivitiesByOwnerSortedByCreatedAtQuery = {
  getActivitiesByOwnerSortedByCreatedAt?:  {
    __typename: "ModelClientActivityModelConnection",
    items?:  Array< {
      __typename: "ClientActivityModel",
      id: string,
      clientId: string,
      dueDate?: string | null,
      description: string,
      done?: string | null,
      priority?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      owner: string,
      updatedBy: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetActivitiesByClientIdSortedByCreatedAtQueryVariables = {
  clientId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientActivityModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetActivitiesByClientIdSortedByCreatedAtQuery = {
  getActivitiesByClientIdSortedByCreatedAt?:  {
    __typename: "ModelClientActivityModelConnection",
    items?:  Array< {
      __typename: "ClientActivityModel",
      id: string,
      clientId: string,
      dueDate?: string | null,
      description: string,
      done?: string | null,
      priority?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      owner: string,
      updatedBy: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAgentModelQueryVariables = {
  id?: string,
};

export type GetAgentModelQuery = {
  getAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListAgentModelsQueryVariables = {
  filter?: ModelAgentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAgentModelsQuery = {
  listAgentModels?:  {
    __typename: "ModelAgentModelConnection",
    items?:  Array< {
      __typename: "AgentModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation: string,
      email: string,
      phone?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      role: ROLES,
      subsidiary?: string | null,
      active?: boolean | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAgentBySubQueryVariables = {
  sub?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAgentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetAgentBySubQuery = {
  getAgentBySub?:  {
    __typename: "ModelAgentModelConnection",
    items?:  Array< {
      __typename: "AgentModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation: string,
      email: string,
      phone?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      role: ROLES,
      subsidiary?: string | null,
      active?: boolean | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAgentByEmailQueryVariables = {
  email?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAgentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetAgentByEmailQuery = {
  getAgentByEmail?:  {
    __typename: "ModelAgentModelConnection",
    items?:  Array< {
      __typename: "AgentModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation: string,
      email: string,
      phone?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      role: ROLES,
      subsidiary?: string | null,
      active?: boolean | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListClientModelsQueryVariables = {
  filter?: ModelClientModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClientModelsQuery = {
  listClientModels?:  {
    __typename: "ModelClientModelConnection",
    items?:  Array< {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClientModelQueryVariables = {
  id?: string,
};

export type GetClientModelQuery = {
  getClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetClientBySubQueryVariables = {
  sub?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetClientBySubQuery = {
  getClientBySub?:  {
    __typename: "ModelClientModelConnection",
    items?:  Array< {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClientsByOwnerQueryVariables = {
  owner?: string | null,
  lastName?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetClientsByOwnerQuery = {
  getClientsByOwner?:  {
    __typename: "ModelClientModelConnection",
    items?:  Array< {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClientByEmailQueryVariables = {
  email?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClientModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetClientByEmailQuery = {
  getClientByEmail?:  {
    __typename: "ModelClientModelConnection",
    items?:  Array< {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingModelQueryVariables = {
  id?: string,
};

export type GetMeetingModelQuery = {
  getMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListMeetingModelsQueryVariables = {
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingModelsQuery = {
  listMeetingModels?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      owner: string,
      meetingDateTime: string,
      moderatorId: string,
      moderatorName?: string | null,
      clientId: string,
      editors?: Array< string | null > | null,
      activeDocumentId?: string | null,
      scrollPos?: number | null,
      scrollPosPercent?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingsByOwnerQueryVariables = {
  owner?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMeetingsByOwnerQuery = {
  getMeetingsByOwner?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      owner: string,
      meetingDateTime: string,
      moderatorId: string,
      moderatorName?: string | null,
      clientId: string,
      editors?: Array< string | null > | null,
      activeDocumentId?: string | null,
      scrollPos?: number | null,
      scrollPosPercent?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingsByClientIdQueryVariables = {
  clientId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMeetingsByClientIdQuery = {
  getMeetingsByClientId?:  {
    __typename: "ModelMeetingModelConnection",
    items?:  Array< {
      __typename: "MeetingModel",
      id: string,
      owner: string,
      meetingDateTime: string,
      moderatorId: string,
      moderatorName?: string | null,
      clientId: string,
      editors?: Array< string | null > | null,
      activeDocumentId?: string | null,
      scrollPos?: number | null,
      scrollPosPercent?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGuestAgentMeetingModelQueryVariables = {
  id?: string,
};

export type GetGuestAgentMeetingModelQuery = {
  getGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGuestAgentMeetingModelsQueryVariables = {
  filter?: ModelGuestAgentMeetingModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGuestAgentMeetingModelsQuery = {
  listGuestAgentMeetingModels?:  {
    __typename: "ModelGuestAgentMeetingModelConnection",
    items?:  Array< {
      __typename: "GuestAgentMeetingModel",
      id: string,
      meetingId: string,
      agentId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentModelQueryVariables = {
  id?: string,
};

export type GetOnlineDocumentModelQuery = {
  getOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListOnlineDocumentModelsQueryVariables = {
  filter?: ModelOnlineDocumentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOnlineDocumentModelsQuery = {
  listOnlineDocumentModels?:  {
    __typename: "ModelOnlineDocumentModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentModel",
      id: string,
      title: string,
      type: OnlineDocumentType,
      status: OnlineDocumentStatus,
      values: string,
      clientId: string,
      contractor?: ContractorType | null,
      owner: string,
      editors?: Array< string | null > | null,
      isVisibleToClient?: boolean | null,
      version?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentsByClientIdQueryVariables = {
  clientId?: string | null,
  version?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOnlineDocumentModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOnlineDocumentsByClientIdQuery = {
  getOnlineDocumentsByClientId?:  {
    __typename: "ModelOnlineDocumentModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentModel",
      id: string,
      title: string,
      type: OnlineDocumentType,
      status: OnlineDocumentStatus,
      values: string,
      clientId: string,
      contractor?: ContractorType | null,
      owner: string,
      editors?: Array< string | null > | null,
      isVisibleToClient?: boolean | null,
      version?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetDocumentPatchQueryVariables = {
  id?: string,
};

export type GetDocumentPatchQuery = {
  getDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDocumentPatchsQueryVariables = {
  filter?: ModelDocumentPatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentPatchsQuery = {
  listDocumentPatchs?:  {
    __typename: "ModelDocumentPatchConnection",
    items?:  Array< {
      __typename: "DocumentPatch",
      id: string,
      patch: string,
      documentId: string,
      uniqueEditorInstance?: string | null,
      author: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type PatchesByDocumentIdQueryVariables = {
  documentId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDocumentPatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PatchesByDocumentIdQuery = {
  patchesByDocumentId?:  {
    __typename: "ModelDocumentPatchConnection",
    items?:  Array< {
      __typename: "DocumentPatch",
      id: string,
      patch: string,
      documentId: string,
      uniqueEditorInstance?: string | null,
      author: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetLatestPatchByDocumentIdQueryVariables = {
  documentId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDocumentPatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetLatestPatchByDocumentIdQuery = {
  getLatestPatchByDocumentId?:  {
    __typename: "ModelDocumentPatchConnection",
    items?:  Array< {
      __typename: "DocumentPatch",
      id: string,
      patch: string,
      documentId: string,
      uniqueEditorInstance?: string | null,
      author: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentArchiveModelQueryVariables = {
  id?: string,
};

export type GetOnlineDocumentArchiveModelQuery = {
  getOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListOnlineDocumentArchiveModelsQueryVariables = {
  filter?: ModelOnlineDocumentArchiveModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOnlineDocumentArchiveModelsQuery = {
  listOnlineDocumentArchiveModels?:  {
    __typename: "ModelOnlineDocumentArchiveModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentArchiveModel",
      id: string,
      documentId: string,
      title: string,
      type: OnlineDocumentType,
      values: string,
      clientId: string,
      contractor?: ContractorType | null,
      owner: string,
      editors?: Array< string | null > | null,
      version?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetOnlineDocumentsArchiveByClientIdQueryVariables = {
  clientId?: string | null,
  version?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOnlineDocumentArchiveModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOnlineDocumentsArchiveByClientIdQuery = {
  getOnlineDocumentsArchiveByClientId?:  {
    __typename: "ModelOnlineDocumentArchiveModelConnection",
    items?:  Array< {
      __typename: "OnlineDocumentArchiveModel",
      id: string,
      documentId: string,
      title: string,
      type: OnlineDocumentType,
      values: string,
      clientId: string,
      contractor?: ContractorType | null,
      owner: string,
      editors?: Array< string | null > | null,
      version?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSignatureTokenModelQueryVariables = {
  id?: string,
};

export type GetSignatureTokenModelQuery = {
  getSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSignatureTokenModelsQueryVariables = {
  filter?: ModelSignatureTokenModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSignatureTokenModelsQuery = {
  listSignatureTokenModels?:  {
    __typename: "ModelSignatureTokenModelConnection",
    items?:  Array< {
      __typename: "SignatureTokenModel",
      id: string,
      pin?: string | null,
      documentId: string,
      fieldName?: string | null,
      authorId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSignatureTokenByDocumentIdQueryVariables = {
  documentId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSignatureTokenModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetSignatureTokenByDocumentIdQuery = {
  getSignatureTokenByDocumentId?:  {
    __typename: "ModelSignatureTokenModelConnection",
    items?:  Array< {
      __typename: "SignatureTokenModel",
      id: string,
      pin?: string | null,
      documentId: string,
      fieldName?: string | null,
      authorId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateClientModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnCreateClientModelByOwnerSubscription = {
  onCreateClientModelByOwner?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateClientModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateClientModelByOwnerSubscription = {
  onUpdateClientModelByOwner?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteClientModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteClientModelByOwnerSubscription = {
  onDeleteClientModelByOwner?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMeetingModelByEditorsSubscriptionVariables = {
  editors?: Array< string | null >,
};

export type OnUpdateMeetingModelByEditorsSubscription = {
  onUpdateMeetingModelByEditors?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateMeetingModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnCreateMeetingModelByOwnerSubscription = {
  onCreateMeetingModelByOwner?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMeetingModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateMeetingModelByOwnerSubscription = {
  onUpdateMeetingModelByOwner?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteMeetingModelByOwnerSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteMeetingModelByOwnerSubscription = {
  onDeleteMeetingModelByOwner?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateOnlineDocumentModelByEditorsSubscriptionVariables = {
  editors?: Array< string | null >,
};

export type OnCreateOnlineDocumentModelByEditorsSubscription = {
  onCreateOnlineDocumentModelByEditors?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateOnlineDocumentModelByEditorsSubscriptionVariables = {
  editors?: Array< string | null >,
};

export type OnUpdateOnlineDocumentModelByEditorsSubscription = {
  onUpdateOnlineDocumentModelByEditors?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateDocumentPatchByDocumentIdSubscriptionVariables = {
  documentId?: string,
};

export type OnCreateDocumentPatchByDocumentIdSubscription = {
  onCreateDocumentPatchByDocumentId?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClientActivityModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnCreateClientActivityModelSubscription = {
  onCreateClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateClientActivityModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnUpdateClientActivityModelSubscription = {
  onUpdateClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteClientActivityModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnDeleteClientActivityModelSubscription = {
  onDeleteClientActivityModel?:  {
    __typename: "ClientActivityModel",
    id: string,
    clientId: string,
    dueDate?: string | null,
    description: string,
    done?: string | null,
    priority?: string | null,
    editors?: Array< string | null > | null,
    createdAt: string,
    owner: string,
    updatedBy: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateAgentModelSubscriptionVariables = {
  sub?: string | null,
  owner?: string | null,
};

export type OnCreateAgentModelSubscription = {
  onCreateAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateAgentModelSubscriptionVariables = {
  sub?: string | null,
  owner?: string | null,
};

export type OnUpdateAgentModelSubscription = {
  onUpdateAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteAgentModelSubscriptionVariables = {
  sub?: string | null,
  owner?: string | null,
};

export type OnDeleteAgentModelSubscription = {
  onDeleteAgentModel?:  {
    __typename: "AgentModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation: string,
    email: string,
    phone?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    role: ROLES,
    subsidiary?: string | null,
    active?: boolean | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    meetingsAsModerator?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateClientModelSubscriptionVariables = {
  owner?: string | null,
  sub?: string | null,
  editors?: string | null,
};

export type OnCreateClientModelSubscription = {
  onCreateClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateClientModelSubscriptionVariables = {
  owner?: string | null,
  sub?: string | null,
  editors?: string | null,
};

export type OnUpdateClientModelSubscription = {
  onUpdateClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteClientModelSubscriptionVariables = {
  owner?: string | null,
  sub?: string | null,
  editors?: string | null,
};

export type OnDeleteClientModelSubscription = {
  onDeleteClientModel?:  {
    __typename: "ClientModel",
    id: string,
    sub?: string | null,
    firstName: string,
    lastName: string,
    salutation?: string | null,
    email: string,
    telephone?: string | null,
    fax?: string | null,
    mobile?: string | null,
    maritalStatus?: string | null,
    country?: string | null,
    streetHouseNumber?: string | null,
    postCode?: string | null,
    place?: string | null,
    addressValidDate?: string | null,
    birthPlace?: string | null,
    birthday?: string | null,
    title?: string | null,
    nationality?: string | null,
    taxId?: string | null,
    emailVerified?: boolean | null,
    active?: boolean | null,
    contractor?:  {
      __typename: "Contractor",
      firstName?: string | null,
      lastName?: string | null,
      salutation?: string | null,
      email?: string | null,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
    } | null,
    subsidiary?: string | null,
    cognitoStatus?: CognitoUserStatusType | null,
    status?: AccountStatus | null,
    owner?: string | null,
    editors?: Array< string | null > | null,
    productInfoImmposparen?:  {
      __typename: "ProductInfoImmposparen",
      oneTimeInvestment?: boolean | null,
      proportionalInvestment?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    meetings?:  {
      __typename: "ModelMeetingModelConnection",
      nextToken?: string | null,
    } | null,
    onlineDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
    agentDocuments?:  {
      __typename: "ModelOnlineDocumentModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateMeetingModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnCreateMeetingModelSubscription = {
  onCreateMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMeetingModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnUpdateMeetingModelSubscription = {
  onUpdateMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteMeetingModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnDeleteMeetingModelSubscription = {
  onDeleteMeetingModel?:  {
    __typename: "MeetingModel",
    id: string,
    owner: string,
    meetingDateTime: string,
    moderatorId: string,
    moderatorName?: string | null,
    clientId: string,
    editors?: Array< string | null > | null,
    activeDocumentId?: string | null,
    scrollPos?: number | null,
    scrollPosPercent?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    guestAgents?:  {
      __typename: "ModelGuestAgentMeetingModelConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateGuestAgentMeetingModelSubscription = {
  onCreateGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGuestAgentMeetingModelSubscription = {
  onUpdateGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGuestAgentMeetingModelSubscription = {
  onDeleteGuestAgentMeetingModel?:  {
    __typename: "GuestAgentMeetingModel",
    id: string,
    meetingId: string,
    agentId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOnlineDocumentModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnCreateOnlineDocumentModelSubscription = {
  onCreateOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateOnlineDocumentModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnUpdateOnlineDocumentModelSubscription = {
  onUpdateOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteOnlineDocumentModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnDeleteOnlineDocumentModelSubscription = {
  onDeleteOnlineDocumentModel?:  {
    __typename: "OnlineDocumentModel",
    id: string,
    title: string,
    type: OnlineDocumentType,
    status: OnlineDocumentStatus,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    isVisibleToClient?: boolean | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    patches?:  {
      __typename: "ModelDocumentPatchConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateDocumentPatchSubscription = {
  onCreateDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDocumentPatchSubscription = {
  onUpdateDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDocumentPatchSubscription = {
  onDeleteDocumentPatch?:  {
    __typename: "DocumentPatch",
    id: string,
    patch: string,
    documentId: string,
    uniqueEditorInstance?: string | null,
    author: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOnlineDocumentArchiveModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnCreateOnlineDocumentArchiveModelSubscription = {
  onCreateOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateOnlineDocumentArchiveModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnUpdateOnlineDocumentArchiveModelSubscription = {
  onUpdateOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteOnlineDocumentArchiveModelSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnDeleteOnlineDocumentArchiveModelSubscription = {
  onDeleteOnlineDocumentArchiveModel?:  {
    __typename: "OnlineDocumentArchiveModel",
    id: string,
    documentId: string,
    title: string,
    type: OnlineDocumentType,
    values: string,
    clientId: string,
    contractor?: ContractorType | null,
    owner: string,
    editors?: Array< string | null > | null,
    version?: number | null,
    createdAt: string,
    updatedAt: string,
    client:  {
      __typename: "ClientModel",
      id: string,
      sub?: string | null,
      firstName: string,
      lastName: string,
      salutation?: string | null,
      email: string,
      telephone?: string | null,
      fax?: string | null,
      mobile?: string | null,
      maritalStatus?: string | null,
      country?: string | null,
      streetHouseNumber?: string | null,
      postCode?: string | null,
      place?: string | null,
      addressValidDate?: string | null,
      birthPlace?: string | null,
      birthday?: string | null,
      title?: string | null,
      nationality?: string | null,
      taxId?: string | null,
      emailVerified?: boolean | null,
      active?: boolean | null,
      subsidiary?: string | null,
      cognitoStatus?: CognitoUserStatusType | null,
      status?: AccountStatus | null,
      owner?: string | null,
      editors?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateSignatureTokenModelSubscription = {
  onCreateSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSignatureTokenModelSubscription = {
  onUpdateSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSignatureTokenModelSubscription = {
  onDeleteSignatureTokenModel?:  {
    __typename: "SignatureTokenModel",
    id: string,
    pin?: string | null,
    documentId: string,
    fieldName?: string | null,
    authorId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
