// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * This is a copy of useSelectAudioInputDevice from the
 * amazon-chime react UI library. For some reason it was
 * not exported but exists
 */

import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { useCallback } from 'react';

export const useSelectAudioInputDevice = (): ((deviceId: string) => Promise<void>) => {
  const meetingManager = useMeetingManager();

  const selectDevice = useCallback(async (deviceId: string) => {
    await meetingManager.selectAudioInputDevice(deviceId);
  }, []);

  return selectDevice;
};

export default useSelectAudioInputDevice;
