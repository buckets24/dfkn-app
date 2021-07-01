import React, { FC, memo, useCallback } from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { InputErrorIcon } from 'jexity-app/icons/InputErrorIcon';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { formatNumToCurrency } from '../../utils/formatNumber';
import { useFormikByName } from '../useFormikByName';
import { FieldControl, StringFormField } from './fieldApi';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';

export type D = FieldControl<HTMLInputElement> &
  Omit<StringFormField, 'type'> &
  Omit<BoxProps, 'onChange'> & { labelInside?: boolean } & Pick<InputProps, 'type'> & { symbol?: boolean };

export interface CurrencyFieldType extends D {
  onChange?: (value: number | undefined) => void;
}

export const CurrencyField: FC<CurrencyFieldType> = memo(
  ({
    variant = 'default',
    name,
    label,
    helperText,
    isRequired,
    isInvalid,
    leftIcon,
    rightIcon,
    showRequiredIcon = true,
    value,
    error,
    onChange,
    onBlur,
    labelInside,
    type,
    symbol = true,
    disabled = false,
    errorMessageSpacer = true,
    min,
    max,
    ...others
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: 'lg',
      variant: variant ? variant : 'default',
    });

    const memoizedOnChange = useCallback<NonNullable<NumberFormatProps['onValueChange']>>(
      (value) => {
        onChange?.(value.floatValue);
      },
      [onChange]
    );

    return (
      <FormControl
        id={name}
        isInvalid={isInvalid}
        isRequired={isRequired && showRequiredIcon}
        sx={styles.formControl}
        {...others}
      >
        {label && (
          <FormLabel {...(flushedLabelStyle(variant, styles.formLabel, value) as FormLabelProps)}>{label}</FormLabel>
        )}
        <InputGroup>
          {leftIcon && (
            <InputLeftElement zIndex={0} pointerEvents="none">
              {leftIcon}
            </InputLeftElement>
          )}
          <NumberFormat
            thousandSeparator="."
            decimalSeparator=","
            suffix={symbol ? '€' : undefined}
            decimalScale={2}
            customInput={Input}
            onValueChange={memoizedOnChange}
            /**
             * Input props
             */
            textAlign={variant === 'ghost' ? 'center' : 'left'}
            pt={variant === 'flushed' && label ? 5 : 0}
            variant={variant}
            value={value ? value : ''}
            placeholder={variant === 'default' ? label : ''}
            onBlur={onBlur}
            autoComplete="off"
            sx={styles.formInput}
            disabled={disabled}
            _focus={{
              pt: variant === 'flushed' && label ? 5 : 0,
            }}
            {...(min && {
              min: min,
            })}
            {...(max && {
              max: max,
            })}
          />

          {isInvalid && variant === 'flushed' && (
            <InputRightElement h="100%" alignItems="center" pointerEvents="none">
              <InputErrorIcon color="support.alert.500" />
            </InputRightElement>
          )}
          {rightIcon && !error && (
            <InputRightElement zIndex={0} pointerEvents="none">
              {rightIcon}
            </InputRightElement>
          )}
        </InputGroup>
        {variant === 'default' || variant === 'flushed' ? (
          <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
            {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
            <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
          </ErrorMessageContainer>
        ) : null}
      </FormControl>
    );
  }
);

export const CurrencyFormikField: FC<CurrencyFieldType> = ({ name, labelInside, ...props }) => {
  const { value, error, touch, setFieldValue, onBlur } = useFormikByName(name);

  const memoizedOnChange = useCallback<NonNullable<CurrencyFieldType['onChange']>>(
    (value) => {
      setFieldValue?.(name, value);
    },
    [name, setFieldValue]
  );

  return (
    <CurrencyField
      name={name}
      isInvalid={!!(touch && error)}
      error={error}
      value={value}
      onChange={memoizedOnChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export const CurrencyPrintField: FC<CurrencyFieldType> = ({
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
    <Box pos="relative" {...otherProps}>
      <Box
        minH="20px"
        backgroundColor="#F7F7F7"
        borderBottom="2px solid #c7c7c7"
        p={1}
        pt={labelInside ? 4 : undefined}
        fontSize="11px"
      >
        <Text>{formatNumToCurrency(value).replace('€', symbol ? '€' : '')}</Text>
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500" {...getLabelInsideProps()}>
          {label}
        </Text>
      )}
      {helperText && (
        <Text color="gray.600" fontSize="8px">
          {helperText}
        </Text>
      )}
    </Box>
  );
};
