import React, { FC } from 'react';
import { Grid } from '@chakra-ui/react';
import { PageWrapper } from '../../common/PageWrapper';
import { OneTimeInvestmentTable } from '../components/OneTimeInvestmentTable';
import { InstallmentPlanTable } from '../components/InstallmentPlanTable';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { LegalHintTabelFooter } from '../utils';

export const Page04: FC = () => {
  const { value: productPlan } = useFormikByName('productPlan');

  return (
    <PageWrapper p={12}>
      <Grid templateColumns="1fr" justifyItems="center">
        {productPlan === 'oneTimeInvestment' ? <OneTimeInvestmentTable /> : <InstallmentPlanTable />}
      </Grid>
      <LegalHintTabelFooter />
    </PageWrapper>
  );
};
