import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useMultiStyleConfig,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  BoxProps,
} from '@chakra-ui/react';
import { FieldControl, PasswordFormField } from './fieldApi';
import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';

export type PasswordFieldType = FieldControl<HTMLInputElement> &
  Omit<PasswordFormField, 'type'> &
  Omit<BoxProps, 'onChange'>;

export const PasswordField: FC<FieldControl & Omit<PasswordFormField, 'type'>> = ({
  variant = 'default',
  name,
  label,
  helperText,
  isRequired = false,
  isInvalid,
  leftIcon,
  rightIcon,
  showRequiredIcon = true,
  value,
  error,
  onChange,
  onBlur,
  disabled = false,
  errorMessageSpacer = true,
  inputProps,
  ...others
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
      {...others}
    >
      <FormLabel sx={styles.formLabel}>{label}</FormLabel>
      <InputGroup>
        {leftIcon && (
          <InputLeftElement zIndex={0} pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        <Input
          type="password"
          value={value}
          placeholder={label}
          onChange={onChange}
          onBlur={onBlur}
          sx={styles.formInput}
        />
        {rightIcon && (
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
};

export const PasswordFormikField: FC<PasswordFieldType> = ({ name, ...props }) => {
  const { value = '', touch, error, onBlur, onChange } = useFormikByName(name);

  return (
    <PasswordField
      name={name}
      isInvalid={touch && error ? true : false}
      error={error}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};
