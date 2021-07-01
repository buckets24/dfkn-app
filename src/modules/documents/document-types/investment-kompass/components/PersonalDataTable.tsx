import { Box, BoxProps } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { PersonalDataTableRow } from './PersonalDataTableRow';

/**
 * TODO: This is currently a bad approach to the problem,
 * the schema does not actually support array of values
 */

export const PersonalDataTable: FC = () => {
  const rows = [0, 1];
  const { printMode } = useDocFormMeta();

  const borderStyle: BoxProps = {
    borderWidth: '1px',
    borderColor: 'documents.secondary.700',
  };

  const tableHeadings = [
    'Titel',
    'Vorname',
    'Name',
    'Geburtsdatum',
    'Geburtsort',
    'Familienstand',
    'Staatsangehörigkeit',
    'Steuer-ID',
  ];

  return (
    <Box>
      <Box as="table" {...borderStyle}>
        <Box as="thead">
          <Box as="tr" bg="#D9DBE4" borderStyle="dotted" color="black" {...borderStyle}>
            {tableHeadings.map((heading, i) => (
              <Box
                key={i}
                as="th"
                p={2}
                fontSize={printMode ? 'xs' : 'sm'}
                fontFamily="mono"
                fontWeight="normal"
                textAlign="center"
                borderStyle="dotted"
                {...borderStyle}
              >
                {heading}
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {rows.map((_, i) => (
            <PersonalDataTableRow key={i} index={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
