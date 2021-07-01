/* eslint-disable react/no-unescaped-entities */
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { SignatureFormikField, SignaturePrintField } from 'src/components/signature-field/SignatureField';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import React, { FC } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { DocumentHeader } from '../../common/DocumentHeader';
import { PageWrapper } from '../../common/PageWrapper';
import { RatierlichGeldwaeschegesetzFooter } from '../RatierlichGeldwaeschegesetzFooter';

export const Page01: FC = () => {
  return (
    <PageWrapper px={5} footer={<RatierlichGeldwaeschegesetzFooter />}>
      <DocumentHeader
        title="Angaben nach dem Geldwäschegesetz"
        note="(bitte Zutreffendes ankreuzen)"
        compartmentDate="2020-2"
      />
      <FormGridLayout
        columns={2}
        spacingX={5}
        mb={4}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="firstName"
            name="firstName"
            label="Vorname"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="lastName"
            name="lastName"
            label="Nachname"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
        ]}
      />
      <PrintableField<RadioFieldType>
        EditComponent={RadioFormikField}
        PrintComponent={RadioPrintField}
        key="economicInterest"
        name="economicInterest"
        direction="column"
        mb={3}
        options={[
          {
            key: '1',
            label:
              'Ich bestätige, dass ich auf eigene Rechnung, im eigenen wirtschaftlichen Interesse und nicht auf fremde  Veranlassung handle.',
            value:
              'Ich bestätige, dass ich auf eigene Rechnung, im eigenen wirtschaftlichen Interesse und nicht auf fremde  Veranlassung handle.',
          },
          {
            key: '2',
            label: (
              <Flex w="100%">
                <Text fontSize="inherit" mr={2} flexShrink={0}>
                  Wirtschaftlich Berechtigter ist*)
                </Text>
                <PrintableField<StringFieldType>
                  EditComponent={StringFormikField}
                  PrintComponent={StringPrintField}
                  key="beneficialOwner"
                  name="beneficialOwner"
                  variant="flushed"
                  showRequiredIcon={false}
                  isRequired
                  flexGrow={1}
                  mt="-3px"
                />
              </Flex>
            ),
            value: 'Wirtschaftlich Berechtigter ist*)',
          },
        ]}
        isRequired
      />
      <PrintableText>
        *) Bei juristischen Personen und Personengesellschaften ist ein aktueller Handelsregisterauszug und bei
        juristischen Personen zusätzlich eine aktuelle Gesellschafterliste beizufügen. Gesellschafter, die mit
        mindestens 25 % beteiligt sind, müssen sich gesondert legitimieren.
      </PrintableText>
      <Divider my={3} borderColor="#E4E7EB" />
      <PrintableText>
        <Box as="span" fontWeight="bold">
          <Box as="span" textDecor="underline">
            Erläuterung:
          </Box>{' '}
          Wirtschaftlich Berechtigte
        </Box>{' '}
        ist die natürliche Person, in deren Eigentum oder unter deren Kontrolle der Vertragspartner letztlich steht,
        oder die natürliche Person, auf deren Veranlassung eine Transaktion letztlich durchgeführt oder eine
        Geschäftsbeziehung letztlich begründet wird. Hierzu zählen insbesondere:
      </PrintableText>
      <PrintableText>
        1. bei Gesellschaften, die nicht an einem organisierten Markt im Sinne des § 2 Abs. 5 des
        Wertpapierhandelsgesetzes notiert sind und keinen dem Gemeinschaftsrecht entsprechen-den
        Transparenzanforderungen im Hinblick auf Stimmrechtsanteile oder gleichwertigen internationalen Standards
        unterliegen, jede natürliche Person, welche unmittelbar oder mittelbar mehr als 25 Prozent der Kapitalanteile
        hält oder mehr als 25 Prozent der Stimmrechte kontrolliert,
      </PrintableText>
      <PrintableText>
        2. bei rechtsfähigen Stiftungen und Rechtsgestaltungen, mit denen treuhänderisch Vermögen verwaltet oder
        verteilt oder die Verwaltung oder Verteilung durch Dritte beauftragt wird, oder diesen vergleichbaren
        Rechtsformen, (i) jede natürliche Person, die als Treugeber handelt oder auf sonstige Weise 25 Prozent oder mehr
        des Vermögens kontrolliert, (ii) jede natürliche Person, die als Begünstigte von 25 Prozent oder mehr des
        verwalteten Vermögens bestimmt worden ist, (iii) die Gruppe von natürlichen Personen, zu deren Gunsten das
        Vermögen hauptsächlich verwaltet oder verteilt werden soll, sofern die natürliche Person, die Begünstigte des
        verwalteten Vermögens werden soll, noch nicht bestimmt ist, (iv) jede natürliche Person, die auf sonstige Weise
        unmittelbar oder mittelbar beherrschenden Einfluss auf die Vermögensverwaltung oder Ertragsverteilung ausübt,
        und
      </PrintableText>
      <PrintableText>
        3. bei Handeln auf Veranlassung derjenige, auf dessen Veranlassung gehandelt wird. Soweit der Vertragspartner
        als Treuhänder handelt, handelt er ebenfalls auf Veranlassung.
      </PrintableText>
      <Divider my={1} borderColor="#E4E7EB" />
      <PrintableText my={2}>Ich bin / der wirtschaftlich Berechtigte ist</PrintableText>
      <PrintableField<RadioFieldType>
        EditComponent={RadioFormikField}
        PrintComponent={RadioPrintField}
        key="beneficialOwnerStatus"
        name="beneficialOwnerStatus"
        direction="column"
        options={[
          {
            key: '1',
            label:
              'keine politisch exponierte Person, kein unmittelbares Familienmitglied einer politisch exponierten Person und keine einer politisch exponierten Person nahestehende Person.',
            value:
              'keine politisch exponierte Person, kein unmittelbares Familienmitglied einer politisch exponierten Person und keine einer politisch exponierten Person nahestehende Person.',
          },
          {
            key: '2',
            label:
              'eine politisch exponierte Person, die ihr wichtiges öffentliches Amt im Inland oder als im Inland gewählte Abgeordnete des Europäischen Parlaments ausübt oder die ihr wichtiges öffentliches Amt seit einem Jahr nicht mehr ausgeübt hat, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person nahestehende Person.',
            value:
              'eine politisch exponierte Person, die ihr wichtiges öffentliches Amt im Inland oder als im Inland gewählte Abgeordnete des Europäischen Parlaments ausübt oder die ihr wichtiges öffentliches Amt seit einem Jahr nicht mehr ausgeübt hat, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person nahestehende Person.',
          },
          {
            key: '3',
            label:
              'eine sonstige politisch exponierte Person, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person naheste-hende Person.',
            value:
              'eine sonstige politisch exponierte Person, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person naheste-hende Person.',
          },
        ]}
        isRequired
      />
      <PrintableText mb={2}>Bei Vorliegen einer politisch exponierten Person bitte angeben:</PrintableText>
      <FormGridLayout
        mb={2}
        columns={1}
        spacing={2}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="politicallyExposedPerson"
            name="politicallyExposedPerson"
            label="Genaue Bezeichnung der Funktion als / Beziehung zu eine(r) politisch exponierte(n) Person:"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            labelInside
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="fundsOrigin"
            name="fundsOrigin"
            label="Herkunft der Mittel zur Leistung der Kapitaleinlage:"
            labelInside
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
        ]}
      />
      <Divider my={2} borderColor="#E4E7EB" />
      <PrintableText mb={2}>
        <Box as="span" fontWeight="bold">
          <Box as="span" textDecor="underline">
            Erläuterung:
          </Box>{' '}
          Politisch exponierte Personen
        </Box>{' '}
        (nachfolgend:{' '}
        <Box as="span" fontWeight="bold">
          "PEP"
        </Box>
        ) sind Personen, die führende politische/öffentliche Ämter ausüben oder innerhalb des letzten Jahres vor Abgabe
        des Zeichnungsangebotes ausgeübt haben und die mit ihrer Einzelentscheidung grundlegende Prozesse beeinflussen
        oder in Gang setzen könnten.
      </PrintableText>

      <PrintableText mb={2}>
        Als Inhaber führender politischer/öffentlicher Ämter gelten: (i) Staats- und Regierungschefs, Minister und
        stellvertretende Minister bzw. Staatssekretäre, (ii) Parlamentsmitglieder, (iii) Mitglieder von obersten
        Gerichten, Verfassungsgerichten oder sonstigen hochrangigen Institutionen der Justiz, gegen deren Entscheidung,
        von außergewöhnlichen Umständen abgesehen, kein Rechtsmittel eingelegt werden kann, (iv) Mitglieder der
        Rechnungshöfe oder Vorstände von Zentralbanken, (v) Botschafter, Geschäftsträger und hochrangige Offiziere der
        Streitkräfte, (vi) Mitglieder der Verwaltungs-, Leitungs- oder Aufsichtsorgane staatlicher Unternehmen, (vii)
        Religionsführer.
      </PrintableText>
      <PrintableText mb={2}>
        Des Weiteren sind als PEP anzusehen und zu behandeln unmittelbare Familienmitglieder einer PEP und dieser
        bekanntermaßen nahestehende Personen, also (i) Ehepartner und Partner, die nach einzelstaatlichem Recht dem
        Ehepartner gleichgestellt sind, (ii) Kinder von PEP und deren Ehepartner oder Partner, (iii) Eltern von PEP,
        (iv) jede natürliche Person, die bekanntermaßen mit einer PEP gemeinsame wirtschaftliche Eigentümerin von
        Rechtspersonen und Rechtsvereinbarungen ist oder sonstige enge Geschäftsbeziehungen hält (insbesondere
        Firmenmitinhaber), (v) jede natürliche Person, die alleinige wirtschaftliche Eigentümerin einer Rechtsperson
        oder Rechtsvereinbarung ist, die bekanntermaßen tatsächlich zum Nutzen der PEP errichtet wurde.
      </PrintableText>
      <FormGridLayout
        columns={2}
        spacingX={5}
        mt={3}
        mb={2}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="placeAndDate"
            name="placeAndDate"
            label="Ort, Datum"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={SignatureFormikField}
            PrintComponent={SignaturePrintField}
            variant="flushed"
            key="moneyLaunderingSignature"
            name="moneyLaunderingSignature"
            label="Unterschrift"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />,
        ]}
      />
    </PageWrapper>
  );
};
