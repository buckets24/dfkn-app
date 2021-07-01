import { FormikConfig, FormikContext, FormikContextType, FormikValues, useFormik } from 'formik';
import { FC, ReactNode, useEffect } from 'react';
import NoExtraProperties from 'jexity-app/utils/type-utils/NoExtraProperties';
import { createContext, useContextSelector } from 'use-context-selector';

export const SpecialFormikContext = createContext<FormikContextType<any> | null>(null);

export type FormikBag = ReturnType<typeof useFormik>;

interface SpecialFormikContextProviderProps<T> extends Omit<FormikConfig<T>, 'onSubmit' | 'initialValues'> {
  onChange?: (v: FormikValues) => void;
  /**
   * TODO: someday figure this out
   * For functions that are passed to this context,
   * I am unable to figure out how to handle the typings.
   * useFormik does not have explicit return type, so we use ReturnType<typeof useFormik>
   * but this method does not allow us to pass a type generic
   */
  children: ((props: any) => ReactNode) | ReactNode;
  onSubmit?: FormikConfig<T>['onSubmit'];
  initialValues: NoExtraProperties<T>;
}

export function SpecialFormikContextProvider<T = any>({
  children,
  onChange,
  onSubmit,
  ...formikConfig
}: SpecialFormikContextProviderProps<T>): ReturnType<FC> {
  const formikBag = useFormik<T>({
    ...formikConfig,

    onSubmit: onSubmit ?? (() => undefined), // Sometimes we don't need the on submit
  });

  const output = typeof children === 'function' ? children(formikBag) : children;

  useEffect(() => {
    onChange?.(formikBag.values);
  }, [formikBag.values, onChange]);

  return (
    <SpecialFormikContext.Provider value={formikBag}>
      {/* NOTICE that the below there is still FormikContext, double context. It just allows for backwards compatibility with useFormikContext() but still can use useFormikByName() */}
      {/* This could be removed eventually. I'm thinking though that there is no harm in keeping this */}
      <FormikContext.Provider value={formikBag}>{output}</FormikContext.Provider>
    </SpecialFormikContext.Provider>
  );
}

export type UseFormikByNameResult<T, E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = {
  value: T[keyof T] | E['value'] | any;
  error: FormikContextType<T>['errors'][keyof T];
  touch: FormikContextType<T>['touched'][keyof T];
  // onChange: FormikContextType<T>['handleChange'] | undefined;
  onChange: (e: React.ChangeEvent<E>) => void; // This is the type used within the FormikBag, but here we pass <E> instead of any from
  onBlur: FormikContextType<T>['handleBlur'] | undefined;
  setFieldValue: FormikContextType<T>['setFieldValue'] | undefined;
  setFieldTouched: FormikContextType<T>['setFieldTouched'] | undefined;
  initialValue: T[keyof T];
};
export function useFormikByName<T, E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
  name: keyof T
): UseFormikByNameResult<T, E> {
  type F = FormikContextType<T>;
  const value = useContextSelector(SpecialFormikContext, (c) => c?.values[name] as F['values'][keyof T]);
  const touch = useContextSelector(SpecialFormikContext, (c) => c?.touched[name] as F['touched'][keyof T]);
  const error = useContextSelector(SpecialFormikContext, (c) => c?.errors[name] as F['errors'][keyof T]);
  const onChange = useContextSelector(SpecialFormikContext, (c) => c?.handleChange as F['handleChange']);
  const onBlur = useContextSelector(SpecialFormikContext, (c) => c?.handleBlur as F['handleBlur']);
  const setFieldValue = useContextSelector(SpecialFormikContext, (c) => c?.setFieldValue as F['setFieldValue']);
  const setFieldTouched = useContextSelector(SpecialFormikContext, (c) => c?.setFieldTouched as F['setFieldTouched']);
  const initialValue = useContextSelector(
    SpecialFormikContext,
    (c) => c?.initialValues[name] as F['initialValues'][keyof T]
  );

  return {
    value,
    error,
    touch,
    onChange,
    onBlur,
    setFieldValue,
    setFieldTouched,
    initialValue,
  };
}
