import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftCard from "./../nfts/NftCard"


require("dotenv").config();

export default function UserProfile(props) {

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

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="user-info-area">
                            <div className="bg-area mb-3"  style={{  }}>
                                <div className="avatar-area">
                                     <img src="./images/placeholder/user-avatar.jpg" alt="" className="avatar-img" />
                                </div>
                            </div>
                            <div className="info-area">
                                <div className="left">
                                    <h2 className="text-white">Nickname</h2>
                                    <div className="d-flex gap-15">
                                        <div className="w-address d-flex">
                                             <img src="./images/tokens/xrp.svg" height="15px"/>
                                            <p className="text-white">{props.xrpAddress}</p>
                                        </div>
                                        <span>Joined November 2022</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="info-box">
                                    <h5>Pin Collection</h5>
                                    <div id="pins">
                                        <li className="nav-item dropdown medal">
                                            <a className="nav-link" href="#" data-toggle="modal">
                                                <img src="./images/badges/airdropnft.png" title="Spring Rescue 2022"
                                                    draggable="false" />
                                                <i className="fa-solid fa-lock medal-lock"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown medal">
                                            <a className="nav-link" href="#" data-toggle="modal">
                                                <img src="./images/badges/airdropnft.png" title="Spring Rescue 2022"
                                                    draggable="false" />
                                                <i className="fa-solid fa-lock medal-lock"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown medal">
                                            <a className="nav-link" href="#" data-toggle="modal">
                                                <img src="./images/badges/airdropnft.png" title="Spring Rescue 2022"
                                                    draggable="false" />
                                                <i className="fa-solid fa-lock medal-lock"></i>
                                            </a>
                                        </li>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="explore-container">
                        {/* <NftCard name={'test'} />
                        <NftCard name={'test2'} /> */}
                            {Array(numberOfNfts).fill().map((_, i) => (
                                // <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} address={props.xrpAddress} />
                                //skip if the nft image is empty
                                nftImages[i] === "" || nftImages[i] === undefined ? null : <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} address={props.xrpAddress} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};