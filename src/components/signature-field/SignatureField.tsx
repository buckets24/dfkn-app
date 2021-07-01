import {
  Box,
  BoxProps,
  Button,
  Fade,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMultiStyleConfig,
  useToast,
} from '@chakra-ui/react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { CloseIcon } from 'jexity-app/icons/CloseIcon';
import { InputErrorIcon } from 'jexity-app/icons/InputErrorIcon';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { default as ReactSignatureCanvas, default as SignatureCanvas } from 'react-signature-canvas';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { QRCode } from 'src/views/video-conference/QRCode';
import { useFieldsMeta } from '../../../jexity-app/form/useFieldsMeta';
import { useFormikByName } from '../../../jexity-app/form/useFormikByName';
import { FieldControl, SignatureFormField } from '../../../jexity-app/form/fields/fieldApi';
import { sign } from 'jsonwebtoken';
import * as securePin from 'secure-pin';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { UpdateSignatureTokenModelInput } from 'src/API';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { signatureTokenToastCreateUnknownErr, signatureTokenToastUnknownErr } from 'src/modules/documents/documentMsg';
import { createSignatureToken, deleteSignatureTokenById } from 'src/modules/signature/signatureService';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';

type D = Omit<FieldControl, 'onChange'> & Omit<SignatureFormField, 'type'> & Omit<BoxProps, 'onChange'>;
export interface SignatureFieldType extends D {
  onChange?: (value: string) => void;
  qrCodeURL?: string;
}

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL ?? '192.168.1.2:3000';

export type SignatureToken = UpdateSignatureTokenModelInput;

export const SignatureField: FC<SignatureFieldType> = memo(
  ({
    variant,
    name,
    label,
    helperText,
    isRequired,
    isInvalid,
    leftIcon,
    rightIcon,
    showRequiredIcon = true,
    value,
    error,
    onBlur,

    disabled,
    writeOnce = true,

    /**
     * Special SignatureField prop
     */
    onChange,
    qrCodeURL,

    ...others
  }) => {
    const styles = useMultiStyleConfig('Form', {
      size: 'lg',
      variant: variant ? variant : 'default',
    });
    const [signPad, setSignPad] = useState<ReactSignatureCanvas | null>();
    const [cachedSign, setCachedSign] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tabIndex, setTabIndex] = useState<number>(1);
    const { readOnly: fieldReadOnly } = useFieldsMeta();
    const { activeDocumentId, readOnly } = useDocFormMeta();
    const [pin, setPin] = useState<string>('');
    const [signatureToken, setSignatureToken] = useState<SignatureToken | null>(null);
    const [url, setUrl] = useState<string | undefined>('');
    const me = useAuthStore(getMe);
    const toast = useToast();
    const disabledField = disabled ? disabled : writeOnce && !!value;

    const tabSelectedStyle = {
      p: 5,
      bg: 'brand.primary.500',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      color: 'white',
    };

    const handleOnClick = () => {
      if (!signPad?.isEmpty()) {
        setCachedSign(signPad?.toDataURL('image/png') || '');

        const trimmedCanvas = signPad?.getTrimmedCanvas();

        const signature = trimmedCanvas?.toDataURL('image/png') || '';
        if (onChange) {
          onChange(signature);
        }
        onClose();
      } else {
        setCachedSign('');
        if (onChange) {
          onChange('');
        }
        onClose();
      }
    };

    useEffect(() => {
      if (signPad) {
        signPad.clear();
        if (value) {
          signPad.fromDataURL(value);
        } else {
          signPad.fromDataURL(cachedSign);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signPad, value]);

    const createSignature = async () => {
      try {
        if (activeDocumentId && me) {
          /**
           * Create new SignatureToken item
           */
          const newPin = securePin.generatePinSync(4);
          const createResponse = await createSignatureToken(newPin, activeDocumentId, name, me.id);
          if (createResponse) {
            const { __typename, ...signatureTokenModel } = createResponse;
            setSignatureToken(signatureTokenModel);
          }
          setPin(newPin);
        }
      } catch (e) {
        const errorCode = log(LogLevel.error, e, {
          label: 'CreateSignatureToken',
          ...e,
        });
        toast(signatureTokenToastCreateUnknownErr(errorCode));
      }
    };

    useEffect(() => {
      const createOnOpen = async () => {
        if (!isOpen) {
          setTabIndex(1);
          if (signatureToken) {
            await deleteSignatureTokenById(signatureToken.id);
          }
        } else {
          await createSignature();
        }
      };
      createOnOpen().catch((e) => {
        const errorCode = log(LogLevel.error, e, {
          label: 'SignatureFieldModalOpen',
          ...e,
        });
        toast(signatureTokenToastUnknownErr(errorCode));
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
      const onTabIndexChange = async () => {
        if (isOpen) {
          if (tabIndex === 0 && signatureToken && signatureToken.id) {
            await deleteSignatureTokenById(signatureToken.id);
          } else {
            await createSignature();
          }
        }
      };
      onTabIndexChange().catch((e) => {
        const errorCode = log(LogLevel.error, e, {
          label: 'SignatureFieldTabIndexChanged',
          ...e,
        });
        toast(signatureTokenToastUnknownErr(errorCode));
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabIndex]);

    useEffect(() => {
      if (signatureToken && pin) {
        const signatureTokenId = signatureToken.id;
        const token = sign(
          {
            signatureTokenId,
            pin,
          },
          'TEMPORARY_CODE_HERE',
          {
            expiresIn: '10m',
          }
        );

        setUrl(`http://${baseURL}/sign-field/${token}`);
      } else {
        setUrl(undefined);
      }
    }, [signatureToken, pin]);

    useEffect(() => {
      if (isOpen) {
        onClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <>
        <FormControl
          id={name}
          isInvalid={isInvalid}
          isRequired={isRequired && showRequiredIcon}
          sx={styles.formControl}
          {...others}
        >
          <FormLabel {...flushedLabelStyle(variant, styles.formLabel, value)}>{label}</FormLabel>
          <InputGroup>
            {leftIcon && (
              <InputLeftElement zIndex={0} pointerEvents="none">
                {leftIcon}
              </InputLeftElement>
            )}
            <Input
              pt={value && variant === 'flushed' ? 5 : 0}
              variant={variant}
              placeholder={value ? '' : variant !== 'flushed' ? label : ''}
              onBlur={onBlur}
              sx={styles.formInput}
              onClick={() => (readOnly ? false : onOpen())}
              isReadOnly={true}
              cursor="pointer"
              isDisabled={disabledField}
            />
            <Image
              pointerEvents="none"
              pos="absolute"
              h="100%"
              w="auto"
              top={0}
              right={rightIcon ? 10 : 0}
              left={0}
              m="auto"
              src={value}
              transform="scale(1.3)"
            />

            {isInvalid && variant === 'flushed' && (
              <InputRightElement zIndex={0} h="100%" alignItems="center" pointerEvents="none">
                <InputErrorIcon />
              </InputRightElement>
            )}
            {rightIcon && !error && (
              <InputRightElement
                zIndex={0}
                top={variant === 'dotted-flush' ? 0 : 2}
                h="auto"
                alignItems="center"
                pointerEvents="none"
                opacity={readOnly || disabledField ? 0.5 : 1}
              >
                {rightIcon}
              </InputRightElement>
            )}
          </InputGroup>
          {variant === 'default' ||
            (variant === 'flushed' && (
              <Box mt={1} mb={2} minH="16px">
                {helperText && !error && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
                <FormErrorMessage sx={styles.formError}>{error}</FormErrorMessage>
              </Box>
            ))}
        </FormControl>
        <Fade in={isOpen}>
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <ModalOverlay style={{ zIndex: 2 }}>
              <ModalContent maxW="600px">
                <ModalHeader mb={5} fontFamily="heading" fontWeight="bold">
                  {label}
                </ModalHeader>
                <ModalCloseButton />
                <Tabs onChange={(index) => setTabIndex(index)} defaultIndex={1}>
                  <TabList mx="16px" borderBottom="none">
                    <Tab
                      p={5}
                      w="100%"
                      borderBottom="none"
                      fontFamily="heading"
                      fontWeight={500}
                      fontSize="sm"
                      _active={{ bg: 'none' }}
                      _selected={tabSelectedStyle}
                    >
                      Mit dem Stift / Maus
                    </Tab>
                    <Tab
                      p={5}
                      w="100%"
                      borderBottom="none"
                      fontFamily="heading"
                      fontWeight={500}
                      fontSize="sm"
                      _active={{ bg: 'none' }}
                      _selected={tabSelectedStyle}
                    >
                      Mit dem Smartphone
                    </Tab>
                  </TabList>

                  <ModalBody
                    p={0}
                    mx="16px"
                    borderWidth="1px"
                    borderColor="brand.primary.500"
                    borderRadius="0px 0px 6px 6px"
                    backgroundColor="gray.200"
                    overflow="hidden"
                  >
                    <TabPanels>
                      <TabPanel p={0} bg="gray.100" pos="relative">
                        <SignatureCanvas
                          ref={(ref) => setSignPad(ref)}
                          canvasProps={{ height: '300px', width: '564px' }}
                          dotSize={3}
                          // eslint-disable-next-line no-console
                          // onBegin={() => console.log(isTouchSupported())}
                        />
                        {fieldReadOnly && <Box pos="absolute" top={0} left={0} w="100%" h="100%" />}
                      </TabPanel>
                      <TabPanel p={0} bg="white">
                        <QRCode url={url} pin={pin ? pin : undefined} />
                      </TabPanel>
                    </TabPanels>
                  </ModalBody>

                  <ModalFooter px={10} py={5}>
                    {tabIndex === 0 && !fieldReadOnly && (
                      <Stack direction="row" spacing={5} w="100%">
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
                          einreichen
                        </Button>
                      </Stack>
                    )}
                  </ModalFooter>
                </Tabs>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Fade>
      </>
    );
  }
);

export const SignatureFormikField: FC<SignatureFieldType> = ({
  name,
  qrCodeURL = 'https://dfk-nord-nessy.vercel.app/signature',
  ...props
}) => {
  const { value, touch, error, onBlur, setFieldValue } = useFormikByName(name);

  const memoizedOnChange = useCallback<NonNullable<SignatureFieldType['onChange']>>(
    (value) => {
      setFieldValue?.(name, value);
    },
    [name, setFieldValue]
  );

  return (
    <SignatureField
      name={name}
      value={value}
      onChange={memoizedOnChange}
      onBlur={onBlur}
      qrCodeURL={qrCodeURL}
      isInvalid={touch && error ? true : false}
      {...props}
    />
  );
};

export const SignaturePrintField: FC<SignatureFieldType> = ({ name, label }) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  return (
    <>
      <Box pos="relative" minH="26px" borderBottom="2px solid #c7c7c7" backgroundColor="#F7F7F7" p={1} fontSize="14px">
        <Image
          pos="absolute"
          top="-100px"
          left={0}
          right={0}
          bottom="-100px"
          m="auto"
          maxH="300%"
          h="1000px"
          w="auto"
          maxW="100%"
          pointerEvents="none"
          padding={2}
          src={value}
        />
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500">
          {label}
        </Text>
      )}
    </>
  );
};

export const DottedFlushedSignaturePrintField: FC<SignatureFieldType> = ({ name, label }) => {
  const { values } = useFormikContext() as FormikProps<FormikValues>;
  const value = values[name];

  return (
    <>
      <Box
        pos="relative"
        mb={5}
        minH="48px"
        borderStyle="dotted"
        borderBottomWidth="1px"
        borderBottomColor="documents.secondary.700"
      >
        <Image
          pos="absolute"
          top="-100px"
          left={0}
          right={0}
          bottom="-100px"
          m="auto"
          maxH="300%"
          h="1000px"
          w="auto"
          maxW="100%"
          pointerEvents="none"
          padding={2}
          src={value}
        />
      </Box>
      {label && (
        <Text fontSize="10px" fontWeight="500">
          {label}
        </Text>
      )}
    </>
  );
};
