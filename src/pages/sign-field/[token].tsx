import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { PinInput, PinInputProps } from 'jexity-app/components/pin-input/PinInput';
import axios from 'axios';
import { SignaturePad } from 'src/components/signature-pad/signature-pad';
import { useRouter } from 'next/router';
import { decode } from 'jsonwebtoken';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';
import { signatureToastApplyingErr } from 'src/modules/documents/documentMsg';

const MobileSignField: FC = () => {
  const router = useRouter();
  /**
   * - Extract query parameters from useRouter ()
   *
   *
   */

  const { token } = router.query;

  const decodedToken = useMemo<{ [key: string]: string } | undefined>(() => {
    if (typeof token === 'string') {
      const decoded = decode(token);
      if (decoded && typeof decoded !== 'string') {
        return decoded;
      }
    }
  }, [token]);

  const signatureTokenId = decodedToken?.signatureTokenId;
  const pin = decodedToken?.pin;

  const [signature, setSignature] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [showPinPopup, setShowPinPopup] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const headerHeight = '60px';
  const toast = useToast();

  const handleSuccess = useCallback<PinInputProps['handleSuccess']>(() => {
    if (signature && signatureTokenId) {
      const body = { signatureTokenId, signature, pinInput };
      axios
        .put(`/api/signature-token/${signatureTokenId}`, body)
        .then((res) => {
          setIsUploaded(true);
        })
        .catch((e) => {
          toast(signatureToastApplyingErr(e.response.data.errorCode));
          setIsServerError(true);
        });
    }
  }, [signature, signatureTokenId, pinInput, toast]);

  const handleSubmit = (signature: string) => {
    setSignature(signature);
    setShowPinPopup(true);
  };

  useEffect(() => {
    if (!!signature) {
      setShowPinPopup(true);
    }
  }, [signature]);

  return (
    <Box pos="relative" h={[`calc(90vh - ${headerHeight})`, null, '100%']} overflow="hidden">
      <Flex
        pos="absolute"
        top={0}
        justifyContent="space-between"
        alignItems="center"
        p={5}
        w="100%"
        maxH={headerHeight}
        bg="white"
        textAlign="center"
      >
        <NessyCloudLogo maxW={['87px', null, null, '100%']} />
      </Flex>
      {showPinPopup && (
        <Box
          pos="absolute"
          top={headerHeight}
          pt={20}
          w="100%"
          h={`calc(100vh - ${headerHeight})`}
          textAlign="center"
          bg="brand.bodyBackground"
          zIndex={2}
        >
          {pin && (
            <PinInput
              code={pin}
              pinInput={pinInput}
              setPinInput={setPinInput}
              length={4}
              isUploaded={isUploaded}
              isServerError={isServerError}
              handleSuccess={handleSuccess}
            />
          )}
        </Box>
      )}
      <SignaturePad handleSubmit={handleSubmit} />
    </Box>
  );
};

// noinspection JSUnusedGlobalSymbols
export default MobileSignField;
