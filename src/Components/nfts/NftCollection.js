import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import NftCard from "./NftCard";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from "../skeletons/NftCardSkeleton";

require("dotenv").config();

export default function NftCollection() {

    const [isLoading, setIsLoading] = useState(true);

    const { search } = useLocation();
    const match = search.match(/collectionId=(.*)/);
    const type = match?.[1];

    const API_ISSUER_URL = "https://api.xrpldata.com/api/v1/xls20-nfts/issuer/"

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);
    const [owners, setOwners] = useState([]);
    const [nftIds, setNftIds] = useState([]);
    const [nftData, setNftData] = useState([]);
    const [nftsOnPage, setNftsOnPage] = useState(0);
    const [collectionBio, setCollectionBio] = useState("");
    const [collectionBanner, setCollectionBanner] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [collectionPfp, setCollectionPfp] = useState("");
    const [collectionIssuer, setCollectionIssuer] = useState("");
    const [volumeTraded, setVolumeTraded] = useState(0);
    const [floorPrice, setFloorPrice] = useState(0);
    const [totalNfts, setTotalNfts] = useState(0);
    const [totalOwners, setTotalOwners] = useState(null);
    const [nftBids, setNftBids] = useState([]);

    function convertHexToStr(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    async function getNftImage(id) {
        // console.log("on the dex api")
        let onTheDex = `https://marketplace-api.onxrp.com/api/metadata/${id}`;
        let imageUrl = `https://marketplace-api.onxrp.com/api/image/${id}`;
        let response = await fetch(onTheDex);
        let data = await response.json();
        let name = data.name;
        setCollectionName(data.collection.name);
        return { image: imageUrl, name: name };
    }

    async function getCollectionData(name) {
        let url = `https://marketplace-api.onxrp.com/api/collections/${name}?include=user&refresh=true`
        let response = await fetch(url);
        let data = await response.json();
        setCollectionIssuer(data.data.issuer_wallet);
        setCollectionBio(data.data.bio);
        setCollectionBanner(data.data.banner_picture_url);
        setCollectionPfp(data.data.picture_url);
        setVolumeTraded(data.data.total_volume);
        setFloorPrice(data.data.floor_price);
        setTotalNfts(data.data.launchpad.total_number_of_nfts_minted);
        setTotalOwners(data.data.owners_count);
    }

    async function getBid(id) {
        let url = `https://marketplace-api.onxrp.com/api/nfts/${id}?include=owner,createdBy,nftAttributes,collection,nftActivities,offers,launchpad`
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data.data.highest_bid_price);
        // return data.data.highest_bid_price;
        let highestPrice = data.data.highest_bid_price;
        let fprice = data.data.fixed_price;
        if (highestPrice === 0) {
            return fprice;
        } else {
            return highestPrice;
        }
    }

    async function getBids(ids) {
        //make requests in parallel
        let promises = ids.map(id => getBid(id));
        let bids = await Promise.all(promises);
        setNftBids(nftBids.concat(bids));
    }

    async function getNftImages(batch) {
        //make requests in parallel
        let promises = batch.map(async (id) => {
            return await getNftImage(id);
        });
        let results = await Promise.all(promises);
        return results;
    }

    async function getNfts(issuerId) {
        let url = API_ISSUER_URL + issuerId;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        data = data[issuerId];
        let counter = 0;
        for (let i in data) {
            counter++;
        }
        setNumberOfNfts(counter);
        setNftData(data);
    }

    async function loadNfts(toDisplay, data) {
        let nftsNumOnPage = nftsOnPage;
        let nftimages = [];
        let nftnames = [];
        let Owners = [];
        let nftids = [];
        let nftbids = [];
        for (let i = nftsNumOnPage; i < nftsNumOnPage + toDisplay; i++) {
            let nftId = data[i].NFTokenID;
            Owners.push(data[i].Owner);
            nftids.push(nftId);
        }
        await getBids(nftids);
        let Images = await getNftImages(nftids);
        for (let j in Images) {
            nftnames.push(Images[j].name);
            nftimages.push(Images[j].image);
        }
        setNftImages(nftImages.concat(nftimages));
        setNftNames(nftNames.concat(nftnames));
        setOwners(owners.concat(Owners));
        setNftIds(nftIds.concat(nftids));
        setNftsOnPage(nftsNumOnPage + toDisplay);
        setIsLoading(false);
    }

    useEffect(() => {
        // getNfts("rNPEjBY4wcHyccfWjDpuAgpxk8S2itLNiH")
        //if type is undefined, then it is the default collection
        if (type === undefined) {
            getNfts("rNPEjBY4wcHyccfWjDpuAgpxk8S2itLNiH");
        }
        else {
            getNfts(type);
        }
    }, []);

    //get collection data if the collectionName is not empty
    useEffect(() => {
        if (collectionName !== "") {
            // getCollectionData(collectionName)
            //convert the name to lowercase
            let name = collectionName.toLowerCase();
            //replace spaces with dashes
            name = name.replace(/\s/g, "-");

            //get the collection data
            getCollectionData(name);
        }
    }, [collectionName]);

    useEffect(() => {
        if (nftData.length > 0) {
            loadNfts(10, nftData);
        }
    }, [nftData]);


    return (
        <div className="content-body">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="collection-info-area">
                            <div className="bg-area mb-3" style={{ backgroundImage: `url(${collectionBanner})` }}>
                                <div className="avatar-area">
                                    <img src={collectionPfp} alt="" className="avatar-img" height={126} />
                                </div>
                            </div>
                            <div className="info-area">
                                <div className="left">
                                    <h2 className="text-white">{collectionName || <Skeleton width={300} />}</h2>
                                    <span>Created by <a className="text-white">{collectionIssuer}</a></span>
                                    <span>{collectionBio || <Skeleton count={3} width={700} />}</span>
                                </div>
                                <div className="right">
                                    <div className="info-box">
                                        <div>
                                            <span>Price Floor</span>
                                            <span className="text-white">{floorPrice || <Skeleton width={50} />} XRP</span>
                                        </div>
                                        <div>
                                            <span>Volume</span>
                                            <span className="text-white">{volumeTraded || <Skeleton width={50} />} XRP</span>
                                        </div>
                                        <div>
                                            <span>Owners</span>
                                            <span className="text-white">{totalOwners || <Skeleton width={50} />}</span>
                                        </div>
                                        <div>
                                            <span>Items</span>
                                            <span className="text-white">{totalNfts || <Skeleton width={50} />}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <form className="nft-form">
                            <input type="text" className="form-control search" placeholder="Search NFT's" />

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
                            {isLoading && <CardSkeleton cards={8}/> }
                            {Array(numberOfNfts).fill().map((_, i) => (
                                nftImages[i] === "" || nftImages[i] === undefined ? null : <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} address={owners[i]} nftId={nftIds[i]} bid={nftBids[i]} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* a button with name `load more` */}
                <div className="row">
                    <div className="col">
                        <div className="load-more">
                            <button className="btn btn-primary" onClick={() => loadNfts(10, nftData)}>Load More</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};