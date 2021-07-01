import {
  Box,
  Checkbox,
  Flex,
  FormHelperText,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import React, { FC, memo, useCallback } from 'react';
import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { FieldControl, RadioFormField } from './fieldApi';

export type RadioFieldType = FieldControl<HTMLInputElement> & Omit<RadioFormField, 'type'> & StackProps;

export const RadioField: FC<RadioFieldType> = memo(
  ({
    variant = 'default',
    name,
    options,
    value,
    direction = 'column',
    helperText,
    isInvalid,
    onChange,
    error,
    onBlur,
    size = 'lg',
    dottedShowLabel = true,
    isRequired,
    disabled = false,
    errorMessageSpacer = true,
    ...others
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: size,
      variant,
    });

    return (
      <RadioGroup name={name} onChange={onChange} value={value ?? ''} onBlur={onBlur}>
        <Stack direction={direction} {...others}>
          {options.map(({ key, value, label }) => {
            return (
              <Flex key={key}>
                <Radio
                  value={value}
                  key={key}
                  sx={styles.formRadio}
                  isInvalid={isInvalid}
                  mr={2}
                  isDisabled={disabled}
                />
                {dottedShowLabel ? variant === 'dotted' ? <Text sx={styles.formLabel}>{label}</Text> : label : ''}
              </Flex>
            );
          })}
        </Stack>
        {variant !== 'dotted' && (
          <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
            {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
            {isInvalid && (
              <Box mt={1} sx={styles.formError}>
                {error}
              </Box>
            )}
          </ErrorMessageContainer>
        )}
      </RadioGroup>
    );
  }
);

export const RadioFormikField: FC<RadioFieldType> = ({ name, ...props }) => {
  const { value, touch, error, onBlur, setFieldValue } = useFormikByName(name);

  const memoizedOnChange = useCallback<(value: string | number) => void>(
    (value) => {
      setFieldValue?.(name, value);
    },
    [setFieldValue, name]
  );

  return (
    <RadioField
      name={name}
      isInvalid={touch && error ? true : false}
      error={error}
      value={value}
      onChange={memoizedOnChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export const RadioPrintField: FC<RadioFieldType> = ({
  name,
  options,
  isInvalid,
  onBlur,
  helperText,
  onChange,
  error,
  ...otherProps
}) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  return (
    <Stack {...otherProps}>
      {options.map(({ key, value: optionValue, label }) => {
        const isChecked = value === optionValue;

        return (
          <SimpleGrid key={key} w="100%" mb={1} gridTemplateColumns="min-content 1fr">
            <Box lineHeight={1}>
              <Checkbox key={key} isChecked={isChecked} isDisabled={!isChecked} colorScheme="blue" mr={2} />
            </Box>
            <Box mt="3px" fontSize="10px" lineHeight={1.1}>
              {label}
            </Box>
          </SimpleGrid>
        );
      })}
    </Stack>
  );
};
