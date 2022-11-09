import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import NftCard from "./nfts/NftCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'


require("dotenv").config();

export default function NftHome(props) {

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);

    function convertHexToStr(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    async function getNfts() {
        let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/getnfts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"xrpAddress": props.xrpAddress})
          });
        let data = await response.json();
        console.log(data);
        setNumberOfNfts(data.account_nfts.length - 1);
        let nfts = data.account_nfts;
        let nftImages = [];
        let nftNames = [];
        //get the `uri` from the nft
        for (let i = 0; i < nfts.length; i++) {
            let nft = nfts[i];
            let nftUri = nft.URI;
            //convert the uri from hex to ascii
            let nftUriAscii = convertHexToStr(nftUri);
            //if the uri does not start with `https://`, then it is not a valid uri
            if (!nftUriAscii.startsWith('https://')) {
                continue;
            }
            //fetch the url from the ascii uri
            let nftUriResponse = await fetch(nftUriAscii);
            //get the `image` from the response
            let nftUriData = await nftUriResponse.json();
            let nftImage = nftUriData.image;
            let nftName = nftUriData.name;
            nftImages.push(nftImage);
            nftNames.push(nftName);
        }
        setNftImages(nftImages);
        setNftNames(nftNames);
    }

    useEffect(() => {
        getNfts();
    }, []);
    return (
        <div className="content-body">
            <div className="container-fluid">

                <div className="row">

                    <div className="col-xl-8 col-xxl-8 col-lg-8">
                        <div className="card nft-intro-card">
                            <div className="row">

                                <div className="col-md-8 justify-content-center align-self-center">
                                    <div className="card-body">
                                        <h2 className="card-text text-white">Discover, Collect and Trade XLS-20 NFTs</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <a href="#" className="btn btn-white rounded-4 mb-2">
                                            Explore
                                        </a>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <img draggable="false" src="./images/hound-3d.png" alt="NFT 1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-xxl-4 col-lg-4">
                        <div className="card card-gradient">
                            <div className="card-header border-0 pb-0">
                                <h5 className="card-title text-black">Current Balance</h5>
                            </div>
                            <div className="card-body">
                                <h2 className="card-text text-black" id="greyhound-amount">5 NFTs</h2>
                                <p className="card-text">≈ $2,560,000</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row overflow-h">

                <div className="col-xl-12 col-xxl-12 col-lg-12">
								<div className="d-flex  mt-4 ">
									<div>
										<h4 className="text-white fs-28 ">The Standard Collection</h4>
									</div>

								</div>
							</div>
                    <div className="col-xl-12 col-xxl-12 col-lg-12 mt-md-5">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={"auto"}   
                        >
                            
                            {/* length of numberOfNfts is the number of nfts we want to display */}
                            {Array(numberOfNfts).fill().map((_, i) => (
                                <SwiperSlide key={i}>
                                    <NftCard nft={nftImages[i]} name={nftNames[i]} />
                                </SwiperSlide>
                            ))}


                        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
};