import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftCard from "./nfts/NftCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
require("dotenv").config();

export default function NftExplore(props) {

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);

    function convertHexToStr(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    async function getNftImage(id) {
        let url = `https://api.xrpldata.com/api/v1/xls20-nfts/nft/${id}`
        let response = await fetch(url);
        let data = await response.json();
        //check if the nft has a URI field
        let uri = data.URI;
        console.log(`data: ${JSON.stringify(data)}`);
        if (uri !== "" && uri !== undefined) {
            //convert the hex string to a string
            let uri = convertHexToStr(data.nft.URI);
            //get the image from the URI
            let response = await fetch(uri);
            let data = await response.json();
            //find a field named image
            let image = data.image;
            let name = data.name;
            //return the image
            return {image: image, name: name};
        }
        else {
            console.log("on the dex api")
            let onTheDex = `https://marketplace-api.onxrp.com/api/metadata/${id}`;
            let imageUrl = `https://marketplace-api.onxrp.com/api/image/${id}`;
            let response = await fetch(onTheDex);
            let data = await response.json();
            let name = data.name;
            return {image: imageUrl, name: name};
        }
    }

    async function getNfts() {
        let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/getnfts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"xrpAddress": props.xrpAddress})
            });
        let data = await response.json();
        console.log(data);
        setNumberOfNfts(data.account_nfts.length);
        let nfts = data.account_nfts;
        let nftImages = [];
        let nftNames = [];
        //get the `uri` from the nft
        for (let i = 0; i < nfts.length; i++) {
            let nft = nfts[i];
            let nftUri = nft.URI;
            if (nftUri === "" || nftUri === undefined) {
                console.log("uri is empty");
                // continue;
                let image = await getNftImage(nft.NFTokenID);
                nftImages.push(image.image);
                nftNames.push(image.name);
                console.log(`image: ${image.image}\nname: ${image.name}`);
                continue;
            }
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
            <div className="container-fluid nft-explore">

                <div className="row">
                    <div className="col-lg-12">
                        <form className="nft-form">
                            <input type="text" className="form-control search" placeholder="Search NFTs" />
                            <div className="dropdown d-block">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="d-block fs-15 text-white">All Marketplaces</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <div className="dropdown-item">
                                        <input className="form-check-input" type="checkbox" />
                                        <label className="form-check-label">onXRP</label>
                                    </div>
                                    <div className="form-check dropdown-item">
                                        <input className="form-check-input" type="checkbox" />
                                        <label className="form-check-label">XRPLCoins</label>
                                    </div>
                                    <div className="form-check dropdown-item">
                                        <input className="form-check-input" type="checkbox" />
                                        <label className="form-check-label">XRPNFT</label>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown d-block">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="d-block fs-15 text-white">Trending</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <a className="dropdown-item" href="">Recently listed</a>
                                    <a className="dropdown-item" href="">Price: low to high</a>
                                    <a className="dropdown-item" href="">Price: high to low</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="explore-container">
                            {/* <NftCard /> */}
                            {Array(numberOfNfts).fill().map((_, i) => (
                                <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};