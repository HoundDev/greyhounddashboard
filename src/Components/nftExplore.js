import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftCard from "./nfts/NftCard";
import CardSkeleton from "./skeletons/NftCardSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'

require("dotenv").config();

export default function NftExplore(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [owners, setOwners] = useState([]);
    const [tokIds, setTokIds] = useState([]);

    function convertHexToStr(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    async function getNftImage(id) {
        // console.log("on the dex api")
        let imageUrl = `https://marketplace-api.onxrp.com/api/image/${id}`;
        return { image: imageUrl };
    }

    // async function getNfts() {
    //     let response = await fetch();
    //     let data = await response.json();
    //     console.log(data);
    //     setNumberOfNfts(data.account_nfts.length);
    //     let nfts = data.account_nfts;
    //     let nftImages = [];
    //     let nftNames = [];
    //     //get the `uri` from the nft
    //     for (let i = 0; i < nfts.length; i++) {
    //         let nft = nfts[i];
    //         let nftUri = nft.URI;
    //         if (nftUri === "" || nftUri === undefined) {
    //             console.log("uri is empty");
    //             // continue;
    //             let image = await getNftImage(nft.NFTokenID);
    //             nftImages.push(image.image);
    //             nftNames.push(image.name);
    //             console.log(`image: ${image.image}\nname: ${image.name}`);
    //             continue;
    //         }
    //         //convert the uri from hex to ascii
    //         let nftUriAscii = convertHexToStr(nftUri);
    //         //if the uri does not start with `https://`, then it is not a valid uri
    //         if (!nftUriAscii.startsWith('https://')) {
    //             continue;
    //         }
    //         //fetch the url from the ascii uri
    //         let nftUriResponse = await fetch(nftUriAscii);
    //         //get the `image` from the response
    //         let nftUriData = await nftUriResponse.json();
    //         let nftImage = nftUriData.image;
    //         let nftName = nftUriData.name;
    //         nftImages.push(nftImage);
    //         nftNames.push(nftName);
    //     }
    //     setNftImages(nftImages);
    //     setNftNames(nftNames);
    // }
    async function getTrendingNfts(page) {
        console.log("getting trending nfts");
        let URL = `https://marketplace-api.onxrp.com/api/nfts?page=${page}&per_page=12&sort=recently_listed&order=desc&filters[marketplace_status]=active&include=collection,owner&refresh=true`;
        let response = await fetch(URL);
        let data = await response.json();
        let nfts = data.data;
        console.log(nfts);
        let nftimages = [];
        let nfnames = [];
        let owns = [];
        let tokids = [];
        for (let i = 0; i < nfts.length; i++) {
            let nft = nfts[i];
            let tokenid = nft.token_id;
            // let nftImage = `https://marketplace-api.onxrp.com/api/image/${nft.token_id}`
            let imageData = await getNftImage(tokenid);
            let nftImage = imageData.image;
            let nftName = nft.name;
            nftimages.push(nftImage);
            nfnames.push(nftName);
            tokids.push(nft.token_id);
            console.log(nft.token_id)
            owns.push(nft.owner.wallet_id);
            // owns.push(nft.owner);
        }
        console.log('Done getting trending nfts');
        setNftImages(nftImages.concat(nftimages));
        setNftNames(nftNames.concat(nfnames));
        setOwners(owners.concat(owns));
        setTokIds(tokIds.concat(tokids));
        setNumberOfNfts(numberOfNfts + nfts.length);
        setIsLoading(false);
    }

    useEffect(() => {
        // getNfts();
        getTrendingNfts(curPage);
    }, []);

    return (
        <div className="content-body">
            <div className="container-fluid nft-explore">

                <div className="row">
                    <div className="col-lg-12">
                        <form className="nft-form">
                            <input type="search" className="form-control search" placeholder="Search NFTs" />
                            <div className="dropdown">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="fs-15 text-white">All Marketplaces</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <div className="dropdown-item">
                                        <input className="form-check-input" type="checkbox" defaultChecked/>
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
                            <div className="dropdown">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="fs-15 text-white">Recently listed</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <a className="dropdown-item" href="">Trending</a>
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
                             {isLoading && <CardSkeleton cards={12}/> }
                            {Array(numberOfNfts).fill().map((_, i) => (
                                nftImages[i] === "" || nftImages[i] === undefined ? null : <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} address={owners[i]} nftId={tokIds[i]} bid={0} />
                            ))}
                        </div>
                    </div>
                </div>

                    {/* a button to load more */}
                    <div className="row">
                        <div className="col">
                            <div className="load-more">
                                <button className="btn btn-primary" onClick={() => {
                                    setCurPage(curPage + 1);
                                    getTrendingNfts(curPage + 1);
                                }}>Load More</button>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    );
};