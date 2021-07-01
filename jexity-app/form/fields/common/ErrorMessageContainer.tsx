import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FieldControl } from '../fieldApi';

export const ErrorMessageContainer: FC<Pick<FieldControl, 'errorMessageSpacer'>> = ({
  children,
  errorMessageSpacer,
}) => {
  return (
    <Box
      mt={errorMessageSpacer ? 2 : undefined}
      mb={errorMessageSpacer ? 2 : undefined}
      minH={errorMessageSpacer ? '16px' : undefined}
    >
      {children}
    </Box>
  );
};
