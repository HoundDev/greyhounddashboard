import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { confetti } from 'dom-confetti';
import Confetti from 'react-dom-confetti';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

import axios from 'axios';





require("dotenv").config();

export default function NftClaim(props) {
    const [popupTrade, setPopupTrade] = useState(false);
    const [numNfts, setNumNfts] = useState(0);
    const [conf, setConf] = useState(false);
    const [qrString, setQrString] = useState("");
    const [nftData, setNftData] = useState([]);
    const [curNft, setCurNft] = useState("");
    const [curNftIndex, setCurNftIndex] = useState(0);
    const [nftidCur, setNftidCur] = useState(0);
    const [claimed, setClaimed] = useState(false);

    function convertHexToString(hex)
    {
        var string = '';
        for (var i = 0; i < hex.length; i += 2)
        {
            string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return string;
    }

    const confettiConfig = {
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

    function handlePopupTrade() {
        console.log(nftData)
        setPopupTrade(true);
        claimNFT(curNftIndex);
    }

    function closePopupTrade() {
        setPopupTrade(false);
        const nft = document.querySelector('#nft');
        nft.classList.remove('blur');
        setConf(true)
        setClaimed(true);
    }
    
    async function getNFTs() {
        const response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/getNft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: props.xrpAddress,
            }),
        });
        const data = await response.json();
        console.log(data);
        setNumNfts(data.len);
        setNftData(data.nfts);
        //get the first NFT in the array and display it
        let keys = Object.keys(data.nfts);
        let firstNft = data.nfts[keys[0]];
        setNftidCur(keys[0]);
        console.log(firstNft);
        setCurNftIndex(firstNft.index);
        let uri = firstNft.uri;
        uri = convertHexToString(uri);
        uri = uri.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
        const nftDataCur = await axios.get(uri);
        console.log(nftDataCur);
        let image = nftDataCur.data.image;
        image = image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
        setCurNft(image);
    }

    function convertStringToHex(str) {
        var hex = '';
        for (var i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    async function claimNFT(sellOfferSequence) {
        let xummPayload = {
            "options": {
                "submit": true
            },
            "txjson": {
                "TransactionType": "NFTokenAcceptOffer",
                "Account": props.xrpAddress,
                "NFTokenSellOffer": sellOfferSequence,
                "Memos": [
                    {
                        "Memo": {
                            "MemoData": convertStringToHex("Claim NFT FROM GREYHOUND!")
                        }
                    }
                ]
            }
        };
        
        let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'xumm/createpayload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(xummPayload),
        });
        let data = await response.json();
        console.log(data);
        setQrString(data.refs.qr_png);
        }

    function handleMore() {
        console.log("Clicked more");
        //reload the page
        window.location.reload();
    }

    useEffect(() => {
        getNFTs();
    }, []);

    return (
        <div className="content-body">
            <div className="container-fluid nft-home">

                <div className="row justify-content-center">

                    <div className="col-xl-5 col-xxl-5 col-lg-6">
                        <div className="card claim-nft">
                            <div className="card-body">
                                <div className="claim-container text-center">
                                    <h3>Claim your NFT</h3>

                                    <span>You have {numNfts} NFTs left to claim.</span>

                                    {curNft !== "" ?
                                        <div className="claim-img">
                                            <img className="mt-5 mb-5 blur"
                                                id="nft"
                                                src={curNft}
                                                height={250} />
                                        </div>
                                        :
                                        <div className="claim-img">
                                            <img className="mt-5 mb-5 blur"
                                                id="nft"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2axww
                                                nCdgRheFY6ooHtgiJ0sCfraOhfO5HC2a8bvjw&s"
                                                height={250} />
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="card-footer border-0 pt-0 justify-content-center d-flex">
                                {/* <button className="btn btn-white rounded-4 mb-2 text-center" onClick={() => handlePopupTrade()}
                                >Claim NFT</button> */}
                                {/*Have the button disabled if there are no NFTs left to claim, and change the text to "No NFTs left to claim" */}
                                {numNfts > 0 ?
                                    !claimed ?
                                    <button className="btn btn-white rounded-4 mb-2 text-center" onClick={() => handlePopupTrade()}
                                    >Claim NFT</button> :
                                    <div>
                                    <button className="btn btn-white rounded-4 mb-2 text-center"
                                    onClick={() => handleMore()}
                                    >Claim More!</button> &nbsp;
                                    <button className="btn btn-white rounded-4 mb-2 text-center" onClick={() => window.location.href = `/nftDetails?nftId=${nftidCur}`}
                                    >View NFT</button>
                                    </div>
                                    :
                                    <button className="btn btn-white rounded-4 mb-2 text-center" disabled
                                    >No NFTs</button>
                                }

                            </div>
                        </div>

                    </div>
                    <div className="confetti-container">
                            {/* add confetti here */}
                            <Confetti 
                            active={conf} 
                            config={confettiConfig} 
                            />
                    </div>



                </div>

                <Modal className="xumm-tx" size='lg' animation={false} show={popupTrade} centered>
                    <img className="modal-above-image" src="./images/xumm.svg" />
                    <Modal.Header>
                        <Modal.Title>Confirm NFT Swap</Modal.Title>
                        <button type="button" onClick={() => closePopupTrade()}
                            className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="xumm-tx-container">
                            <div>
                                <div className='tx-info'>
                                    <span>You Pay</span>
                                    <p className='text-white'> 10b hound </p>
                                    {/* {quoteAmount} {curStringB}</p> */}
                                </div>
                                <div className='tx-info'>
                                    <span>Receive</span>
                                    <p className='text-white'> 1 nft </p>
                                    {/* {baseAmount} {curStringS}</p> */}
                                </div>
                                {/* {issueCheck &&  */}
                                <div className='tx-info'>
                                    <span>Issuer Fee</span>
                                    <p className='text-white'> 150m hound</p>
                                    {/* {issueAmount} hound</p> */}
                                </div>
                                {/* } */}

                                <div className='tx-info'>
                                    <span>XRP transaction fee</span>
                                    <p className='text-white'>0.000012 XRP</p>
                                </div>
                            </div>

                            <div className="qr-code-img">
                                {/* <img src={qrcodepng} alt="QR Code" /> */}
                                <img src={qrString} alt="QR Code" />
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>




            </div>
        </div>
    );
};