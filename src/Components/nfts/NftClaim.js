import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import { confetti } from 'dom-confetti';
import Confetti from 'react-dom-confetti';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';





require("dotenv").config();

export default function NftClaim(props) {
    const [popupTrade, setPopupTrade] = useState(false);
    const [numNfts, setNumNfts] = useState(0);

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


    const Component = () => {
        const [active, setActive] = useState(false);
        return (
            <Confetti
                ref={() => { setActive(false) }}
                active={active}
                config={confettiConfig}
            />);
    }

    function handlePopupTrade() {

        const nft = document.querySelector('#nft');
        setPopupTrade(true);

        this.state = {
            active: false
        };
        
        setTimeout(() =>
            setPopupTrade(false), 3000,
            nft.classList.remove("blur"),
            useState(true)
        );

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
                                    <div className="claim-img">
                                        <img className="mt-5 mb-5 blur" id="nft" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2axwwnCdgRheFY6ooHtgiJ0sCfraOhfO5HC2a8bvjw&s" height={250} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-0 pt-0 justify-content-center d-flex">
                                {/* <button className="btn btn-white rounded-4 mb-2 text-center" onClick={() => setPopupTrade(true)} */}
                                {/*Activate the popuptrade for 5 seconds, then set it to false*/}
                                <button className="btn btn-white rounded-4 mb-2 text-center" onClick={() => handlePopupTrade()}
                                >Claim NFT</button>
                            </div>
                        </div>

                    </div>
                    <div className="confetti-container">
                        <Component />
                    </div>



                </div>

                <Modal className="xumm-tx" size='lg' animation={false} show={popupTrade} centered>
                    <img className="modal-above-image" src="./images/xumm.svg" />
                    <Modal.Header>
                        <Modal.Title>Confirm NFT Swap</Modal.Title>
                        <button type="button" onClick={() => setPopupTrade(false)}
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
                                <img src='https://www.google.com/imges?imgurl=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1280832346611167236%2F1sQA2Dn9_400x400.jpg&imgrefurl=https%3A%2F%2Fmobile.twitter.com%2Fxummsupport&tbnid=CrAgLswtx0Ug9M&vet=12ahUKEwiZ4fGtk5b8AhUMidgFHRXjDRIQMygHegUIARC2AQ..i&docid=uUvpKid0XKYqsM&w=400&h=400&q=xumm&ved=2ahUKEwiZ4fGtk5b8AhUMidgFHRXjDRIQMygHegUIARC2AQ' alt="QR Code" />
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>




            </div>
        </div>
    );
};