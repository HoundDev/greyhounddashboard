import React, { useState, useEffect } from "react";
import NftCard from "./NftCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from "../skeletons/NftCardSkeleton";

export default function NftCollection() {


    // const { search } = useLocation();
    // const match = search.match(/collectionId=(.*)/);
    // const type = match?.[1];

    // const API_ISSUER_URL = "https://api.xrpldata.com/api/v1/xls20-nfts/issuer/"
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftData, setNftData] = useState([]);
    const [collectionBio, setCollectionBio] = useState("");
    const [volumeTraded, setVolumeTraded] = useState(0);
    const [floorPrice, setFloorPrice] = useState(0);
    const [totalNfts, setTotalNfts] = useState(0);
    const [totalOwners, setTotalOwners] = useState(null);
    const [filter, setFilter] = useState("Trending");
    const [nftDataRaw, setNftDataRaw] = useState([]);

    async function handleSearchChange(e) {
        if (e.target.value.length > 7) {
            let q = e.target.value;
            let filtered = nftDataRaw.filter((nft) => {
                return nft.name.toLowerCase().includes(q.toLowerCase());
            });
            setNftData([]);
            setNftData(filtered);
            setNumberOfNfts(filtered.length);
        }
    }            

    async function handleFilterClick(e) {
        setFilter(e.target.innerHTML);
        // console.log(e.target.innerHTML);
        setNftData([]);
        setIsLoading(true);
        setNumberOfNfts(0);
        let q = e.target.innerHTML;
        console.log(q); 
        if (q.toString().includes("low to high")) {
            await getNfts("lowToHigh");
        } else if (q.toString().includes("high to low")) {
            await getNfts("highToLow");
        } else if (q.toString().includes("Recently listed")) {
            await getNfts("recently_listed");
        } else {
            await getNfts("trending");
        }
    }

    function convertHexToStr(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    async function getCollectionData() {
        const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/getcollection';
        const response = await fetch(url);
        const data = await response.json();
        setTotalOwners(data.unique_owners);
        setFloorPrice(data.floor);
        setTotalNfts(data.totalsupply);
        setVolumeTraded(data.volume);
        setCollectionBio(data.about);
    };

    async function getNfts(q) {
        const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/allnfts?type=' + q;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        const filteredData = [];
        data.forEach((nft) => {
            const object = {
                id: nft.token_id,
                name: nft.name,
                owner: nft.owner.wallet_id,
                image: nft.picture_url
            }
            filteredData.push(object);
        })
        setNftData(filteredData);
        setNftDataRaw(filteredData);
        setNumberOfNfts(filteredData.length);
        setIsLoading(false);
    }

    useEffect(() => {
        Promise.all([getCollectionData(), getNfts()]) 
    }, []);


    return (
        <div className="content-body">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="collection-info-area">
                            <div className="bg-area mb-3" style={{ backgroundImage: `url(/images/houndies-banner.jpg)` }}>
                                <div className="avatar-area">
                                    <img src="/images/houndies-profile.png" alt="" className="avatar-img" height={126} />
                                </div>
                            </div>
                            <div className="info-area">
                                <div className="left">
                                    <h2 className="text-white">Houndies</h2>
                                    <span>Created by <a className="text-white">rpZidWw84xGD3dp7F81ajM36NZnJFLpSZW</a></span>
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
                            <input type="text" className="form-control search" placeholder="Search NFT's" onChange={handleSearchChange} />

                            <div className="dropdown d-block">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="d-block fs-15 text-white">{filter}</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <span className="dropdown-item" onClick={handleFilterClick}>Trending</span>
                                    <span className="dropdown-item" onClick={handleFilterClick}>Recently listed</span>
                                    <span className="dropdown-item" onClick={handleFilterClick}>Price: low to high</span>
                                    <span className="dropdown-item" onClick={handleFilterClick}>Price: high to low</span>
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
                                nftData[i].image === "" || nftData[i].image === undefined ? null : <NftCard key={i} nft={nftData[i].image} name={nftData[i].name} address={nftData[i].owner} nftId={nftData[i].id} showPrice={false} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* a button with name `load more` */}
                <div className="row">
                    <div className="col">
                        <div className="load-more">
                            {/* <button className="btn btn-primary" onClick={() => loadNfts(10, nftData)}>Load More</button> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
