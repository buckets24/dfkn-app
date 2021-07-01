import { Box, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { DateFieldType } from 'jexity-app/form/fields/DateField';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import { FC } from 'react';

export const GhostDatePrintField: FC<DateFieldType> = ({
  label,
  name,
  dateFormat,
  errorMessageSpacer,
  inputProps,
  disableFutureDates,
  disablePastTime,
  disablePastDates,
  onChange,
  ...otherProps
}) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  return (
    <Box pos="relative" {...otherProps}>
      <Box p={1} fontSize="11px">
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
