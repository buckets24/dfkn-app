import { Box, Divider, Flex, Grid, Heading, List, ListItem, Text } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { FC, Fragment } from 'react';

export const AgentDocuments: FC = () => {
  const onlineDocuments = [
    {
      name: 'Online Documente',
      status: '100% Komplett',
      updatedAt: 'vor 5 Stunden',
    },
    {
      name: 'Online Documente 2',
      status: '30% Komplett',
      updatedAt: 'vor 5 Stunden',
    },
    {
      name: 'Online Documente 3',
      status: 'noch nicht angefangen',
      updatedAt: 'vor 5 Stunden',
    },
  ];

  return (
    <Card>
      <Heading as="h3" size="md" p={6} fontFamily="body">
        Dokumente
      </Heading>
      <Divider borderColor="gray.200" mb={5} />
      <Box p={6}>
        <Flex justifyContent="space-between" alignItems="center" mt={6}>
          <Heading as="h3" size="md" fontFamily="body">
            Online Dokumente
          </Heading>
          {/* Not yet functional disabling for now */}
          {/* <Button
            p={0}
            bg="none"
            color="brand.primary.500"
            fontSize="sm"
            fontWeight={500}
            _hover={{ bg: 'none', color: 'brand.primary.900' }}
            onClick={() => alert('Add Online Document')}
          >
            <CirclePlusIcon mr={3} />
            Add Online Documente
          </Button> */}
        </Flex>
        <List mt={12} ml={3}>
          {onlineDocuments.map((document, i) => (
            <Fragment key={i}>
              <ListItem d="flex" justifyContent="space-between" alignItems="center">
                <Grid templateColumns={['1fr max-content']} alignItems="center">
                  <Box>
                    <Text fontWeight={400} fontSize="md">
                      {document.name}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize="md"
                      fontStyle="italic"
                      color={document.status === '100% Complete' ? 'brand.primary.500' : 'gray.700'}
                    >
                      {document.status}
                    </Text>
                  </Box>
                </Grid>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight={400} fontSize="sm" color="gray.700" mr={10}>
                    aktualisiert {document.updatedAt}
                  </Text>
                  {/* Not yet functional disabling for now */}
                  {/* <IconButton aria-label="Document Menu" icon={<DocumentMenuIcon />} bg="none" /> */}
                </Flex>
              </ListItem>
              <Divider borderColor="gray.200" mt={5} mb={10} />
            </Fragment>
          ))}
        </List>
      </Box>
    </Card>
  );
};
