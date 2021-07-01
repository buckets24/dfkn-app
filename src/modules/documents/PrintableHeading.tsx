import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';
import { useDocFormMeta } from './useDocFormMeta';

export const PrintableHeading: FC<HeadingProps> = ({ children, as, ...props }) => {
  const { printMode } = useDocFormMeta();
  return (
    <Heading
      fontFamily="body"
      fontSize={printMode ? '12px' : as === 'h4' ? 'md' : 'lg'}
      lineHeight={printMode ? 1.1 : 1.3}
      mb={3}
      {...props}
    >
      {children}
    </Heading>
  );
};
