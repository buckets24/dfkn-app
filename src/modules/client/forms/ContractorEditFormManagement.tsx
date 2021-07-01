import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import React, { FC } from 'react';
import { Contractor } from '../api/ClientModel';

export interface ContractorEditFormManagementProps {
  contractor: Contractor | undefined;
  formikBag: FormikContextType<any> | null;
  isValid: boolean | undefined;
}

export const ContractorEditFormManagement: FC<ContractorEditFormManagementProps> = ({ formikBag, isValid }) => {
  return (
    <>
      <Flex justifyContent="flex-end" pos="relative" pb="1px" w="100%" minH={['97px', null, null, '50px']}>
        <Box mt={['auto', null, null, 0]}>
          <ButtonGroup variant="solid" spacing={4} fontFamily="heading">
            <Button
              type="submit"
              isLoading={formikBag?.isSubmitting}
              loadingText="Speichern…"
              px="32px"
              maxH="40px"
              bg="brand.primary.500"
              color="white"
              borderRadius="4px"
              _hover={{
                bg: 'brand.primary.900',
              }}
              isDisabled={!isValid || formikBag?.status === 'checking-email'}
              onClick={() => formikBag?.handleSubmit()}
            >
              Speichern
            </Button>
            <Button
              variant="outline"
              px="32px"
              maxH="40px"
              borderWidth="1px"
              borderColor="brand.primary.500"
              borderRadius="4px"
              color="brand.primary.500"
              _hover={{
                bg: 'brand.primary.100',
              }}
              onClick={() => formikBag?.resetForm()}
            >
              Abbrechen
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  );
};
