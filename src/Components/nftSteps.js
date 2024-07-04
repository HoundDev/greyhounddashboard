import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import 'swiper/swiper.min.css';
import LoadingOverlay from 'react-loading-overlay-ts';
import Cookies from 'universal-cookie';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import { confetti } from 'dom-confetti';
import Confetti from 'react-dom-confetti';

require("dotenv").config();

function getSteps() {
  return ['Burn', 'Mint', 'Claim'];
}

export default function GreyStepper(props) {


  const [conf, setConf] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [popupTrade, setPopupTrade] = useState(false);
  const [popupTrade2, setPopupTrade2] = useState(false);
  const [qrString, setQrString] = useState("/images/xumm.png");
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
  const [minting, setMinting] = useState(true);
  // const [pid, setPid] = useState(0);
  const [offerhash, setOfferhash] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [crate, setCrate] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [balance, setBalance] = useState(0);
  const [burnAmount, setBurnAmount] = useState(0);
  const [rarity, setRarity] = useState("");
  const [tier, setTier] = useState("");
  const [nftId, setNftId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const steps = getSteps();
  
  
  useEffect(() => {
    //check for mobile
    if (window.innerWidth <= 800) {
      console.log("mobile");
      setIsMobile(true);
    }
  }, []);
  
  const confettiConfigStandard = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 100,
        dragFriction: 0.13,
        duration: 6000,
        stagger: 3,
        width: "7px",
        height: "7px",
        perspective: "500px",
        colors: ["#a7b0cf", "#cd5f71", "#FFE66D", "#a7b0cf"]
    };
   
   const confettiConfigLegend = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 100,
        dragFriction: 0.13,
        duration: 6000,
        stagger: 3,
        width: "7px",
        height: "7px",
        perspective: "500px",
        colors: ["#FFD700", "#D1B000", "#FFED8A", "#FFDE2E"]
    };
    const confettiConfigElite = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 100,
        dragFriction: 0.13,
        duration: 6000,
        stagger: 3,
        width: "7px",
        height: "7px",
        perspective: "500px",
        colors: ["#00A300", "#00D100", "#2EFF2E", "#8AFF8A"]
    };
    const confettiConfigRare = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 100,
        dragFriction: 0.13,
        duration: 6000,
        stagger: 3,
        width: "7px",
        height: "7px",
        perspective: "500px",
        colors: ["#D7A1F9", "#B24BF3", "#880ED4", "#6C0BA9"]
    };

    const getConfig = () => {
        if (rarity === "Legendary") {
            return confettiConfigLegend;
        } else if (rarity === "Elite") {
            return confettiConfigElite;
        } else if (rarity === "Rare") {
            return confettiConfigRare;
        } else {
            return confettiConfigStandard;  
        }
    }

    
  
  const getNftID = (nftNum) => {
    try {
      const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/getNftId?nftNum=' + nftNum;
      axios.get(url).then((response) => {
        console.log(response.data);
        setNftId(response.data.nftId);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const closePopupTradeErr = () => {
    setPopupTrade(false);
    setPopupTrade2(false);
  };

  const getRarity = (num) => {
    try {
      const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/getRarity?nftNum=' + num;
      axios.get(url).then((response) => {
        console.log(response.data);
        setRarity(response.data.rarity);
        setTier(response.data.tier);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleMint = async () => {
    try {
        let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/mint_txn';
        setMinting(true);
        setMintClicked(true);
        const cookies = new Cookies();
        // let response = await axios.post(url, { "address": props.xrpAddress, "pid": cookies.get('pid') });
        let response = await axios.post(url, { "address": props.xrpAddress, "pid": cookies.get('pid') });
        response = response.data;
        console.log(response);
        if ('error' in response) {
          //wait for 5 seconds and then refresh the page
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          return;
        }
        setNftName("#" + response.num)
        // setNftImage(response.nft_image)
        setNftImage(process.env.REACT_APP_URL + "images/houndies/" + response.num + ".png")
        // setNftNum(response.num);
        setMinting(false);
        setOfferhash(response.offer)
        handleNext();
        // getRarity(response.num);
        // getNftID(response.num);
        //make both of these calls at the same time
        await Promise.all([getRarity(response.num), getNftID(response.num)]);
    } catch (error) {
        console.log(error)
        //refresh the page
        window.location.reload();
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

  async function createBurnOffer(){
    const cookies = new Cookies();

    const response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'mint/burn_txn?address=' + props.xrpAddress + '&pid=' + cookies.get('pid') + '&return_url=' + process.env.REACT_APP_URL + 'nftSteps&mobile=' + isMobile);
    let data = await response.json();
    console.log(data);
    setBurnAmount(data.burn_amount);
    data = data.payload;
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

  async function createClaimOffer(){
    const cookies = new Cookies();
    const response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'mint/claim_txn_xumm?address=' + props.xrpAddress + '&pid=' + cookies.get('pid') + '&offer=' + offerhash + '&return_url=' + process.env.REACT_APP_URL + 'nftSteps&mobile=' + isMobile);
    let data = await response.json();
    console.log(data);
    data = data.payload;
    
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
      console.log(payload);

      if (payload.success) {
        console.log('signed');
        if (responseObj.signed === true) {
          if (payload.data.response.signer === props.xrpAddress) {
            console.log('signed');
            handleNext();
            setClaimed(true);
            closePopupTradeErr();
            setListenWs(false);
            handleMint();
            let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/burnt';
            const cookies = new Cookies();
            let response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "address": props.xrpAddress, "txnHash": payload.data.response.txid, "pid": cookies.get('pid'), "burnt": burnAmount })
            });
            let data = await response.json();
            console.log(data);
          } else {
            console.log('not signed');
            setClaimed(false);
            closePopupTradeErr();
            setListenWs(false);
            //refresh the page
            window.location.reload();
          }
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
          if (payloadd.data.response.signer === props.xrpAddress) {
            console.log('signed');
            closePopupTradeErr();
            setListenWs2(false);
            let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/claim_txn';
            const cookies = new Cookies();
            let response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "address": props.xrpAddress, "hash": payloadd.data.response.txid, "pid": cookies.get('pid') })
            });
            let data = await response.json();
            console.log(data);
            cookies.remove('pid', { path: '/nftSteps' });
            setOfferAccepted(true);
            setCrate(true);
          } else {
            console.log('not signed');
            closePopupTradeErr();
            setListenWs2(false);
          }            
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
    createClaimOffer();
    // setCrate(true);
  };
    
  async function checkAddress() {
    let url = process.env.REACT_APP_PROXY_ENDPOINT + 'mint/pending?address=' + props.xrpAddress;
    let response = await fetch(url);
    let data = await response.json();
    var flag = false;
    console.log(data);
    if ('error' in data) {  
      if (data.error === true) {
        //refresh the page after 5 seconds
        setTimeout(function(){ window.location.reload(); }, 5000);
        return;
      }
    }

    if ('message' in data) {
      setLoadingText("Found missing burn txn! Giving you a mint! You will be redirected in 5 seconds, please wait patiently while we mint your NFT!")
      setTimeout(function(){ window.location.reload(); }, 5000);
      return;
    }

    if ('refresh' in data) {
      if (data.refresh === true) {
        setLoadingText("Adding you to the queue!")
        //refresh the page after 5 seconds
        setTimeout(function(){ window.location.reload(); }, 2000);
        return;
      }
    }

    const cookies = new Cookies();
    if (!cookies.get('pid') || cookies.get('pid') === 'undefined' || cookies.get('pid') === undefined || cookies.get('pid') === null) {
      cookies.set('pid', data.request_id, { path: '/nftSteps' });
    } else {
      if ('request_id' in data) {
        if (cookies.get('pid') !== data.request_id) {
          console.log('pid changed');
          flag = true;
        }
      }
    }
    // setPageLoading(false);
    if (data.stage === 'pending') {
      setPageLoading(false);
      setActiveStep(0);
    } else if (data.stage === 'burnt') {
      setActiveStep(1);
      setClaimed(true);
      setMintClicked(false);
      setPageLoading(false);
      handleMint();
    } else if (data.stage === 'offered') {
      var nftNum;
      if ('nft_name' in data) {
        nftNum = data.nft_name;
      } else if ('num' in data) {
        nftNum = data.num;
      }
      setActiveStep(2);
      setClaimed(true);
      setMintClicked(true);
      setOfferhash(data.offer);
      setNftName("Houndies #" + nftNum);
      // setNftNum(data.nft_name);
      // setNftImage(data.nft_image);
      setNftImage(process.env.REACT_APP_URL + "images/houndies/" + nftNum + ".png")
      setPageLoading(false);
      // getRarity(data.nft_name);
      // getNftID(data.nft_name);
      //make the call in parallel
      Promise.all([getRarity(nftNum), getNftID(nftNum)]).then((values) => {
        console.log(values);
      });
    } else if (data.status === 'minting') {
      setActiveStep(1);
      setMinting(true);
      setMintClicked(true);
      //refresh the page after 20 seconds
      setTimeout(() => {
        window.location.reload();
      }, 20000);

    }

    // if (flag) {
    //   console.log('pid changed');
    //   setLoadingText('ATTENTION: REQUEST ID IS NOT THE SAME AS THE ONE IN THE COOKIES');
    //   setPageLoading(true);
    // }
  }

  async function getBalance() {
    let url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/greyhoundBalance?address=' + props.xrpAddress;
    let response = await fetch(url);
    let mainData = await response.json();
    console.log(mainData);
    for (let i = 0; i < mainData.length; i++) {
      if (mainData[i].currency === '47726579686F756E640000000000000000000000') {
        setBalance(Math.round(parseFloat(mainData[i].balance)));
      }
    }
  }

  useEffect(() => {
    checkAddress();
    getBalance();
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
              <p>Time has come to mint your Houndies! To start, burn the required amount of hound below and you will be issued a NFT</p>
        <div className="container text-center">
        <div className="row">
              <div className="col-md-6">
                  <div className="mintbox">
                    <span className="text-white">Balance</span>
                    <div className="d-block">
                      <span className="fs-22 text-white" id="baseField">{balance}</span>
                    </div>
                    <a href="https://xpmarket.com/dex/Greyhound-rJWBaKCpQw47vF4rr7XUNqr34i4CoXqhKJ/XRP">Buy More</a>
                  </div>	
              </div>
              <div className="col-md-6">
                  <div className="mintbox">
                    <span className="text-white">Cost</span>
                    
                    <div className="d-block">
                      <img className="gh-icon" src="./images/svg/logo-icon.svg" height="30px" id="baseImage" alt="icon"/><span className="fs-24 text-white"><span style="text-decoration: line-through">10M</span> 5M HOUND</span>
                    </div>
                    <span className="text-white">Per NFT</span>
                  </div>	
              </div>
              {/* <div className="col-md-6">
                  <div className="mintbox">
                    <span className="text-white">Rarity</span>
                    <div className="d-block">
                      <span className="fs-22 text-white" id="baseField">Tier</span>
                    </div>
                  </div>	
              </div> */}
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
              <div class="loaderr">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
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
            {/*<p>First claim the nft<br/>then Click on the crate to reveal your NFT</p>*/}
			
			<div className="confetti-container">
				<Confetti 
          active={conf} 
          config={getConfig()}            
        />	
            
            </div>
			
			
            {crate === true ? (
                <div id="cube" class="h-40 w-40 relative flex justify-center items-center cursor-pointer">
                  <div class="hexagon absolute" id="glow"></div>
                  <div class="cube back h-40 w-40 absolute top-0 left-0" id="cback"></div>
                  <div class="cube topcrate h-40 w-40 absolute top-0 left-0" id="ctop"></div>
                  <div class="cube leftcrate h-40 w-40 absolute top-0 left-0" id="cleft"></div>
                  <div class="cube rightcrate h-40 w-40 absolute top-0 left-0" id="cright"></div>
                  <div class="powerup absolute" id="powerup"></div>
                </div>
				
            ) : (
                <></>
            )}
            <div className="nft-name text-white" id="nft-name" style={{display: "none"}}>
            
			  <div className="col-md-6 offset-md-3 mb-4">
                  <div className="mintbox">
				    <div className="d-block">{nftName}</div>
                    <span className="text-white">{rarity}</span>
                    <div className="d-block">
                      <span className="fs-22 text-white" id="baseField">{tier}</span>
                    </div>
                  </div>	
              </div>
			  
            </div>
            <div>
            
			
			
            </div>
			
			
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

      powerup.style.backgroundImage = `url(${nftImage})`;
      // var c = 0;
      
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
          changeVar("rgba(192, 99, 111, 0.5)");
      }

      class openCube {
        constructor() {
          if (!isOpen) {
            award();
			setConf(true)
            ctop.style.transform = "translateY(-3rem)";
            cleft.style.transform = "translateX(-3rem)";
            cback.style.transform = "translateX(-3rem)";
            cright.style.transform = "translateX(3rem)";
            ctop.style.opacity = 0.2;
            cleft.style.opacity = 0.1;
            cright.style.opacity = 0.2;
            cback.style.opacity = 0.1;
            glow.style.opacity = 0.5;
            powerup.style.opacity = 1;
            isOpen = true;
            cube.style.animationPlayState = "paused";
            powerup.style.zIndex = 10;
            powerup.style.height = "300px";
            powerup.style.width = "300px";
            nftName.style.display = "block";
          } else {
            ctop.style.transform = "translateY(0)";
            cleft.style.transform = "translateX(0)";
            cback.style.transform = "translateX(0)";
            cright.style.transform = "translateX(0)";
            cube.style.opacity = 1;
            isOpen = false;
            ctop.style.opacity = 1;
            cleft.style.opacity = 1;
            cright.style.opacity = 1;
            cback.style.opacity = 1;
            glow.style.opacity = 1;
            powerup.style.opacity = 1;
            powerup.style.zIndex = 0;
            cube.style.animationPlayState = "running";
            powerup.style.height = "160px";
            powerup.style.width = "160px";
            changeVar("rgba(192, 99, 111, 0.5)");
            nftName.style.display = "none";
          }
        }
      }

      cube.addEventListener("click", () => {
        new openCube();
      });

    }
  }, [crate]);

  return (
    <LoadingOverlay
    active={pageLoading}
    styles={{
      content: {
        width: '100%',
        height: '100%',
        marginTop: '400px',
        verticalAlign: 'top',
      }
    }}
    spinner
    text= {loadingText}
  >


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
              {/* <div id="preloader">
                <div id="loader"></div>
              </div> */}
          {/* <Button className='btn-white-border' disabled={activeStep === 0}onClick={handleBack}>Cancel</Button> */}
                  {claimed && index === 0 &&
				  <Button className="btn-primary" variant="contained" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Done' : 'Next' }</Button>}
                  {/* { !claimed && 
					<Button className="btn-primary" variant="contained" onClick={handleBurn}>Burn</Button>} */}
                  {balance >= 10000000 && !claimed &&
                  <Button className="btn-primary" variant="contained" onClick={handleBurn}>Burn</Button>}
                  {balance < 10000000 && !claimed &&
                  <Button className="btn-primary" variant="contained" onClick={handleBurn} disabled>Burn</Button>}
                  {minting === true && index === 1 &&
          <Button className="btn-primary" variant="contained" onClick={handleMint} disabled>Minting....</Button>}
                  {mintClicked === true && index === 1 && minting === false &&
          <Button className="btn-primary" variant="contained" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Done' : 'Next' }</Button>}
                  {mintClicked === true && index === 2 && offerAccepted === false &&
          <Button className="btn-primary" variant="contained" onClick={handleClaim} id="claim">Claim</Button>}
                  {offerAccepted === true && index === 2 &&
          // <Button className="btn-primary" variant="contained" onClick={window.location.reload(false)}>Mint Another</Button>}
		  	 
             <Button
              className="btn-primary"
               variant="contained"
                onClick={() => {
                  window.location.reload(false);
                }}
              >
                  Mint Another</Button>}
				  
				  {offerAccepted === true && index === 2 &&
				  <Button className="btn-primary" variant="contained" onClick={() => {
                  window.open(process.env.REACT_APP_URL + "nftDetails?nftid=" + nftId, "_blank");
                }}>
            View NFT
          </Button>
				  }
				  
				  
               </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
   
    
</div>

    <Modal className="xumm-tx" animation={false} show={popupTrade} centered>
                      <img className="modal-above-image" src="./images/xumm.svg" alt="xumm" />
                      <Modal.Header>
                          <Modal.Title>Confirm Hound Burn?</Modal.Title>
                          <button type="button" onClick={() => closePopupTradeErr()}
                              className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="xumm-tx-container">
                              

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
                              <div>
                                  <div className='tx-info'>
                                      <span>You Pay</span>
                                      <p className='text-white'>10m $HOUND</p>
                                  </div>
                                  <div className='tx-info'>
                                      <span>Receive</span>
                                      <p className='text-white'> 1 NFT MINT</p>
                                  </div>
                                  {/* {issueCheck &&  */}
                                  <div className='tx-info'>
                                      <span>Issuer Fee</span>
                                      {/* <p className='text-white'> FREE! </p> */}
                                      <p>{issueAmount} $HOUND</p>
                                  </div>

                                  <div className='tx-info'>
                                      <span>XRP transaction fee</span>
                                      <p className='text-white'>0.000012 XRP</p>
                                  </div>
                              </div>
                          </div>

                      </Modal.Body>
    </Modal>

    <Modal className="xumm-tx" animation={false} show={popupTrade2} centered>
                    <img className="modal-above-image" src="./images/xumm.svg" alt="xumm" />
                    <Modal.Header>
                        <Modal.Title>Claim NFT</Modal.Title>
                        <button type="button" onClick={() => closePopupTradeErr()}
                            className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="xumm-tx-container">

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
                        </div>

                    </Modal.Body>
    </Modal>

</div>
</div>
    
</LoadingOverlay>
  );

}