import { Box, Flex, Text } from '@chakra-ui/react';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { FC, useEffect, useState } from 'react';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { GraphChevronIcon } from '../icons/GraphChevronIcon';
import { IncomeConceptGraph } from '../icons/IncomeConceptGraph';
import { LearnBaseGraph } from '../icons/LearnBaseGraph';
import { LeisureGraph } from '../icons/LeisureGraph';
import { WorkGraph } from '../icons/WorkGraph';

export const IncomeConcept: FC = () => {
  const { printMode, readOnly } = useDocFormMeta();
  const { value: incomeConcept, setFieldValue } = useFormikByName('incomeConcept');
  const [activeConcept, setActiveConcept] = useState(incomeConcept);

  useEffect(() => {
    if (setFieldValue) {
      setFieldValue('incomeConcept', activeConcept);
    }
  }, [activeConcept, setFieldValue]);

  if (printMode || readOnly) {
    return <IncomeConceptGraph w="100%" h="100%" />;
  }

  return (
    <>
      <Box pos="relative" maxW={['100%', null, '672px', '100%']}>
        <LearnBaseGraph w="100%" h="100%" />
        <Box
          pos="absolute"
          bottom={['1px', null, null, '9px', '10px']}
          left={['188px', null, null, '190px', '206px']}
          zIndex={1}
          transition="all 500ms"
          transform={incomeConcept >= 2 ? 'translateX(0)' : 'translateX(-5%)'}
          opacity={incomeConcept >= 2 ? 1 : 0}
          transitionTimingFunction="ease-in-out"
          overflow="hidden"
        >
          <WorkGraph w={['233px', null, null, '241px', '271px']} h={['215px', null, null, '203px', '224px']} />
        </Box>
        <Box
          pos="absolute"
          bottom={['10px', null, null, null, '11px']}
          left={['375px', null, null, '423px', '425px']}
          transition="all 500ms"
          transform={incomeConcept === 3 ? 'translateX(0)' : 'translateX(-5%)'}
          opacity={incomeConcept === 3 ? 1 : 0}
          transitionTimingFunction="ease-in-out"
          overflow="hidden"
        >
          <LeisureGraph w={['237px', null, null, '166px', '259px']} h={['187px', null, null, '198px', '211px']} />
        </Box>
      </Box>
      <Flex alignItems="center" px={['87px', null, null, '100px']} w="100%">
        <Text
          color="documents.tertiary.500"
          fontFamily="mono"
          fontWeight={500}
          onClick={() => setActiveConcept(1)}
          cursor="pointer"
        >
          Lernen
        </Text>
        <GraphChevronIcon
          mx={['50px', null, null, '68px']}
          color={incomeConcept >= 2 ? 'documents.secondary.700' : 'gray.400'}
        />
        <Text
          mx={['20px']}
          mr={['20px', null, null, '50px']}
          color={incomeConcept >= 2 ? 'documents.tertiary.500' : 'gray.300'}
          fontFamily="mono"
          fontWeight={500}
          onClick={() => setActiveConcept(2)}
          cursor="pointer"
        >
          Arbeiten
        </Text>
        <GraphChevronIcon
          ml={['50px', null, null, '30px']}
          mr={['50px', null, null, '40px']}
          color={activeConcept === 3 ? 'documents.secondary.700' : 'gray.400'}
        />
        <Text
          color={activeConcept === 3 ? 'documents.tertiary.500' : 'gray.300'}
          fontFamily="mono"
          fontWeight={500}
          onClick={() => setActiveConcept(3)}
          cursor="pointer"
        >
          Freizeit
        </Text>
      </Flex>
    </>
  );
};
