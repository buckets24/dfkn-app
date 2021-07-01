import { FC, memo } from 'react';
import { Page01 } from './pages/Page01';
import { DocumentWrapper } from '../common/DocumentWrapper';

// Document Title: Einmalanlage - Erklärung zum Geldwäschegesetz
export const EinmalanlageGeldwaeschegesetz: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
    </DocumentWrapper>
  );
});
