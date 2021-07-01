import { ModelInit, MutableModel, PersistentModelConstructor } from '@aws-amplify/datastore';

export enum OnlineDocumentType {
  INVESTMENT_KOMPASS = 'INVESTMENT_KOMPASS',
  EINMALANLAGE_ZEICHNUNGSSCHEIN = 'EINMALANLAGE_ZEICHNUNGSSCHEIN',
  EINMALANLAGE_GELDWAESCHEGESETZ = 'EINMALANLAGE_GELDWAESCHEGESETZ',
  RATIERLICH_ZEICHNUNGSSCHEIN = 'RATIERLICH_ZEICHNUNGSSCHEIN',
  RATIERLICH_GELDWAESCHEGESETZ = 'RATIERLICH_GELDWAESCHEGESETZ',
  ANGEBOT_IMMOSPAREN = 'ANGEBOT_IMMOSPAREN',
  RBS_SCHEIN = 'RBS_SCHEIN',
}

export enum OnlineDocumentStatus {
  CLEAN = 'CLEAN',
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
}

export enum ParticipantType {
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
}

export declare class ClientModel {
  readonly id: string;
  readonly sub?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly salutation?: string;
  readonly email: string;
  readonly telephone?: string;
  readonly fax?: string;
  readonly mobile?: string;
  readonly maritalStatus?: string;
  readonly country?: string;
  readonly streetHouseNumber?: string;
  readonly postCode?: string;
  readonly place?: string;
  readonly addressValidDate?: string;
  readonly birthPlace?: string;
  readonly birthday?: string;
  readonly title?: string;
  readonly nationality?: string;
  readonly taxId?: string;
  readonly emailVerified?: boolean;
  readonly active?: boolean;
  readonly owner?: string;
  readonly editors?: (string | null)[];
  readonly meetings?: (MeetingModel | null)[];
  readonly onlineDocuments?: (OnlineDocumentModel | null)[];
  readonly agentDocuments?: (OnlineDocumentModel | null)[];
  constructor(init: ModelInit<ClientModel>);
  static copyOf(
    source: ClientModel,
    mutator: (draft: MutableModel<ClientModel>) => MutableModel<ClientModel> | void
  ): ClientModel;
}

export declare class MeetingModel {
  readonly id: string;
  readonly owner: string;
  readonly meetingDateTime: string;
  readonly moderatorId: string;
  readonly moderatorName?: string;
  readonly client: ClientModel;
  readonly guestAgents?: (GuestAgentMeetingModel | null)[];
  readonly editors?: (string | null)[];
  readonly activeDocumentId?: string;
  readonly scrollPos?: number;
  readonly scrollPosPercent?: number;
  constructor(init: ModelInit<MeetingModel>);
  static copyOf(
    source: MeetingModel,
    mutator: (draft: MutableModel<MeetingModel>) => MutableModel<MeetingModel> | void
  ): MeetingModel;
}

export declare class GuestAgentMeetingModel {
  readonly id: string;
  readonly meetingId: string;
  readonly agentId: string;
  constructor(init: ModelInit<GuestAgentMeetingModel>);
  static copyOf(
    source: GuestAgentMeetingModel,
    mutator: (draft: MutableModel<GuestAgentMeetingModel>) => MutableModel<GuestAgentMeetingModel> | void
  ): GuestAgentMeetingModel;
}

export declare class OnlineDocumentModel {
  readonly id: string;
  readonly title: string;
  readonly type: OnlineDocumentType | keyof typeof OnlineDocumentType;
  readonly status: OnlineDocumentStatus | keyof typeof OnlineDocumentStatus;
  readonly values: string;
  readonly client: ClientModel;
  readonly owner: string;
  readonly editors?: (string | null)[];
  readonly patches?: (DocumentPatch | null)[];
  readonly isAgentOnly?: boolean;
  constructor(init: ModelInit<OnlineDocumentModel>);
  static copyOf(
    source: OnlineDocumentModel,
    mutator: (draft: MutableModel<OnlineDocumentModel>) => MutableModel<OnlineDocumentModel> | void
  ): OnlineDocumentModel;
}

export declare class DocumentPatch {
  readonly id: string;
  readonly patch: string;
  readonly documentId: string;
  readonly uniqueEditorInstance?: string;
  readonly author: string;
  constructor(init: ModelInit<DocumentPatch>);
  static copyOf(
    source: DocumentPatch,
    mutator: (draft: MutableModel<DocumentPatch>) => MutableModel<DocumentPatch> | void
  ): DocumentPatch;
}

export declare class AgentModel {
  readonly id: string;
  readonly sub?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly salutation: string;
  readonly email: string;
  readonly phone?: string;
  readonly streetHouseNumber?: string;
  readonly postCode?: string;
  readonly place?: string;
  readonly role: string;
  readonly emailVerified?: boolean;
  readonly active?: boolean;
  readonly owner?: string;
  readonly meetingsAsModerator?: (MeetingModel | null)[];
  constructor(init: ModelInit<AgentModel>);
  static copyOf(
    source: AgentModel,
    mutator: (draft: MutableModel<AgentModel>) => MutableModel<AgentModel> | void
  ): AgentModel;
}

export declare class SignatureTokenModel {
  readonly id: string;
  readonly pin?: string;
  readonly documentId: string;
  readonly fieldName?: string;
  readonly authorId: string;
  constructor(init: ModelInit<SignatureTokenModel>);
  static copyOf(
    source: SignatureTokenModel,
    mutator: (draft: MutableModel<SignatureTokenModel>) => MutableModel<SignatureTokenModel> | void
  ): SignatureTokenModel;
}
