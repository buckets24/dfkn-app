import { useBaseTheme } from 'jexity-app/baseTheme/baseTheme';
import { FC } from 'react';
import Select, { Props } from 'react-select';

export const MultiSelect: FC<Props> = ({ options, isInvalid, ...others }) => {
  const { colors, fontSizes } = useBaseTheme();
  const styles: any = {
    container: (base: any) => {
      return {
        ...base,
        width: '100%',
      };
    },
    control: (base: any) => {
      return {
        ...base,
        minHeight: '48px',
        borderRadius: '4px',
        borderWidth: '1px',
        // borderColor: !isInvalid ? colors?.gray?.[300] : colors?.support?.alert?.[500],
        fontSize: fontSizes?.md,
        fontWeight: 500,
        outline: 'none',
        boxShadow: 'none',
      };
    },
    menuList: (base: any) => {
      return {
        ...base,
        fontSize: fontSizes?.md,
        fontWeight: 500,
      };
    },
    multiValue: (base: any) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        borderRadius: '6px',
        color: 'white',
      };
    },
    multiValueLabel: (base: any) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        color: 'white',
      };
    },
    multiValueRemove: (base: any) => {
      return {
        ...base,
        background: colors?.brand?.primary[500],
        color: 'white',
      };
    },
  };

  return (
    <>
      <Select className="multi-select" options={options} {...others} styles={styles} />
    </>
  );
};
