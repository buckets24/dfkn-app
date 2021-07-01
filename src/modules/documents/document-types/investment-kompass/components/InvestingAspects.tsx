/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Image, Radio, RadioGroup, RadioProps, Text } from '@chakra-ui/react';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import React, { FC, useCallback } from 'react';

export const InvestingAspects: FC = () => {
  const { value, touch, error, onBlur, setFieldValue } = useFormikByName('investingAspects');

  const radioMemoizedOnChange = useCallback<(value: string | number) => void>(
    (value) => {
      setFieldValue?.('investingAspects', value);
    },
    [setFieldValue]
  );

  const radioStyleProps: RadioProps = {
    pos: 'absolute',
    zIndex: 1,
    variant: 'dotted',
    color: 'documents.tertiary.500',
    isInvalid: touch && error ? true : false,
    bg: 'white',
    borderWidth: '2px',
    borderColor: 'documents.tertiary.500',
    cursor: 'pointer',
    _hover: {
      borderColor: 'documents.tertiary.500',
    },
    _checked: {
      bg: 'documents.tertiary.500',
      borderColor: 'documents.tertiary.500',
    },
    _invalid: {
      borderColor: 'support.alert.500',
    },
  };

  return (
    <Box mt={2} textAlign="center">
      <Text fontWeight="bold">Rentabel</Text>
      <Flex>
        <Text mt="auto" mb={-2} mr={2} fontWeight="bold">
          Liquide
        </Text>
        <Box pos="relative">
          <Image w="130px" src="/svg/investment-kompass/triangle-aspect.svg" />
          <RadioGroup
            name="investingAspects"
            value={value ? value : ''}
            onChange={radioMemoizedOnChange}
            onBlur={onBlur}
          >
            <Radio
              value="rentabel"
              top={1}
              left="50%"
              right="50%"
              transform="translate(-50%, -50%)"
              {...radioStyleProps}
            />
            <Radio value="rentabel-sicher" top={10} right={6} {...radioStyleProps} />
            <Radio value="sicher" bottom={-1} right={-1} {...radioStyleProps} />
            <Radio
              value="sicher-liquide"
              bottom={-3}
              left="50%"
              right="50%"
              transform="translate(-50%, -50%)"
              {...radioStyleProps}
            />
            <Radio value="liquide" bottom={-1} left={-1} {...radioStyleProps} />
            <Radio value="liquide-rentabel" top={10} left={6} {...radioStyleProps} />
            <Radio
              d="block"
              w="16px"
              h="16px"
              value="balance"
              top={6}
              left={0}
              right={0}
              bottom={0}
              m="auto"
              {...radioStyleProps}
            />
          </RadioGroup>
        </Box>
        <Text mt="auto" mb={-2} ml={2} fontWeight="bold">
          Sicher
        </Text>
      </Flex>
    </Box>
  );
};
