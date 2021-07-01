import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';
import { useDocFormMeta } from '../../useDocFormMeta';

export const tableBorderStyle: BoxProps = {
  py: '10px',
  textAlign: 'center',
};

export const tableNumberStyle: TextProps = {
  pr: 2,
  maxH: '20px',
  fontSize: 'sm',
  textAlign: 'right',
};

export const defaultTaxRate = 25;

export const getTaxDeduction = (interest = 0, annualTaxAllowance = 801.0, taxRate = defaultTaxRate): number => {
  if (interest > annualTaxAllowance) {
    return ((annualTaxAllowance - interest) * taxRate) / 100;
  } else {
    return 0.0;
  }
};

export const OneTimeInvestmentBorderSpacing: FC = () => {
  const { printMode } = useDocFormMeta();
  return (
    <style jsx global>
      {`
        .one-time-investment-plan-table {
          width: calc(100% + ${printMode ? '10px' : '20px'});
          border-collapse: separate;
          border-spacing: ${printMode ? '5px' : '10px'} 0;
        }
      `}
    </style>
  );
};

export const InstallmentBorderSpacing: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');
  return (
    <style jsx global>
      {`
        .installment-plan-table {
          width: calc(100% + ${printMode ? '20px' : '10px'});
          border-collapse: separate;
          border-spacing: ${printMode ? '5px' : considerAgioPayments ? '5px' : '10px'} 0;
        }
      `}
    </style>
  );
};

export const LegalHintTabelFooter: FC = () => {
  return (
    <Box mt={3}>
      <Text fontSize="xs">
        Bitte beachten Sie, dass diese Beispielrechnung kein rechtsverbindliches Angebot darstellt.
      </Text>
    </Box>
  );
};
