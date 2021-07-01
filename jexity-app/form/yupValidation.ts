import {
  object,
  string,
  number,
  boolean,
  ObjectSchema,
  StringSchema,
  NumberSchema,
  BooleanSchema,
  array,
  ArraySchema,
} from 'yup';
import { defaultErrorMessages } from './errorMessages';
import { SpecifiedField } from './fields/fieldApi';
import { ObjectShape } from 'yup/lib/object';

export interface YupFieldErrors {
  required?: string;
  format?: string;
}

export interface YupConfig {
  errMessages: {
    [key: string]: YupFieldErrors;
  };
}

export interface InitialStructure {
  [key: string]:
    | StringSchema<string | undefined>
    | NumberSchema<number | undefined>
    | BooleanSchema<boolean | undefined>
    | ArraySchema<never>;
}

export function formValidationSchema(
  formFields: SpecifiedField[],
  initialStructure: InitialStructure = {}
): ObjectSchema<ObjectShape> {
  const structure = initialStructure;
  formFields.forEach((field) => {
    switch (field.type) {
      case 'stringFormField':
        let stringSchema = string();
        if (field.isRequired) {
          stringSchema = stringSchema.required(field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg);
        }
        structure[field.name] = stringSchema;
        break;
      case 'emailFormField':
        let emailSchema = string().email(field.invalidFormatErrorMessage ?? defaultErrorMessages.invalidEmailMsg);
        if (field.isRequired) {
          emailSchema = emailSchema.required(field.isRequiredErrorMessage ?? defaultErrorMessages.requiredEmailMsg);
        }
        structure[field.name] = emailSchema;
        break;
      case 'numberFormField':
        let numberSchema = number().typeError(
          field.invalidFormatErrorMessage ?? defaultErrorMessages.invalidNumberFormatMsg
        );
        if (typeof field.min === 'number') {
          numberSchema = numberSchema.min(field.min, defaultErrorMessages.numberTooLowMsg);
        }
        if (typeof field.max === 'number') {
          numberSchema = numberSchema.max(field.max, defaultErrorMessages.numberTooHighMsg);
        }
        if (field.isRequired) {
          numberSchema = numberSchema.required(field.isRequiredErrorMessage);
        }
        structure[field.name] = numberSchema;
        break;
      case 'checkboxFormField':
        let checkboxSchema = boolean();
        if (field.isRequired) {
          checkboxSchema = checkboxSchema.oneOf(
            [true],
            field.isRequiredErrorMessage ?? defaultErrorMessages.checkboxRequired
          );
        }
        structure[field.name] = checkboxSchema;
        break;
      case 'selectFormField':
        let selectSchema = string().oneOf(field.options.map((opt) => opt.value));
        if (field.isRequired) {
          selectSchema = selectSchema.required(field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg);
        }
        structure[field.name] = selectSchema;
        break;
      case 'radioFormField':
        let radioSchema = string().oneOf(field.options.map((opt) => opt.value));
        if (field.isRequired) {
          radioSchema = radioSchema.required(field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg);
        }
        structure[field.name] = radioSchema;
        break;
      case 'passwordFormField':
        let passwordSchema = string();
        if (field.isRequired) {
          passwordSchema = passwordSchema.required(
            field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg
          );
        }
        structure[field.name] = passwordSchema;
        break;
      case 'dateFormField':
        let dateSchema = string();
        if (field.isRequired) {
          dateSchema = dateSchema.required(field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg);
        }
        structure[field.name] = dateSchema;
        break;
      case 'signatureFormField':
        let signatureSchema = string();
        if (field.isRequired) {
          signatureSchema = signatureSchema.required(
            field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg
          );
        }
        structure[field.name] = signatureSchema;
        break;
      case 'multiSelectFormField':
        let multiSelectSchema = array().ensure() as ArraySchema<never>;

        if (field.isRequired) {
          multiSelectSchema = multiSelectSchema.required(
            field.isRequiredErrorMessage ?? defaultErrorMessages.globalRequiredMsg
          );
        }

        structure[field.name] = multiSelectSchema;
        break;
    }
  });

  return object().shape(structure);
}
