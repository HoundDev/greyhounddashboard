import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NftCard from "./nfts/NftCard";
import CardSkeleton from "./skeletons/NftCardSkeleton";

export default function NftExplore(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [owners, setOwners] = useState([]);
    const [tokIds, setTokIds] = useState([]);
    const [Bids, setBids] = useState([]);
    const [nftsOnPageData, setNftsOnPageData] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);

    const { search } = useLocation();
    const match = search.match(/action=(.*)/);
    let type = match?.[1];
    //if type is undefined, set it to "1"
    if (type === undefined) {
        type = "1";
    }



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
    async function getTrendingNfts(page) {
        console.log("getting trending nfts");
        let URL = `https://marketplace-api.onxrp.com/api/nfts?page=${page}&per_page=12&sort=recently_listed&order=desc&filters[marketplace_status]=active&include=collection,owner&refresh=true`;
        let response = await fetch(URL);
        let data = await response.json();
        let nfts = data.data;
        // console.log(nfts);
        let nftimages = [];
        let nfnames = [];
        let owns = [];
        let bids = [];
        let tokids = [];
        let dataDictList = [];
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
            // console.log(nft.token_id)
            owns.push(nft.owner.wallet_id);
            bids.push(nft.bids_count);
            dataDictList.push({
                image: nftImage,
                name: nftName,
                owner: nft.owner.wallet_id,
                tokenid: nft.token_id,
                bid: nft.fixed_price
            });
            // owns.push(nft.owner);
        }
        console.log('Done getting trending nfts');
        setNftImages(nftImages.concat(nftimages));
        setNftNames(nftNames.concat(nfnames));
        setOwners(owners.concat(owns));
        setTokIds(tokIds.concat(tokids));
        setNumberOfNfts(numberOfNfts + nfts.length);
        setBids(Bids.concat(bids));
        setIsLoading(false);
        setNftsOnPageData(nftsOnPageData.concat(dataDictList));
    }

    async function getlowToHighNfts(page) {
        console.log("getting low to high nfts");
        let URL = `https://marketplace-api.onxrp.com/api/nfts?page=${page}&per_page=12&sort=fixed_price&order=asc&filters[marketplace_status]=active&include=collection,owner&refresh=true`
        let response = await fetch(URL);
        let data = await response.json();
        let nfts = data.data;
        // console.log(nfts);
        let nftimages = [];
        let nfnames = [];
        let owns = [];
        let tokids = [];
        let bids = [];
        let dataDictList = [];
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
            // console.log(nft.token_id)
            owns.push(nft.owner.wallet_id);
            bids.push(nft.fixed_price);
            dataDictList.push({
                image: nftImage,
                name: nftName,
                owner: nft.owner.wallet_id,
                tokenid: nft.token_id,
                bid: nft.fixed_price
            });
        }
        console.log('Done getting low to high nfts');
        setNftImages(nftImages.concat(nftimages));
        setNftNames(nftNames.concat(nfnames));
        setOwners(owners.concat(owns));
        setTokIds(tokIds.concat(tokids));
        setNumberOfNfts(numberOfNfts + nfts.length);
        setIsLoading(false);
        setBids(Bids.concat(bids));
        setNftsOnPageData(nftsOnPageData.concat(dataDictList));
        // console.log(nftsOnPageData);
        // console.log(dataDictList)
    }

    async function gethighToLowNfts(page) {
        console.log("getting high to low nfts");
        let URL = `https://marketplace-api.onxrp.com/api/nfts?page=${page}&per_page=12&sort=fixed_price&order=desc&filters[marketplace_status]=active&include=collection,owner&refresh=true`
        let response = await fetch(URL);
        let data = await response.json();
        let nfts = data.data;
        let nftimages = [];
        let nfnames = [];
        let owns = [];
        let tokids = [];
        let bids = [];
        let dataDictList = [];
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
            // console.log(nft.token_id)
            owns.push(nft.owner.wallet_id);
            bids.push(nft.fixed_price);
            dataDictList.push({
                image: nftImage,
                name: nftName,
                owner: nft.owner.wallet_id,
                tokenid: nft.token_id,
                bid: nft.fixed_price
            });
            // owns.push(nft.owner);
        }
        console.log('Done getting high to low nfts');
        setNftImages(nftImages.concat(nftimages));
        setNftNames(nftNames.concat(nfnames));
        setOwners(owners.concat(owns));
        setTokIds(tokIds.concat(tokids));
        setNumberOfNfts(numberOfNfts + nfts.length);
        setIsLoading(false);
        setBids(Bids.concat(bids));
        setNftsOnPageData(nftsOnPageData.concat(dataDictList));
    }

    async function handleFilter() {
        console.log('filtering');
        console.log(query)
        let nftsFiltered = [];
        let filteredNfts = nftsOnPageData.filter(nft => {
            if (query === '') {
                return nft;
            } else if (nft.name.toLowerCase().includes(query.toLowerCase())) {
                nftsFiltered.push(nft);
                return nft;
            }
        })
        console.log(nftsFiltered.length);
        if (nftsFiltered.length != 0) {
            console.log(nftsFiltered.length)
            console.log(nftsFiltered);
            console.log('setting nfts on page data');
            setIsFiltering(true);
            setFiltered(nftsFiltered);
        }
    }

    //listen to sortType
    useEffect(() => {
        if (type == 1) {
            setNftImages([]);
            setNftNames([]);
            setOwners([]);
            setTokIds([]);
            setNumberOfNfts(0);
            setCurPage(1)
            setNftsOnPageData([]);
            getTrendingNfts(curPage);
        } else if (type == 2) {
            setNftImages([]);
            setNftNames([]);
            setOwners([]);
            setTokIds([]);
            setNumberOfNfts(0);
            setCurPage(1)
            setNftsOnPageData([]);
            getlowToHighNfts(curPage);
        } else if (type == 3) {
            setNftImages([]);
            setNftNames([]);
            setOwners([]);
            setTokIds([]);
            setNumberOfNfts(0);
            setCurPage(1)
            setNftsOnPageData([]);
            gethighToLowNfts(curPage);
        }
    }, [type])


    useEffect(() => {
        console.log(nftsOnPageData);
    }, [nftsOnPageData])

    return (
        <div className="content-body">
            <div className="container-fluid nft-explore">

                <div className="row">
                    <div className="col-lg-12">
                       
                        <form className="nft-form">
                    
                            <input type="search" className="form-control search" placeholder="Search NFTs" onChange={event => setQuery(event.target.value)} /> 
                       
                            <div className="dropdown">
                                <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="fs-15 text-white">All Marketplaces</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <div className="dropdown-item">
                                        <input className="form-check-input" type="checkbox" defaultChecked />
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
                            {/* <div className="dropdown"> */}
                            {/* <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                                    <div className="text-left">
                                        <span className="fs-15 text-white">Recently listed</span>
                                    </div>
                                    <i className="fa fa-angle-down ml-3 text-white" />
                                </div> */}
                            {/* <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                                    <a className="dropdown-item" href="">Trending</a>
                                    <a className="dropdown-item" href="">Price: low to high</a>
                                    <a className="dropdown-item" href="">Price: high to low</a>
                                </div> */}
                            {/* use dropdown */}
                            <Dropdown>
                                <Dropdown.Toggle variant="dropdown-menu dropdown-menu-right" id="dropdown-basic" >
                                    Select Mode
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/nftExplore?action=1">Recently Listed</Dropdown.Item>
                                    <Dropdown.Item href="/nftExplore?action=2">Price: low to high</Dropdown.Item>
                                    <Dropdown.Item href="/nftExplore?action=3">Price: high to low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* </div> */}
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="explore-container" id="explore-container-main">
                            {isLoading && <CardSkeleton cards={12} />}
                            {!isFiltering && nftsOnPageData.map((nft, i) => (
                                <NftCard key={i} nft={nft.image} name={nft.name} owner={nft.owner} nftId={nft.tokenid} bid={nft.bid} />
                            ))}
                            {isFiltering && filtered.map((nft, i) => (
                                <NftCard key={i} nft={nft.image} name={nft.name} owner={nft.owner} nftId={nft.tokenid} bid={nft.bid} />
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
                                // getTrendingNfts(curPage + 1);
                                if (type == 1) {
                                    getTrendingNfts(curPage + 1);
                                }
                                else if (type == 2) {
                                    getlowToHighNfts(curPage + 1);
                                }
                                else if (type == 3) {
                                    gethighToLowNfts(curPage + 1);
                                }
                            }}>Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};