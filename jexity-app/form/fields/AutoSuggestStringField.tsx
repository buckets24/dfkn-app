import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, useMultiStyleConfig } from '@chakra-ui/react';
import { AutoSuggestInput, AutoSuggestInputProps } from 'jexity-app/components/auto-suggest/AutoSuggestInput';
import React, { FC, useCallback } from 'react';
import { useFormikByName } from '../useFormikByName';
import { AutoSuggestStringFormField, FieldControl } from './fieldApi';

export const AutoSuggestStringFormikField: FC<
  FieldControl & Omit<AutoSuggestStringFormField, 'type'> & Pick<AutoSuggestInputProps, 'shouldRenderSuggestions'>
> = ({
  name,
  label,
  helperText,
  isRequired,
  leftIcon,
  rightIcon,
  showRequiredIcon = true,
  suggestions,
  shouldRenderSuggestions,
  ...others
}) => {
  const { value, touch, error, setFieldValue } = useFormikByName(name);
  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: leftIcon ? 'withLeftIcon' : rightIcon ? 'withRightIcon' : 'default',
  });

  const memoizedOnChange = useCallback(
    (value) => {
      setFieldValue && setFieldValue(name, value);
    },
    [setFieldValue, name]
  );

  return (
    <FormControl
      id={name}
      isInvalid={touch && error ? true : false}
      isRequired={isRequired && showRequiredIcon}
      sx={styles.formControl}
      {...others}
    >
      <FormLabel sx={styles.formLabel}>{label}</FormLabel>
      <AutoSuggestInput
        value={value}
        placeholder={label}
        onChange={memoizedOnChange}
        defaultSuggestions={suggestions}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        shouldRenderSuggestions={shouldRenderSuggestions}
      />
      <Box mt={1} mb={2} minH="16px">
        {helperText && !error && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
        <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
      </Box>
    </FormControl>
  );
};
