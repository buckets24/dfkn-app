import { Flex, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MeetingStatus as Status } from 'src/modules/meetings/api/MeetingModel';

export interface MeetingStatusProps {
  status: Status;
}

export const MeetingStatus: FC<MeetingStatusProps> = ({ status }) => {
  let text;
  let color;

  if (status === 'APPROVED') {
    text = 'Bestätigt';
    color = 'support.success.500';
  } else if (status === 'PENDING') {
    text = 'steht aus';
    color = 'support.warning.500';
  } else {
    text = 'Abgesagt';
    color = 'support.alert.500';
  }

  return (
    <Flex alignItems="center">
      <Text pos="relative" top="-2px" mr={2} fontSize="2xl" lineHeight="1" verticalAlign="middle" color={color}>
        &bull;
      </Text>{' '}
      <Text>{text}</Text>
    </Flex>
  );
};
