import { FC, memo } from 'react';
import { DocumentWrapper } from '../common/DocumentWrapper';
import { Page01 } from './pages/Page01';

// Document Title: Ratierlich - Erklärung zum Geldwäschegesetz
export const RatierlichGeldwaeschegesetz: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
    </DocumentWrapper>
  );
});
