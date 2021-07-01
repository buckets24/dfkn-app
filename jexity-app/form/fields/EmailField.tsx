import {
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { InputErrorIcon } from 'jexity-app/icons/InputErrorIcon';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';
import { FC, memo } from 'react';
import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { EmailFormField, FieldControl } from './fieldApi';

type EmailFieldType = FieldControl<HTMLInputElement> & Omit<EmailFormField, 'type'> & Omit<BoxProps, 'onChange'>;

export const EmailField: FC<EmailFieldType> = memo(
  ({
    name,
    label,
    value,
    onChange,
    onBlur,
    variant = 'default',
    leftIcon,
    rightIcon,
    isInvalid,
    isRequired = false,
    helperText,
    touched,
    error,
    errorMessageSpacer = true,
    isLoading = false,
    ...others
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: 'lg',
      variant: variant ? variant : 'default',
    });

    return (
      <FormControl id={name} isInvalid={isInvalid} isRequired={isRequired} sx={styles.formControl} {...others}>
        {label && (
          <FormLabel {...(flushedLabelStyle(variant, styles.formLabel, value) as FormLabelProps)}>{label}</FormLabel>
        )}
        <InputGroup>
          {leftIcon && (
            <InputLeftElement zIndex={0} pointerEvents="none">
              {leftIcon}
            </InputLeftElement>
          )}
          <Input
            pt={value && variant === 'flushed' ? 5 : 0}
            type="email"
            variant={variant}
            value={value}
            placeholder={variant !== 'flushed' ? label : ''}
            onChange={onChange}
            onBlur={onBlur}
            sx={styles.formInput}
          />
          {touched && error && variant === 'flushed' && (
            <InputRightElement zIndex={0} h="100%" alignItems="center" pointerEvents="none">
              <InputErrorIcon />
            </InputRightElement>
          )}
          {value && isLoading && (
            <InputRightElement h="100%" w="50px">
              <Spinner size="xs" color="gray.300" />
            </InputRightElement>
          )}
          {rightIcon && !value && (
            <InputRightElement zIndex={0} h="48px" pointerEvents="none">
              {rightIcon}
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

export const EmailFormikField: FC<EmailFieldType> = ({
  name,
  variant,
  label,
  helperText,
  isRequired,
  leftIcon,
  rightIcon,
  showRequiredIcon = true,
  hasChecker,
  isLoading,
  onBlur,
  ...props
}) => {
  const { value = '', touch, error, onBlur: formikOnBlur, onChange } = useFormikByName(name);

  return (
    <EmailField
      name={name}
      label={label}
      value={value}
      variant={variant}
      onChange={onChange}
      onBlur={hasChecker ? onBlur : formikOnBlur}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isRequired={isRequired && showRequiredIcon}
      isInvalid={touch && error ? true : false}
      error={error}
      touched={!!touch}
      helperText={helperText}
      {...props}
      isLoading={isLoading}
    />
  );
};
