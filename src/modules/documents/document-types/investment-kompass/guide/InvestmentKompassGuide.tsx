import React, { FC } from 'react';
import DocumentGuide from '../../../document-guide/DocumentGuide';
import Seite1 from './Seite1';
import Seite2Teil1 from './Seite2Teil1';
import Seite3Teil2 from './Seite3Teil2';
import { InvestmentKompassGuideNames } from './InvestmentKompassGuideApi';
import Seite2Teil2 from './Seite2Teil2';
import Seite3Teil1 from './Seite3Teil1';
import Seite4Teil1 from './Seite4Teil1';
import Seite4Teil2 from './Seite4Teil2';
import Seite5Teil1 from './Seite5Teil1';
import Seite5Teil2 from './Seite5Teil2';
import Seite6Teil1 from './Seite6Teil1';
import Seite6Teil2 from './Seite6Teil2';
import Seite7Frage1 from './Seite7Frage1';
import Seite7Frage2 from './Seite7Frage2';
import Seite7Frage3 from './Seite7Frage3';
import Seite7Frage4 from './Seite7Frage4';
import Seite8Frage5 from './Seite8Frage5';
import Seite8Frage6Teil1 from './Seite8Frage6Teil1';
import Seite8Frage6Teil2 from './Seite8Frage6Teil2';
import ZumSchluss from './ZumSchluss';
import { getMe, isAgent, useAuthStore } from 'src/modules/auth/authStore';

const InvestmentKompassGuide: FC = () => {
  const me = useAuthStore(getMe);
  const isAgentUser = me && isAgent(me) ? true : false;

  return (
    <DocumentGuide isVisible={isAgentUser}>
      {/* Seite 1 */}
      <Seite1 name={InvestmentKompassGuideNames.SEITE_1} />

      {/* Seite 2 / Teil 1 */}
      <Seite2Teil1 name={InvestmentKompassGuideNames.SEITE_2_TEIL_1} />
      {/* Seite 2 / Teil 2 */}
      <Seite2Teil2 name={InvestmentKompassGuideNames.SEITE_2_TEIL_2} />

      {/* Seite 3 / Teil 1 */}
      <Seite3Teil1 name={InvestmentKompassGuideNames.SEITE_3_TEIL_1} />
      {/* Seite 3 / Teil 2 */}
      <Seite3Teil2 name={InvestmentKompassGuideNames.SEITE_3_TEIL_2} />

      {/* Seite 4 / Teil 1 */}
      <Seite4Teil1 name={InvestmentKompassGuideNames.SEITE_4_TEIL_1} />
      {/* Seite 4 / Teil 2 */}
      <Seite4Teil2 name={InvestmentKompassGuideNames.SEITE_4_TEIL_2} />

      {/* Seite 5 / Teil 1 */}
      <Seite5Teil1 name={InvestmentKompassGuideNames.SEITE_5_TEIL_1} />
      {/* Seite 5 / Teil 2 */}
      <Seite5Teil2 name={InvestmentKompassGuideNames.SEITE_5_TEIL_2} />

      {/* Seite 6 / Teil 1 */}
      <Seite6Teil1 name={InvestmentKompassGuideNames.SEITE_6_TEIL_1} />
      {/* Seite 6 / Teil 2 */}
      <Seite6Teil2 name={InvestmentKompassGuideNames.SEITE_6_TEIL_2} />

      {/* Seite 7 / Frage 1 */}
      <Seite7Frage1 name={InvestmentKompassGuideNames.SEITE_7_FRAGE_1} />
      {/* Seite 7 / Frage 2 */}
      <Seite7Frage2 name={InvestmentKompassGuideNames.SEITE_7_FRAGE_2} />
      {/* Seite 7 / Frage 3 */}
      <Seite7Frage3 name={InvestmentKompassGuideNames.SEITE_7_FRAGE_3} />
      {/* Seite 7 / Frage 4 */}
      <Seite7Frage4 name={InvestmentKompassGuideNames.SEITE_7_FRAGE_4} />

      {/* Seite 8 / Frage 5 */}
      <Seite8Frage5 name={InvestmentKompassGuideNames.SEITE_8_FRAGE_5} />
      {/* Seite 8 / Frage 6 / Teil 1*/}
      <Seite8Frage6Teil1 name={InvestmentKompassGuideNames.SEITE_8_FRAGE_6_TEIL_1} />
      {/* Seite 8 / Frage 6 / Teil 2*/}
      <Seite8Frage6Teil2 name={InvestmentKompassGuideNames.SEITE_8_FRAGE_6_TEIL_2} />

      {/* ZUM_SCHLUSS */}
      <ZumSchluss name={InvestmentKompassGuideNames.ZUM_SCHLUSS} />
    </DocumentGuide>
  );
};

export default InvestmentKompassGuide;
