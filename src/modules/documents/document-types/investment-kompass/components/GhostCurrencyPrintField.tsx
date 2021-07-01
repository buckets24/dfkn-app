import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';

export const GhostCurrencyPrintField: FC<StringFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  showRequiredIcon,
  ...otherProps
}) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  const getLabelInsideProps = (): BoxProps => {
    if (labelInside) {
      return { pos: 'absolute', top: 0, left: 1 };
    } else {
      return {};
    }
  };

  return (
    <Box pos="relative" {...otherProps}>
      <Box p={1} pt={labelInside ? 4 : undefined} fontSize="11px">
        <Text textAlign="right" pr={2}>
          {value ? formatNumToCurrency(value) : ''}
        </Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
    </Box>
  );
};
