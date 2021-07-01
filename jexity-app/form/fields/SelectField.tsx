import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Select,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import formatDateToDe, { isDate } from 'jexity-app/utils/formatDateToDe';
import React, { FC } from 'react';
import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { FieldControl, SelectFormField } from './fieldApi';

export type SelectFieldType = FieldControl<HTMLSelectElement> & Omit<SelectFormField, 'type'>;

export const SelectField: FC<SelectFieldType> = ({
  name,
  isInvalid,
  isRequired = false,
  leftIcon,
  helperText,
  error,
  label,

  /**
   * TODO
   * Select props below, these are manually typed but maybe should extends chakra's Select component instead
   */
  value,
  onChange,
  onBlur,
  onClick,
  options,
  placeholder,
  errorMessageSpacer = true,
  variant = 'default',
  inputProps,
  showRequiredIcon,
  icon,
  rightIcon,
  disabled = false,
  ...otherProps
}) => {
  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: variant ? variant : 'default',
  });

  return (
    <FormControl
      id={name}
      isInvalid={isInvalid}
      isRequired={isRequired && showRequiredIcon}
      sx={styles.formControl}
      isDisabled={disabled}
      {...otherProps}
    >
      {label && <FormLabel sx={styles.formLabel}>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement zIndex={0} pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        <Select
          icon={icon}
          sx={{ ...styles.formInput }}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          placeholder={placeholder}
          disabled={disabled}
          value={value ?? ''}
        >
          {variant !== 'flushed' && <option value="">Bitte wählen</option>}
          {options.map(({ key, type, value, label }) => {
            if (type === 'formDateTimeOption' && isDate(value)) {
              return (
                <option value={value} key={key}>
                  {formatDateToDe(value)}
                </option>
              );
            }
            return (
              value && (
                <option value={value} key={key}>
                  {label || value}
                </option>
              )
            );
          })}
        </Select>
      </InputGroup>
      {variant === 'default' || variant === 'flushed' ? (
        <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
          {helperText && !error && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
          <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
        </ErrorMessageContainer>
      ) : null}
    </FormControl>
  );
};

export const SelectFormikField: FC<SelectFieldType> = ({ name, ...props }) => {
  const { touch, error, value, onBlur, onChange } = useFormikByName(name);

  return (
    <SelectField
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      isInvalid={touch && error ? true : false}
      error={error}
      {...props}
    />
  );
};
