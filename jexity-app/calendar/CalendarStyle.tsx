import { useBaseTheme } from 'jexity-app/baseTheme/baseTheme';
import { FC } from 'react';

export interface CalendarStyleProps {
  boxShadow?: boolean;
  disableDaySelection?: boolean;
}

export const CalendarStyle: FC<CalendarStyleProps> = ({ boxShadow = false, disableDaySelection = false }) => {
  const { colors, fonts, fontSizes } = useBaseTheme();

  return (
    <style jsx global>{`
      .react-datepicker {
        display: inline-flex;
        font-family: ${fonts?.body};
        text-transform: uppercase;
        color: ${colors?.gray?.[900]};
        vertical-align: middle;
        border: 0;

        ${boxShadow ? `box-shadow: 0px 12px 32px rgba(26, 26, 26, 0.24);` : ''}
        padding: 16px;
      }

      .react-datepicker-wrapper {
        width: 100%;
      }

      .react-datepicker-popper {
        z-index: 2;
      }

      .react-datepicker__navigation--previous {
        border-right-color: black;
      }

      .react-datepicker__navigation--next {
        right: 10px;
        border-left-color: black;
      }

      .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
        right: 118px;
      }

      .react-datepicker__header {
        background-color: transparent;
        border-bottom: none;
      }

      .react-datepicker__navigation {
        top: 26px;
      }

      .react-datepicker__navigation:focus {
        outline: none;
      }
      .react-datepicker__month {
        margin: 0;
        ${disableDaySelection ? `pointer-events: none;` : ''}
      }

      .react-datepicker__current-month {
        font-size: ${fontSizes?.xs};
        letter-spacing: 1px;
        font-weight: bold;
        margin-bottom: 1em;
      }

      .react-datepicker__day-name {
        font-weight: bold;
        color: ${colors?.gray?.[500]};
        letter-spacing: 1px;
      }

      .react-datepicker__day {
        font-size: ${fontSizes?.sm};
      }

      .react-datepicker__day-name,
      .react-datepicker__day,
      .react-datepicker__time-name {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: 0;
      }

      .react-datepicker__day,
      .react-datepicker__time-name {
        font-weight: 500;
      }

      .react-datepicker__day--outside-month {
        color: ${colors?.gray?.[400]};
      }

      .react-datepicker__day--selected,
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--selected,
      .react-datepicker__month-text--in-selecting-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--selected,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--selected,
      .react-datepicker__year-text--in-selecting-range,
      .react-datepicker__year-text--in-range {
        color: white;
        background-color: ${colors?.brand?.primary[500]};
        border-radius: 50%;
      }
      .react-datepicker__day--selected:hover,
      .react-datepicker__day--in-selecting-range:hover,
      .react-datepicker__day--in-range:hover,
      .react-datepicker__month-text--selected:hover,
      .react-datepicker__month-text--in-selecting-range:hover,
      .react-datepicker__month-text--in-range:hover,
      .react-datepicker__quarter-text--selected:hover,
      .react-datepicker__quarter-text--in-selecting-range:hover,
      .react-datepicker__quarter-text--in-range:hover,
      .react-datepicker__year-text--selected:hover,
      .react-datepicker__year-text--in-selecting-range:hover,
      .react-datepicker__year-text--in-range:hover {
        background-color: ${colors?.brand?.primary[900]};
      }

      .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected {
        color: white;
      }

      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
        border-bottom-color: white;
        ${boxShadow ? `box-shadow: 0px 12px 32px rgba(26, 26, 26, 0.24);` : ''}
      }

      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
        border-bottom-color: 'none';
      }

      .react-datepicker__time-container {
        margin-left: 20px;
        padding-left: 10px;
        padding-right: 0;
        height: 100%;
        width: 100%;
      }

      .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
        width: 100%;
      }

      .react-datepicker-time__header {
        text-transform: none;
      }

      .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item {
        min-height: 40px;
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        transition: 0.25s ease-in;
        font-size: 14px;
        font-weight: 400;
      }

      .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item--selected {
        color: white;
        background: ${colors?.brand?.primary[500]};
        border-radius: 4px;
      }

      .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item:hover {
        color: white;
        background: ${colors?.brand?.primary[500]};
        border-radius: 4px;
      }

      .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected {
        background: ${colors?.brand?.primary[500]};
        border-radius: 50%;
      }

      .react-datepicker__day--keyboard-selected:hover,
      .react-datepicker__month-text--keyboard-selected:hover,
      .react-datepicker__quarter-text--keyboard-selected:hover,
      .react-datepicker__year-text--keyboard-selected:hover {
        background: ${colors?.brand?.primary[900]};
        border-radius: 50%;
      }

      .react-datepicker__year-text--keyboard-selected:last-child {
        background: white;
      }

      .react-datepicker__day:hover,
      .react-datepicker__month-text:hover,
      .react-datepicker__quarter-text:hover,
      .react-datepicker__year-text:hover {
        border-radius: 50%;
      }
    `}</style>
  );
};
