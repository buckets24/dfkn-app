import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { MonthDropdown, MonthDropdownProps } from './MonthDropdown';
import { YearDropdown, YearDropdownProps } from './YearDropdown';

export const CalenderHeader: FC<MonthDropdownProps & YearDropdownProps> = (props) => {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    minDate,
    maxDate,
  } = props;
  return (
    <Flex>
      <MonthDropdown
        date={date}
        changeMonth={changeMonth}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
      />
      <YearDropdown
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        changeYear={changeYear}
        increaseYear={increaseYear}
        decreaseYear={decreaseYear}
      />
    </Flex>
  );
};
