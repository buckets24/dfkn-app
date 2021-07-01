import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import { getYear } from 'date-fns';

export interface YearDropdownProps {
  date: Date;
  changeYear(year: number): void;
  decreaseYear(): void;
  increaseYear(): void;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
}

export const YearDropdown: FC<YearDropdownProps> = ({
  date,
  minDate = null,
  maxDate = null,
  changeYear,
  decreaseYear,
  increaseYear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const minDateYear = minDate && new Date(minDate).getFullYear();
  const maxDateYear = maxDate && new Date(maxDate).getFullYear();
  const selectedYear = new Date(date).getFullYear();
  const currentYear = maxDate ? new Date().getFullYear() : new Date().getFullYear() + 5;
  const ref = useRef<HTMLDivElement | null>(null);
  const fetchYears = () => {
    const years = [];
    let startYear = minDateYear ?? 1920;
    for (let i = startYear; i <= currentYear; i++) {
      years.push(startYear++);
    }
    return years.reverse();
  };

  useEffect(() => {
    if (ref.current) {
      const yearDropdown = ref.current;
      yearDropdown.addEventListener('scroll', (e) => e.stopPropagation(), false);
      yearDropdown.addEventListener('wheel', (e) => e.stopPropagation(), false);
      yearDropdown.addEventListener('touchmove', (e) => e.cancelable && e.stopPropagation(), false);
    }
  }, [ref]);

  return (
    <Flex ref={ref} pos="relative" alignContent="center" alignItems="center" mb={4} userSelect="none">
      <Popover onClose={() => setIsOpen(false)}>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Box
                minW="92px"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                cursor="pointer"
                _hover={{ color: 'brand.primary.500' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {getYear(date)}
              </Box>
            </PopoverTrigger>
            <PopoverContent
              p={'0 5px 15px 5px'}
              bg="white"
              border="none"
              borderTop="1px"
              borderTopColor="gray.200"
              boxShadow="0px 1px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15)"
            >
              <PopoverBody maxH="367px" overflowY="scroll">
                <Flex flexDir="column">
                  {fetchYears().map((year, i) => (
                    <Button
                      key={year}
                      mt={3}
                      bg="transparent"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      cursor="pointer"
                      isActive={getYear(date) === year}
                      onClick={() => {
                        changeYear(year);
                        onClose();
                      }}
                      _active={{
                        bg: 'brand.primary.500',
                        color: 'white',
                      }}
                      _hover={{
                        bg: 'brand.primary.500',
                        color: 'white',
                      }}
                    >
                      {year}
                    </Button>
                  ))}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
      <Stack pos="absolute" right={2} maxW="10px">
        <Box pos="relative" w="100%">
          <ChevronIcon
            direction="top"
            pos="absolute"
            top={isOpen ? 0 : -3}
            right={0}
            onClick={() => {
              if (maxDate && maxDateYear) {
                if (maxDateYear > selectedYear) {
                  increaseYear();
                }
              } else {
                increaseYear();
              }
            }}
            cursor="pointer"
            _hover={{ color: 'brand.primary.500' }}
          />
          <ChevronIcon
            pos="absolute"
            top={isOpen ? -3 : 0}
            right={0}
            direction="bottom"
            onClick={() => {
              if (minDate && minDateYear) {
                if (minDateYear < selectedYear) {
                  decreaseYear();
                }
              } else {
                decreaseYear();
              }
            }}
            cursor="pointer"
            _hover={{ color: 'brand.primary.500' }}
          />
        </Box>
      </Stack>
    </Flex>
  );
};
