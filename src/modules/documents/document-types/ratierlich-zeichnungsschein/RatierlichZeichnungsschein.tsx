import { FC, memo } from 'react';
import { DocumentWrapper } from '../common/DocumentWrapper';
import { Page01 } from './pages/Page01';
import { Page02 } from './pages/Page02';
import { Page03 } from './pages/Page03';

// Document Title: Ratierlich - Zeichnungs- und Begebungsschein
export const RatierlichZeichnungsschein: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
      <Page02 />
      <Page03 />
    </DocumentWrapper>
  );
});
