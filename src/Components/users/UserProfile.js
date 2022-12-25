import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftCard from "./../nfts/NftCard"

require("dotenv").config();

export default function UserProfile(props) {

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);

    async function getNfts() {
        try {
	        let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/getnfts', {
	            method: 'POST',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({"xrpAddress": props.xrpAddress})
	            });
	        let data = await response.json();
	        console.log(data);
	        let names = [];
	        let images = [];
	        let keys = Object.keys(data);
	        for (let i = 0; i < keys.length; i++) {
	            names.push(data[keys[i]].name);
	            images.push(data[keys[i]].image);
	        }
	        setNumberOfNfts(keys.length);
	        setNftImages(images);
	        setNftNames(names);
        } catch (error) {
            console.log(error);
        }
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