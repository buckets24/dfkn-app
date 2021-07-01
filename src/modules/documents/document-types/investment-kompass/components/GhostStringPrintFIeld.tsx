import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';

export const GhostStringPrintField: FC<StringFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  isRequired,
  inputProps,
  showRequiredIcon,
  errorMessageSpacer,
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
        <Text>{value}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
    </Box>
  );
};
