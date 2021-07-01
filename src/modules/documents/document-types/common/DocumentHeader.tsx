import { Box, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import { DFKDocumentLogo } from 'src/theme/icons/DFKDocumentLogo';
import { PrintableText } from '../../PrintableText';
import { useDocFormMeta } from '../../useDocFormMeta';

export interface DocumentHeaderProps {
  title?: string;
  compartmentDate?: string;
  subtitle?: string;
  note?: string;
}

export const DocumentHeader: FC<DocumentHeaderProps> = ({ title, compartmentDate, subtitle, note }) => {
  const { printMode } = useDocFormMeta();

  return (
    <Box mt={printMode ? 5 : 6}>
      <Box textAlign="center" color="documents.primary.700">
        <DFKDocumentLogo mb={2} w={printMode ? '200px' : '250px'} h={printMode ? '50px' : '80px'} />
        {compartmentDate && (
          <PrintableText fontWeight={400} fontSize="xs" mb={2}>
            Compartment DFK {compartmentDate}
          </PrintableText>
        )}
      </Box>
      <Box textAlign="center">
        {title && (
          <Heading fontFamily="body" as="h2" fontSize="lg" textTransform="uppercase">
            {title}
          </Heading>
        )}
        {subtitle && (
          <PrintableText fontWeight={700} fontSize="sm">
            {subtitle}
          </PrintableText>
        )}
        {note && (
          <PrintableText fontWeight={400} fontSize="sm">
            {note}
          </PrintableText>
        )}
      </Box>
    </Box>
  );
};
