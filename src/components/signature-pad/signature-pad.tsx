import { FC, useState } from 'react';
import { Button, Box, Stack, Flex, useToast } from '@chakra-ui/react';
import SignatureCanvas from 'react-signature-canvas';
import ReactSignatureCanvas from 'react-signature-canvas';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { CloseIcon } from 'jexity-app/icons/CloseIcon';
import { PhoneIcon } from 'src/theme/icons/PhoneIcon';
import { useRouter } from 'next/router';
import 'src/AmplifyConfig';
import { documentSignatureToastSubmitErr } from 'src/modules/documents/documentMsg';

export interface SignaturePadProps {
  width?: number;
  height?: number;
  onPhoneView?: () => void | any;
  handleSubmit: (signature: string) => void;
}

export const SignaturePad: FC<SignaturePadProps> = ({ width, height, onPhoneView, handleSubmit }) => {
  const router = useRouter();
  const [signPad, setSignPad] = useState<ReactSignatureCanvas | null>();
  const toast = useToast();

  const handleOnClick = () => {
    if (!signPad?.isEmpty() && signPad) {
      const trimmedCanvas = signPad.getTrimmedCanvas();
      const signature = trimmedCanvas.toDataURL('image/png') || '';
      handleSubmit(signature);
    } else {
      toast(documentSignatureToastSubmitErr());
    }
  };

  return (
    <>
      <SignatureCanvas
        ref={(ref) => setSignPad(ref)}
        canvasProps={{ style: { height: height ? height : '100vh', width: width ? width : '100vw' } }}
        dotSize={3}
      />
      <Flex
        pos="absolute"
        bottom={[10, 0, 10]}
        left={0}
        right={0}
        flexWrap={['wrap', 'nowrap', null]}
        justifyContent={['center', null, 'space-between']}
        alignItems="center"
        m={['0 auto', '0']}
        maxW={['264px', '100%']}
      >
        <Box w={['100%', null, 'auto']} mb={[2, 0, 2]} px={3} textAlign={['center', 'left']}>
          <Button
            p={[3, null, null, 4]}
            w="100%"
            textTransform="uppercase"
            bg="support.alert.500"
            color="white"
            fontWeight={500}
            fontSize="sm"
            _hover={{ bg: 'support.alert.600' }}
            onClick={signPad?.clear}
          >
            <CloseIcon mr={2} w="12px" color="white" /> Zurücksetzen
          </Button>
        </Box>
        <Stack
          w={['100%', null, 'auto']}
          direction={['column', null, 'row']}
          mb={[2]}
          ml={[null, null, null, 'auto']}
          px={3}
          textAlign={['center', null, null, 'right']}
        >
          {router.pathname.replace('/', '') !== 'signature' && (
            <Button
              d={['none', null, null, 'flex']}
              p={[3, null, null, 4]}
              w="100%"
              textTransform="uppercase"
              bg="brand.secondary.500"
              color="white"
              fontWeight={500}
              fontSize="sm"
              _hover={{ bg: 'brand.secondary.900' }}
              onClick={onPhoneView}
            >
              <PhoneIcon mr={2} color="white" />
              Smartphone Ansicht
            </Button>
          )}
          <Button
            p={[3, null, null, 4]}
            w="100%"
            textTransform="uppercase"
            bg="brand.primary.500"
            color="white"
            fontWeight={500}
            fontSize="sm"
            _hover={{ bg: 'brand.primary.900' }}
            onClick={handleOnClick}
          >
            <CheckIcon mr={2} mb={1} w="12px" color="white" />
            Unterschrift Senden
          </Button>
        </Stack>
      </Flex>
    </>
  );
};
