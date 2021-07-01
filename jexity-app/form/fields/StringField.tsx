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
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';
import { FC, memo } from 'react';
import { useFormikByName } from '../useFormikByName';
import { ErrorMessageContainer } from './common/ErrorMessageContainer';
import { FieldControl, StringFormField } from './fieldApi';

export type StringFieldType = FieldControl<HTMLInputElement> &
  Omit<StringFormField, 'type'> &
  Omit<BoxProps, 'onChange'> & { labelInside?: boolean } & Pick<InputProps, 'type'>;

export const StringField: FC<StringFieldType> = memo(
  ({
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
    labelInside,
    type,
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
          <Input
            textAlign={others.textAlign ? others.textAlign : variant === 'ghost' ? 'center' : 'left'}
            pt={variant === 'flushed' && label ? 5 : 0}
            variant={variant}
            value={value}
            placeholder={variant === 'default' ? label : ''}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="off"
            sx={styles.formInput}
            type={type}
            isDisabled={disabled}
            _focus={{
              pt: variant === 'flushed' && label ? 5 : 0,
            }}
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

export const StringFormikField: FC<StringFieldType> = ({ name, labelInside, ...props }) => {
  const { value, touch, error, onBlur, onChange } = useFormikByName(name);

  return (
    <StringField
      name={name}
      isInvalid={touch && error ? true : false}
      error={error}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export const StringPrintField: FC<StringFieldType> = ({
  label,
  name,
  labelInside = false,
  multirow,
  helperText,
  showRequiredIcon,
  isRequired,
  isReadOnly,
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
    <Box pos="relative" mb={2} {...otherProps}>
      <Box
        minH="26px"
        backgroundColor="#F7F7F7"
        borderBottom="2px solid #c7c7c7"
        p={1}
        pt={labelInside ? 4 : undefined}
        fontSize="11px"
      >
        <Text>{value}</Text>
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
