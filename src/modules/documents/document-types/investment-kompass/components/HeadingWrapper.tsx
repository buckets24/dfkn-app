import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { TopLeftChevronIcon } from 'src/theme/icons/TopLeftChevronIcon';

export const HeadingWrapper: FC<BoxProps> = ({ children, ...others }) => {
  const { printMode } = useDocFormMeta();

  return (
    <Box pos="relative" d={printMode ? 'flex' : 'block'} {...others}>
      <TopLeftChevronIcon
        mt={1}
        mr={2}
        {...(!printMode && { pos: 'absolute', top: 1, left: -6, mt: 0, mr: 2 })}
        w="20px"
        h="20px"
      />
      {children}
    </Box>
  );
};
