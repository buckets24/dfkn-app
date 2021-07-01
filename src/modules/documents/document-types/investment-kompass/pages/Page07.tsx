/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { PageWrapper } from '../../common/PageWrapper';
import { DottedFlushedCurrencyPrintField } from '../components/DottedFlushedCurrencyPrintField';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { InvestingAspects } from '../components/InvestingAspects';
import { QuotedText } from '../components/QuotedText';
import { Subsidie } from '../components/Subsidie';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';

export const Page07: FC = () => {
  const { printMode } = useDocFormMeta();
  const subsidies = [
    {
      text: 'VL-Bausparvertrag',
      name: 'VLHomeLoanSavings',
      nameAmount: 'VLHomeLoanSavingsAmount',
    },
    {
      text: 'VL-Fondsparen',
      name: 'VLFundSavings',
      nameAmount: 'VLFundSavingsAmount',
    },
    {
      text: 'Riesterrente',
      name: 'riesterPension',
      nameAmount: 'riesterPensionAmount',
    },
    {
      text: 'Rüruprente',
      name: 'blackPension',
      nameAmount: 'blackPensionAmount',
    },
    {
      text: 'Betriebliche Altersvorsorge',
      name: 'employerFundedPension',
      nameAmount: 'employerFundedPensionAmount',
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={7} />}>
      <Box>
        <Box textAlign="right">
          <DFKLogo maxW="70px" color="documents.primary.600" />
        </Box>
        <HeadingWrapper mb={8}>
          <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
            WEITERE <br />
            <Box as="span" color="documents.tertiary.500">
              WICHTIGE INFORMATIONEN:
            </Box>
          </Heading>
        </HeadingWrapper>
        <Box>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_7_FRAGE_1} />
          <Grid mb={5} templateColumns="max-content 1fr">
            <Text mr={2} color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
              1.
            </Text>
            <Box>
              <Text color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
                Haben Sie bereits Erfahrungen mit Beratern oder Geldanlagen gemacht? Wenn ja, welche?
              </Text>
              <StringFormikField
                variant="dotted-flush"
                key="whichConsultantsOrInvesment"
                name="whichConsultantsOrInvesment"
                showRequiredIcon={false}
              />
            </Box>
          </Grid>
        </Box>
        <Box>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_7_FRAGE_2} />
          <Grid mb={5} templateColumns="max-content 1fr">
            <Text mr={2} color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
              2.
            </Text>
            <Grid templateColumns="1fr max-content">
              <Text color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
                Auf welche Aspekte legen Sie bei einer <br />
                Investition besonders viel Wert?
              </Text>
              <InvestingAspects />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_7_FRAGE_3} />
          <Grid mb={5} templateColumns="max-content 1fr">
            <Text mr={2} color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
              3.
            </Text>
            <Box>
              <Text color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
                Welche staatlichen / steuerlichen Förderungen nutzen Sie bereits?
              </Text>
              <Grid templateColumns="1fr 1fr" mt={5}>
                <Box>
                  <Grid
                    templateColumns="max-content max-content min-content"
                    alignItems="center"
                    columnGap={3}
                    rowGap={1}
                  >
                    <Box />
                    <Flex>
                      <Text mr={5} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                        Ja
                      </Text>
                      <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                        Nein
                      </Text>
                    </Flex>
                    <Box />
                    {subsidies.map((subsidie) => (
                      <Subsidie key={subsidie.name} subsidie={subsidie} />
                    ))}
                  </Grid>
                </Box>
                <Box mt={5} ml={10}>
                  <Text fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                    Wünschen Sie eine Beratung zu den steuerlichen und staatlichen Förderungen?
                  </Text>
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
                    key="taxStateGrantsAdvice"
                    name="taxStateGrantsAdvice"
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
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Box>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_7_FRAGE_4} />
          <Grid templateColumns="max-content 1fr">
            <Text mr={2} color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
              4.
            </Text>
            <Box>
              <Text color="documents.secondary.700" fontFamily="mono" fontSize="lg" fontWeight={500}>
                lnvestieren Sie bereits das staatliche Kindergeld (oder einen Teil davon) in die Zukunft lhrer Kinder?
              </Text>
              <Flex justifyContent="flex-end" mb={5}>
                <Box mr={5}>
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
                    key="investingChildBenefit"
                    name="investingChildBenefit"
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
                <Box>
                  <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                    Betrag
                  </Text>
                  <PrintableField<CurrencyFieldType>
                    EditComponent={CurrencyFormikField}
                    PrintComponent={DottedFlushedCurrencyPrintField}
                    maxW="150px"
                    variant="dotted-flush"
                    key="investingChildBenefitAmount"
                    name="investingChildBenefitAmount"
                    showRequiredIcon={false}
                  />
                </Box>
              </Flex>
              <Grid templateColumns="1fr 1fr" mb={5} gap={8}>
                <Box>
                  <Text mb={3} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
                    Wünschen Sie eine Beratung zu der Absicherung lhrer Kinder?
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
                      key="willingForChildren"
                      name="willingForChildren"
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
                    Welchem Betrag wären Sie bereit in die Absicherung Ihrer Kinder zu investieren?
                  </Text>
                  <Flex justifyContent="flex-end">
                    <Box>
                      <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                        Betrag
                      </Text>
                      <PrintableField<CurrencyFieldType>
                        EditComponent={CurrencyFormikField}
                        PrintComponent={DottedFlushedCurrencyPrintField}
                        maxW="150px"
                        variant="dotted-flush"
                        key="willingAmountForChildren"
                        name="willingAmountForChildren"
                        showRequiredIcon={false}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
        <QuotedText
          maxW="565px"
          quote="Laut Statistik wird jeder vierte Arbeitnehmer vor seiner Altersrente erwerbsunfähig!"
        />
      </Box>
    </PageWrapper>
  );
};
