import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import { FC } from 'react';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';

export const FlushedCurrencyPrintField: FC<StringFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  helperText,
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
      <Box
        minH="20px"
        backgroundColor="#F7F7F7"
        borderBottom="2px solid #c7c7c7"
        p={1}
        pt={labelInside ? 4 : undefined}
        fontSize="11px"
      >
        <Text>{value ? formatNumToCurrency(value) : '€0,00'}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
    </Box>
  );
};
