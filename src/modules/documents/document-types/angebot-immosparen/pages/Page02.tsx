/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Grid, Heading, Text, UnorderedList } from '@chakra-ui/react';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import { formatNumToCurrency } from 'jexity-app/utils/formatNumber';
import React, { FC, Fragment } from 'react';
import { ContractorType } from 'src/API';
import { formatSalutation } from 'src/modules/common/utils';
import { MapIcon } from 'src/modules/documents/document-types/angebot-immosparen/icons/MapIcon';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { CapitalBuildingIcon } from 'src/theme/icons/CapitalBuildingIcon';
import { ProvisionIcon } from 'src/theme/icons/ProvisionIcon';
import { TurboIcon } from 'src/theme/icons/TurboIcon';
import { PageWrapper } from '../../common/PageWrapper';
import { HeadingWrapper } from '../../investment-kompass/components/HeadingWrapper';

export const Page02: FC = () => {
  const { value: productPlan } = useFormikByName('productPlan');
  const { value: capitalBuilding } = useFormikByName('capitalBuilding');
  const { value: retirementProvision } = useFormikByName('retirementProvision');
  const { value: repaymentTurbo } = useFormikByName('repaymentTurbo');
  const { value: productPlanSummary } = useFormikByName('productPlanSummary');
  const { value: installmentAgio } = useFormikByName('installmentAgio');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { activeDocumentId, printMode } = useDocFormMeta();
  let interest = formatNumToCurrency(productPlanSummary?.totalInterest ?? 0, true);
  let interestText = 'Zinsen';

  const documentQuery = useDocumentByIdQuery(activeDocumentId, { enabled: false });
  const document = documentQuery.data;

  const client = document?.contractor === ContractorType.SECONDARY ? document.client.contractor : document?.client;

  const salutationText = client
    ? `Sehr geehrte${client.salutation === 'Herr' ? 'r' : ''} ${formatSalutation(client)}`
    : 'Sehr geehrte Damen und Herren';

  if (
    productPlan === 'installment' &&
    (installmentAgio === '5%, 50% Verrechnung' || installmentAgio === '5%, 100% Verrechnung')
  ) {
    interest = formatNumToCurrency(
      (productPlanSummary?.totalInterest ?? 0) -
        (productPlanSummary?.amount ?? 0) * 12 * 0.05 * (productPlanSummary?.years ?? 0),
      true
    );
    interestText = 'Zinsen abzüglich Agio';
  }

  const highlights = [
    'flexible Laufzeit',
    '12 Monate Kündigungsfrist zum Jahresende',
    `Kapitalverfügung ab dem ${productPlan === 'oneTimeInvestment' ? '31.12.2025' : '31.12.2026'}`,
    'Beitragsfreistellung möglich',
    'jährliche Zinsausschüttung',
    'Verzinsung 5% p.a.',
  ];

  const goals = [
    {
      label: 'Kapitalaufbau',
      isSelected: capitalBuilding,
      icon: <CapitalBuildingIcon />,
      desc: 'zusätzlich Kapital zu bilden für Ihre finanzielle Unabhängigkeit',
    },
    {
      label: 'Altervorsorge',
      isSelected: retirementProvision,
      icon: <ProvisionIcon w="100px" h="54px" />,
      desc: 'eine zusätzliche Vorsorge für einen sorgenfreien Ruhestand aufzubauen',
    },
    {
      label: 'Tilgungsturbo',
      isSelected: repaymentTurbo,
      icon: <TurboIcon w="100px" h="54px" />,
      desc: 'mit einem Tilgungsturbo Ihr Darlehen frühzeitig abzulösen',
    },
  ];

  const selectedGoalsLength = goals.filter((goal) => goal.isSelected).length;

  return (
    <PageWrapper p={12} maxH="1202px">
      <HeadingWrapper mb={5}>
        <Heading
          color="documents.primary.600"
          fontFamily="body"
          as="h3"
          fontSize="xl"
          lineHeight={1}
          textTransform="uppercase"
        >
          INVESTMENT STRATEGIE <br />
          <Box as="span" color="documents.tertiary.500">
            {formatSalutation(client)}
          </Box>
        </Heading>
      </HeadingWrapper>
      <Flex justifyContent="space-between">
        <Box maxW={printMode ? '400px' : '500px'}>
          <Text mb={5} fontWeight="bold">
            {salutationText}
          </Text>
          <Text mb={5}>vielen Dank für Ihr Interesse an unserer intelligenten Investment-Strategie.</Text>
          {(capitalBuilding || retirementProvision || repaymentTurbo) && (
            <>
              <Text mb={printMode ? 1 : 2}>Wie Sie uns mitgeteilt haben, ist Ihnen wichtig:</Text>
              {goals.map((goal, i) => {
                return (
                  <UnorderedList key={i} mx={0} listStyleType="none">
                    {goal.isSelected && (
                      <Flex>
                        <ChevronIcon
                          direction="right"
                          mt={1}
                          mr={2}
                          w="14px"
                          h="14px"
                          color="documents.secondary.700"
                        />
                        <Text mb={printMode ? 1 : 2}>{goal.desc}</Text>
                      </Flex>
                    )}
                  </UnorderedList>
                );
              })}
            </>
          )}
          <Flex alignItems="center" mt={5} mb={printMode ? 5 : 10}>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              p={printMode ? 2 : 5}
              minW="142px"
              minH="110px"
              bg="#F3F4F7"
              borderRadius="3px"
              textAlign="center"
            >
              <Heading fontFamily="body" as="h3" color="documents.tertiary.500" fontSize="lg" fontWeight="bold">
                {formatNumToCurrency(productPlanSummary?.amount ?? 0, true)}
              </Heading>
              <Text color="documents.secondary.700" fontWeight={500}>
                {productPlan === 'installment' && 'Mtl.'} Investiton
              </Text>
            </Flex>
            {goals.map((goal, i) => {
              return (
                <Fragment key={i}>
                  {goal.isSelected && (
                    <>
                      <ChevronIcon
                        direction="right"
                        mx={selectedGoalsLength === 3 ? 2 : 6}
                        w="32px"
                        h="16px"
                        color="documents.secondary.300"
                      />
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                        p={printMode ? 2 : 5}
                        // minW="162px"
                        maxH="107px"
                        bg="#F3F4F7"
                        borderRadius="3px"
                        textAlign="center"
                      >
                        {goal.icon}
                        <Text mt={2} color="documents.secondary.700" fontWeight={500}>
                          {goal.label}
                        </Text>
                      </Flex>
                    </>
                  )}
                </Fragment>
              );
            })}
          </Flex>
        </Box>
        <Box mt={selectedGoalsLength > 1 ? '-100px' : -3}>
          <MapIcon
            w={printMode ? (selectedGoalsLength > 1 ? '160px' : '100%') : selectedGoalsLength > 1 ? '220px' : '100%'}
          />
        </Box>
      </Flex>
      <Box mb={printMode ? 3 : 10}>
        <Text mb={3}>
          Das gesamte Guthaben in Ihrem Vertrag verzinst sich jedes Jahr mit{' '}
          <Box as="span" fontWeight="bold">
            5%.
          </Box>
        </Text>
        <Text>
          Sofern Sie den Vertrag planmäßig besparen, ergibt sich nach Ablauf der Vertragslaufzeit von{' '}
          <Box as="span" fontWeight="bold">
            {productPlanSummary?.years} Jahren
          </Box>{' '}
          ein Vertragsguthaben von{' '}
          <Box as="span" fontWeight="bold">
            {formatNumToCurrency(productPlanSummary?.totalCredit, true)}
          </Box>
        </Text>
      </Box>
      <Flex alignItems="center" mb={printMode ? 3 : 10}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          p={5}
          minW="142px"
          minH="110px"
          bg="#F3F4F7"
          borderRadius="3px"
          textAlign="center"
        >
          <Heading fontFamily="body" as="h3" color="documents.tertiary.500" fontSize="lg" fontWeight="bold">
            {productPlanSummary?.years ?? 0} Jahre
          </Heading>
          <Text fontSize="sm" color="documents.secondary.700" fontWeight={500}>
            Vertragslaufzeit
          </Text>
        </Flex>
        <ChevronIcon direction="right" mx={6} w="32px" h="16px" color="documents.secondary.300" />
        <Box>
          <Flex
            mb={2}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            py={1}
            px={3}
            minW="142px"
            bg="#F3F4F7"
            borderRadius="3px"
            textAlign="center"
          >
            <Heading fontFamily="body" as="h3" color="documents.tertiary.500" fontSize="lg" fontWeight="bold">
              {formatNumToCurrency(
                productPlanSummary?.annualInvestment
                  ? productPlanSummary?.annualInvestment + productPlanSummary?.deposit
                  : productPlanSummary?.deposit ?? 0,
                true
              )}
            </Heading>
            <Text fontSize="sm" color="documents.secondary.700" fontWeight={500}>
              Einzahlungen
            </Text>
          </Flex>
          <Flex
            mt={2}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            py={1}
            px={3}
            minW="142px"
            bg="#F3F4F7"
            borderRadius="3px"
            textAlign="center"
          >
            <Heading fontFamily="body" as="h3" color="documents.tertiary.500" fontSize="lg" fontWeight="bold">
              {interest}
            </Heading>
            <Text fontSize="sm" color="documents.secondary.700" fontWeight={500}>
              {interestText}
            </Text>
          </Flex>
        </Box>
        <ChevronIcon direction="right" mx={6} w="32px" h="16px" color="documents.secondary.300" />
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          p={5}
          minH="110px"
          minW={printMode ? '220px' : '260px'}
          bg="#F3F4F7"
          borderRadius="3px"
          textAlign="center"
        >
          <Heading fontFamily="body" as="h3" color="documents.tertiary.500" fontSize="xl" fontWeight="bold">
            {formatNumToCurrency(productPlanSummary?.totalCredit ?? 0, true)}
          </Heading>
          <Text fontSize="sm" color="documents.secondary.700" fontWeight={500}>
            voraussichtliches Vertragsguthaben
          </Text>
        </Flex>
      </Flex>
      <Text mb={3}>
        Hierbei wurden die steuerlichen Auswirkungen {considerTaxAllowance ? 'bereits' : 'nicht'} berücksichtigt.
      </Text>
      <Text mb={printMode ? 3 : 10}>
        Selbstverständlich bleibt Ihnen während der Vertragslaufzeit die volle Flexibilität einer modernen Kapitalanlage
        erhalten. Die genaue Wertentwicklung Ihrer Investmentstrategie können Sie der beiliegenden Berechnung entnehmen.
      </Text>
      <Box p={5} w="100%" bg="#F3F4F7">
        <Heading
          fontFamily="body"
          as="h3"
          mb={5}
          color="documents.tertiary.500"
          fontSize="xl"
          textTransform="uppercase"
        >
          highlights
        </Heading>
        <Grid templateColumns={['1fr 1fr']} gap={printMode ? 2 : 5}>
          {highlights.map((highlight, i) => (
            <Flex key={i} alignItems="center">
              <Box pointerEvents="none">
                <CheckboxFormikField name={highlight} value={highlight} />
              </Box>
              <Text fontSize="md" fontWeight={300} whiteSpace="nowrap">
                {highlight}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Box>
    </PageWrapper>
  );
};
