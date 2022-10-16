import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import { isMobile, isBrowser } from 'react-device-detect';
import React, { useState, useRef, useEffect } from "react";
import TransactionXumm from "./TransactionXumm";
import { verifySignature } from 'verify-xrpl-signature'
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
  const [userAddress, setUserAddress] = React.useState('')
  const [qrMatrix, setQrMatrix] = React.useState("")
  const [mobileTxnUrl, setMobileTxnUrl] = React.useState("")
  const [showSpinner, setShowSpinner] = React.useState(false)
  const [listenWs, setlistenWs] = React.useState(false)
  const [requestResolved, setRequestResolved] = React.useState(false)
  const [requestResolvedMessage, setrequestResolvedMessage] = React.useState('')
  const [requestFailed, setRequestFailed] = React.useState(false)
  const [signedinAccount, setSignedinAccount] = React.useState("")
  const [signInClicked, setSignInClicked] = React.useState(false)


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

  const Signin = async () => {

    const request = {
      "txjson": {
        "TransactionType": "SignIn"
      }
    }
    let responseXum = await postXummPayload(request)
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

        const isValid = await checkValidSignature(payload.data.response.hex)
        if (payload.data !== null) {
          let payloadMeta = payload.data
          if (payloadMeta.meta.resolved === true && payloadMeta.meta.signed === true) {
            setSignedinAccount(payloadMeta.response.account);
            setrequestResolvedMessage('Sign-In request successful.');
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
        }
        closeModal();
        setShowSpinner(false);
        setRequestResolved(true);
        ws.current.close();
        console.log(isValid);
        if (isValid.data.xrpAddress !== undefined && isValid.data.session !== undefined) {
          props.setStateValues(isValid.data);
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
            <source src="./videos/houndcity.mp4" type="video/mp4" />
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
                      {signInClicked && isBrowser ? <TransactionXumm isOpen={onOpen} onClose={onClose} txnPng={qrMatrix} closeModal={closeModal} /> : <></>}
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
