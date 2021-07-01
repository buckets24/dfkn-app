import { FC, memo } from 'react';
import { Page01 } from './pages/Page01';
import { Page02 } from './pages/Page02';
import { Page03 } from './pages/Page03';
import { DocumentWrapper } from '../common/DocumentWrapper';

// Document Title: Einmalanlage - Zeichnungs- und Begebungsschein
export const EinmalanlageZeichnungsschein: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
      <Page02 />
      <Page03 />
    </DocumentWrapper>
  );
});
