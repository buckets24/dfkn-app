import { Box, Text } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DottedFlushedCurrencyPrintField } from './DottedFlushedCurrencyPrintField';

export const Subsidie: FC<{
  subsidie: { name: string; nameAmount: string; text: string };
}> = ({ subsidie }) => {
  const { printMode } = useDocFormMeta();
  const { value } = useFormikByName(subsidie.name);

  return (
    <>
      <Text fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
        {subsidie.text}
      </Text>
      <RadioFormikField
        variant="dotted"
        key={subsidie.name}
        name={subsidie.name}
        direction="row"
        options={[
          { key: '1', label: 'Ja', value: 'Yes' },
          { key: '2', label: 'Nein', value: 'No' },
        ]}
        dottedShowLabel={false}
        isRequired
      />
      <Box>
        <PrintableField<CurrencyFieldType>
          EditComponent={CurrencyFormikField}
          PrintComponent={DottedFlushedCurrencyPrintField}
          minW="100px"
          w="100%"
          variant="dotted-flush"
          key={subsidie.nameAmount}
          name={subsidie.nameAmount}
          showRequiredIcon={false}
          opacity={value === 'Yes' ? 1 : 0}
        />
      </Box>
    </>
  );
};
