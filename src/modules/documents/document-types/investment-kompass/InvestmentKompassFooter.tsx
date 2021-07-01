import { FC } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';
import { useDocFormMeta } from '../../useDocFormMeta';

export interface InvestmentKompassFooterProps extends BoxProps {
  page?: number;
}
export const InvestmentKompassFooter: FC<InvestmentKompassFooterProps> = ({ page, ...others }) => {
  const { printMode } = useDocFormMeta();

  if (!printMode) {
    return null;
  }

  return (
    <Box {...others}>
      {page && (
        <Text mb={5} textAlign="right">
          Seite {page}
        </Text>
      )}
      <Text mb={5} fontSize="xs" color="#BFCBDA">
        Investment Kompass 2020-10-29
      </Text>
    </Box>
  );
};
