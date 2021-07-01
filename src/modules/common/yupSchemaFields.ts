import { string, number, StringSchema, NumberSchema, object, boolean, BooleanSchema } from 'yup';
import { defaultErrorMessages } from 'jexity-app/form/errorMessages';
import { DefinedStringSchema } from 'yup/lib/string';
import { DefinedBooleanSchema } from 'yup/lib/boolean';

/**
 * String
 */
export const yupString = (
  required = false,
  requiredMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string().required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg);
  }

  return string().nullable().default('');
};

export const yupStringRequired = (
  requiredMessage?: string | undefined | null
): DefinedStringSchema<string | undefined, Record<string, any>> => {
  return string()
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .defined()
    .default('');
};

/**
 * Boolean
 */
export const yupBoolean = (
  required = false,
  requiredMessage?: string | undefined | null
): BooleanSchema<boolean | undefined | null, Record<string, any>, boolean | undefined | null> => {
  if (required) {
    return boolean().required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg);
  }

  return boolean().nullable().default(false);
};

export const yupBooleanRequired = (
  requiredMessage?: string | undefined | null
): DefinedBooleanSchema<boolean | undefined, Record<string, any>> => {
  return boolean()
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .defined()
    .default(false);
};

/**
 * Select / Radio
 */
export const yupOptions = (
  options: string[],
  required = false,
  requiredMessage?: string | undefined | null,
  invalidSelectionMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string()
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .oneOf(options, invalidSelectionMessage ?? defaultErrorMessages.globalRequiredMsg)
      .default('');
  }

  return string()
    .oneOf([undefined, null, '', ...options], invalidSelectionMessage ?? defaultErrorMessages.globalRequiredMsg)
    .nullable()
    .default(undefined);
};

/**
 * Email
 */
export const yupEmail = (
  required = false,
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  if (required) {
    return string()
      .email(invalidFormatErrorMessage ?? defaultErrorMessages.invalidEmailMsg)
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .defined();
  }

  return string().email().nullable();
};

export const yupEmailRequired = (
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): DefinedStringSchema<string | undefined, Record<string, any>> => {
  return string()
    .email(invalidFormatErrorMessage ?? defaultErrorMessages.invalidEmailMsg)
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .defined()
    .default('');
};

/**
 * Number
 */
export const yupNumber = (
  required = false,
  requiredMessage?: string | undefined | null,
  invalidFormatErrorMessage?: string | undefined | null
): NumberSchema<number | undefined | null, Record<string, any>, number | undefined | null> => {
  if (required) {
    return number()
      .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
      .typeError(invalidFormatErrorMessage ?? defaultErrorMessages.invalidNumberFormatMsg);
  }
  return number()
    .typeError(invalidFormatErrorMessage ?? defaultErrorMessages.invalidNumberFormatMsg)
    .nullable();
};

/**
 * Password
 */
export const yupPassword = (
  requiredMessage?: string | undefined | null
): StringSchema<string | undefined | null, Record<string, any>, string | undefined | null> => {
  return string()
    .required(requiredMessage ?? defaultErrorMessages.globalRequiredMsg)
    .matches(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, defaultErrorMessages.invalidPasswordMsg);
};

export interface LoginInput {
  email: string;
  password: string;
}
export const loginFormYupSchema = object().shape({
  email: yupStringRequired(),
  password: yupStringRequired(),
});

export const newAccountFormYupSchema = object().shape({
  password: yupPassword(),
  repeatPassword: yupPassword(),
});

export const verifyEmailFormYupSchema = object().shape({
  email: yupStringRequired(),
});

export const resetPasswordFormYupSchema = object().shape({
  verificationCode: yupStringRequired(),
  password: yupPassword(),
  repeatPassword: yupPassword(),
});
