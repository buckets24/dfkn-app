import {
  Box,
  Heading,
  HeadingProps,
  Link,
  List,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { ListItemChevronIcon } from 'jexity-app/icons/ListItemChevronIcon';
import { FC } from 'react';

const defaultHeadingProps: HeadingProps = {
  fontFamily: 'heading',
  fontWeight: 700,
  color: 'brand.primary.500',
  mb: 6,
  fontSize: ['xl', null, '2xl'],
};

const defaultTextProps: TextProps = {
  fontSize: 'sm',
  fontFamily: 'body',
  fontWeight: 400,
  color: 'gray.900',
  mb: 6,
};

export const Datenschutz: FC = () => (
  <Box>
    <Heading
      as="h3"
      {...defaultHeadingProps}
      color="brand.secondary.500"
      fontSize={['3xl', null, '4xl']}
      mb={[6, null, null, '4.75rem']}
    >
      DATENSCHUTZ
    </Heading>

    <Heading as="h4" {...defaultHeadingProps}>
      Hinweise zur Datenverarbeitung
    </Heading>

    <Text {...defaultTextProps}>
      Mit den folgenden Informationen möchten wir Ihnen einen Überblick über die im Rahmen unserer Geschäftsbeziehung
      erforderliche Verarbeitung Ihrer personenbezogenen Daten und Ihre daraus entstehenden Rechte geben. Welche Daten
      im Einzelnen verarbeitet und in welcher konkreten Weise genutzt werden, richtet sich maßgeblich nach Ihrer Anfrage
      und den jeweils beantragten bzw. vereinbarten Dienstleistungen.
    </Text>

    <Text {...defaultTextProps}>
      Zur Beantwortung Ihrer Anfragen bzw. zur Erbringung unserer vertraglichen Pflichten verwenden wir im Rahmen
      unserer Geschäftsbeziehung die Webanwendung „nessy cloud“. „nessy cloud“ ist ein Service der DFK Nord AG. Hierbei
      handelt es sich um eine virtuelle Infrastruktur zur Archivierung Ihrer Daten. Diese Webanwendung ermöglicht es uns
      zusätzlich Online-Beratungen durchzuführen und gibt Ihnen einen direkten Online-Zugang zu Ihren Daten. Dabei
      werden die Daten bei dem Infrastruktur-Dienst „AWS“, ein Dienst von Amazon Web Services Inc. 410 Terry Avenues
      North, Seattle WA 98109, USA, in einem Rechenzentrum in Frankfurt am Main, Deutschland, gehostet.
    </Text>

    <Text {...defaultTextProps}>Diese Hinweise zur Datenverarbeitung werden stets aktualisiert.</Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Name und Kontaktdaten des für die Verarbeitung Verantwortlichen sowie des betrieblichen Datenschutzbeauftragten
    </Heading>

    <Text {...defaultTextProps}>Unsere Hinweise zur Datenverarbeitung gelten für die Verarbeitung durch:</Text>

    <Text {...defaultTextProps}>
      <Box as="span" fontWeight={700}>
        DFK Nord AG
      </Box>{' '}
      <br />
      vertreten durch den Vorstandsvorsitzenden <br />
      Herrn Vladimir Ponkrshov <br />
      Kieler Str. 97a <br />
      25451 Quickborn
    </Text>

    <Text {...defaultTextProps}>
      Tel.: 
      <Link href="tel:+49 (0)4106 6380-310" color="brand.primary.500">
        +49 (0)4106 6380-310
      </Link>
      <br />
      Fax:{' '}
      <Link href="tel:+49 4106 6380-320" color="brand.primary.500">
        +49 4106 6380-320
      </Link>
      <br />
      E-Mail:{' '}
      <Link href="mailto:info@dfknord.de" color="brand.primary.500">
        info@dfknord.de
      </Link>
      <br />
      Webseite:{' '}
      <Link href="https://www.dfknord.de" color="brand.primary.500">
        www.dfknord.de 
      </Link>
      <br />
    </Text>

    <Text {...defaultTextProps}>Unsere betriebliche Datenschutzbeauftragte erreichen Sie unter: </Text>

    <Text {...defaultTextProps}>
      DFK Nord AG,
      <br />
      Xenia Seiler
      <br />
      Kieler Str. 97a <br />
      25451 Quickborn
      <br />
      Tel.: 
      <Link href="tel:+49 (0)4106 6380-310" color="brand.primary.500">
        +49 (0)4106 6380-310,
      </Link>
      <br />
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Art der erhobenen personenbezogenen Daten
    </Heading>

    <Text {...defaultTextProps}>
      Im Rahmen unserer Geschäftsbeziehung verarbeiten wir verschiedene Daten. Der Umfang der Daten orientiert sich
      insbesondere an den Daten, welche wir für die Erfüllung unserer vertraglichen Pflichten benötigen sowie Ihren
      freiwilligen Angaben. 
    </Text>

    <Text {...defaultTextProps}>
      Für die Beantwortung Ihrer Anfragen werden nachfolgende personenbezogene Daten verarbeitet:
    </Text>

    <Text {...defaultTextProps}>
      Vorname, Nachname, Telefon (optional), E-Mail-Adresse, Passwort (wenn „Single-Sign-On“ nicht verwendet wird),
      Profilbild (optional), Abteilung (optional).
    </Text>

    <Text {...defaultTextProps}>
      Wenn Sie an einer Online-Beratung teilnehmen, werden zusätzlich nachfolgende personenbezogene Daten verarbeitet -
      ohne die entsprechenden Angaben kann keine Beratung erfolgen:
    </Text>

    <Text {...defaultTextProps}>
      Thema der Besprechung, Teilnehmer-IP-Adresse, erweiterte Kontaktdaten (Anschrift, Telefax, Mobiltelefon), Titel,
      Geburtsort und -datum, Staatsangehörigkeit, Steuer-ID, Angaben zu Familienstand und Angehörigen, Angaben zur
      Einkommensverteilung (z. B. Einnahmen und Ausgaben), Angaben zur gesetzlichen und privaten Vorsorge sowie
      technische Daten wie Geräte-/Hardware-Informationen.
    </Text>

    <Text {...defaultTextProps}>
      Wenn Sie während der Online-Beratung die Chatfunktionen nutzen, werden zusätzlich folgende Daten protokolliert:
    </Text>

    <Text {...defaultTextProps}>Texteingaben, Datum und Uhrzeit.</Text>

    <Text {...defaultTextProps}>
      Um die Anzeige von Video und die Wiedergabe von Audio in der Online-Beratung zu ermöglichen, werden entsprechend
      während der Dauer des Meetings die Daten vom Mikrofon Ihres Endgeräts sowie von einer etwaigen Videokamera des
      Endgeräts verarbeitet. 
    </Text>

    <Text {...defaultTextProps}>
      Selbstverständlich könne Sie die Kamera oder das Mikrofon jederzeit selbst abschalten bzw. stummstellen.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Zweck und Rechtsgrundlage der Verarbeitung 
    </Heading>
    <Text {...defaultTextProps}>
      Wir verarbeiten Ihre personenbezogenen Daten im Einklang mit den Bestimmungen der DSGVO und dem BDSG.
    </Text>

    <Text {...defaultTextProps}>Die Erhebung dieser Daten erfolgt grundsätzlich, </Text>
    <List mb={5}>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        um Sie als unseren Auftraggeber identifizieren zu können,
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        um Sie angemessen beraten zu können,
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        zur Korrespondenz mit Ihnen
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        zur Rechnungsstellung;
      </ListItem>
    </List>

    <Text {...defaultTextProps}>
      Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist grundsätzlich Art. 6 DSGVO. Hier kommen
      insbesondere folgende Rechtsgrundlagen in Betracht: 
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Aufgrund einer Einwilligung nach (Art. 6 Abs. 1 lit. a DSGVO)
    </Heading>
    <Text {...defaultTextProps}>
      Erfolgt die Datenverarbeitung auf der Grundlage einer von Ihnen erteilten Einwilligung, haben Sie das Recht, die
      Einwilligung jederzeit mit Wirkung für die Zukunft uns gegenüber zu widerrufen. 
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Zur Erfüllung von vertraglichen Pflichten (Art. 6 Abs. 1 lit. b DSGVO)
    </Heading>
    <Text {...defaultTextProps}>
      Die Verarbeitung von Daten erfolgt zur Durchführung unseres Vertrages sowie etwaiger Anfragen durch Sie.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Aufgrund gesetzlicher Vorgaben (Art. 6 Abs. lit. c DSGVO)
    </Heading>
    <Text {...defaultTextProps}>
      Wir unterliegen verschiedenen gesetzlichen Verpflichtungen, die eine Datenverarbeitung nach sich ziehen. Hierzu
      zählen z. B.: Steuergesetze sowie die gesetzliche Buchführungdie Erfüllung von Anfragen und Anforderungen von
      Aufsichts- oder Strafverfolgungsbehördendie Erfüllung steuerrechtlicher Kontroll- und Meldepflichten.
    </Text>
    <Text {...defaultTextProps}>
      Darüber hinaus kann die Offenlegung personenbezogener Daten im Rahmen von behördlichen und/oder gerichtlichen
      Maßnahmen zu Zwecken der Beweiserhebung, Strafverfolgung oder Durchsetzung zivilrechtlicher Ansprüche erforderlich
      werden.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Im Rahmen einer Interessenabwägung (Art. 6 Abs. 1 lit. f DSGVO)
    </Heading>
    <Text {...defaultTextProps}>
      Soweit erforderlich, verarbeiten wir Ihre Daten über die eigentliche Erfüllung des Vertrages hinaus zur Wahrung
      berechtigter Interessen von uns oder Dritten. Beispiele für solche Fälle sind: Geltendmachung rechtlicher
      Ansprüche und Verteidigung bei rechtlichen Streitigkeitensowie der Verarbeitung im CRM-System. 
    </Text>
    <Text {...defaultTextProps}>
      Wenn wir Ihre Daten auf Basis einer Interessenabwägung verarbeiten, haben Sie das Recht, der Verarbeitung nach
      Art. 21 DSGVO zu widersprechen. 
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Empfänger und Weitergabe Ihrer Daten
    </Heading>
    <Text {...defaultTextProps}>
      Innerhalb unserer Organisation haben unsere Mitarbeiter Zugriff auf Ihre personenbezogenen Daten. 
    </Text>
    <Text {...defaultTextProps}>
      Auch werden Ihre Daten ggf. an Dienstleister weitergegeben, die für uns als Auftragsverarbeiter tätig werden.
      Hierzu zählen insbesondere Dienstleister zur Unterstützung bzw. Wartung von EDV oder IT-Anwendungen, Buchhaltung,
      Datenvernichtung. Bei der Einbindung von Dienstleistern in Datenverarbeitungsprozesse werden unsere
      Datenschutzstandards auf die Dienstleister übertragen. Bei Auftragsverarbeitungsverhältnissen werden Verträge
      gemäß Art. 28 DSGVO vereinbart. 
    </Text>
    <Text {...defaultTextProps}>
      Eine Weitergabe von Daten an Empfänger außerhalb unseres Hauses erfolgt nur unter Beachtung der anzuwendenden
      Vorschriften zum Datenschutz. Hierzu gehören insbesondere öffentliche Stellen und Institutionen (z. B. Finanz-
      oder Strafverfolgungsbehörden) bei Vorliegen einer gesetzlichen oder behördlichen Verpflichtung, Kredit- und
      Finanzdienstleister, Steuerberater oder Wirtschafts- und Lohnsteuer- und Betriebsprüfer.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Datenverarbeitung außerhalb der Europäischen Union
    </Heading>
    <Text {...defaultTextProps}>
      Ihre Daten werden grundsätzlich innerhalb der Europäischen Union und Staaten innerhalb des Europäischen
      Wirtschaftsraums (EWR) in einem Rechenzentrum in Frankfurt gespeichert. 
    </Text>
    <Text {...defaultTextProps}>
      Ein Transfer Ihrer Daten außerhalb der Europäischen Union - insbesondere in die USA - kann aufgrund der Nutzung
      des Infrastruktur-Dienstes „AWS“ nicht ausgeschlossen werden.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Dauer und Löschung Ihrer Daten
    </Heading>
    <Text {...defaultTextProps}>
      Wir verarbeiten und speichern Ihre personenbezogenen Daten, solange dies für die Erfüllung unserer vertraglichen
      und gesetzlichen Pflichten erforderlich ist. Sind die Daten für die Erfüllung vertraglicher oder gesetzlicher
      Pflichten nicht mehr erforderlich, werden diese innerhalb von 18 Monaten gelöscht.
    </Text>

    <Text {...defaultTextProps}>Die gesetzlichen Aufbewahrungspflichten ergeben sich im Wesentlichen aus:</Text>
    <List mb={5}>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        dem Handelsgesetzbuch und der Abgabenordnung. Die dort vorgegebenen Fristen zur Aufbewahrung bzw. Dokumentation
        betragen in der Regel sechs bis zehn Jahre;
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex" mb={2}>
        <ListIcon as={ListItemChevronIcon} mt={1} color="brand.primary.500" />
        den §§ 195 ff des Bürgerlichen Gesetzbuches. Die dort genannten Verjährungsfristen betragen bis zu 30 Jahre,
        wobei die regelmäßige Verjährungsfrist 3 Jahre beträgt.
      </ListItem>
    </List>

    <Text {...defaultTextProps}>
      Sofern die Datenverarbeitung im berechtigten Interesse von uns oder einem Dritten erfolgt, werden die
      personenbezogenen Daten gelöscht, sobald dieses Interesse nicht mehr besteht. Hierbei gelten die genannten
      Ausnahmen.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Ihre Rechte
    </Heading>
    <Text {...defaultTextProps}>
      Sie haben das Recht auf Auskunft nach Artikel 15 DSGVO, das Recht auf Berichtigung nach Artikel 16 DSGVO, das
      Recht auf Löschung nach Artikel 17 DSGVO, das Recht auf Einschränkung der Verarbeitung nach Artikel 18 DSGVO, das
      Recht auf Widerspruch aus Artikel 21 DSGVO sowie das Recht auf Datenübertragbarkeit aus Artikel 20 DSGVO.
    </Text>
    <Text {...defaultTextProps}>
      Beim Auskunftsrecht und beim Löschungsrecht gelten ggf. Einschränkungen nach §§ 34 und 35 BDSG.
    </Text>
    <Text {...defaultTextProps}>
      Darüber hinaus besteht ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde nach Artikel 77 DSGVO
      i. V. m. § 19 BDSG.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Die für uns zuständige Aufsichtsbehörde ist:
    </Heading>
    <Text {...defaultTextProps}>
      Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein
      <br />
      Frau Marit Hansen
      <br />
      Holstenstraße 98
      <br />
      24103 Kiel
      <br />
    </Text>

    <Text {...defaultTextProps}>
      Tel.: 
      <Link href="tel:+49 (0)4 31 988-1200" color="brand.primary.500">
        +49 (0)4 31 988-1200
      </Link>
      <br />
      Fax:{' '}
      <Link href="tel:+49 (0)4 31 988-1223" color="brand.primary.500">
        +49 (0)4 31 988-1223
      </Link>
      <br />
      E-Mail:{' '}
      <Link href="mailto:mail@datenschutzzentrum.de " color="brand.primary.500">
        mail@datenschutzzentrum.de 
      </Link>
      <br />
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="lg">
      Information über Ihr Widerspruchsrecht nach Artikel 21 DSGVO
    </Heading>
    <Text {...defaultTextProps}>
      Sie haben das Recht aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung
      Sie betreffender personenbezogener Daten, die aufgrund von Artikel 6 Absatz 1 lit. f DSGVO (Datenverarbeitung auf
      der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen.
    </Text>
    <Text {...defaultTextProps}>
      Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können
      zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten
      überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
    </Text>
    <Text {...defaultTextProps}>
      Der Widerspruch kann formfrei unter Angabe Ihres Namens und Ihrer Adresse erfolgen und sollte an die oben
      genannten Kontaktdaten gerichtet werden. Bitte haben Sie Verständnis, dass die Bearbeitung Ihres Widerspruchs
      regelmäßig 3 Werktage nach sich ziehen kann.
    </Text>
    <Text {...defaultTextProps}>Stand 01.03.2021</Text>
  </Box>
);
