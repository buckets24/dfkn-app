import { FC } from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { formatNumToCurrency, formatNumToPercentage } from 'jexity-app/utils/formatNumber';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { HeadingWrapper } from '../../investment-kompass/components/HeadingWrapper';

export interface SummaryProps {
  oneTimeInvestment: { text: string; value: string | number }[];
  installment: { text: string; value: string | number }[];
}
export const ProfitSummary: FC = () => {
  const { value } = useFormikByName('productPlan');
  const { value: productPlanSummary } = useFormikByName('productPlanSummary');
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: taxRate } = useFormikByName('taxRate');
  const { value: annualTaxAllowance } = useFormikByName('annualTaxAllowance');
  const productPlan: keyof SummaryProps = value;
  const summary: SummaryProps = {
    oneTimeInvestment: [
      {
        text: 'Einmalanlage',
        value: formatNumToCurrency(productPlanSummary?.amount ?? 0),
      },
      {
        text: 'Berücksichtigung der Agiozahlungen',
        value: productPlanSummary?.isConsideredAgioPayment ?? false ? 'Ja' : 'Nein',
      },
      {
        text: 'Zeichnungssumme',
        value: formatNumToCurrency(productPlanSummary?.amount ?? 0),
      },
      ...[
        considerAgioPayments && {
          text: `Agio(${(productPlanSummary?.interestPerYear ?? 0) * 100}%)`,
          value: formatNumToCurrency(
            (productPlanSummary?.amount ?? 0) * (productPlanSummary?.interestPerYear ?? 0 / 100)
          ),
        },
      ],
      {
        text: 'Laufzeit',
        value: `${productPlanSummary?.years ?? 0} Jahre`,
      },
      {
        text: 'Steuerfreibetrag berücksichtigen',
        value: productPlanSummary?.isConsideredTaxDeduction ?? false ? 'Ja' : 'Nein',
      },
      ...[
        considerTaxAllowance && {
          text: 'Steuersatz',
          value: `${formatNumToPercentage(taxRate)}`,
        },
      ],
      ...[
        considerTaxAllowance && {
          text: 'Jährlicher Steuerfreibetrag',
          value: `${formatNumToCurrency(annualTaxAllowance ?? 801.0)}`,
        },
      ],
    ],
    installment: [
      {
        text: 'Einmalanlage',
        value: formatNumToCurrency(productPlanSummary.annualInvestment ?? 0),
      },
      {
        text: 'Berücksichtigung der Agiozahlungen',
        value: productPlanSummary?.isConsideredAgioPayment ? 'Ja' : 'Nein',
      },
      {
        text: 'Ratenanlage',
        value: `${formatNumToCurrency(productPlanSummary?.amount ?? 0)} / monatlich`,
      },
      ...[
        considerAgioPayments && {
          text: 'Agio Zahlart',
          value: productPlanSummary?.interestPerYear ?? 0,
        },
      ],
      {
        text: 'Einzahlungsdauer',
        value: `${productPlanSummary?.years ?? 0} Jahre`,
      },
      ...[
        considerAgioPayments && {
          text: 'Agio',
          value: formatNumToCurrency((productPlanSummary?.amount ?? 0) * 12 * 0.05 * (productPlanSummary?.years ?? 0)),
        },
      ],
      {
        text: 'Zeichnungssumme',
        value: formatNumToCurrency(
          productPlanSummary?.annualInvestment
            ? productPlanSummary?.annualInvestment +
                (productPlanSummary?.amount ?? 0) * 12 * (productPlanSummary?.years ?? 0)
            : (productPlanSummary?.amount ?? 0) * 12 * (productPlanSummary?.years ?? 0)
        ),
      },
      ...[
        considerAgioPayments && {
          text: 'Agio Zahlungsdauer',
          value:
            productPlanSummary?.interestPerYear === '5% in einer Summe'
              ? 'sofort'
              : `${productPlanSummary?.feePayPeriod ?? 0 * 12} Monate`,
        },
      ],
      {
        text: 'Steuerfreibetrag berücksichtigen',
        value: productPlanSummary?.isConsideredTaxDeduction ?? false ? 'Ja' : 'Nein',
      },
      ...[
        considerTaxAllowance && {
          text: 'Jährlicher Steuerfreibetrag',
          value: `${formatNumToCurrency(annualTaxAllowance ?? 801.0)}`,
        },
      ],
      ...[
        considerTaxAllowance && {
          text: 'Steuersatz',
          value: `${formatNumToPercentage(taxRate)}`,
        },
      ],
    ],
  };

  return (
    <Box mt={20}>
      <HeadingWrapper mb={5}>
        <Heading
          color="documents.primary.600"
          fontFamily="body"
          as="h3"
          fontSize="xl"
          lineHeight={1}
          textTransform="uppercase"
        >
          Vermögensentwicklung <br />
          <Box as="span" color="documents.tertiary.500">
            {value === 'oneTimeInvestment' ? 'Einmalanlage' : 'Ratenanlage'}
          </Box>
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="1fr 1fr" rowGap={5} columnGap={20} mt={10}>
        {summary[productPlan].map(
          (data, i) =>
            data.value && (
              <Grid key={i} templateColumns="1fr 1fr" alignItems="center">
                <Text color="documents.secondary.700" fontWeight={700} mr={3}>
                  {data.text}
                </Text>
                <Text py={1} pr={2} bg="documents.secondary.600" fontWeight={500} textAlign="right">
                  {data.value}
                </Text>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};
