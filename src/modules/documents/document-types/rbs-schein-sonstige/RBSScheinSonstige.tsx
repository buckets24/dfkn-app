import { FC, memo } from 'react';
import { Page01 } from './pages/Page01';
import { DocumentWrapper } from '../common/DocumentWrapper';

// Document Title: RBS Schein Sonstige
export const RBSScheinSonstige: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
    </DocumentWrapper>
  );
});
