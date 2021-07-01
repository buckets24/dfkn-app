import de from 'date-fns/locale/de';
import React, { FC } from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { CalenderHeader } from './CalendarHeader';
import { CalendarStyle } from './CalendarStyle';
registerLocale('de', de);

export interface CalendarProps extends ReactDatePickerProps {
  withTime?: boolean;
  disableDaySelection?: boolean;
  boxShadow?: boolean; // Since react-datepicker uses poper internally we can't style it from outside the component
}

/**
 * Styling is placed on a different file but we could technically
 * put it within this component. I was debating if it was a good
 * approach but it is easy to move anyway
 */
export const Calendar: FC<CalendarProps> = ({
  withTime,
  boxShadow = false,
  disableDaySelection = false,
  autoComplete,
  dateFormat,
  minDate,
  maxDate,
  ...props
}) => {
  let timeProps: Partial<ReactDatePickerProps> = {};
  if (withTime) {
    timeProps = {
      showTimeSelect: true,
      timeFormat: 'H:mm',
      timeIntervals: 15,
      timeCaption: 'Uhrzeit',
      /**
       * Turns out it is too much effort without certainty to assume how the meeting data
       * will look like, but below we can push Date object with specific times.
       */
      // includeTimes: [],
    };
  }

  return (
    <>
      <CalendarStyle boxShadow={boxShadow} disableDaySelection={disableDaySelection} />
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        renderCustomHeader={(props) => <CalenderHeader minDate={minDate} maxDate={maxDate} {...props} />}
        dropdownMode="select"
        locale="de"
        dateFormat={withTime ? `dd.MM.yyyy, ${timeProps.timeFormat}` : dateFormat ? dateFormat : 'dd.MM.yyyy'}
        {...timeProps}
        {...props}
        autoComplete="off"
      />
    </>
  );
};
