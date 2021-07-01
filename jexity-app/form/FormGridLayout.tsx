import { FC } from 'react';
import { SimpleGrid, SimpleGridProps, Box } from '@chakra-ui/react';

/**
 * TODO Fix the typings for this. I think if it is done right
 * we might not need the `key` prop when passing components to
 * `fields`
 */
export interface FormGridLayoutProps extends SimpleGridProps {
  columns?: SimpleGridProps['columns'];
  fields: any[];
}

export const FormGridLayout: FC<FormGridLayoutProps> = ({ columns = [1, null, null, 2], fields, ...other }) => {
  const { spacingX, spacingY } = { ...other };

  return (
    <SimpleGrid columns={columns} {...other}>
      {fields.map((field, i) => (
        <Box key={i}>
          {Array.isArray(field) ? (
            <SimpleGrid columns={columns} spacingX={spacingX} spacingY={spacingY}>
              {field.map((splitField, i) => (
                <Box key={i} {...splitField.styles}>
                  {splitField}
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box {...field.styles}>{field}</Box>
          )}
        </Box>
      ))}
    </SimpleGrid>
  );
};
