/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { PageWrapper } from '../../common/PageWrapper';
import { DottedFlushedCurrencyPrintField } from '../components/DottedFlushedCurrencyPrintField';
import { OwnProperty } from '../components/OwnProperty';
import { QuotedText } from '../components/QuotedText';
import { RentTable } from '../components/RentTable';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';

export const Page08: FC = () => {
  const { printMode } = useDocFormMeta();

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={8} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <Box>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_8_FRAGE_5} />
        <Grid mb={printMode ? 0 : 10} templateColumns="max-content 1fr">
          <Text mr={2} color="documents.secondary.700" fontSize="lg" fontFamily="mono" fontWeight={500}>
            5.
          </Text>
          <Box>
            <Text
              mb={printMode ? 5 : 10}
              color="documents.secondary.700"
              fontSize="lg"
              fontFamily="mono"
              fontWeight={500}
            >
              Existenzsicherung
            </Text>
            <Grid templateColumns="1fr 1fr" mb={5} gap={12}>
              <Box>
                <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                  Ist Ihnen Ihre Einkommensabsicherung wichtig, für den Fall, dass Sie aus gesundheitlichen Gründen
                  Ihren Beruf nicht mehr ausüben können?
                </Text>
                <Box>
                  <Flex justifyContent="flex-end" mb={2}>
                    <Text mr={5} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      Ja
                    </Text>
                    <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      Nein
                    </Text>
                  </Flex>
                  <RadioFormikField
                    variant="dotted"
                    key="incomeSecurityImportant"
                    name="incomeSecurityImportant"
                    direction="row"
                    justifyContent="flex-end"
                    options={[
                      { key: '1', label: 'Ja', value: 'Yes' },
                      { key: '2', label: 'Nein', value: 'No' },
                    ]}
                    dottedShowLabel={false}
                    isRequired
                  />
                </Box>
              </Box>
              <Box>
                <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                  Wie hoch sollte Ihr monatliches Einkommen im Falle einer Berufsunfähigkeit sein?
                </Text>
                <Flex mt={printMode ? 5 : '33px'} justifyContent="flex-end">
                  <Box>
                    <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      Betrag
                    </Text>
                    <PrintableField<CurrencyFieldType>
                      EditComponent={CurrencyFormikField}
                      PrintComponent={DottedFlushedCurrencyPrintField}
                      minW="100px"
                      w="100%"
                      variant="dotted-flush"
                      key="occupationalDisabilityAmmount"
                      name="occupationalDisabilityAmmount"
                      showRequiredIcon={false}
                    />
                  </Box>
                </Flex>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Flex mt={printMode ? 0 : 12} justifyContent="flex-end">
        <QuotedText maxW="366px" quote="Jeder zahlt in seinem Leben ein Haus ab! Sein eigenes oder das eines Anderen" />
      </Flex>
      <Box>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_8_FRAGE_6_TEIL_1} />
        <Grid templateColumns="max-content 1fr">
          <Text mr={2} color="documents.secondary.700" fontSize="lg" fontFamily="mono" fontWeight={500}>
            6.
          </Text>
          <Box>
            <Text
              mb={printMode ? 5 : 10}
              color="documents.secondary.700"
              fontSize="lg"
              fontFamily="mono"
              fontWeight={500}
            >
              Eigene Immobilie
            </Text>
            <RentTable />
            <Text mt={printMode ? 5 : 8} mb={printMode ? 0 : 5} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
              Besitzen Sie bereits eine eigene Immobilie?
            </Text>
            <OwnProperty />
            <Grid templateColumns="1fr 1fr" mt={printMode ? 0 : 12} mb={printMode ? 0 : 5} gap={10}>
              <Box>
                <Box ml={printMode ? 0 : '-23px'}>
                  <PositionMarker name={InvestmentKompassGuideNames.SEITE_8_FRAGE_6_TEIL_2} />
                </Box>
                <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                  Würden Sie die Finanzierungsphase verkürzen, wenn Sie die Möglichkeit dazu hätten?
                </Text>
                <Box>
                  <Flex justifyContent="flex-end" mb={2}>
                    <Text mr={5} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      Ja
                    </Text>
                    <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      Nein
                    </Text>
                  </Flex>
                  <RadioFormikField
                    variant="dotted"
                    key="shortenFinancingPhase"
                    name="shortenFinancingPhase"
                    direction="row"
                    justifyContent="flex-end"
                    options={[
                      { key: '1', label: 'Ja', value: 'Yes' },
                      { key: '2', label: 'Nein', value: 'No' },
                    ]}
                    dottedShowLabel={false}
                    isRequired
                  />
                </Box>
              </Box>
              <Box>
                <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                  Zahlen Sie Ihre Immobilie noch selbst ab?
                </Text>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Flex justifyContent="flex-end" mb={2}>
                      <Text mr={5} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                        Ja
                      </Text>
                      <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                        Nein
                      </Text>
                    </Flex>
                    <RadioFormikField
                      variant="dotted"
                      key="payOffSelfProperty"
                      name="payOffSelfProperty"
                      direction="row"
                      justifyContent="flex-end"
                      options={[
                        { key: '1', label: 'Ja', value: 'Yes' },
                        { key: '2', label: 'Nein', value: 'No' },
                      ]}
                      dottedShowLabel={false}
                      isRequired
                    />
                  </Box>
                </Flex>
              </Box>
              <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                Wie hoch wäre Ihr monatliches Budget, welches Sie bereit wären zu investieren?
              </Text>
              <Box>
                <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                  Betrag
                </Text>
                <PrintableField<StringFieldType>
                  EditComponent={CurrencyFormikField}
                  PrintComponent={DottedFlushedCurrencyPrintField}
                  maxW="100px"
                  w="100%"
                  variant="dotted-flush"
                  key="monthlyBudgetAmount"
                  name="monthlyBudgetAmount"
                  showRequiredIcon={false}
                />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </PageWrapper>
  );
};
