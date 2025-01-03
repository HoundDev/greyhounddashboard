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
        <Modal onClose={handleClose} size="lg" isOpen={props.isOpen} isCentered motionPreset='scale'>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton color="white" />
            <img className="modal-above-image" src="./images/xumm.svg" />
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
                  {/* // show an error message if the variable is set */}
              {props.errorMessage && <Text style={smallText}>{props.errorMessage}</Text>}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  )
}