import { Box, Button, ButtonProps, Divider, Flex, Heading, Input, Tooltip, useClipboard } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { MultiSelectFormikField } from 'jexity-app/form/fields/MultiSelectField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import { GetMeetingModelQuery } from 'src/API';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import { formatSalutation } from 'src/modules/common/utils';
import useChimeMediaRegion from 'src/modules/video-conference/useChimeMediaRegion';

export interface MeetingEditFormProps {
  meeting?: GetMeetingModelQuery['getMeetingModel'];
  agents: AgentPublicModel[];
}

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const MeetingEditForm: FC<MeetingEditFormProps> = ({ meeting, agents }) => {
  const router = useRouter();
  const mediaRegion = useChimeMediaRegion();
  const { hasCopied, onCopy, value } = useClipboard(
    `${baseURL}/video-conference/${router.query.id}?mediaRegion=${mediaRegion}`
  );

  const agentOptions = agents.map((agent) => {
    return {
      value: agent.id,
      label: `${agent.firstName} ${agent.lastName}`,
    };
  });

  const handleStartMeeting = useCallback<NonNullable<ButtonProps['onClick']>>(() => {
    if (mediaRegion) {
      void router.push(`/video-conference/${router.query.id}?mediaRegion=${mediaRegion}`);
    }
  }, [router, mediaRegion]);

  return (
    <Card maxW="450px">
      <Heading as="h3" size="md" p={6} fontFamily="body">
        Meeting Details
      </Heading>
      <Divider borderColor="gray.200" />
      <Box>
        <SpecialFormikContextProvider
          initialValues={{
            ...meeting,
          }}
          // validationSchema={formValidationSchema(meetingEditForm)}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} noValidate>
              <FormGridLayout
                p={6}
                pb={0}
                columns={[1]}
                fields={[
                  <StringFormikField
                    key="clientId"
                    name="clientId"
                    label="Kundenname"
                    isRequired
                    disabled
                    value={formatSalutation(meeting?.client)}
                  />,
                  <DateFormikField
                    key="meetingDateTime"
                    name="meetingDateTime"
                    label="Wählen Sie das Datum und die Uhrzeit aus"
                    withTime
                    isRequired
                    disabled
                    value={meeting?.meetingDateTime ? new Date(meeting.meetingDateTime) : ''}
                    disablePastDates
                    disablePastTime
                    errorMessageSpacer
                  />,
                  // <MultiSelectFormikField
                  //   options={agentOptions}
                  //   key="users"
                  //   name="users"
                  //   label="Berater zum Meeting einladen"
                  //   placeholder="Namen des Beraters eingeben"
                  //   isRequired
                  // />,
                ]}
              />
              <Box px={6} pb={6}>
                {meeting?.id && (
                  <Flex mb={2}>
                    <Input value={value} isReadOnly placeholder="Welcome" />
                    <Tooltip
                      hasArrow
                      isOpen={hasCopied}
                      closeDelay={750}
                      placement="right"
                      label="In die Zwischenablage kopiert"
                      fontSize="md"
                    >
                      <Button maxW="none" onClick={onCopy} ml={2}>
                        Kopieren
                      </Button>
                    </Tooltip>
                  </Flex>
                )}
                <Button
                  w="100%"
                  type="button"
                  onClick={handleStartMeeting}
                  bg="brand.primary.500"
                  color="white"
                  _hover={{
                    bg: 'brand.primary.900',
                  }}
                >
                  Meeting starten
                </Button>
              </Box>
            </form>
          )}
        </SpecialFormikContextProvider>
      </Box>
    </Card>
  );
};
