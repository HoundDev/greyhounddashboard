import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

require("dotenv").config();

export default function NftDetails(props) {

    const [nftImage, setNftImage] = useState("");
    const [nftName, setNftName] = useState("");
    const [owner, setOwner] = useState("");
    const [nftId, setNftId] = useState("");
    const [nftAttrs, setNftAttrs] = useState([]);
    const [setDesc, setSetDesc] = useState("");
    const [tier, setTier] = useState("");
    const [rarity, setRarity] = useState("");
    const [animFlag, setAnimFlag] = useState(false)
    const ws = useRef(WebSocket);
    const [listenWs, setListenWs] = useState(false);
    const [showError, setShowError] = useState(false);
    const [qrLink, setQrLink] = useState("");
    const [popupTrade, setPopupTrade] = useState(false);
    const [qrString, setQrString] = useState("");
    const [claimed, setClaimed] = useState(false);
    const [taxon, setTaxon] = useState(false);
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const { search } = useLocation();
    const match = search.match(/nftid=(.*)/);
    const type = match?.[1];
    console.log(type);

    async function getOwner(id) {
        let url = 'https://api.xrpldata.com/api/v1/xls20-nfts/nft/' + id;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        return data.data.nft.Owner;
    }

    async function getBid(id) {
        let url = `https://marketplace-api.onxrp.com/api/nfts/${id}?include=owner,createdBy,nftAttributes,collection,nftActivities,offers,launchpad`
        let response = await fetch(url);
        let data = await response.json();
        let highestPrice = data.data.highest_bid_price;
        let fprice = data.data.fixed_price;
        let desc = data.data.collection.description;
        if (desc === null || desc === undefined) {
            desc = data.data.collection.bio;
        }
        // setSetDesc(desc);
        if (highestPrice === 0) {
            return fprice;
        } else {
            return highestPrice;
        }
    }

    async function getNftImageAndMeta(id) {
        let url = process.env.REACT_APP_PROXY_ENDPOINT + "api/getnftsData"
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, address: props.xrpAddress })
        });
        let data = await response.json();
        let name = data.name;
        let attr = data.attributes;
        let collection = data.collection.name;
        let collectionDesc = data.collection.description;
        let owner = data.owner;
        let imageUrl = data.image;
        // imageUrl = imageUrl.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
        setOwner(owner);
        setNftAttrs(attr);
        setNftId(id);
        setNftName(name);
        setNftImage(imageUrl);
        setSetDesc(collectionDesc);
        setTier(data.tier);
        setRarity(data.rarity);
        setAnimFlag(data.anim)
        // setNftPrice(price);
        if (data.taxon !== 1 && data.taxon !== 2) {
            setTaxon(true);
        } else {
            setTaxon(false);
        }
        return { image: imageUrl, name: name, attr: attr, owner: owner, rarity: data.rarity, tier: data.tier, anim: data.anim }
    }

    function closePopupTradeErr() {
        setPopupTrade(false);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    }

    async function burnNft() {
        let xummPayload = {
            "options": {
                "submit": true
            },
            "txjson": {
                "TransactionType": "NFTokenBurn",
                "Account": props.xrpAddress,
                "Owner": props.xrpAddress,
                "NFTokenID": nftId
            }
        };
        let xummPayloadMobile = {
            "options": {
                "submit": true,
                "return_url": {
                    "app": process.env.REACT_APP_URL + "userprofile",
                    "web": process.env.REACT_APP_URL + "userprofile"
                }
            },
            "txjson": {
                "TransactionType": "NFTokenBurn",
                "Account": props.xrpAddress,
                "Owner": props.xrpAddress,
                "NFTokenID": nftId
            }
        };
        if (isMobile) {
            var response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + "xumm/createpayload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(xummPayloadMobile)
            });
        } else {
            var response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + "xumm/createpayload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(xummPayload)
            });
        }
        let data = await response.json();
        console.log(data);
        if (isMobile) {
            window.open(data.next.always, '_blank');
            setQrString(data.refs.qr_png);
            setQrLink(data.next.always);
            ws.current = new WebSocket(data.refs.websocket_status);
            setListenWs(true);
        } else {
            setQrString(data.refs.qr_png);
            setQrLink(data.next.always);
            ws.current = new WebSocket(data.refs.websocket_status);
            setListenWs(true);
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

    function closePopupTrade() {
        setPopupTrade(false);
        setClaimed(true);
        setListenWs(false);
    }

    function openPopupTrade() {
        setPopupTrade(true);
        burnNft();
    }
    useEffect(() => {
        ws.current.onmessage = async (e) => {
            if (!listenWs) return;
            let responseObj = JSON.parse(e.data.toString());
            if (responseObj.signed !== null) {
                console.log(responseObj);
                const payload = await getXummPayload(responseObj.payload_uuidv4);
                console.log(payload);

                if (payload.success) {
                    console.log('signed');
                    if (responseObj.signed === true) {
                        console.log('signed');
                        setClaimed(true);
                        closePopupTrade();
                        setListenWs(false);
                        window.location.replace(process.env.REACT_APP_URL + "userprofile");
                    } else {
                        console.log('not signed');
                        setClaimed(false);
                        closePopupTradeErr();
                        setListenWs(false);
                    }
                }
            }
        }
    }, [listenWs]);

    useEffect(() => {
        // getNftImageAndMeta(type);
        if (type !== undefined) {
            getNftImageAndMeta(type);
        }
    }, [type]);


    return (
        <div className="content-body">
            <div className="container-fluid">

                {/* 
                <div className="page-titles">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/nftExplore">NFTs</a></li>
                        <li className="breadcrumb-item active"><a href="">{nftName}</a></li>
                    </ol>
                </div>
                */}

                {taxon && <div class="alert alert-primary solid mb-5">
                    <a className="text-white"><strong>Warning - </strong> Your NFT Taxon is currently outdated. Please burn this NFT by clicking on the following button.</a>
                    <button class="btn btn-white rounded-4 fs-13 btn-close" onClick={() => openPopupTrade()}>Update Taxon</button>
                </div>
                }

                <div className="single-nft">

                    <div className="row">

                        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 ">
                            <div className="nft-container">
                                <div className="img-wrapper  mb-5">
                                    <img className="img-fluid" src={nftImage} alt="nft" />
                                    {/* {animFlag===true ? <video className="img-fluid" autoPlay loop muted playsInline>
                                        <source src={nftImage} type="video/mp4" />
                                    </video> : <img className="img-fluid" src={nftImage} />} */}
                                </div>
                                <div className="mb-5">
                                    <h3 class="mb-3">Owned by</h3>
                                    <div class="owner-nft">
                                        <div class="owner-avatar">
                                            <a href="#">
                                                <img src={nftImage} alt="Profile Image" />
                                            </a>
                                            {/* <div class="profile-verification verified">
                                                <i class="fas fa-check"></i>
                                            </div> */}
                                        </div>
                                        <div class="owner-info">
                                            {/* <span class="username">Hound</span> */}
                                            <h6 class="address text-white"> {owner || <Skeleton width={300} />} </h6>
                                        </div>
                                    </div>
                                </div>
                                <h3 class="mb-3">Attributes</h3>
                                <div className="box properties mb-3">
                                    <div className="properties-wrapper">
                                        {nftAttrs.map((attr, index) => {
                                            return (
                                                // <div class="single-prop"><span className="display-1"><b>{attr.trait_type}</b></span><span>{attr.trait_tier}</span><p>{attr.value}<br/>{attr.per}%</p></div>
                                                <div class="single-prop"><span className="display-1">{attr.trait_type}</span><p>{attr.value}<br />{attr.per}%</p><span>({attr.trait_tier})</span></div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 ml-auto">
                            <div className="sticky-info">
                                <div className="nft-info ">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="./images/avatar/standard-collection.gif" alt="" className="avatar-img" />
                                        <div className="flex-grow-1">
                                            <a href="/nftCollection" className="text-white">
                                                <h5 className="mb-0 text-white">Houndies</h5>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="nft-name">
                                        <h2 className="mb-3 text-white">{nftName || <Skeleton width={300} />}&nbsp;
                                        </h2>
                                    </div>
                                    <p className="mb-5">{setDesc || <Skeleton count={3} />}</p>
                                    
                                    <div class="nft-price-wrapper">
                                        <div>
                                            <div className="box-info" style={{ "width": "100%" }}>
                                                <p className="fs-14 mb-0">Rarity</p>
                                                <div className="nft-item-price"><span>{tier || <Skeleton width={200} />}</span>{rarity || <Skeleton width={50} />}</div>
                                            </div>
                                        </div>
                                        <div className="buy-nft">
                                            {/* <button class="btn save-nft"><i class="fa-solid fa-heart"></i></button> */}
                                        </div>
                                    </div>


                                </div>

                            </div>


                        </div>

                    </div>
                </div>

                <Modal className="xumm-tx" size='lg' animation={false} show={popupTrade} centered>
                    <img className="modal-above-image" src="./images/xumm.svg" />
                    <Modal.Header>
                        <Modal.Title>Confirm NFT Burn</Modal.Title>
                        <button type="button" onClick={() => closePopupTradeErr()}
                            className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="xumm-tx-container">
                            <div>
                                <div className='tx-info'>
                                    <span>You Burn</span>
                                    <p className='text-white'>1 NFT</p>
                                </div>
                                <div className='tx-info'>
                                    <span>Receive</span>
                                    <p className='text-white'>1 Updated NFT</p>
                                </div>
                                <div className='tx-info'>
                                    <span>XRP transaction fee</span>
                                    <p className='text-white'>0.000012 XRP</p>
                                </div>
                                <div className='tx-info'>
                                    <a className="text-white" href={qrLink} target="_blank" rel="noreferrer">
                                        Click here to open in XUMM
                                    </a>
                                </div>
                            </div>

                            <div className="qr-code-img">
                                {/* <a href={qrLink} target="_blank" rel="noreferrer">
                                    Click here to open in XUMM
                                </a> */}
                                {/* <img src={qrString} alt="QR Code" /> */}
                                {/* With ref to above, have the text on top and qr code below the text */}
                                
                                <br />
                                <img src={qrString} alt="QR Code" />
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
};