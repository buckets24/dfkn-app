import { FC, memo } from 'react';
import { Page01 } from './pages/Page01';
import { DocumentWrapper } from '../common/DocumentWrapper';

// Document Title: RBS Schein DFK Safe
export const RBSScheinDFKSafe: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
    </DocumentWrapper>
  );
});
