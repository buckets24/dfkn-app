import { FC, FormEvent, useCallback, useEffect } from 'react';
import { Text, Box, Badge, Button } from '@chakra-ui/react';
import { OneTimeInvestmentForm } from './OneTimeInvestmentForm';
import { InstallmentPlanForm } from './InstallmentPlanForm';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { defaultTaxRate, getTaxDeduction } from '../utils';
import { InstallmentInvestmentType, OneTimeInvestmentType } from '../api';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';

export type InvestmentType = (OneTimeInvestmentType & InstallmentInvestmentType) | undefined;

export const ProductSelection: FC = () => {
  const me = useAuthStore(getMe);
  const { printMode } = useDocFormMeta();
  const { value: productPlan, setFieldValue } = useFormikByName('productPlan');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: investmentAmount } = useFormikByName('investmentAmount');
  const { value: investmentPeriod } = useFormikByName('investmentPeriod');
  const { value: oneTimeAgio } = useFormikByName('oneTimeInvestmentAgio');
  const { value: installmentAgio } = useFormikByName('installmentAgio');
  const { value: taxRate } = useFormikByName('taxRate');
  const { value: annualTaxAllowance } = useFormikByName('annualTaxAllowance');
  const { value: monthlySavingsAmount } = useFormikByName('monthlySavingsAmount');
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');
  const { value: annualSavingsAmount } = useFormikByName('annualSavingsAmount');
  const data: InvestmentType[] = [];
  const interestPercentage = 5; // Equals to 5%
  let payPeriodMonths = 0;
  let fee = monthlySavingsAmount * 12 * (interestPercentage / 100) * investmentPeriod;
  let totalCredit = 0;

  const memoizedOnChange = useCallback<(value: FormEvent<HTMLDivElement> | string) => void>(
    (value) => {
      setFieldValue?.('productPlan', value);
    },
    [setFieldValue]
  );

  /**
   * Calculation for One Time Investment Plan
   */
  const calculateOneTimeInvestment = (annualSavings?: number) => {
    const output = annualSavings ? [] : data;
    const profitArr = [];
    const taxDeductionArr = [];
    let finalTotalProfit = 0;
    let finalInvestmentAmount = annualSavings ?? investmentAmount;
    let finalInterestPerYear = finalInvestmentAmount * (interestPercentage / 100);
    let finalCredit = 0;

    for (let i = 1; i <= parseInt(investmentPeriod); i++) {
      finalInterestPerYear = finalInvestmentAmount * (interestPercentage / 100);
      profitArr.push(finalInterestPerYear);
      taxDeductionArr.push(getTaxDeduction(finalInterestPerYear, annualTaxAllowance, taxRate));
      finalTotalProfit = considerTaxAllowance
        ? profitArr.reduce((first, last) => first + last, 0) + taxDeductionArr.reduce((first, last) => first + last, 0)
        : profitArr.reduce((first, last) => first + last, 0);
      finalCredit = finalInvestmentAmount * (interestPercentage / 100 + 1);

      output.push({
        year: i,
        investmentAmount: finalInvestmentAmount,
        interestPerYear: finalInterestPerYear,
        taxDeduction: getTaxDeduction(finalInterestPerYear, annualTaxAllowance, taxRate),
        totalProfit: finalTotalProfit,
        credit: considerTaxAllowance
          ? finalCredit + getTaxDeduction(finalInterestPerYear, annualTaxAllowance, taxRate)
          : finalCredit,
      });
      finalInvestmentAmount = considerTaxAllowance
        ? finalCredit + getTaxDeduction(finalInterestPerYear, annualTaxAllowance, taxRate)
        : finalCredit;
    }

    if (annualSavings) {
      return output;
    } else {
      // To be passed as value on credit data zustand
      totalCredit = considerTaxAllowance
        ? finalCredit + getTaxDeduction(finalInterestPerYear, annualTaxAllowance, taxRate)
        : finalCredit;

      /**
       * Compute the total interest/year and the total tax deduction
       * then display it at the last row of the table
       */
      data.push({
        year: 'Gesamt',
        interestPerYear: data
          .map((data) => data?.interestPerYear)
          .reduce((first, last) => (first ?? 0) + (last ?? 0), 0),
        taxDeduction: data.map((data) => data?.taxDeduction).reduce((first, last) => (first ?? 0) + (last ?? 0), 0),
        totalProfit: data[data.length - 1]?.totalProfit,
        credit: data[data.length - 1]?.credit,
      });

      setFieldValue?.('productPlanSummary', {
        amount: investmentAmount,
        interestPerYear: oneTimeAgio,
        years: investmentPeriod,
        deposit: investmentAmount,
        totalInterest: totalCredit - investmentAmount,
        totalCredit: totalCredit,
        isConsideredAgioPayment: considerAgioPayments,
        isConsideredTaxDeduction: considerTaxAllowance,
      });
      setFieldValue?.('productPlanData', data);
    }
  };

  /**
   * Calculation for Installment Plan
   */
  const calculateInstallment = () => {
    const annualData = annualSavingsAmount ? calculateOneTimeInvestment(annualSavingsAmount) : [];
    const getMonthlyPayment = (amount: number) => {
      let payment = amount;

      if (installmentAgio === '5%, 50% Verrechnung') {
        payment = amount / 2;
      } else if (installmentAgio === '5%, 100% Verrechnung') {
        payment = 0;
      }

      return payment;
    };

    const monthlyArr = [];
    let monthNum = 1;
    let monthlyPayment = getMonthlyPayment(monthlySavingsAmount);
    let capitalPerMonth = monthlyPayment;
    let interestPerMonth = capitalPerMonth * (interestPercentage / 100) * (1 / 12);
    let totalProfitPerMonth = capitalPerMonth * (interestPercentage / 100) * (1 / 12);
    const previousProfitBalanceArr: Pick<InstallmentInvestmentType, 'totalProfit' | 'balance'>[] = [];

    for (let i = 1; i <= investmentPeriod * 12; i++) {
      monthlyArr.push({
        month: i,
        monthlyPayment: monthlyPayment,
        capital: capitalPerMonth,
        interestPerMonth: interestPerMonth,
        totalProfit: totalProfitPerMonth,
        balance: capitalPerMonth + interestPerMonth,
        interestIncomePerMonth: monthlyPayment * (interestPercentage / 100) * ((12 - monthNum + 1) / 12),
      });

      if (fee > 0) {
        payPeriodMonths++;
        fee -= installmentAgio === '5%, 100% Verrechnung' ? monthlySavingsAmount : monthlyPayment;
      }

      if (fee <= 0) {
        monthlyPayment = monthlySavingsAmount;
        if (fee < 0) {
          if (installmentAgio === '5%, 100% Verrechnung' || installmentAgio === '5%, 50% Verrechnung') {
            monthlyPayment = monthlySavingsAmount - fee;
          }
          fee = 0;
        }
      }
      capitalPerMonth += monthlyPayment + interestPerMonth;
      interestPerMonth = capitalPerMonth * (interestPercentage / 100) * (1 / 12);
      totalProfitPerMonth += interestPerMonth;

      if (monthNum === 12) {
        monthNum = 1;
      } else {
        monthNum++;
      }
    }

    for (let i = 0; i < investmentPeriod; i++) {
      const annualInvestment = annualData?.[i];
      const annualInvestmentAmount = annualData?.[i]?.investmentAmount;
      const annualInterestPerYer = annualData?.[i]?.interestPerYear;
      const annualProfit = annualData?.[i]?.totalProfit;
      const annualCredit = annualData?.[i]?.credit;

      const startCounter = i * 12;
      const rangeCounter = i * 12 + 12;
      const currentYear = monthlyArr.filter((data) => data.month <= rangeCounter && data.month > startCounter);
      const yearlyPayment = currentYear.map((data) => data.monthlyPayment).reduce((first, second) => first + second, 0);
      const basePaymentPerYear =
        installmentAgio === '5%, 100% Verrechnung' || installmentAgio === '5%, 50% Verrechnung'
          ? monthlyPayment * 12 * (i + 1)
          : yearlyPayment * (i + 1);

      const previousTotalProfit = previousProfitBalanceArr[i - 1]?.totalProfit ?? 0;
      const previousBalance = previousProfitBalanceArr[i - 1]?.balance ?? 0;
      const interestPerYear =
        currentYear.map((data) => data.interestIncomePerMonth).reduce((first, second) => first + second, 0) +
        previousBalance * (interestPercentage / 100);
      const capital = previousBalance + yearlyPayment;
      const balance = considerTaxAllowance
        ? capital + interestPerYear + getTaxDeduction(interestPerYear, annualTaxAllowance, taxRate)
        : capital + interestPerYear;
      const totalProfit = considerTaxAllowance
        ? previousTotalProfit + interestPerYear + getTaxDeduction(interestPerYear, annualTaxAllowance, taxRate)
        : previousTotalProfit + interestPerYear;

      data.push({
        year: i + 1,
        paymentPerYear:
          annualInvestment && annualInvestmentAmount ? annualInvestmentAmount + basePaymentPerYear : basePaymentPerYear,
        capital: annualInvestment && annualInvestmentAmount ? annualInvestmentAmount + capital : capital,
        interestPerYear:
          annualInvestment && annualInterestPerYer ? annualInterestPerYer + interestPerYear : interestPerYear,
        taxDeduction: getTaxDeduction(
          annualInterestPerYer ? interestPerYear + annualInterestPerYer : interestPerYear,
          annualTaxAllowance,
          taxRate
        ),
        totalProfit: annualInvestment && annualProfit ? annualProfit + totalProfit : totalProfit,
        balance: annualInvestment && annualCredit ? annualCredit + balance : balance,
      });
      previousProfitBalanceArr.push({
        totalProfit: totalProfit,
        balance: balance,
      });
    }

    /**
     * Compute the total interest/year and the total tax deduction
     * then display it at the last row of the table
     */
    data.push({
      year: 'Gesamt',
      paymentPerYear: data[data.length - 1]?.paymentPerYear ? data[data.length - 1]?.paymentPerYear : 0,
      capital: data[data.length - 1]?.balance,
      interestPerYear: data.map((data) => data?.interestPerYear).reduce((first, last) => (first ?? 0) + (last ?? 0), 0),
      taxDeduction: data.map((data) => data?.taxDeduction).reduce((first, last) => (first ?? 0) + (last ?? 0), 0),
      totalProfit: data[data.length - 1]?.totalProfit,
      balance: data[data.length - 1]?.balance,
    });

    setFieldValue?.('productPlanSummary', {
      annualInvestment: annualSavingsAmount ?? 0,
      amount: monthlySavingsAmount,
      interestPerYear: installmentAgio,
      years: investmentPeriod,
      deposit: data[data.length - 1]?.paymentPerYear ? data[data.length - 1]?.paymentPerYear : 0,
      totalInterest: data[data.length - 1]?.totalProfit ?? 0,
      totalCredit: data[data.length - 1]?.balance ?? 0,
      feePayPeriod: installmentAgio === '5% in 3 gleichen Raten' ? 3 : payPeriodMonths,
      isConsideredAgioPayment: considerAgioPayments,
      isConsideredTaxDeduction: considerTaxAllowance,
    });

    setFieldValue?.('productPlanData', data);
  };

  const resetPlan = useCallback(() => {
    setFieldValue?.('investmentAmount', 0);
    setFieldValue?.('investmentPeriod', '5');
    setFieldValue?.('oneTimeInvestmentAgio', '0.05');
    setFieldValue?.('considerTaxAllowance', false);
    setFieldValue?.('taxRate', defaultTaxRate);
    setFieldValue?.('annualTaxAllowance', 801.0);
    setFieldValue?.('considerAgioPayments', true);
    setFieldValue?.('annualSavingsAmount', 0);
    setFieldValue?.('monthlySavingsAmount', 0);
    setFieldValue?.('installmentAgio', '5% in einer Summe');
    setFieldValue?.('productPlanData', []);
    setFieldValue?.('productPlanSummary', {
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
  }, [setFieldValue]);

  /**
   * Preselect to One Time Investment if the productPlan is undefined
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!productPlan) {
        memoizedOnChange('oneTimeInvestment');
        resetPlan();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [memoizedOnChange, productPlan, resetPlan]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (investmentAmount || monthlySavingsAmount) {
        productPlan === 'oneTimeInvestment' ? calculateOneTimeInvestment() : calculateInstallment();
      }
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, printMode, productPlan]);

  return (
    <Box mb={16}>
      <RadioFormikField
        variant="dotted"
        key="productPlan"
        name="productPlan"
        direction="row"
        options={[
          { key: '1', label: 'Einmalanlage', value: 'oneTimeInvestment' },
          { key: '2', label: 'Ratenanlage', value: 'installment' },
        ]}
        onChange={(value: FormEvent<HTMLDivElement>) => {
          memoizedOnChange(value);
          resetPlan();
        }}
        isRequired
      />
      <Box mt={5} p={3} bg="documents.secondary.600">
        <Text textAlign="right">
          <Badge variant="solid" bg="documents.tertiary.500" textTransform="none">
            Anlageform: {interestPercentage}%
          </Badge>
        </Text>
        {productPlan === 'oneTimeInvestment' ? <OneTimeInvestmentForm /> : <InstallmentPlanForm />}
      </Box>
      <Box mt={5} textAlign="right">
        <Button
          type="submit"
          px={10}
          bg="documents.secondary.700"
          color="white"
          fontWeight={500}
          _hover={{ bg: 'documents.secondary.500' }}
          onClick={() => {
            productPlan === 'oneTimeInvestment' ? calculateOneTimeInvestment() : calculateInstallment();
          }}
        >
          Berechnen
        </Button>
      </Box>
    </Box>
  );
};
