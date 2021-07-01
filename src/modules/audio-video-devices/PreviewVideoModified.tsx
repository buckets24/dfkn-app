// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * It is a dependency of Chime react sdk, but needed to be installed if we are to modify it.
 */
import { useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { VideoTile, useVideoInputs, useAudioVideo } from 'amazon-chime-sdk-component-library-react';
import { BaseSdkProps } from 'amazon-chime-sdk-component-library-react/lib/components/sdk/Base';
import { DefaultVideoTile } from 'amazon-chime-sdk-js';
import React, { useRef, useEffect } from 'react';
import { log, LogLevel } from 'jexity-app/utils/logger';

const StyledPreview = styled(VideoTile)`
  height: auto;
  background: unset;

  video {
    position: static;
  }
`;

export const PreviewVideoModified: React.FC<BaseSdkProps> = (props) => {
  const audioVideo = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);
  const { selectedDevice } = useVideoInputs();
  const toast = useToast();

  useEffect(() => {
    if (!audioVideo || !selectedDevice || !videoEl.current) {
      return;
    }

    let mounted = true;
    const currentElement = videoEl.current;

    async function startPreview() {
      if (!audioVideo) {
        return;
      }

      await audioVideo.chooseVideoInputDevice(selectedDevice);

      if (videoEl.current && mounted) {
        audioVideo.startVideoPreviewForVideoInput(currentElement);
      }
    }

    startPreview().catch((e) => {
      const errorCode = log(LogLevel.error, e, { label: 'PreviewVideoModified', ...e });
      toast({
        title: 'Fehler',
        description: `Fehler beim Starten der Vorschau. (Fehlercode: ${errorCode})`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      });
    });

    return () => {
      mounted = false;
      if (currentElement instanceof HTMLVideoElement) {
        /**
         * TODO: Review.
         * So to my understanding stopVideoPreviewForVideoInput releases the MediaStream from the
         * camera AND disconnect the video stream from the element. I think this is why the video
         * on LocalVideo is lost because the media stream it was using is also destroyed.
         *
         * One todo here but needs testing is how to destroy a MediaStream from the previous
         * selected device if the device was changed. I can't test this since I need more
         * than one camera
         */
        DefaultVideoTile.disconnectVideoStreamFromVideoElement(currentElement, false);
        // audioVideo.stopVideoPreviewForVideoInput(videoEl.current);
      }
    };
  }, [audioVideo, selectedDevice]);

  return <StyledPreview {...props} ref={videoEl} />;
};

export default PreviewVideoModified;
