import { FC, memo, useEffect } from 'react';
import { Page01 } from './pages/Page01';
import { Page02 } from './pages/Page02';
import { Page03 } from './pages/Page03';
import { Page04 } from './pages/Page04';
import { useDocFormMeta } from '../../useDocFormMeta';
import { SpecialFormikContext, useFormikByName } from 'jexity-app/form/useFormikByName';
import { useContextSelector } from 'use-context-selector';
import { DocumentWrapper } from '../common/DocumentWrapper';
import useDocumentByIdQuery from '../../query-hooks/useDocumentByIdQuery';

// Document Title: Angebot Immosparen
export const AngebotImmosparen: FC = memo(() => {
  const { printMode, activeDocumentId } = useDocFormMeta();
  const setFieldValue = useContextSelector(SpecialFormikContext, (context) => context?.setFieldValue);
  const { value } = useFormikByName('productPlanData');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: investmentAmount } = useFormikByName('investmentAmount');
  const { value: investmentPeriod } = useFormikByName('investmentPeriod');
  const { value: oneTimeAgio } = useFormikByName('oneTimeInvestmentAgio');
  const { value: installmentAgio } = useFormikByName('installmentAgio');
  const { value: taxRate } = useFormikByName('taxRate');
  const { value: annualTaxAllowance } = useFormikByName('annualTaxAllowance');
  const { value: monthlySavingsAmount } = useFormikByName('monthlySavingsAmount');
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');
  useDocumentByIdQuery(activeDocumentId, { enabled: false });

  useEffect(() => {
    // Hide table and reset summary everytime the values of the form changes
    if (!printMode && setFieldValue) {
      setFieldValue('productPlanData', []);
      setFieldValue('productPlanSummary', {
        annualInvestment: 0,
        amount: 0,
        interestPerYear: 0,
        years: 0,
        deposit: 0,
        totalInterest: 0,
        totalCredit: 0,
        isConsideredAgioPayment: 0,
        feePayPeriod: 0,
      });
    }
  }, [
    printMode,
    considerTaxAllowance,
    investmentAmount,
    investmentPeriod,
    oneTimeAgio,
    taxRate,
    annualTaxAllowance,
    monthlySavingsAmount,
    considerAgioPayments,
    installmentAgio,
    setFieldValue,
  ]);

  return (
    <DocumentWrapper>
      <Page01 />
      {printMode ? (
        <>
          <Page02 />
          <Page03 />
          {value && value.length > 0 && <Page04 />}
        </>
      ) : (
        <>
          <Page03 />
          {value && value.length > 0 && <Page04 />}
          <Page02 />
        </>
      )}
    </DocumentWrapper>
  );
});
