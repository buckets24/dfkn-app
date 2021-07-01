import { InputProps, SelectProps, StackDirection } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { FocusEventHandler, FormEventHandler, MouseEventHandler, ReactNode } from 'react';
import { Props as ReactSelectProps } from 'react-select';

type F = Record<string, string | number | boolean>;

export type FieldTypes =
  | StringFormField['type']
  | EmailFormField['type']
  | SelectFormField['type']
  | RadioFormField['type']
  | NumberFormField['type']
  | CheckboxFormField['type']
  | DateFormField['type']
  | PasswordFormField['type']
  | SignatureFormField['type']
  | MultiSelectFormField['type']
  | MultilineStringFormField['type']
  | CurrencyFormField['type'];

export type SpecifiedField<T = F> =
  | StringFormField<T>
  | MultilineStringFormField<T>
  | EmailFormField
  | SelectFormField
  | RadioFormField
  | NumberFormField
  | CheckboxFormField
  | PasswordFormField
  | DateFormField
  | SignatureFormField
  | MultiSelectFormField
  | CurrencyFormField;

/**
 * Field properties are object properties used to determine
 * how a component should handle validation and schema.
 * These props are non-standard DOM properties and our used only for our own logic
 */
export interface FieldValidationProperties<T = F> {
  /**
   * Used by yupValidation to determine its schema type and validation logic
   */
  type?: FieldTypes;

  /**
   * Used to determin if the schema should mark the field as required
   */
  isRequired?: boolean;

  /**
   * Key of the actual object property
   */
  name: keyof T;
}

/**
 * These are properties that you usually use for rendering an actual DOM
 * input element. These are not read by any custom logic like yup validation.
 * This interface is ONLY extended by actual components!
 */
export interface FieldControl<T = Element> {
  /**
   * TODO:
   * extend accordingly. For now value will only be a string.
   */
  value?: string | any;
  onChange?: FormEventHandler<T> | any;
  onBlur?: FocusEventHandler;
  onClick?: MouseEventHandler;
  label?: string;
  variant?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
  showRequiredIcon?: boolean;
  isInvalid?: boolean; // I'm so torn whether this property should be here.
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  touched?: boolean;
  isReadOnly?: boolean;

  /**
   * Not all fields support this yet
   */
  errorMessageSpacer?: boolean;
  inputProps?: InputProps;
}

export interface IsRequiredErrorMessage {
  isRequiredErrorMessage?: string;
}

export interface InvalidFormatErrorMessage {
  invalidFormatErrorMessage?: string;
}

export interface StringFormField<T = F> extends FieldValidationProperties<T>, IsRequiredErrorMessage {
  type: 'stringFormField';
  /**
   * Max string LENGTH
   */
  max?: number;
  min?: number;
  multirow?: boolean;
  isDisabled?: boolean;
}

export interface PasswordFormField extends FieldValidationProperties, IsRequiredErrorMessage {
  type: 'passwordFormField';
  /**
   * Max string LENGTH
   */
}

export interface MultilineStringFormField<T = F> extends FieldValidationProperties<T>, IsRequiredErrorMessage {
  type: 'multilineStringFormField';
  multirow: true;
  size?: 'sm' | 'md' | 'lg';
}

export interface AutoSuggestStringFormField extends Omit<StringFormField, 'multirow'> {
  /**
   * Possible values of this field
   */
  suggestions: string[];
}

export interface EmailFormField extends FieldValidationProperties, IsRequiredErrorMessage, InvalidFormatErrorMessage {
  type: 'emailFormField';
  existensCheck?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  hasChecker?: boolean;
}

export interface SelectFormFieldOption {
  type: 'formStringOption' | 'formDateTimeOption';
  key: string;
  value: string;
  label?: string;
}

export interface SelectFormField extends Omit<FieldValidationProperties, 'rightIcon'>, IsRequiredErrorMessage {
  type: 'selectFormField';
  options: SelectFormFieldOption[];
  icon?: SelectProps['icon'];
  isDisabled?: boolean;
}
export interface MultiSelectFormField
  extends Omit<FieldValidationProperties, 'rightIcon'>,
    IsRequiredErrorMessage,
    Pick<ReactSelectProps, 'options'> {
  type: 'multiSelectFormField';
}

export interface RadioFormField
  extends Omit<FieldValidationProperties, 'leftIcon' | 'rightIcon'>,
    IsRequiredErrorMessage {
  type: 'radioFormField';
  direction?: StackDirection;
  options: {
    key: string;
    label: string | ReactNode;
    value: string;
  }[];
  size?: 'sm' | 'md' | 'lg';
  dottedShowLabel?: boolean;
}

export interface NumberFormField extends FieldValidationProperties, IsRequiredErrorMessage, InvalidFormatErrorMessage {
  type: 'numberFormField';
  /**
   * Max number VALUE
   */
  max?: number;
  min?: number;
}

export interface CheckboxFormField extends Omit<FieldValidationProperties, 'label'>, IsRequiredErrorMessage {
  type: 'checkboxFormField';
  label?: string;
}

export interface DateFormField extends FieldValidationProperties, IsRequiredErrorMessage {
  type: 'dateFormField';
  withTime?: boolean;
  disablePastDates?: boolean;
  disablePastTime?: boolean;
  disableFutureDates?: boolean;
}

export interface SignatureFormField extends FieldValidationProperties, IsRequiredErrorMessage {
  type: 'signatureFormField';
  signature?: string;
  writeOnce?: boolean;
}

export interface CurrencyFormField extends FieldValidationProperties, IsRequiredErrorMessage {
  type: 'currencyFormField';
}

export interface FieldValues {
  [key: string]: string | number | boolean | any;
}

export const getInitialValues = (formFields: SpecifiedField[] = []): FieldValues => {
  const values: FieldValues = {};

  formFields.forEach((formField) => {
    if (formField.type === 'selectFormField') {
      values[formField.name] = formField.options[0].value;
    } else if (formField.type === 'checkboxFormField') {
      values[formField.name] = false;
    } else if (formField.type === 'multiSelectFormField') {
      values[formField.name] = [];
    } else {
      values[formField.name] = '';
    }
  });

  return values;
};

export const extractOptions = (initialValues: SpecifiedField[] = [], name: string): any => {
  const values = initialValues as any;
  let options = [];

  for (let i = 0; i < values.length; i++) {
    if (values[i].name === name) {
      options = values[i].options;
    }
  }

  return options;
};
