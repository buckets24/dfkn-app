import { FC, memo } from 'react';
import { FieldControl, MultiSelectFormField } from './fieldApi';
import {
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { InputErrorIcon } from 'jexity-app/icons/InputErrorIcon';
import { MultiSelect } from 'jexity-app/components/multi-select/MultiSelect';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { useFormikByName } from '../useFormikByName';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';

type MultiSelectFieldType = FieldControl<HTMLInputElement> &
  Omit<MultiSelectFormField, 'type'> &
  Omit<BoxProps, 'onChange'>;

export interface ItemType {
  label: string;
  value: string | number;
}

export const MultiSelectField: FC<MultiSelectFieldType> = memo(
  ({
    variant = 'default',
    name,
    label,
    helperText,
    isRequired,
    leftIcon,
    showRequiredIcon,
    placeholder,
    value,
    error,
    isInvalid,
    options,
    onChange,
    onBlur,
    disabled,
    errorMessageSpacer = true,
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: 'lg',
      variant: variant ? variant : 'default',
    });

    return (
      <FormControl id={name} isInvalid={isInvalid} isRequired={isRequired && showRequiredIcon} sx={styles.formControl}>
        <FormLabel {...(flushedLabelStyle(variant, styles.formLabel, value) as FormLabelProps)}>{label}</FormLabel>
        <InputGroup>
          {leftIcon && (
            <InputLeftElement zIndex={0} pointerEvents="none">
              {leftIcon}
            </InputLeftElement>
          )}
          <MultiSelect
            defaultValue={value}
            options={options}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            isInvalid={isInvalid}
            isDisabled={disabled}
          />
          {isInvalid && variant === 'flushed' && (
            <InputRightElement zIndex={0} h="100%" alignItems="center" pointerEvents="none">
              <InputErrorIcon />
            </InputRightElement>
          )}
        </InputGroup>
        {variant === 'default' || variant === 'flushed' ? (
          <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
            {helperText && !error && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
            <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
          </ErrorMessageContainer>
        ) : null}
      </FormControl>
    );
  }
);

export const MultiSelectFormikField: FC<MultiSelectFieldType> = ({ name, ...props }) => {
  const { touch, error, value, onChange, onBlur } = useFormikByName(name);

  return (
    <MultiSelectField
      name={name}
      value={value}
      isInvalid={touch && error ? true : false}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};
