import { Box, BoxProps, Grid, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { MultilineStringFormikField } from 'jexity-app/form/fields/MultilineStringField';
import { StringFieldType, StringFormikField } from 'jexity-app/form/fields/StringField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { FC, memo, useEffect, useState } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { CirclePlusIcon } from 'src/theme/icons/CirclePlusIcon';
import { GhostCurrencyPrintField } from './GhostCurrencyPrintField';
import { GhostStringPrintField } from './GhostStringPrintFIeld';

type WealthConcept = {
  title: string;
  data: {
    isShown: boolean;
    text: string;
    yearFieldName: string;
    monthFieldName: string;
    name?: string;
  }[];
}[];

export const WealthConceptTable: FC = memo(() => {
  const { printMode, readOnly } = useDocFormMeta();
  const { value: revenueOther } = useFormikByName('revenueOther');
  const { value: fixedExpensesOther } = useFormikByName('fixedExpensesOther');
  const { value: savingsOther } = useFormikByName('savingsOther');

  const [tables, setTables] = useState<WealthConcept>([]);

  const borderStyle: BoxProps = {
    borderWidth: '1px',
    borderColor: 'documents.secondary.700',
    borderStyle: 'dotted',
  };

  useEffect(() => {
    setTables([
      {
        title: 'Einnahmen',
        data: [
          {
            isShown: true,
            text: 'Netto Mann',
            yearFieldName: 'netManYear',
            monthFieldName: 'netManMonth',
          },
          {
            isShown: true,
            text: 'Netto Frau',
            yearFieldName: 'netWomanYear',
            monthFieldName: 'netWomanMonth',
          },
          {
            isShown: true,
            text: 'Nebenjob',
            yearFieldName: 'partTimeJobYear',
            monthFieldName: 'partTimeJobMonth',
          },
          {
            isShown: true,
            text: 'Mieteinnahmen',
            yearFieldName: 'rentalIncomeYear',
            monthFieldName: 'rentalIncomeMonth',
          },
          {
            isShown: true,
            text: 'Kindergeld',
            yearFieldName: 'childBenefitYear',
            monthFieldName: 'childBenefitMonth',
          },
          {
            isShown: revenueOther ? true : false,
            text: revenueOther ? revenueOther : '',
            name: 'revenueOther',
            yearFieldName: 'revenueOtherYear',
            monthFieldName: 'revenueOtherMonth',
          },
        ],
      },
      {
        title: 'Fixe Ausgaben',
        data: [
          {
            isShown: true,
            text: 'Immobiliendarlehen / Miete ',
            yearFieldName: 'realEstateLoanYear',
            monthFieldName: 'realEstateLoanMonth',
          },
          {
            isShown: true,
            text: 'Ratenkredit',
            yearFieldName: 'installmentLoanYear',
            monthFieldName: 'installmentLoanMonth',
          },
          {
            isShown: true,
            text: 'KFZ-Kredit ',
            yearFieldName: 'carLoanYear',
            monthFieldName: 'carLoanMonth',
          },
          {
            isShown: true,
            text: 'Private Haftpflicht',
            yearFieldName: 'privateLiabilityYear',
            monthFieldName: 'privateLiabilityMonth',
          },
          {
            isShown: true,
            text: 'Hausrat- / Wohngebäude-Versicherung',
            yearFieldName: 'houseHoldContentYear',
            monthFieldName: 'houseHoldContentMonth',
          },
          {
            isShown: true,
            text: 'KFZ-Versicherung',
            yearFieldName: 'carInsuranceYear',
            monthFieldName: 'carInsuranceMonth',
          },
          {
            isShown: true,
            text: 'Unfallversicherung',
            yearFieldName: 'accidentInsuranceYear',
            monthFieldName: 'accidentInsuranceMonth',
          },
          {
            isShown: true,
            text: 'Berufsunfähigkeitsversicherung',
            yearFieldName: 'disabilityInsuranceYear',
            monthFieldName: 'disabilityInsuranceMonth',
          },
          {
            isShown: true,
            text: 'Risikolebensversicherung',
            yearFieldName: 'termLifeInsuranceYear',
            monthFieldName: 'termLifeInsuranceMonth',
          },
          {
            isShown: fixedExpensesOther ? true : false,
            text: fixedExpensesOther ? fixedExpensesOther : '',
            name: 'fixedExpensesOther',
            yearFieldName: 'fixedExpensesOtherYear',
            monthFieldName: 'fixedExpensesOtherMonth',
          },
        ],
      },
      {
        title: 'Sparen ',
        data: [
          {
            isShown: true,
            text: 'Renten-/Lebensversicherung',
            yearFieldName: 'lifeInsuranceYear',
            monthFieldName: 'lifeInsuranceMonth',
          },
          {
            isShown: true,
            text: 'Wertpapiere',
            yearFieldName: 'securitiesYear',
            monthFieldName: 'securitiesMonth',
          },
          {
            isShown: true,
            text: 'Bausparverträge',
            yearFieldName: 'homeLoanSavingsYear',
            monthFieldName: 'homeLoanSavingsMonth',
          },
          {
            isShown: savingsOther ? true : false,
            text: savingsOther ? savingsOther : '',
            name: 'savingsOther',
            yearFieldName: 'savingsOtherYear',
            monthFieldName: 'savingsOtherMonth',
          },
        ],
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenueOther, fixedExpensesOther, savingsOther]);

  return (
    <Grid templateColumns="max-content 1fr">
      <Box>
        {tables.map((table, i) => (
          <Box key={i} as="table">
            <Box as="thead">
              <Box as="tr" bg="documents.secondary.700" color="white" {...borderStyle}>
                <Box as="th" pl={2} minW="270px" textAlign="left" fontFamily="mono" fontWeight={500}>
                  {table.title}
                </Box>
                <Box as="th" px={5} minW="100px" fontFamily="mono" fontWeight={500} {...borderStyle}>
                  Jahr
                </Box>
                <Box as="th" px={5} minW="100px" fontFamily="mono" fontWeight={500} {...borderStyle}>
                  Monat
                </Box>
              </Box>
            </Box>
            <Box as="tbody">
              {table.data.map((item, x) =>
                item.isShown ? (
                  <Box
                    key={x}
                    as="tr"
                    _odd={{ bg: '#F0F1F4' }}
                    borderWidth="1px"
                    borderColor="documents.secondary.700"
                    borderStyle="dotted"
                    h="20px"
                    lineHeight={1.1}
                  >
                    {item.name ? (
                      <Box as="td" minW="100px" {...borderStyle}>
                        <PrintableField<StringFieldType>
                          EditComponent={StringFormikField}
                          PrintComponent={GhostStringPrintField}
                          variant="text-ghost"
                          key={item.name}
                          name={item.name}
                          showRequiredIcon={false}
                          isRequired
                          ml={printMode ? 1 : -2}
                          textAlign="left"
                        />
                      </Box>
                    ) : (
                      <Box
                        as="td"
                        pl={2}
                        minW="200px"
                        borderWidth="1px"
                        borderColor="documents.secondary.700"
                        borderStyle="dotted"
                        fontSize="sm"
                        fontFamily="mono"
                      >
                        {item.text}
                      </Box>
                    )}
                    <Box as="td" minW="100px" {...borderStyle}>
                      <PrintableField<CurrencyFieldType>
                        EditComponent={CurrencyFormikField}
                        PrintComponent={GhostCurrencyPrintField}
                        variant="ghost"
                        key={item.yearFieldName}
                        name={item.yearFieldName}
                        showRequiredIcon={false}
                        isRequired
                        maxW="100px"
                        textAlign="center"
                        fontWeight={700}
                        color="documents.secondary.700"
                      />
                    </Box>
                    <Box as="td" minW="100px" {...borderStyle}>
                      <PrintableField<CurrencyFieldType>
                        EditComponent={CurrencyFormikField}
                        PrintComponent={GhostCurrencyPrintField}
                        variant="ghost"
                        key={item.monthFieldName}
                        name={item.monthFieldName}
                        showRequiredIcon={false}
                        isRequired
                        maxW="100px"
                        textAlign="center"
                        fontWeight={700}
                        color="documents.secondary.700"
                      />
                    </Box>
                  </Box>
                ) : readOnly ? null : (
                  !printMode && (
                    <Box key={x} as="tr">
                      <Box as="td">
                        <IconButton
                          aria-label="add row"
                          size="sm"
                          my={2}
                          bg="documents.tertiary.500"
                          onClick={() => {
                            const copiedTable = tables;
                            copiedTable[i].data[x].isShown = true;
                            setTables([...copiedTable]);
                          }}
                          _hover={{
                            bg: 'documents.tertiary.600',
                          }}
                        >
                          <CirclePlusIcon color="white" />
                        </IconButton>
                      </Box>
                    </Box>
                  )
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <SimpleGrid h="100%" gridTemplateRows="min-content 1fr">
        <Text
          lineHeight="27px"
          p={2}
          textAlign="center"
          bg="#D0D8E3"
          color="documents.secondary.700"
          fontFamily="mono"
          fontWeight={500}
          {...borderStyle}
        >
          Notizen
        </Text>
        <MultilineStringFormikField
          variant="dotted"
          key="wealthConceptNotes"
          name="wealthConceptNotes"
          showRequiredIcon={false}
          multirow
          isRequired
        />
      </SimpleGrid>
    </Grid>
  );
});
