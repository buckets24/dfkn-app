import { Box, ButtonProps, Grid, IconButton, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  useRosterState,
  useToggleLocalMute,
} from 'amazon-chime-sdk-component-library-react';
import { RosterAttendeeType } from 'amazon-chime-sdk-component-library-react/lib/types';
import { API } from 'aws-amplify';
import { DisableVideoIcon } from 'jexity-app/icons/DisableVideoIcon';
import { ExitFullscreenIcon } from 'jexity-app/icons/ExitFullscreenIcon';
import { FullscreenIcon } from 'jexity-app/icons/FullscreenIcon';
import { MicIcon } from 'jexity-app/icons/MicIcon';
import { MutedIcon } from 'jexity-app/icons/MuteIcon';
import { VideoIcon } from 'jexity-app/icons/VideoIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { ContractorType } from 'src/API';
import { ClientActivityFormModal } from 'src/modules/activity/modal/ClientActivityFormModal';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { extractClientInfo, requestClientById } from 'src/modules/client/clientService';
import { documentOptions, isAgentSpecificDocument } from 'src/modules/documents/api/documentOptions';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { hasGuide } from 'src/modules/documents/document-types/getDocSchemaAndComponent';
import { createDocument } from 'src/modules/documents/documentService';
import useCreateDocumentByClientIdMutation from 'src/modules/documents/query-hooks/useCreateDocumentByClientIdMutation';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import { putActiveDocumentId } from 'src/modules/meetings/meetingsService';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import { videoConferenceToastRequestMeetingErr } from 'src/modules/video-conference/videoConferenceMsg';
import { BookIcon } from 'src/theme/icons/BookIcon';
import { FileEditIcon } from 'src/theme/icons/FileEditIcon';
import { useFullscreenContext } from '../../../../jexity-app/context/Fullscreen';
import { ShareScreenIcon } from '../../../../jexity-app/icons/ShareScreenIcon';
import { isModerator } from '../../../modules/common/utils';
import { DocumentSelect } from './DocumentSelect';
import { EndCallModal } from './EndCallModal';
import { SettingsModal } from './SettingsModal';

export const baseStyle: ButtonProps = {
  role: 'group',
  mr: 3,
  w: ['40px', null, null, null, '60px'],
  h: ['40px', null, null, null, '60px'],
  borderRadius: '100%',
  _hover: {
    bg: 'brand.primary.500',
    color: 'white',
  },
};

export const VideoControls: FC = memo(() => {
  const { fullscreen, setFullscreen } = useFullscreenContext();
  const me = useAuthStore(getMe);
  const router = useRouter();
  const id = router.query.id;
  const toast = useToast();

  const { muted, toggleMute } = useToggleLocalMute();
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { sharingAttendeeId } = useContentShareState();
  const { roster } = useRosterState();
  const showGuide = useDocumentGuidePosition((s) => s.showGuide);
  const toggleShowGuide = useDocumentGuidePosition((s) => s.toggleShowGuide);
  const activityNotesDisclosure = useDisclosure();

  const { data } = useMeetingByIdQuery(typeof id === 'string' ? id : undefined, {
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e, { label: 'VideoConferenceControlsRequestMeeting', ...e });
      toast(videoConferenceToastRequestMeetingErr(errorCode));
    },
    enabled: false,
  });

  const activeMeeting = data;

  const documents = useDocumentsByClientIdQuery(activeMeeting?.clientId, { enabled: false });
  const createDocumentMutation = useCreateDocumentByClientIdMutation(activeMeeting?.clientId);

  const activeDocument = documents.data?.find((doc) => doc.id === activeMeeting?.activeDocumentId);

  const meIsModerator = me ? isModerator(me, activeMeeting) : false;
  let attendee: RosterAttendeeType | undefined;
  if (sharingAttendeeId) {
    /**
     * Undocumented issue
     */
    const attendeeId = sharingAttendeeId.replace('#content', '');

    attendee = roster[attendeeId];
  }

  const isSharing = attendee?.externalUserId === me?.sub;
  return (
    <Grid
      templateColumns={['repeat(3, 1fr)']}
      alignItems="center"
      px={[5, null, null, 10]}
      h={['60px', null, null, null, '90px']}
      bg="gray.100"
    >
      <Box w="0">
        {me && meIsModerator && (
          <DocumentSelect
            documents={documents.data}
            closeOnSelect
            placement="top-start"
            options={documentOptions.filter((doc) => !isAgentSpecificDocument(doc.type))}
            onSelectType={async (document, contractor = ContractorType.PRIMARY) => {
              try {
                if (activeMeeting) {
                  const existingDocument = documents.data?.find(
                    (doc) => doc.type === document.type && activeMeeting.clientId === doc.clientId
                  );

                  if (existingDocument) {
                    await putActiveDocumentId(activeMeeting.id, existingDocument.id, API);
                  } else {
                    /**
                     * Requesting the updated client by id
                     */
                    const client = await requestClientById(activeMeeting.clientId);

                    if (client && me.sub) {
                      const editors = [me.sub];

                      /**
                       * Only push the client.sub if the document that will be
                       * created is not included on the RBS Documents Array.
                       */
                      if (!isAgentSpecificDocument(document.type) && client.sub) {
                        editors.push(client.sub);
                      }

                      const createdDocument = await createDocumentMutation.mutateAsync(
                        [
                          client,
                          document.type,
                          document.title,
                          me.sub,
                          extractClientInfo(client, contractor),
                          contractor,
                          editors,
                        ],
                        {
                          // TODO error handling
                        }
                      );
                      if (createdDocument) {
                        log(LogLevel.info, 'CREATE_DOCUMENT', {
                          label: 'VideoControls',
                          message: `${document.type} document with an id of ${createdDocument.id} was successfully created`,
                        });
                        await putActiveDocumentId(activeMeeting.id, createdDocument.id, API);
                      } else {
                        /**
                         * TODO Show an error message
                         */
                      }
                    }
                  }
                }
              } catch (e) {
                log(
                  LogLevel.error,
                  e.message ?? 'requestClientBySub() or createDocument () or pushDocument() in VideoControls',
                  e
                );
              }
            }}
          />
        )}
      </Box>
      <Box m="0 auto">
        <IconButton
          {...baseStyle}
          bg={muted ? 'support.alert.600' : 'support.success.500'}
          aria-label="Mute/Unmute"
          icon={
            muted ? (
              <MutedIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                color="white"
                _groupHover={{ color: 'white' }}
              />
            ) : (
              <MicIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                color="white"
                _groupHover={{ color: 'white' }}
              />
            )
          }
          onClick={() => toggleMute()}
        />
        <IconButton
          {...baseStyle}
          bg={isVideoEnabled ? 'support.success.500' : 'support.alert.600'}
          aria-label="Video"
          icon={
            !isVideoEnabled ? (
              <DisableVideoIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                _groupHover={{ color: 'white' }}
              />
            ) : (
              <VideoIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                color="white"
                _groupHover={{ color: 'white' }}
              />
            )
          }
          onClick={async () => {
            await toggleVideo();
          }}
        />
        <EndCallModal />
        <SettingsModal />
      </Box>
      <Box ml="auto">
        <IconButton
          {...baseStyle}
          bg="gray.600"
          aria-label="Activity Notes"
          icon={
            <FileEditIcon width={['16px', null, null, null, '24px']} height="auto" _groupHover={{ color: 'white' }} />
          }
          onClick={activityNotesDisclosure.onOpen}
        />
        <ClientActivityFormModal
          isOpen={activityNotesDisclosure.isOpen}
          onCreateActivity={activityNotesDisclosure.onClose}
          onClose={activityNotesDisclosure.onClose}
          onCancel={activityNotesDisclosure.onClose}
        />

        {activeDocument && hasGuide.includes(activeDocument.type) && meIsModerator && (
          <IconButton
            {...baseStyle}
            aria-label="Fullscreen"
            icon={<BookIcon />}
            bg={showGuide ? 'brand.primary.500' : 'gray.600'}
            color={showGuide ? 'white' : undefined}
            onClick={toggleShowGuide}
          />
        )}

        <Tooltip
          label={!!sharingAttendeeId && !isSharing && `${attendee?.name} präsentiert`}
          placement="top"
          bg="brand.primary.500"
        >
          <Box as="span">
            <IconButton
              {...baseStyle}
              bg="gray.600"
              isActive={isSharing}
              onClick={toggleContentShare}
              aria-label="Share Screen"
              isDisabled={!!sharingAttendeeId && !isSharing}
              _hover={{
                bg: 'brand.primary.500',
              }}
              icon={
                <ShareScreenIcon
                  width={['16px', null, null, null, '24px']}
                  height="auto"
                  _groupHover={{ color: 'white' }}
                />
              }
              _active={{
                color: 'white',
                bg: 'brand.primary.500',
              }}
            />
          </Box>
        </Tooltip>
        <IconButton
          {...baseStyle}
          mr={0}
          bg="gray.600"
          aria-label="Fullscreen"
          // TODO: Change icon on toggle
          icon={
            !fullscreen ? (
              <FullscreenIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                _groupHover={{ color: 'white' }}
              />
            ) : (
              <ExitFullscreenIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                _groupHover={{ color: 'white' }}
              />
            )
          }
          onClick={() => {
            setFullscreen(!fullscreen);
          }}
        />
      </Box>
    </Grid>
  );
});
