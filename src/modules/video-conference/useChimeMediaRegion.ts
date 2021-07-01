import { useEffect } from 'react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useAuthStore } from '../auth/authStore';

const useChimeMediaRegion = (defaultMediaRegion = 'eu-central-1'): string | undefined => {
  const { mediaRegion, setMediaRegion } = useAuthStore();

  useEffect(() => {
    const getMediaRegion = async () => {
      try {
        const nearestMediaRegionResponse = await fetch(`https://nearest-media-region.l.chime.aws`, {
          method: 'GET',
        });
        const nearestMediaRegionJSON = await nearestMediaRegionResponse.json();
        setMediaRegion(nearestMediaRegionJSON.region);
      } catch (error) {
        setMediaRegion(defaultMediaRegion);
      }
    };

    getMediaRegion().catch((e) => {
      log(LogLevel.error, e, { label: 'UseChimeMediaRegion', ...e });
    });
  }, [defaultMediaRegion, setMediaRegion]);

  return mediaRegion;
};

export default useChimeMediaRegion;
