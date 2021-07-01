import { Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';
import { useDocFormMeta } from './useDocFormMeta';

export const PrintableText: FC<TextProps> = ({ children, ...props }) => {
  const { printMode } = useDocFormMeta();
  return (
    <Text fontSize={printMode ? '10px' : 'md'} lineHeight={printMode ? 1.1 : 1.3} mb={3} {...props}>
      {children}
    </Text>
  );
};
