import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import fuzzySort from 'fuzzysort';
import { useBaseTheme } from 'jexity-app/baseTheme/baseTheme';
import React, { FC, ReactNode, useCallback, useState } from 'react';
import Autosuggest, { ShouldRenderSuggestions, SuggestionsFetchRequested } from 'react-autosuggest';

export interface AutoSuggestInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  /**
   * We can actually handle objects rather than strings for this auto suggest component.
   * Example, make the value of the input be `Ids` but display the `name`. We'll keep it
   * simple for now.
   */
  defaultSuggestions: string[];
  onChange: (value: string) => void;
  value?: string;
  maxSuggestionsDisplayed?: number;

  shouldRenderSuggestions?: ShouldRenderSuggestions;

  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
}

export const AutoSuggestInput: FC<AutoSuggestInputProps> = ({
  defaultSuggestions,
  onChange,
  value = '',
  maxSuggestionsDisplayed = 30,
  leftIcon,
  rightIcon,
  shouldRenderSuggestions,
  ...otherInputProps
}) => {
  const { colors } = useBaseTheme();

  /**
   * Active suggestions
   */
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = useCallback<SuggestionsFetchRequested>(
    ({ value }) => {
      if (value === '' && shouldRenderSuggestions) {
        setSuggestions(defaultSuggestions.slice(0, maxSuggestionsDisplayed));
      } else {
        const filtered = fuzzySort.go(value, defaultSuggestions);
        setSuggestions(filtered.slice(0, maxSuggestionsDisplayed).map((v) => v.target));
      }
    },
    [defaultSuggestions, setSuggestions, maxSuggestionsDisplayed, shouldRenderSuggestions]
  );

  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: leftIcon ? 'withLeftIcon' : rightIcon ? 'withRightIcon' : 'default',
  });

  return (
    <>
      <style jsx global>{`
        .react-autosuggest__container {
          position: relative;
        }

        .react-autosuggest__suggestions-container {
          position: absolute;
          width: 100%;
          z-index: 2;
        }

        .react-autosuggest__suggestions-list {
          padding: 0 1rem;
          list-style: none;
          max-height: 400px;
          overflow: auto;
          border-radius: 4px;
          border: 1px solid ${colors?.gray?.[300]};
          background-color: white;
          box-shadow: 0px 1px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
          border-radius: 4px;
        }

        .react-autosuggest__suggestion {
          padding: 0.2rem 0;
          cursor: pointer;
        }
      `}</style>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={getSuggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        inputProps={{
          onChange: (_, { newValue }) => {
            onChange(newValue);
          },
          value: value,
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => {
          return <Box>{suggestion}</Box>;
        }}
        renderInputComponent={(inputProps) => (
          <InputGroup fontFamily="heading" fontWeight={500}>
            {leftIcon && (
              <InputLeftElement mt={1} zIndex={2}>
                {leftIcon}
              </InputLeftElement>
            )}
            <Input sx={styles.formInput} {...otherInputProps} {...(inputProps as any)} />
            {rightIcon && (
              <InputRightElement mt={1} zIndex={2}>
                {rightIcon}
              </InputRightElement>
            )}
          </InputGroup>
        )}
        shouldRenderSuggestions={shouldRenderSuggestions}
      />
    </>
  );
};
