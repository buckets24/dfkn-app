import { FC } from 'react';
import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';

export interface QuotedTextProps extends FlexProps {
  quote: string;
}

export const QuotedText: FC<QuotedTextProps> = ({ quote, ...props }) => {
  return (
    <Flex pl={3} borderLeftWidth="3px" borderColor="documents.tertiary.500" {...props}>
      <Text color="documents.tertiary.500" fontFamily="mono" fontSize="xl" fontWeight={500} lineHeight={1.2}>
        <Image d="inline" maxW="20px" src="/svg/investment-kompass/quote.svg" /> {quote}{' '}
        <Image mt={-1} d="inline" maxW="20px" transform="rotate(180deg)" src="/svg/investment-kompass/quote.svg" />
      </Text>
    </Flex>
  );
};
