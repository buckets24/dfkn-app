import { Box, Flex, Grid, ListItem, Text } from '@chakra-ui/react';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

export interface ClientDocumentListItemProps {
  showLabel?: boolean;
  title: ReactNode;
  statusIcon: ReactNode;
  updatedAt: string;
  actions: ReactNode;
  subtitle: string;
  category: string | undefined;
  shortcutActionLabel?: string;
  shortcutActions?: (isLoading?: boolean, setIsLoading?: Dispatch<SetStateAction<boolean>>) => ReactNode;
}

export const ClientDocumentListItem: FC<ClientDocumentListItemProps> = ({
  showLabel = false,
  title,
  statusIcon,
  updatedAt,
  actions,
  subtitle,
  category,
  shortcutActionLabel,
  shortcutActions,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <ListItem
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        py={6}
        borderBottom="1px solid"
        borderColor="gray.200"
        _last={{
          borderBottom: '0px',
        }}
      >
        <Grid templateColumns="max-content 1fr" w="100%">
          <Box>
            {showLabel && <Text mb={5}>Dokumentname</Text>}
            <Grid templateColumns="max-content 1fr">
              <Box minW="16px" mr={2}>
                {statusIcon}
              </Box>
              <Box>
                <Text maxW="240px" fontSize={['sm', null, 'md', 'lg']}>
                  {title}
                </Text>
                <Text mt={2} color="gray.400" fontSize="sm">
                  <Box as="span" mr={3} color="brand.primary.500" fontWeight="bold">
                    {category}
                  </Box>
                  {subtitle}
                </Text>
              </Box>
            </Grid>
          </Box>
          <Grid templateColumns="1fr max-content" justifyItems="end" gap={[5, null, 6]}>
            <Box>
              {shortcutActionLabel && <Text mb={5}>{shortcutActionLabel}</Text>}
              {shortcutActions?.(isLoading, setIsLoading)}
            </Box>
            <Box minW={['100%', null, null, '180px']}>
              {showLabel && <Text mb={5}>Aktualisiert</Text>}
              <Flex justifyContent="space-between" alignItems="center">
                <Text color="gray.700" fontSize={['md', null, null, 'lg']} mr={2}>
                  {formatDateToDe(updatedAt, 'd. MMM yyyy H.mm')}
                </Text>
                <Box>{actions}</Box>
              </Flex>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};
