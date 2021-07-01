import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const RentTable: FC = () => {
  const table = [
    {
      label: 'Ihre Miete heute',
      contents: ['400,-', '500,-', '600,-', '700,-'],
    },
    {
      label: 'Miete in 10 Jahren',
      contents: ['554,-', '692,-', '831,-', '969,-'],
    },
    {
      label: 'Miete in 20 Jahren',
      contents: ['701,-', '877,-', '1.052,-', '1.227,-'],
    },
    {
      label: 'Miete in 30 Jahren',
      contents: ['1.000,-', '1.250,-', '1.500,-', '1.750,-'],
    },
    {
      label: 'Miete in 40 Jahren',
      contents: ['1.267,-', '1.584,-', '1.900,-', '2.217,-'],
    },
    {
      label: 'Summe der gezahlten Mieten',
      contents: ['361.926,-', '452.408,-', '542.889,- ', '633.371,-'],
    },
  ];

  const style: BoxProps = {
    as: 'td',
    px: 5,
    py: 1,
    fontFamily: 'mono',
    fontSize: 'sm',
    borderWidth: '1px',
    borderColor: 'documents.secondary.700',
    borderStyle: 'dotted',
    textAlign: 'center',
  };

  return (
    <Box as="table" borderWidth="1px" borderColor="documents.secondary.700">
      <Box as="tbody">
        {table.map((item) => (
          <Box key={item.label} as="tr" borderWidth="1px" borderColor="documents.secondary.700" borderStyle="dotted">
            <Box bg="documents.primary.200" borderStyle="dotted" {...style}>
              {item.label}
            </Box>
            {item.contents.map((content, i) => (
              <Box key={i} {...style}>
                {content}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
