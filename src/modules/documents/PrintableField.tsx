import { BoxProps } from '@chakra-ui/react';
import { FieldControl, FieldValidationProperties } from 'jexity-app/form/fields/fieldApi';
import React, { FC } from 'react';
import { useDocFormMeta } from './useDocFormMeta';

type X = Omit<FieldValidationProperties, 'type'> & FieldControl & Omit<BoxProps, 'onChange' | 'onBlur' | 'onClick'>;

export interface PrintableFieldProps<T> {
  PrintComponent: FC<Pick<T & PrintableFieldProps<T>, Exclude<keyof T, 'PrintComponent' | 'EditComponent'>>>;
  EditComponent: FC<Pick<T & PrintableFieldProps<T>, Exclude<keyof T, 'PrintComponent' | 'EditComponent'>>>;
}

/**
 * This component acts as a higher order component,
 * it decides whether to render the formik field that
 * has all the change events or just a smaller read-only
 * field for displaying value.
 */

// export const PrintableField: FC<PrintableField<StringFieldType>Props & { labelInside?: boolean }> = (props) => {
export function PrintableField<T>(props: T & PrintableFieldProps<T> & X): ReturnType<FC> {
  const { EditComponent, PrintComponent, ...otherProps } = props;
  const { printMode } = useDocFormMeta();

  return printMode ? <PrintComponent {...otherProps} /> : <EditComponent {...otherProps} />;
}
