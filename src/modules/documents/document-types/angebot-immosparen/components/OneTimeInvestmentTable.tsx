import React, { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';
import { OneTimeInvestmentBorderSpacing, tableBorderStyle, tableNumberStyle } from '../utils';
import { OneTimeInvestmentType } from '../api';

export const OneTimeInvestmentTable: FC = () => {
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: table } = useFormikByName('productPlanData');
  const oneTimeInvestmentTable: OneTimeInvestmentType[] = table;

  return (
    <>
      <OneTimeInvestmentBorderSpacing />
      <Box as="table" className="one-time-investment-plan-table">
        <Box as="thead">
          <Box as="tr" bg="documents.secondary.600" textAlign="right">
            <Box as="th" px={2} py={2} fontWeight={400} fontSize="sm" textAlign="center">
              Jahr
            </Box>
            <Box as="th" py={2} pr={2} fontWeight={400} fontSize="sm">
              Anlagebetrag
            </Box>
            <Box as="th" py={2} pr={2} fontWeight={400} fontSize="sm">
              Zinsen/Jahr
            </Box>
            {considerTaxAllowance && (
              <Box as="th" py={2} pr={2} fontWeight={400} fontSize="sm">
                Steuerabzug
              </Box>
            )}
            <Box as="th" py={2} pr={2} fontWeight={400} fontSize="sm">
              Gesamtgewinn
              {considerTaxAllowance && (
                <>
                  <br /> nach Steuern
                </>
              )}
            </Box>
            <Box as="th" py={2} pr={2} fontWeight={400} fontSize="sm">
              Guthaben
            </Box>
          </Box>
        </Box>
        <Box as="tbody">
          {oneTimeInvestmentTable.map((item, i) => (
            <Box
              key={i}
              as="tr"
              h="20px"
              lineHeight={1.1}
              {...(item.year % 5 === 0 && { bg: '#FDDFBB' })}
              _last={{
                bg: '#D6D7E2',
              }}
            >
              <Box as="td" {...tableNumberStyle} pr={0} textAlign="center">
                {item.year}
              </Box>
              <Box as="td" {...tableBorderStyle}>
                {item.investmentAmount && (
                  <Text {...tableNumberStyle}>{formatNumToCurrency(item.investmentAmount)}</Text>
                )}
              </Box>
              <Box as="td" {...tableBorderStyle}>
                <Text {...tableNumberStyle}>{formatNumToCurrency(item.interestPerYear)}</Text>
              </Box>
              {considerTaxAllowance && (
                <Box as="td" {...tableBorderStyle}>
                  <Text {...tableNumberStyle}>{formatNumToCurrency(item.taxDeduction)}</Text>
                </Box>
              )}
              <Box as="td" {...tableBorderStyle}>
                <Text {...tableNumberStyle}>{formatNumToCurrency(item.totalProfit)}</Text>
              </Box>
              <Box as="td" {...tableBorderStyle}>
                <Text {...tableNumberStyle}>{formatNumToCurrency(item.credit)}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
