import { Box, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { DateFieldType } from 'jexity-app/form/fields/DateField';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import { FC } from 'react';

export const FlushedDatePrintField: FC<DateFieldType> = ({
  label,
  name,
  disableFutureDates,
  disablePastDates,
  disablePastTime,
  onChange,
  ...otherProps
}) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  return (
    <Box pos="relative" {...otherProps}>
      <Box minH="26px" backgroundColor="#F7F7F7" borderBottom="2px solid #c7c7c7" p={1} fontSize="11px">
        <Text>{formatDateToDe(value, 'dd.MM.yyyy')}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500">
          {label}
        </Text>
      )}
    </Box>
  );
};
