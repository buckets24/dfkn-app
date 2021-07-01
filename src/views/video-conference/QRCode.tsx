import { FC, Fragment, memo } from 'react';
import { Box, Grid, Text, Flex, Skeleton } from '@chakra-ui/react';
import { default as QRCodeGenerate } from 'qrcode.react';
import { ScanQRCodeIcon } from 'jexity-app/icons/ScanQRCodeIcon';
import { SignInWithFingerIcon } from 'jexity-app/icons/SignInWithFingerIcon';
import { SendSignatureIcon } from 'jexity-app/icons/SendSignatureIcon';
import { EnterSecurityPinIcon } from 'jexity-app/icons/EnterSecurityPinIcon';

export interface QRCodeProps {
  url?: string;
  pin?: string;
}

export const QRCode: FC<QRCodeProps> = memo(({ url, pin }) => {
  const steps = [
    {
      text: 'Scannen Sie den QR-Code ein',
      icon: <ScanQRCodeIcon />,
    },
    {
      text: 'Unterschreiben Sie mit Ihrem Finger',
      icon: <SignInWithFingerIcon ml={1} />,
    },
    {
      text: '“Unterschrift senden” antippen',
      icon: <SendSignatureIcon />,
    },
    {
      text: 'Geben Sie die Sicherheits-PIN ein, die hier eingeblendet ist und tippen Sie auf Senden',
      icon: <EnterSecurityPinIcon />,
    },
  ];

  return (
    <Grid templateColumns={['1fr', null, '1fr min-content']} h="100%" pt={5}>
      <Box textAlign="center">
        <Flex mt={2} justifyContent="center">
          <Skeleton w="160px" h="160px" isLoaded={!!url}>
            {url && <QRCodeGenerate value={url} size={160} renderAs="svg" />}
          </Skeleton>
        </Flex>

        <Text mt={5} fontFamily="heading" fontWeight="bold" fontSize="md" color="gray.900">
          Ihre Sicherheits-PIN
        </Text>
        <Skeleton w="125px" h="40px" isLoaded={!!pin} m="auto">
          <Flex mt={2} justifyContent="space-between" mx="auto" maxW="125px">
            {pin?.split('').map((digit, i) => (
              <Text
                key={i}
                px={1}
                borderColor="brand.primary.500"
                borderRadius="3px"
                borderWidth="2px"
                color="gray.900"
                fontFamily="heading"
                fontWeight="bold"
                fontSize="xl"
              >
                {digit}
              </Text>
            ))}
          </Flex>
        </Skeleton>
      </Box>
      <Box px={5} minW="300px">
        <Text mb={5} fontFamily="heading" fontWeight="bold" fontSize="md" color="documents.secondary.900">
          Anleitung
        </Text>
        <Grid templateColumns={['max-content 1fr']} alignItems="center">
          {steps.map((step, i) => (
            <Fragment key={i}>
              <Box mr={1} mb={5}>
                {step.icon}
              </Box>
              <Text mb={5} fontFamily="heading" fontSize="sm" color="documents.secondary.900">
                {step.text}
              </Text>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
});
