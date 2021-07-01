import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import { FC } from 'react';

export const DottedFlushedDatePrintField: FC<StringFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  errorMessageSpacer,
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
        <Text>{formatDateToDe(value, 'dd.MM.yyyy')}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
    </Box>
  );
};
