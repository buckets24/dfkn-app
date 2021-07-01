import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { FC } from 'react';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';
import { CurrencyFieldType } from 'jexity-app/form/fields/CurrencyField';

export const DottedFlushedCurrencyPrintField: FC<CurrencyFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  helperText,
  symbol = true,
  onChange,
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
    <Box
      mt={1}
      pos="relative"
      borderBottomWidth="1px"
      borderBottomColor="documents.secondary.700"
      borderStyle="dotted"
      {...otherProps}
    >
      <Box p={1} pt={labelInside ? 4 : undefined} fontSize="md">
        <Text>{formatNumToCurrency(value).replace('€', symbol ? '€' : '')}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
    </Box>
  );
};
