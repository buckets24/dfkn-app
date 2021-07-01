import React, { FC, useState, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';
import { SearchIcon } from 'jexity-app/icons/SearchIcon';
import { AutoSuggestInput, AutoSuggestInputProps } from 'jexity-app/components/auto-suggest/AutoSuggestInput';

export interface GlobalSearchBarProps extends Pick<AutoSuggestInputProps, 'defaultSuggestions'> {
  placeholder?: string;
  onChange: (v: string) => void;
}

const GlobalSearchBar: FC<GlobalSearchBarProps> = ({ placeholder, onChange, defaultSuggestions }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const debouncedOnChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  useEffect(() => {
    onChange(globalFilter);
  }, [globalFilter, onChange]);

  return (
    <AutoSuggestInput
      value={searchInput}
      placeholder={placeholder}
      leftIcon={<SearchIcon color="gray.600" />}
      onChange={(value) => {
        setSearchInput(value);
        debouncedOnChange(value);
      }}
      defaultSuggestions={defaultSuggestions}
    />
  );
};

export default GlobalSearchBar;
