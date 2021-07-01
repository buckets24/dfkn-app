import { ListItem, UnorderedList } from '@chakra-ui/react';
import React, { FC } from 'react';
import { GuideEmphasis, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const ZumSchluss: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>Und ganz zum Schluss nicht vergessen (Wichtig)!</GuideText>
      <GuideEmphasis>
        <UnorderedList>
          <ListItem>Bedanke dich für sein Vertrauen und seine Offenheit!</ListItem>
          <ListItem>Erkläre dem Kunden, wie es weiter geht!</ListItem>
          <ListItem>Mach gleich einen Folgetermin aus!</ListItem>
        </UnorderedList>
      </GuideEmphasis>
    </GuideWrapper>
  );
};

export default ZumSchluss;
