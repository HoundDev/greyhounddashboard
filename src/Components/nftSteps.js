import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
// import { Link, useSearchParams, useLocation } from "react-router-dom";
// import NftCard from "./nfts/NftCard";
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';


// import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from "axios";



require("dotenv").config();

function getSteps() {
  return ['Burn', 'Mint', 'Claim'];
  
}

export default function GreyStepper(props) {

  const [activeStep, setActiveStep] = React.useState(0);
  const [popupTrade, setPopupTrade] = useState(false);
  const [popupTrade2, setPopupTrade2] = useState(false);
  const [qrString, setQrString] = useState("");
  const [qrString2, setQrString2] = useState("");
  const [claimed, setClaimed] = useState(false);
  const ws = useRef(WebSocket);
  const ws2 = useRef(WebSocket);
  const [listenWs, setListenWs] = useState(false);
  const [listenWs2, setListenWs2] = useState(false);
  const [qrLink, setQrLink] = useState("");
  const [qrLink2, setQrLink2] = useState("");
  const [issueAmount, setIssueAmount] = useState(0);
  const [mintClicked, setMintClicked] = useState(false);
  const [minting, setMinting] = useState(false);
  const [stage, setStage] = useState(0);
  const [pid, setPid] = useState(0);
  const [offerhash, setOfferhash] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [crate, setCrate] = useState(false);
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const steps = getSteps();
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const closePopupTradeErr = () => {
    setPopupTrade(false);
    setPopupTrade2(false);
  };

  const handleMint = async () => {
      let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/mint_txn';
      // setTimeout(() => {
      //   setMinting(false);
      // }
      // , 5000);
      setMinting(true);
      setMintClicked(true);
      let response = await axios.post(url, { "address": props.xrpAddress });
      response = response.data;
      console.log(response);
      setNftName("Houndies #" + response.num)
      setNftImage(response.nft_image)
      setMinting(false);
  }

  function convertStringToHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
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

  async function createBurnOffer(){
    let xummPayload = {
      "txjson": {
        "TransactionType": "Payment",
        "Destination": "rUC1ZC97XgUUbqNM51gJfbGhhXZPiLdp2i",
        "Amount": {
          "currency": "47726579686F756E640000000000000000000000",
          "issuer": "rUC1ZC97XgUUbqNM51gJfbGhhXZPiLdp2i",
          "value": "1"
        },
        "Memos": [
          {
              "Memo": {
                  "MemoData": convertStringToHex("Redeemed through the Greyhound Dashboard!")
              }
          }
      ]
    },
    "options": {
        "submit": true
      }
    }

    let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/createpayload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(xummPayload)
    });
    let data = await response.json();
    setQrString(data);
    if (isMobile) {
      //open the link in a new tab
      window.open(data.next.always, '_blank');
      setQrString(data.refs.qr_png);
      setQrLink(data.next.always);
      ws.current = new WebSocket(data.refs.websocket_status);
      setListenWs(true);
    }
    else {
        setQrString(data.refs.qr_png);
        setQrLink(data.next.always);
        ws.current = new WebSocket(data.refs.websocket_status);
        setListenWs(true);
    }
  }

  async function createMintOffer(){
    let xummPayload = {
      "txjson": {
        "TransactionType": "NFTokenAcceptOffer",
        "Account": props.xrpAddress,
        "NFTokenSellOffer": offerhash,
        "Memos": [
          {
              "Memo": {
                  "MemoData": convertStringToHex("Minted through the Greyhound Dashboard!")
                  }
          }
        ]
      }
    }

    let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/createpayload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(xummPayload)
    });
    let data = await response.json();
    setQrString(data);
    if (isMobile) {
      //open the link in a new tab
      window.open(data.next.always, '_blank');
      setQrString2(data.refs.qr_png);
      setQrLink2(data.next.always);
      ws2.current = new WebSocket(data.refs.websocket_status);
      setListenWs2(true);
    } else {
      setQrString2(data.refs.qr_png);
      setQrLink2(data.next.always);
      ws2.current = new WebSocket(data.refs.websocket_status);
      setListenWs2(true);
    }
  }

  async function checkBurnt(e) {
    let responseObj = JSON.parse(e.data.toString());
    if (responseObj.signed !== null) {
      // console.log(responseObj);
      const payload = await getXummPayload(responseObj.payload_uuidv4);
      // console.log(payload);

      if (payload.success) {
        console.log('signed');
        if (responseObj.signed === true) {
          console.log('signed');
          setClaimed(true);
          closePopupTradeErr();
          setListenWs(false);
          let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/burnt';
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "address": props.xrpAddress, "txnHash": payload.data.response.txid})
          });
          let data = await response.json();
          console.log(data);
        } else {
          console.log('not signed');
          setClaimed(false);
          closePopupTradeErr();
          setListenWs(false);
        }
      }
    }
  }

  async function checkMint(e) {
    let responseObj = JSON.parse(e.data.toString());
    if (responseObj.signed !== null) {
      const payloadd = await getXummPayload(responseObj.payload_uuidv4);

      if (payloadd.success) {
        console.log('signed');
        if (responseObj.signed === true) {
          console.log('signed');
          closePopupTradeErr();
          setListenWs2(false);
          let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/claim_txn';
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "address": props.xrpAddress, "hash": payloadd.data.response.txid})
          });
          let data = await response.json();
          console.log(data);
          setOfferAccepted(true);
          setCrate(true);
    } else {
          console.log('not signed');
          closePopupTradeErr();
          setListenWs2(false);
        }
      }
    }
  }

  const handleBurn = async () => {
    setPopupTrade(true);
    createBurnOffer();
  };

  const handleClaim = async () => {
    setPopupTrade2(true);
    createMintOffer();
    // setCrate(true);
  };
    
  async function checkAddress() {
    let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/pending?address=' + props.xrpAddress;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setPid(data.request_id);
    setStage(data.stage);
    if (data.stage === 'burnt') {
      setActiveStep(1);
      setClaimed(true);
      setMintClicked(false);
    } else if (data.stage === 'offered') {
      setActiveStep(2);
      setClaimed(true);
      setMintClicked(true);
      setOfferhash(data.offer);
      setNftName("Houndies #" + data.nft_name);
      setNftImage(data.nft_image);
    }
  }

  useEffect(() => {
    checkAddress();
  }, []);

  useEffect(() => {
  ws.current.onmessage = async (e) => {
    if (!listenWs) return;
    await checkBurnt(e);
      }
  }, [listenWs]);
  
  useEffect(() => {
    ws2.current.onmessage = async (e) => {
      if (!listenWs2) return;
      await checkMint(e);
        }
  }, [listenWs2]);

  function getStepContent(step) {
      switch (step) {
        case 0:
          return (
        
            <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-1">
          <div className="card overflow-hidden">
            <div className="card-header border-0 pb-0">
              <div className="stepperTitle text-white mb-2 font-w600">Burn Hound</div>
            </div>
            <div className="card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>
        
              
        <div className="container text-center">
        <div className="row">
              <div className="col-md-6">
                  <div className="mintbox">
                    <span className="text-white">Balance</span>
                    <div className="d-block">
                      <span className="fs-22 text-white" id="baseField">0123456789</span>
                    </div>
                    <a href="/">Buy More</a>
                  </div>	
              </div>
              <div className="col-md-6">
                  <div className="mintbox">
                    <span className="text-white">Cost</span>
                    
                    <div className="d-block">
                      <img className="gh-icon" src="./images/svg/logo-icon.svg" height="30px" id="baseImage" alt="icon"/><span className="fs-24 text-white">10M HOUND</span>
                    </div>
                    <span className="text-white">Per NFT</span>
                  </div>	
              </div>
        </div>
        </div>
                
                
        
            </div>
            
          </div>	
        </div>
        
          );
        case 1:
          return (
            <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-2">
          <div className="card overflow-hidden">
            <div className="card-header border-0 pb-0">
              <div className="stepperTitle text-white mb-2 font-w600">Mint Houndie</div>
            </div>
            <div className="card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>
              {/* {(nftImage === "") ? " " : <img src={nftImage} className="img-fluid" alt="nft" />} */}
            </div>
          </div>	
        </div>
          );
        case 2:
          return (
            <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-3">
          <div className="card overflow-hidden">
            <div className="card-header border-0 pb-0">
              <div className="stepperTitle text-white mb-2 font-w600">Claim Your NFT</div>
            </div>
        
            <div className="card-body">	
            <p>First claim the nft<br/>then Click on the crate to reveal your NFT</p>
    
            <div id="cube" className="h-40 w-40 relative flex justify-center items-center cursor-pointer">
                <div className="hexagon absolute" id="glow"></div>
                <div className="cube back h-40 w-40 absolute top-0 left-0" id="cback"></div>
                <div className="cube topcrate h-40 w-40 absolute top-0 left-0" id="ctop"></div>
                <div className="cube leftcrate h-40 w-40 absolute top-0 left-0" id="cleft"></div>
                <div className="cube rightcrate h-40 w-40 absolute top-0 left-0" id="cright"></div>
                <div className="powerup absolute" id="powerup"></div>
              </div>
              {/* <div className="nft-name text-white" id="nft-name">{nftName}</div> */}
              {/*make the div invisible until the crate is opened*/}
              <div className="nft-name text-white" id="nft-name" style={{visibility: "hidden"}}>{nftName}</div>
            </div>
        
          </div>	
        </div>
          );
        default:
          return 'Unknown step';
      }
  }

  useEffect(() => {
    if (crate === true) {
      const cube = document.getElementById("cube");
      const cback = document.getElementById("cback");
      const ctop = document.getElementById("ctop");
      const cleft = document.getElementById("cleft");
      const cright = document.getElementById("cright");
      const glow = document.getElementById("glow");
      const powerup = document.getElementById("powerup");
      const nftName = document.getElementById("nft-name");
      const transitionTime = "750ms";

      ctop.style.transition = `all ${transitionTime}`;
      cleft.style.transition = `all ${transitionTime}`;
      cright.style.transition = `all ${transitionTime}`;
      cube.style.transition = `all ${transitionTime}`;
      powerup.style.transition = `all ${transitionTime}`;
      glow.style.transition = `all ${transitionTime}`;
      cback.style.transition = `all ${transitionTime}`;

      var isOpen = false;

      function changeVar(glow) {
        document.documentElement.style.setProperty("--glow", glow);
      }

      function award() {
          powerup.style.backgroundImage = `url(${nftImage})`
          changeVar("rgba(192, 99, 111, 0.5)");
      }

      class openCube {
        constructor() {
          if (!isOpen) {
            award();
            ctop.style.transform = "translateY(-3rem)";
            cleft.style.transform = "translateX(-3rem)";
            cright.style.transform = "translateX(3rem)";
            ctop.style.opacity = 0.2;
            cleft.style.opacity = 0.2;
            cright.style.opacity = 0.2;
            cback.style.opacity = 0.2;
            glow.style.opacity = 0.5;
            powerup.style.opacity = 1;
            isOpen = true;
            cube.style.animationPlayState = "paused";
            powerup.style.zIndex = 10;
            powerup.style.height = "240px";
            powerup.style.width = "240px";
            nftName.style.visibility = "visible";
          } else {
            ctop.style.transform = "translateY(0)";
            cleft.style.transform = "translateX(0)";
            cright.style.transform = "translateX(0)";
            cube.style.opacity = 1;
            isOpen = false;
            ctop.style.opacity = 1;
            cleft.style.opacity = 1;
            cright.style.opacity = 1;
            cback.style.opacity = 1;
            glow.style.opacity = 1;
            powerup.style.opacity = 0;
            powerup.style.zIndex = 0;
            cube.style.animationPlayState = "running";
            powerup.style.height = "48px";
            powerup.style.width = "48px";
            changeVar("rgba(192, 99, 111, 0.5)");
            nftName.style.visibility = "hidden";
          }
        }
      }

      cube.addEventListener("click", () => {
        new openCube();
      });



    }
  }, [crate]);

  return (
  
<div className="content-body">
<div className="container-fluid">

<div className="row">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className="text-center btn-bar">
                  <Button className='btn-white-border' disabled={activeStep === 0}onClick={handleBack}>Cancel</Button>
                  {claimed && index === 0 &&
				  <Button className="btn-primary" variant="contained" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Done' : 'Next' }</Button>}
                  { !claimed && 
					<Button className="btn-primary" variant="contained" onClick={handleBurn}>Burn</Button>}
                  {mintClicked === false && index === 1 &&
          <Button className="btn-primary" variant="contained" onClick={handleMint}>Mint</Button>}
                  {minting === true && index === 1 &&
          <Button className="btn-primary" variant="contained" onClick={handleMint} disabled>Minting....</Button>}
                  {mintClicked === true && index === 1 && minting === false &&
          <Button className="btn-primary" variant="contained" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Done' : 'Next' }</Button>}
                  {mintClicked === true && index === 2 && offerAccepted === false &&
          <Button className="btn-primary" variant="contained" onClick={handleClaim} id="claim">Claim</Button>}
                  {offerAccepted === true && index === 2 &&
          <Button className="btn-primary" variant="contained" onClick={handleMint} disabled>Claimed!</Button>}
               </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
   
    
</div>

    <Modal className="xumm-tx" size='lg' animation={false} show={popupTrade} centered>
                      <img className="modal-above-image" src="./images/xumm.svg" alt="xumm" />
                      <Modal.Header>
                          <Modal.Title>Confirm Hound Burn?</Modal.Title>
                          <button type="button" onClick={() => closePopupTradeErr()}
                              className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="xumm-tx-container">
                              <div>
                                  <div className='tx-info'>
                                      <span>You Pay</span>
                                      <p className='text-white'>10m HOUND</p>
                                  </div>
                                  <div className='tx-info'>
                                      <span>Receive</span>
                                      <p className='text-white'> 1 NFT MINT</p>
                                  </div>
                                  {/* {issueCheck &&  */}
                                  <div className='tx-info'>
                                      <span>Issuer Fee</span>
                                      {/* <p className='text-white'> FREE! </p> */}
                                      <p>{issueAmount} hound</p>
                                  </div>

                                  <div className='tx-info'>
                                      <span>XRP transaction fee</span>
                                      <p className='text-white'>0.000012 XRP</p>
                                  </div>
                              </div>

                              <div className="qr-code-img">
                                  {/* <a href={qrLink} target="_blank" rel="noreferrer">
                                      Click here to open in XUMM
                                  </a> */}
                                  {/* <img src={qrString} alt="QR Code" /> */}
                                  {/* With ref to above, have the text on top and qr code below the text */}
                                  <a href={qrLink} target="_blank" rel="noreferrer">
                                      Click here to open in XUMM
                                  </a>
                                  <br />
                                  <img src={qrString} alt="QR Code" />
                              </div>
                          </div>

                      </Modal.Body>
    </Modal>

    <Modal className="xumm-tx" size='lg' animation={false} show={popupTrade2} centered>
                    <img className="modal-above-image" src="./images/xumm.svg" alt="xumm" />
                    <Modal.Header>
                        <Modal.Title>Claim NFT</Modal.Title>
                        <button type="button" onClick={() => closePopupTradeErr()}
                            className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="xumm-tx-container">
                            <div>
                                <div className='tx-info'>
                                    <span>You Pay</span>
                                    <p className='text-white'>0.000001 XRP</p>
                                </div>
                                <div className='tx-info'>
                                    <span>Receive</span>
                                    <p className='text-white'> 1 NFT<br/>{nftName} </p>
                                </div>

                                <div className='tx-info'>
                                    <span>XRP transaction fee</span>
                                    <p className='text-white'>0.000012 XRP</p>
                                </div>
                            </div>

                            <div className="qr-code-img">
                                {/* <a href={qrLink} target="_blank" rel="noreferrer">
                                    Click here to open in XUMM
                                </a> */}
                                {/* <img src={qrString} alt="QR Code" /> */}
                                {/* With ref to above, have the text on top and qr code below the text */}
                                <a href={qrLink2} target="_blank" rel="noreferrer">
                                    Click here to open in XUMM
                                </a>
                                <br />
                                <img src={qrString2} alt="QR Code" />
                            </div>
                        </div>

                    </Modal.Body>
    </Modal>

</div>
</div>
    
  );

}