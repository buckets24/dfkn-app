import { FC, useState, Dispatch, SetStateAction, Fragment } from 'react';
import { Box, Heading, Divider, Grid, Text, IconButton, Button, Stack } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { getAgentProfileLayout } from 'src/views/agents/profile/AgentProfileLayout';
import { HatIcon } from 'src/theme/icons/HatIcon';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';

export interface Options {
  id: string;
  [key: string]: string;
}

const AgentProfileInsights: FC & HasLayout = () => {
  const maxColor = 2;
  const maxDriver = 3;
  const [colorSelected, setColorSelected] = useState<Options[]>([]);
  const [driversSelected, setDriversSelected] = useState<Options[]>([]);

  // Sample Options
  const colorList: Options[] = [
    {
      id: 'Rot',
      value: 'Rot',
      color: '#EC4C47',
    },
    {
      id: 'Blau',
      value: 'Blau',
      color: 'brand.primary.500',
    },
    {
      id: 'Grün',
      value: 'Grün',
      color: '#47B881',
    },
    {
      id: 'Gelb',
      value: 'Gelb',
      color: '#F7D154',
    },
  ];

  const driverList = [
    {
      id: 'Individualistisch',
      text: 'Individualistisch',
      desc:
        'Dein Gesprächspartner möchte immer alleine entscheiden können. Äußere daher niemals konkrete Handlungsempfehlungen und arbeite stattdessen mit alternativen Fragen. So gibst du ihm immer das Gefühl, die volle Entscheidungskraft zu haben. Hier sind Aussagen wie „Ich bereite es für Sie zum Prüfen vor und wenn Sie einverstanden sind, können Sie es abzeichnen.“ ideal.',
    },
    {
      id: 'Ökonomisch',
      text: 'Ökonomisch',
      desc: 'Lorem Ipsum Donor Text',
    },
    {
      id: 'Theoretisch',
      text: 'Theoretisch',
      desc:
        'Dein Gesprächspartner möchte fundiertes und von dir nachvollziehbares Wissen. Am besten hast du für ihn immer die Antwort auf die Frage „Wo steht das?“ parat.',
    },
    {
      id: 'Ästetisch',
      text: 'Ästetisch',
      desc: 'Lorem Ipsum Donor Text',
    },
    {
      id: 'Traditionel',
      text: 'Traditionel',
      desc: 'Lorem Ipsum Donor Text',
    },
  ];

  // Handle Click both options
  const handleClick = (list: Options[], func: Dispatch<SetStateAction<Options[]>>, item: Options, max: number) => {
    if (list.length + 1 <= max && !list.some((el) => el.id === item.id)) {
      func((prev) => [...prev, item]);
    } else {
      func(list.filter((el) => el.id !== item.id));
    }
  };

  return (
    <Box p={6} maxW="1000px">
      <Card p={6}>
        <Heading as="h5" size="md" pb={3}>
          Kunden Insights
        </Heading>
        <Divider borderColor="gray.200" />
        <Grid templateColumns={['max-content 1fr']} mt={3} gap={10}>
          <Box mt={5} minW="400px">
            <Heading as="h5" size="md">
              Optionen
            </Heading>
            <Text mt={5} mb={3} fontSize="md">
              Farbe (max. zwei auswählen)
            </Text>
            <Stack direction="row" spacing={3}>
              {colorList.map((item, i) => (
                <IconButton
                  role="group"
                  key={i}
                  aria-label={item.value}
                  icon={<HatIcon w="40px" color={item.color} _groupHover={{ color: 'white' }} />}
                  isActive={colorSelected.some((el) => el.id === item.id)}
                  minW="56px"
                  minH="56px"
                  bg="none"
                  borderWidth="3px"
                  borderColor={item.color}
                  borderRadius="4px"
                  opacity={0.5}
                  _hover={{
                    bg: item.color,
                  }}
                  _active={{
                    opacity: 1,
                  }}
                  onClick={() => handleClick(colorSelected, setColorSelected, item, maxColor)}
                />
              ))}
            </Stack>
            <Text mt={10} mb={3} fontSize="md">
              Antreiber (max. drei auswählen)
            </Text>
            <Stack direction="column" spacing={4}>
              {driverList.map((item, i) => (
                <Button
                  key={i}
                  isActive={driversSelected.some((el) => el.id === item.id)}
                  d="flex"
                  justifyContent="space-between"
                  px={5}
                  py={6}
                  fontSize="md"
                  fontWeight="normal"
                  borderWidth="1px"
                  borderRadius="4px"
                  bg="none"
                  color="#93A1B5"
                  borderColor="#93A1B5"
                  rightIcon={
                    (driversSelected.some((el) => el.id === item.id) as any) && <CheckIcon color="brand.primary.500" />
                  }
                  onClick={() => handleClick(driversSelected, setDriversSelected, item, maxDriver)}
                  _hover={{
                    bg: '#EDF8F2',
                    color: 'brand.primary.500',
                    borderColor: 'brand.primary.500',
                  }}
                  _active={{
                    bg: '#EDF8F2',
                    color: 'brand.primary.500',
                    borderColor: 'brand.primary.500',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box mt={5}>
            <Heading as="h5" size="md">
              Charakter
            </Heading>
            <Box mt={5} p={5} w="100%" minH="480px" bg="brand.bodyBackground">
              {colorSelected.length > 0 ? (
                <Box>
                  <Text fontWeight={500}>
                    {colorSelected.map((item, i) => (
                      <Fragment key={i}>
                        <Box key={i} as="span" color={item.color}>
                          {item.value}
                        </Box>{' '}
                        {colorSelected[i + 1] && `&${' '}`}
                      </Fragment>
                    ))}
                  </Text>
                  <Text mt={5}>
                    Ihr Gesprächspartner ist ein introvertierter Beobachter. Strukturieren und planen Sie das Gespräch.
                    Stellen Sie sicher, dass das Gespräch verständlich und ruhig ist, und vermeiden Sie Ausbrüche von
                    Emotionen.
                  </Text>
                </Box>
              ) : (
                <Text>Please choose an option on the left to identify COLOR character.</Text>
              )}
              <Box mt={5}>
                {driversSelected.length > 0 ? (
                  driversSelected.map((item, i) => (
                    <Box key={i} mt={5}>
                      <Text fontWeight={500}>{item.text}</Text>
                      <Text mt={3}>{item.desc}</Text>
                    </Box>
                  ))
                ) : (
                  <Text>Please choose an option on the left to identify DRIVER character.</Text>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Card>
    </Box>
  );
};

AgentProfileInsights.getLayout = getAgentProfileLayout;

export default AgentProfileInsights;
