import { isMobile, isBrowser } from 'react-device-detect';
import React, { useRef, useEffect } from "react";
import TransactionXumm from "./TransactionXumm";
import {
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
  Text,
  Link,
  Button
} from "@chakra-ui/react";
require("dotenv").config();


function Login(props) {
  const ws = useRef(WebSocket);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wsConnection, setwsConnection] = React.useState("")
  const [qrMatrix, setQrMatrix] = React.useState("")
  const [mobileTxnUrl, setMobileTxnUrl] = React.useState("")
  const [showSpinner, setShowSpinner] = React.useState(false)
  const [listenWs, setlistenWs] = React.useState(false)
  const [requestResolved, setRequestResolved] = React.useState(false)
  const [requestResolvedMessage, setrequestResolvedMessage] = React.useState('')
  const [requestFailed, setRequestFailed] = React.useState(false)
  const [signedinAccount, setSignedinAccount] = React.useState("")
  const [signInClicked, setSignInClicked] = React.useState(false)
  const [showErr, setShowErr] = React.useState(' ')


  function closeModal() {
    setSignInClicked(false)
    setShowSpinner(false)
  }

  const postXummPayload = async (requestContent) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/createpayload', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestContent)
      });
      let json = await response.json()
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  }

  const getXummPayload = async (requestContent) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/getpayload', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "payloadID": requestContent })
      });
      let json = await response.json()
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  }

  const checkValidSignature = async (requestContent) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/checksig', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "hex": requestContent })
      });
      let json = await response.json()
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  }

  const registerUser = async (requestContent) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/registerUser', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestContent)
      });
      let json = await response.json()
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  const checkEligibility = async (address) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/eligible?address=' + address, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.status);
      if (response.status === 200) {
        return { success: true };
      }
      else {
        return { success: false };
      }

    } catch (error) {
      return { success: false };
    }
  }

  const Signin = async () => {
    setrequestResolvedMessage('')
    setQrMatrix("")
    setMobileTxnUrl("")
    setShowSpinner(false)
    setlistenWs(false)
    setRequestResolved(false)
    setRequestFailed(false)
    setSignInClicked(false)
    const request = {
      "txjson": {
        "TransactionType": "SignIn"
      }
    }
    const requestMobile = {
      "options": {
        "submit": true,
        "return_url": {
          "app": process.env.REACT_APP_URL,
          "web": process.env.REACT_APP_URL
        }
      },
      "txjson": {
        "TransactionType": "SignIn"
      }
    }
    // let responseXum = await postXummPayload(request)
    if (isMobile) {
      var responseXum = await postXummPayload(requestMobile)
    } 
    else {
      var responseXum = await postXummPayload(request)
    }
    console.log(responseXum);
    if (responseXum.data?.refs.qr_matrix) {
      setwsConnection(responseXum.data?.refs.websocket_status)
      setQrMatrix(responseXum.data?.refs.qr_png)
      setMobileTxnUrl(responseXum.data?.next.always)
      setShowSpinner(true)
      setSignInClicked(true)

      ws.current = new WebSocket(responseXum.data?.refs.websocket_status);
      setlistenWs(true)

      if (isMobile) {
        window.open(responseXum.data?.next.always);
      }
    }
  }

  useEffect(() => {
    //if (!ws.current) return;
    ws.current.onmessage = async (e) => {
      if (!listenWs) return;
      let responseObj = JSON.parse(e.data.toString())
      if (responseObj.signed !== null) {
        console.log(responseObj)
        const payload = await getXummPayload(responseObj.payload_uuidv4)
        console.log(payload)
        var accessAddys = [
                            "rKXkK5RRJD74anBpTeG23qc1gKggSHQHjB",
                            "rfFfo87G2a7R7Csr1f6yHm7gxVGvx8ypo3",
                            "rDdpAkYcMPuRfiQySVWUVjzbEZSH8ZH871",
                            "rLfP4UznJ65hYTKXjSj2UQQxWDmxmRdbLW",
                            "rMzRyrhAT1V28VoadRVzZ4QnDpGv2zjiNK",
                            "rBGJ4n2zZ2yRgJKjq95yNZxtXWme4cY5XK"
                          ]
        if (payload.success) {
          console.log('signed')
          if (responseObj.signed === true) {
            var isValid = await checkValidSignature(payload.data.response.hex)

            console.log(isValid);
          }
          console.log()
        let check = await checkEligibility(payload.data.response.account)
        console.log(check);
        if (check.success === true) {
          if (isValid.data.xrpAddress !== undefined && isValid.data.session !== undefined) {
            props.setStateValues(isValid.data);
          }
          if (payload.data !== null) {
            let payloadMeta = payload.data
            if (payloadMeta.meta.resolved === true && payloadMeta.meta.signed === true) {
              setSignedinAccount(payloadMeta.response.account);
              setrequestResolvedMessage('Sign-In request successful.');
              const data = {
                "_id": payloadMeta.response.account,
                "address": payloadMeta.response.account,
                "avatar_url":null,
                "name":null,
                "verified":false,
                "bio":null,
                "Custom Url":null,
                "Eligible_og_ad":false,
                "Eligible_ts_ad":false,
                "betaAccess":false
                }
              const register = await registerUser(data)
              if (register.success) {
                console.log('User registered successfully')
              }
            }
            else if (payloadMeta.meta.resolved === true && payloadMeta.meta.signed === false) {
              setRequestFailed(true)
              setrequestResolvedMessage('Sign-In request has been rejected.');
            }
            else if (payloadMeta.meta.resolved === false && payloadMeta.meta.signed === false && payloadMeta.meta.cancelled === true && payloadMeta.meta.expired === true) {
              setRequestFailed(true)
              setrequestResolvedMessage('Sign-In request has been cancelled.');
            }
            else if (payloadMeta.meta.resolved === false && payloadMeta.meta.signed === false && payloadMeta.meta.cancelled === false && payloadMeta.meta.expired === true) {
              setRequestFailed(true)
              setrequestResolvedMessage('Sign-In request has expired.');
            }
            closeModal();
            setShowSpinner(false);
            setRequestResolved(true);
            ws.current.close();
          }
          }
        else {
          setRequestFailed(true)
          setrequestResolvedMessage('Your account does not qualify for closed beta!.');
          // closeModal();
          setShowErr('Your account does not qualify for closed beta!.');
          setShowSpinner(false);
          setRequestResolved(true);
          ws.current.close();
        }
      }
      }
    };
  }, [listenWs]);

  return (

    <div className="container-fluid">

      <div className="nav-header">
        <a href="#" className="brand-logo">
          <div className="logo-abbr" draggable="false" alt=""></div>
          <div className="brand-title" draggable="false" alt=""></div>
        </a>
      </div>

      <div className="row no-gutter overflow-h">

        <div className="col-lg-6 col-sm-8 d-md-flex bg-login">
          <video poster="./videos/houndcity-thumbnail.jpeg" autoPlay muted loop>
            <source src="./videos/houndcity.webm" type="video/webm" />
          </video>
        </div>
        <div className="col-lg-5 col-sm-4 bg-login-split">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">

                <div className="col-lg-10 col-xl-10 mx-auto login-section">
                  <h3 className="fs-28">Connect Wallet</h3>
                  <p className="text-muted fs-18 mb-4">Add an account from a XUMM Wallet</p>
                  <form action="index.html">
                    <div className="mt-3">
                      <Button className="btn btn-login btn-lg btn-block" onClick={Signin}> <img src="https://greyhoundcoin.net/assets/images/icon/xumm.png"></img>Sign in with XUMM</Button>
                      {!showSpinner && requestResolved && requestResolvedMessage !== '' && requestFailed ?
                        <Alert status="error" style={{ marginTop: '20px' }}><AlertIcon />{requestResolvedMessage}</Alert> : <></>}

                      {showSpinner ? <Spinner size='md' color={'white'} /> : <></>}
                      {signInClicked && isBrowser ? <TransactionXumm errorMessage={showErr} isOpen={onOpen} onClose={onClose} txnPng={qrMatrix} closeModal={closeModal} /> : <></>}
                      {signInClicked && isMobile ? <Text fontSize="18px" fontWeight="bold" color="#3182ce"><Link fontSize="1.4em" href={mobileTxnUrl} isExternal>Click to sign transaction with XUMM</Link></Text> : <></>}
                      <p className="d-none" href="https://xumm.app/">Don't have a wallet?</p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row row2">

                <div className="col-lg-10 col-xl-10 mx-auto login-section">
                  <h3 className="fs-28">Don't have a wallet?</h3>
                  <p className="text-muted fs-18 mb-4">Click below to create a Wallet in seconds and to start managing your digital assets.</p>
                  <Button className="btn btn-white btn-lg btn-block" href="https://xumm.app/"> Get the XUMM Wallet</Button>
  
                </div>
              </div>
            </div>

          </div>
        </div>





      </div>

    </div>
  );
}

export default Login;
