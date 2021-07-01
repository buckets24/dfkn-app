import { Box, BoxProps, Checkbox, FormHelperText, useMultiStyleConfig } from '@chakra-ui/react';
import { FC } from 'react';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { useFormikByName } from '../useFormikByName';
import { CheckboxFormField, FieldControl } from './fieldApi';

export type CheckboxFieldType = FieldControl<HTMLInputElement> & Omit<CheckboxFormField, 'type'> & BoxProps;

export const CheckboxField: FC<CheckboxFieldType> = ({
  name,
  label,
  helperText,
  value,
  isRequired,
  isInvalid,
  error,
  onChange,
  onBlur,
  ...others
}) => {
  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: value ? 'checked' : isInvalid ? 'invalid' : 'default',
  });

  return (
    <Box d="flex" alignItems="center" {...others}>
      <Checkbox
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isRequired={isRequired}
        size="lg"
        sx={styles.formCheckbox}
        colorScheme="documents.secondary.700"
        icon={<CheckIcon w="14px" h="11px" opacity={value ? 1 : 0} />}
      />
      <Box ml={4} color={isInvalid ? 'support.alert.500' : 'inherit'}>
        <Box as="span" sx={styles.formLabel}>
          {label}
        </Box>
        {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
        {isInvalid && (
          <Box mt={1} mb={2} minH="16px" sx={styles.formError}>
            {error}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const CheckboxFormikField: FC<CheckboxFieldType> = ({ name, ...props }) => {
  const { value, touch, error, onBlur, onChange } = useFormikByName(name);

  return (
    <CheckboxField
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
