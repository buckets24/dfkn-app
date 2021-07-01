import { Box, BoxProps, FormHelperText, Textarea, useMultiStyleConfig } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useFormikByName } from '../useFormikByName';
import { FieldControl, MultilineStringFormField } from './fieldApi';

type MultilineStringFieldType = FieldControl<HTMLInputElement> & Omit<MultilineStringFormField, 'type'> & BoxProps;

export const MultilineStringField: FC<MultilineStringFieldType> = memo(
  ({
    name,
    label,
    value,
    onChange,
    onBlur,
    variant,
    isInvalid,
    isRequired,
    helperText,
    error,
    multirow,
    showRequiredIcon,
    touched,
    size = 'lg',
    ...others
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: size,
      variant,
    });

    return (
      <Box {...others}>
        <Textarea
          resize="none"
          name={name}
          variant={variant}
          value={value}
          placeholder={variant !== 'flushed' ? label : ''}
          onChange={onChange}
          onBlur={onBlur}
          minH="127px"
          isInvalid={isInvalid}
          isRequired={isRequired}
          sx={styles.formTextArea}
        />
        {helperText && !error && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
        {error && (
          <Box mt={1} mb={2} minH="16px" sx={styles.formError}>
            {error}
          </Box>
        )}
      </Box>
    );
  }
);

export const MultilineStringFormikField: FC<MultilineStringFieldType> = ({
  name,
  variant,
  label,
  helperText,
  isRequired,
  ...props
}) => {
  const { value, touch, error, onBlur, onChange } = useFormikByName(name);

  return (
    <MultilineStringField
      name={name}
      label={label}
      value={value}
      variant={variant}
      onChange={onChange}
      onBlur={onBlur}
      isRequired={isRequired}
      isInvalid={touch && error ? true : false}
      error={error}
      touched={!!touch}
      helperText={helperText}
      {...props}
    />
  );
};
