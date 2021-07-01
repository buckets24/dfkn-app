import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';

export interface MonthDropdownProps {
  date: Date;
  changeMonth(month: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
}

export const MonthDropdown: FC<MonthDropdownProps> = ({ date, changeMonth, decreaseMonth, increaseMonth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];

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
                minW="153px"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                cursor="pointer"
                _hover={{ color: 'brand.primary.500' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {months[date.getMonth()]}
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
                  {months.map((month, i) => (
                    <Button
                      key={month}
                      mt={3}
                      bg="transparent"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      cursor="pointer"
                      isActive={months[date.getMonth()] === month}
                      onClick={() => {
                        changeMonth(i);
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
                      {month}
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
            onClick={increaseMonth}
            cursor="pointer"
            _hover={{ color: 'brand.primary.500' }}
          />
          <ChevronIcon
            direction="bottom"
            pos="absolute"
            top={isOpen ? -3 : 0}
            right={0}
            onClick={decreaseMonth}
            cursor="pointer"
            _hover={{ color: 'brand.primary.500' }}
          />
        </Box>
      </Stack>
    </Flex>
  );
};
