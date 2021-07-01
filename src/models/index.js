// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OnlineDocumentType = {
  INVESTMENT_KOMPASS: 'INVESTMENT_KOMPASS',
  EINMALANLAGE_ZEICHNUNGSSCHEIN: 'EINMALANLAGE_ZEICHNUNGSSCHEIN',
  EINMALANLAGE_GELDWAESCHEGESETZ: 'EINMALANLAGE_GELDWAESCHEGESETZ',
  RATIERLICH_ZEICHNUNGSSCHEIN: 'RATIERLICH_ZEICHNUNGSSCHEIN',
  RATIERLICH_GELDWAESCHEGESETZ: 'RATIERLICH_GELDWAESCHEGESETZ',
  ANGEBOT_IMMOSPAREN: 'ANGEBOT_IMMOSPAREN',
  RBS_SCHEIN: 'RBS_SCHEIN',
};

const OnlineDocumentStatus = {
  CLEAN: 'CLEAN',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
};

const ParticipantType = {
  AGENT: 'AGENT',
  CLIENT: 'CLIENT',
};

const {
  ClientModel,
  MeetingModel,
  GuestAgentMeetingModel,
  OnlineDocumentModel,
  DocumentPatch,
  AgentModel,
  SignatureTokenModel,
} = initSchema(schema);

export {
  ClientModel,
  MeetingModel,
  GuestAgentMeetingModel,
  OnlineDocumentModel,
  DocumentPatch,
  AgentModel,
  SignatureTokenModel,
  OnlineDocumentType,
  OnlineDocumentStatus,
  ParticipantType,
};
