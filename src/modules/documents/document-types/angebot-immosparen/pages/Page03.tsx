import React, { FC } from 'react';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { PageWrapper } from '../../common/PageWrapper';
import { HeadingWrapper } from '../../investment-kompass/components/HeadingWrapper';
import { CapitalRealEstateIcon } from 'src/theme/icons/CapitalRealEstateIcon';
import { ProductSelection } from '../components/ProductSelection';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { ProfitSummary } from '../components/ProfitSummary';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';

export const Page03: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value } = useFormikByName('productPlanData');
  const { value: productPlan } = useFormikByName('productPlan');
  const { value: productPlanSummary } = useFormikByName('productPlanSummary');
  const goals = [
    {
      label: 'Altervorsorge',
      name: 'retirementProvision',
    },
    {
      label: 'Kapitalaufbau',
      name: 'capitalBuilding',
    },

    {
      label: 'Tilgungsturbo',
      name: 'repaymentTurbo',
    },
  ];

  return (
    <PageWrapper p={12}>
      <HeadingWrapper mb={5}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          IHR KAPITAL ZU 100% <br />
          <Box as="span" color="documents.tertiary.500">
            IN IMMOBILIENPROJEKTE
          </Box>
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="1fr 1fr">
        <Box>
          <Text mb={5}>
            Ihre {productPlan === 'installment' ? 'monatliche' : 'einmalige'} Investiton von{' '}
            <Box as="span" fontWeight="bold">
              {formatNumToCurrency(productPlanSummary?.amount ?? 0).replace('€', 'EUR')}
            </Box>{' '}
            nutzt der DFK-Konzern zur Realisierung von Immobilienprojekten in Deutschland.
          </Text>
          <Text mb={5}>
            Insbesondere zum Erwerb und der Sanierung von Bestandsimmobilien sowie dem Neubau von Wohnimmobilien.
          </Text>
          <Text mb={5}>
            An der erwirtschafteten Rendite durch den Verkauf und der Vermietung beteiligen wir Sie jährlich mit 5%.
          </Text>
        </Box>
        <Box>
          <CapitalRealEstateIcon maxW="400px" maxH="200px" />
        </Box>
      </Grid>
      <Text mb={5} color="documents.secondary.700" fontWeight="bold">
        Ihr Anlageziel:
      </Text>
      <Flex flexDir="column" mb={5}>
        {goals.map((goal, i) => (
          <Flex key={i} mb={5}>
            <CheckboxFormikField name={goal.name} />
            <Text color="documents.secondary.700" fontWeight={700}>
              {goal.label}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Box d={!printMode ? 'block' : 'none'}>
        <ProductSelection />
      </Box>
      {value && value.length > 0 && <ProfitSummary />}
    </PageWrapper>
  );
};
