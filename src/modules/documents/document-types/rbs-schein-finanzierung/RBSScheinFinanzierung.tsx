import { FC, memo } from 'react';
import { Page01 } from './pages/Page01';
import { DocumentWrapper } from '../common/DocumentWrapper';

// Document Title: RBS Schein Finanzierung
export const RBSScheinFinanzierung: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
    </DocumentWrapper>
  );
});
