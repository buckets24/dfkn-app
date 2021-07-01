import React, { FC } from 'react';
import { Box, BoxProps, Divider } from '@chakra-ui/react';
import { PrintableText } from '../../PrintableText';
import { useDocFormMeta } from '../../useDocFormMeta';

interface RBSFooterProps extends BoxProps {
  label?: string;
}
export const RBSFooter: FC<RBSFooterProps> = ({ label, ...other }) => {
  const { printMode } = useDocFormMeta();

  return (
    <Box mt={printMode ? 16 : 20} color="documents.primary.900" {...other}>
      {label && (
        <PrintableText mt={2} fontWeight={400}>
          {label}
        </PrintableText>
      )}
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <PrintableText mt={2} fontWeight={400}>
        DFK NORD AG
      </PrintableText>
      <PrintableText>
        Hauptsitz: Kieler Straße 97 a, 25451 Quickborn <strong>•</strong> Fernruf: 04106-638 03 10 <strong>•</strong>{' '}
        Fax: 04106-638 03 20 <strong>•</strong> E-Mail: info@dfknord.de Bankverbindung:{' '}
        <strong>
          Sparkasse Südholstein BLZ: 230 510 30 KTO: 150 229 40 • IBAN DE23 2305 1030 0015 0229 40 BIC: NOLADE21SHO •
          Steuernummer: 18/297/27190 • HRB 14584 PI •
        </strong>{' '}
        Inhaber: Vladimir Ponkrashov, Gerichtsstand: <strong>Pinneberg</strong>
      </PrintableText>
      <Box mt={3} textAlign="right">
        <PrintableText mt={2} fontSize={printMode ? 'md' : 'lg'} fontWeight={400}>
          Seite 1 von 1
        </PrintableText>
      </Box>
    </Box>
  );
};
