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
import { ListItemEmailIcon } from 'jexity-app/icons/ListItemEmailIcon';
import { ListItemPeopleIcon } from 'jexity-app/icons/ListItemPeopleIcon';
import { ListItemWebsiteIcon } from 'jexity-app/icons/ListItemWebsiteIcon';
import { ListItemFaxIcon } from 'jexity-app/icons/ListItemFaxIcon';
import { ListItemPhoneIcon } from 'jexity-app/icons/ListItemPhoneIcon';
import { FC } from 'react';

const defaultHeadingProps: HeadingProps = {
  fontFamily: 'heading',
  fontWeight: 700,
  color: 'brand.primary.500',
  mb: 4,
  fontSize: ['xl', null, '2xl'],
};

const defaultTextProps: TextProps = {
  fontSize: 'sm',
  fontFamily: 'body',
  fontWeight: 400,
  color: 'gray.900',
  mb: 4,
};

export const Impressum: FC = () => (
  <Box>
    <Heading
      as="h3"
      {...defaultHeadingProps}
      color="brand.secondary.500"
      fontSize={['3xl', null, '4xl']}
      mb={[6, null, null, '4.75rem']}
    >
      IMPRESSUM
    </Heading>
    <Heading as="h4" {...defaultHeadingProps}>
      ANGABEN GEMÄSS § 5 TMG
    </Heading>

    <Text {...defaultTextProps} mb={0}>
      DFK Nord AG
    </Text>
    <Text {...defaultTextProps} mb={0}>
      Kieler Str. 97a
    </Text>
    <Text {...defaultTextProps} mb="3rem">
      25451 Quickborn
    </Text>

    <Heading as="h4" {...defaultHeadingProps}>
      VERTRETEN DURCH:
    </Heading>
    <Text {...defaultTextProps}>DFK Nord AG, vertreten durch</Text>

    <Text {...defaultTextProps} fontWeight={600}>
      MITGLIEDER DES VORSTANDS
    </Text>
    <List>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPeopleIcon} mt={1} color="brand.primary.500" />
        Vladimir Ponkrashov (Vorsitzender)
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPeopleIcon} mt={1} color="brand.primary.500" />
        Valeri Spady (Vorsitzender)
      </ListItem>
    </List>
    <Text {...defaultTextProps} fontWeight={600}>
      MITGLIEDER DES VORSTANDS
    </Text>
    <List mb={8}>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPeopleIcon} mt={1} color="brand.primary.500" />
        T. Puck (Vorsitzender)
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPeopleIcon} mt={1} color="brand.primary.500" />
        A. Sutygin
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPeopleIcon} mt={1} color="brand.primary.500" />
        V. Bühler
      </ListItem>
    </List>

    <Heading as="h4" {...defaultHeadingProps}>
      KONTAKT:
    </Heading>
    <List mb={8}>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemPhoneIcon} mt={1} color="brand.primary.500" />
        Tel.: +49 4106 6380-310
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemFaxIcon} mt={1} color="brand.primary.500" />
        Fax: +49 4106 6380-320
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemEmailIcon} mt={1} color="brand.primary.500" />
        E-Mail: info@dfknord.de
      </ListItem>
      <ListItem {...(defaultTextProps as ListItemProps)} d="flex">
        <ListIcon as={ListItemWebsiteIcon} mt={1} color="brand.primary.500" />
        Webseite: www.dfknord.de
      </ListItem>
    </List>

    <Heading as="h4" {...defaultHeadingProps}>
      REGISTEREINTRAG:
    </Heading>
    <Text {...defaultTextProps}>Amtsgericht/Register: Pinneberg</Text>
    <Text {...defaultTextProps}>Registernummer: 14584</Text>
    <Text {...defaultTextProps}>Umsatzsteueridentifikationsnummer: DE326383914</Text>
    <Text {...defaultTextProps}>Finanzamt: Elmshorn</Text>

    <Heading as="h4" {...defaultHeadingProps}>
      TECHNISCHE UMSETZUNG:
    </Heading>
    <Text {...defaultTextProps}>Evelan GmbH</Text>
    <Link isExternal href="https://evelan.de/" color="#5771DB" _hover={{ textDecor: 'none' }}>
      https://evelan.de/
    </Link>

    <Heading as="h4" {...defaultHeadingProps} mt={12} fontSize="2xl">
      STREITSCHLICHTUNG
    </Heading>
    <Text {...defaultTextProps}>
      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
    </Text>
    <Link isExternal href="https://ec.europa.eu/consumers/odr" color="#5771DB" _hover={{ textDecor: 'none' }}>
      https://ec.europa.eu/consumers/odr
    </Link>
    <Text {...defaultTextProps} mt={4}>
      Unsere E-Mail-Adresse finden Sie oben im Impressum.
    </Text>
    <Text {...defaultTextProps} mb={12}>
      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
      teilzunehmen.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="2xl">
      HAFTUNG FÜR INHALTE
    </Heading>
    <Text {...defaultTextProps}>
      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
      Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
      oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
      Tätigkeit hinweisen.
    </Text>
    <Text {...defaultTextProps}>
      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
      hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
      Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
      umgehend entfernen.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="2xl">
      HAFTUNG FÜR LINKS
    </Heading>
    <Text {...defaultTextProps}>
      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
      können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets
      der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
      Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
      erkennbar.
    </Text>
    <Text {...defaultTextProps}>
      Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
      Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
      entfernen.
    </Text>

    <Heading as="h4" {...defaultHeadingProps} fontSize="2xl">
      URHEBERRECHT
    </Heading>
    <Text {...defaultTextProps}>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
      Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
      Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
      dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
    </Text>
    <Text {...defaultTextProps}>
      Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
      beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
      Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
      Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
    </Text>
  </Box>
);
