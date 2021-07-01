import { Box, Button, Flex, Progress, Spinner, Text, useToast } from '@chakra-ui/react';
import {
  MicSelection,
  useAudioInputs,
  SpeakerSelection,
  useAudioOutputs,
  useLocalAudioInputActivity,
} from 'amazon-chime-sdk-component-library-react';
import { SelectedDeviceId } from 'amazon-chime-sdk-component-library-react/lib/types';
import { MicIcon } from 'jexity-app/icons/MicIcon';
import { VolumeIcon } from 'jexity-app/icons/VolumeIcon';
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { log, LogLevel } from 'jexity-app/utils/logger';

export interface AudioSettingsProps {
  setAudioInput?: Dispatch<SetStateAction<SelectedDeviceId>>;
  setAudioOutput?: Dispatch<SetStateAction<SelectedDeviceId>>;
}

const AudioSettings: FC<AudioSettingsProps> = ({ setAudioInput, setAudioOutput }) => {
  const { selectedDevice: activeAudioInput } = useAudioInputs();
  const { selectedDevice: activeAudioOutput } = useAudioOutputs();
  const [micVolume, setMicVolume] = useState<number>(0);
  const [playingSample, setPlayingSample] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const toast = useToast();

  const MicrophoneActivity = () => {
    const audioInputActivity = (volume: number) => {
      setMicVolume(volume);
    };
    useLocalAudioInputActivity(audioInputActivity);

    return <Progress colorScheme="support.success" ml={4} value={micVolume} w="100%" rounded={12} min={0} max={1} />;
  };

  const startRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: activeAudioInput as string,
        },
      })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setIsRecording(true);

        const audioChunks: Blob[] = [];

        recorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        recorder.addEventListener('stop', async () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          if ((audio as any).setSinkId) {
            /**
             * The latest types from typescript do not include sinkId and
             * setSinkId since these are still experimental features, this
             * also is not supported on firefox.
             */
            await (audio as any).setSinkId(activeAudioOutput);
          }
          await audio.play();
        });

        setTimeout(() => {
          recorder.stop();
          setIsRecording(false);
        }, 3000);
      })
      .catch((e) => {
        const errorCode = log(LogLevel.error, e, { label: 'AudioSettings', ...e });

        toast({
          title: 'Fehler',
          description: `Fehleraufzeichnung. (Fehlercode: ${errorCode})`,
          status: 'error',
          duration: 15000,
          isClosable: true,
        });
      });
  }, [activeAudioInput, activeAudioOutput]);

  const playSample = useCallback(async () => {
    setPlayingSample(true);
    const sampleAudio = new Audio('/notification_sound.mp3');
    if ((sampleAudio as any).setSinkId) {
      /**
       * The latest types from typescript do not include sinkId and
       * setSinkId since these are still experimental features, this
       * also is not supported on firefox.
       */
      await (sampleAudio as any).setSinkId(activeAudioOutput);
    }
    sampleAudio.addEventListener('ended', () => setPlayingSample(false));
    await sampleAudio.play();
  }, [activeAudioOutput]);

  useEffect(() => {
    localStorage.setItem('inputDevice', activeAudioInput as string);

    if (setAudioInput) {
      setAudioInput(activeAudioInput);
    }
  }, [activeAudioInput, setAudioInput]);

  useEffect(() => {
    localStorage.setItem('outputDevice', activeAudioOutput as string);

    if (setAudioOutput) {
      setAudioOutput(activeAudioOutput);
    }
  }, [activeAudioOutput, setAudioOutput]);

  return (
    <>
      <MicSelection label="Mikrofon" notFoundMsg="Kein Mikrofon gefunden" />
      <Box>
        <Text mb={[5, null, 0]} fontSize="md">
          Vorschau
        </Text>
        <Flex h="100%" alignItems="center" pb="30px">
          <MicIcon />
          <MicrophoneActivity />
        </Flex>
      </Box>
      <SpeakerSelection label="Lautsprecher" notFoundMsg="Kein Lautsprecher gefunden" />
      <Flex mt={2} alignItems="center">
        <VolumeIcon mr={4} />
        <Button
          variant="outline"
          colorScheme="black"
          disabled={isRecording}
          onClick={startRecording}
          mr={4}
          fontSize={['xs', null, null, 'md']}
          _hover={{
            bg: 'brand.primary.500',
            color: 'white',
          }}
        >
          {isRecording && <Spinner size="sm" mr={2} color="brand.primary.500" />}
          {isRecording ? 'Aufzeichnung...' : 'Testaufnahme ihrer Stimme'}
        </Button>
        <Button
          variant="outline"
          colorScheme="black"
          disabled={playingSample}
          fontSize={['xs', null, null, 'md']}
          _hover={{
            bg: 'brand.primary.500',
            color: 'white',
          }}
          onClick={playSample}
        >
          Testton abspielen
        </Button>
      </Flex>
    </>
  );
};

export default AudioSettings;
