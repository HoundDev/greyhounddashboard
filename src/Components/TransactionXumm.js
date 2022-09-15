import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  Image,
  ChakraProvider
} from "@chakra-ui/react";

const ModalHeaderClass = {
  borderBottom: '1px solid #2D2D2D',
  textAlign: 'center',
  fontSize: '16px',
  background: '#262626',
  color: 'white'
};

const ModalBodyClass = {
  color: 'white'
}

const smallText = {
  textAlign: 'center',
  fontSize: '16px',
  marginTop: '2rem',
  marginBottom: '2rem'
};

const titleText = {
    textAlign: 'center',
    fontSize: '22px',
    marginTop: '2rem',
    marginBottom: '2rem'
}

const qrCode = {
    height: '350px'
}

export default function TransactionXumm(props) {

  function handleClose() {
    props.closeModal();
  }

  return (
    <>
      <ChakraProvider>
        <Modal onClose={handleClose} size="lg" isOpen={props.isOpen} isCentered  motionPreset='scale'>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton color="white" />
            <ModalBody style={ModalBodyClass}>
              <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}>
                <Text style={titleText}>Sign into XUMM</Text>
                <Image style={qrCode} src={props.txnPng} />
              </Stack>
              <Text style={smallText}>Scan the QR code with your XUMM App to proceed.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  )
}