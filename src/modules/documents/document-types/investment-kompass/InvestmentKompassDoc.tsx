import React, { FC, memo } from 'react';
import { DocumentWrapper } from '../common/DocumentWrapper';
import { Page01 } from './pages/Page01';
import { Page02 } from './pages/Page02';
import { Page03 } from './pages/Page03';
import { Page04 } from './pages/Page04';
import { Page05 } from './pages/Page05';
import { Page06 } from './pages/Page06';
import { Page07 } from './pages/Page07';
import { Page08 } from './pages/Page08';
import { Page09 } from './pages/Page09';
import { Page10 } from './pages/Page10';
import { Page11 } from './pages/Page11';

// Document Title: Investment Kompass
export const InvestmentKompassDoc: FC = memo(() => {
  return (
    <DocumentWrapper>
      <Page01 />
      <Page02 />
      <Page03 />
      <Page04 />
      <Page05 />
      <Page06 />
      <Page07 />
      <Page08 />
      <Page09 />
      <Page10 />
      <Page11 />
    </DocumentWrapper>
  );
});
