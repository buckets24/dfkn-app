import React, { FC } from 'react';
import { Box, BoxProps, Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';
import useDocumentGuidePosition from './useDocumentGuidePosition';

export const GuideWrapper: FC<BoxProps & { highlight: boolean; name: string }> = ({
  children,
  highlight,
  name,
  ...other
}) => {
  const guideSize = useDocumentGuidePosition((s) => s.size);
  const wrapperFontSize = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
  };

  return (
    <Box
      id={name}
      fontSize={wrapperFontSize[guideSize]}
      lineHeight="18px"
      p={3}
      backgroundColor={highlight ? 'rgba(87, 113, 219, 0.1)' : 'transparent'}
      {...other}
    >
      {children}
    </Box>
  );
};

export const GuideHeading: FC<HeadingProps> = ({ children, ...other }) => {
  const guideSize = useDocumentGuidePosition((s) => s.size);
  const headingFontSize = {
    SMALL: 'md',
    MEDIUM: 'lg',
    LARGE: 'xl',
  };

  return (
    <Heading as="h5" color="brand.primary.500" fontSize={headingFontSize[guideSize]} {...other}>
      {children}
    </Heading>
  );
};

export const GuideText: FC<TextProps> = ({ children, ...other }) => {
  return (
    <Text color="black" my={4} {...other}>
      {children}
    </Text>
  );
};

// Should be used within a GuideText
export const GuideEmphasis: FC<TextProps> = ({ children, ...other }) => {
  return (
    <Text as="strong" color="brand.primary.500" fontWeight="bold" {...other}>
      {children}
    </Text>
  );
};
