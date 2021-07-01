import { FC, useCallback, useRef, useState } from 'react';
import { Box, BoxProps, Grid, Slider, SliderProps, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import { useFormikByName } from 'jexity-app/form/useFormikByName';

export const DocumentSlider: FC<SliderProps> = ({ title, name = '', defaultValue, min, max, ...others }) => {
  const [tooltipValue, setTooltipValue] = useState(defaultValue ?? min);
  const { value, setFieldValue } = useFormikByName(name);
  const ref = useRef<HTMLDivElement | null>(null);

  const edgeSliderStyle: BoxProps = {
    height: 14,
    width: '4px',
    backgroundColor: 'documents.secondary.700',
    borderRadius: '10px',
  };

  const sliderLabelStyle: BoxProps = {
    position: 'absolute',
    top: 0,
    color: 'documents.secondary.700',
    fontWeight: 500,
    fontSize: 'sm',
  };

  const stringMemoizedOnChange = useCallback<(value: string | number) => void>(
    (value) => {
      setFieldValue?.(name, value);
    },
    [name, setFieldValue]
  );

  const debounce = (func: any, wait: number): ((...args: []) => void) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: []) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  return (
    <Grid gridTemplateColumns="115px 1fr" alignItems="center" mb={12}>
      <Text color="documents.secondary.700" fontWeight={500}>
        {title}
      </Text>
      <Box>
        <Grid pos="relative" templateColumns="2px 1fr 2px" alignItems="center">
          <Box {...edgeSliderStyle} />
          <Slider
            onChange={(value) => {
              setTooltipValue(value);
              debounce(stringMemoizedOnChange(value), 750);
            }}
            defaultValue={value}
            min={min}
            {...others}
          >
            <SliderTrack w="calc(100% + 2px)" backgroundColor="documents.secondary.700" />
            <Box pos="relative" w="100%" h="100%">
              <Box
                pos="absolute"
                top="-55px"
                left={ref.current?.style.left ?? 0}
                px={3}
                py={1}
                width="auto"
                min-width="150px"
                borderColor="white"
                borderWidth="2px"
                borderRadius="6px"
                backgroundColor="documents.tertiary.500"
                color="white"
                transform="translateX(-30%)"
              >
                <Text whiteSpace="nowrap">{`${tooltipValue} €`}</Text>
                <Box
                  _before={{
                    content: '""',
                    pos: 'absolute',
                    bottom: -1,
                    left: 5,
                    w: 0,
                    h: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTopWidth: '8px',
                    borderTopColor: 'documents.tertiary.500',
                  }}
                />
              </Box>
              <SliderThumb
                ref={ref}
                bg="white"
                boxShadow="3px 3px 10px rgba(0, 0, 0, 0.15)"
                borderColor="documents.tertiary.500"
                borderWidth="3px"
                boxSize={5}
                borderRadius="50%"
              />
            </Box>
          </Slider>
          <Box {...edgeSliderStyle} />
        </Grid>
        <Box pos="relative">
          <Text {...sliderLabelStyle} pos="absolute" left={0}>
            {min} €
          </Text>
          <Text {...sliderLabelStyle} pos="absolute" right={0}>
            {max} €
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};
