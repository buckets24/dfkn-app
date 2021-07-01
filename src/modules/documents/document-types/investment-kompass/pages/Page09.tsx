/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { PersonalDataTable } from '../components/PersonalDataTable';
import { StringFieldType, StringFormikField } from 'jexity-app/form/fields/StringField';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { DottedFlushedSignaturePrintField, SignatureFormikField } from 'src/components/signature-field/SignatureField';
import { PageWrapper } from '../../common/PageWrapper';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { PrintableField } from 'src/modules/documents/PrintableField';

export const Page09: FC = () => {
  const { printMode } = useDocFormMeta();

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={9} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <HeadingWrapper mb={5}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          PERSONENDATEN
        </Heading>
      </HeadingWrapper>
      <PersonalDataTable />
      <HeadingWrapper mt={10} mb={5}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          KONTAKTDATEN
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={5}>
        <Box mb={10} gridColumn="1 / span 2">
          <StringFormikField
            variant="dotted-flush"
            key="streetHouseNumber"
            name="streetHouseNumber"
            showRequiredIcon={false}
            isRequired
          />
          <Text fontFamily="mono" fontSize="sm">
            Straße, Hausnummer
          </Text>
        </Box>
        <Box mb={10} gridColumn="3 / span 2">
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <Box>
              <StringFormikField
                variant="dotted-flush"
                key="postCode"
                name="postCode"
                showRequiredIcon={false}
                isRequired
              />
              <Text fontFamily="mono" fontSize="sm">
                PLZ
              </Text>
            </Box>
            <Box>
              <StringFormikField variant="dotted-flush" key="place" name="place" showRequiredIcon={false} isRequired />
              <Text fontFamily="mono" fontSize="sm">
                Ort
              </Text>
            </Box>
            <Box>
              <DateFormikField
                variant="dotted-flush"
                key="addressValidDate"
                name="addressValidDate"
                showRequiredIcon={false}
                isRequired
              />
              <Text fontFamily="mono" fontSize="sm">
                seit/Datum
              </Text>
            </Box>
          </Grid>
        </Box>
        <Box mt={8} mb={12}>
          <StringFormikField
            variant="dotted-flush"
            key="telephone"
            name="telephone"
            showRequiredIcon={false}
            isRequired
          />
          <Text fontFamily="mono" fontSize="sm">
            Telefon (Privat):
          </Text>
        </Box>
        <Box mt={8} mb={12}>
          <StringFormikField variant="dotted-flush" key="fax" name="fax" showRequiredIcon={false} isRequired />
          <Text fontFamily="mono" fontSize="sm">
            Telefax (Privat):
          </Text>
        </Box>
        <Box mt={8} mb={12}>
          <StringFormikField variant="dotted-flush" key="mobile" name="mobile" showRequiredIcon={false} isRequired />
          <Text fontFamily="mono" fontSize="sm">
            Mobiltelefon:
          </Text>
        </Box>
        <Box mt={8} mb={12}>
          <EmailFormikField
            variant="dotted-flush"
            key="email"
            name="email"
            showRequiredIcon={false}
            isRequired
            isReadOnly
          />
          <Text fontFamily="mono" fontSize="sm">
            E-Mail:
          </Text>
        </Box>
        <Box mt={8}>
          <PrintableField<StringFieldType>
            EditComponent={SignatureFormikField}
            PrintComponent={DottedFlushedSignaturePrintField}
            variant="dotted-flush"
            key="signatureClient"
            name="signatureClient"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />
          <Text fontFamily="mono" fontSize="sm">
            Unterschrift Kunde A
          </Text>
        </Box>
        <Box mt={8}>
          <PrintableField<StringFieldType>
            EditComponent={SignatureFormikField}
            PrintComponent={DottedFlushedSignaturePrintField}
            variant="dotted-flush"
            key="signatureClient2"
            name="signatureClient2"
            showRequiredIcon={false}
            isRequired
            rightIcon={<SignatureIcon mt={3} />}
          />
          <Text fontFamily="mono" fontSize="sm">
            Unterschrift Kunde B
          </Text>
        </Box>
        <Box mt={8}>
          <PrintableField<StringFieldType>
            EditComponent={SignatureFormikField}
            PrintComponent={DottedFlushedSignaturePrintField}
            variant="dotted-flush"
            key="signatureAgent"
            name="signatureAgent"
            showRequiredIcon={false}
            isRequired
            rightIcon={<SignatureIcon mt={3} />}
          />
          <Text fontFamily="mono" fontSize="sm">
            DFK Nord Berater
          </Text>
        </Box>
        <Box mt={10}>
          <StringFormikField
            variant="dotted-flush"
            key="placeAndDate"
            name="placeAndDate"
            showRequiredIcon={false}
            isRequired
          />
          <Text fontFamily="mono" fontSize="sm">
            Ort, Datum
          </Text>
        </Box>
      </Grid>
      <Box
        mt={10}
        p={6}
        bg="documents.primary.200"
        borderWidth="1px"
        borderColor="documents.secondary.700"
        color="documents.secondary.700"
      >
        <Text fontSize="xs" fontFamily="mono" fontWeight={500}>
          Datenschutzerklärung
        </Text>
        <Text fontSize="xs" fontFamily="mono">
          Die erfassten Daten werden vertraulich behandelt und nicht an Dritte weitergeleitet. Eine Verarbeitung Ihrer
          Daten erfolgt nur, wenn Sie darauf hingewiesen wurden bzw. eine Nutzung und Verarbeitung durch uns Ihrerseits
          ausdrücklich gewünscht bzw. durch Unterschrift kenntlich gemacht wurde. Auf die Einhaltung
          datenschutzrechtlicher Bestimmungen und die Sicherheit Ihrer persönlichen Daten legen wir größten Wert. Die
          Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt nach den gesetzlichen Bestimmungen zum
          Datenschutz, wobei der Schutz Ihrer Privatsphäre für uns ein wichtiges Anliegen ist. Personenbezogene Daten
          werden maximal 3 Jahre oder bis zur Erfüllung der von Ihnen gewünschten Leistung gespeichert. Sie haben
          selbstverständlich jederzeit die Möglichkeit, die Löschung Ihrer Daten insgesamt oder teilweise zu verlangen.
        </Text>
      </Box>
    </PageWrapper>
  );
};
