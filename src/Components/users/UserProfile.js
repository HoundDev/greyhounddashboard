import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftSearchBar from "../forms/NftSearchBar";
import NftCard from "./../nfts/NftCard"

require("dotenv").config();

export default function UserProfile(props) {

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);
    const [nftIds, setNftIds] = useState([]);
    const [pins, setPins] = useState([]);

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
            let keys2 = []
            let pins = [];
	        for (let i = 0; i < keys.length; i++) {
                let taxon = data[keys[i]].taxon;
                if (taxon === 2) {
                    pins.push({"name": data[keys[i]].name, "image": data[keys[i]].image, "nftid": keys[i]});
                    console.log(`Pin Detected: ${data[keys[i]].name}`)
                }
                let name = data[keys[i]].name;
                if (name === undefined) {
                    continue;
                }
                console.log(name);
                name = name.split(" ")[0];
                if (name !== "Houndies") {
                    continue;
                }
	            names.push(data[keys[i]].name);
	            images.push(data[keys[i]].image);
                keys2.push(keys[i]);
	        }
	        setNumberOfNfts(names.length);
	        setNftImages(images);
	        setNftNames(names);
            setNftIds(keys2);
            setPins(pins);
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
                            <div className="bg-area bg-area-nft mb-3"  style={{  }}>
                                <div className="avatar-area">
                                     <img src="./images/houndies-profile.png" alt="" className="avatar-img" height={126}/>
                                </div>
                                { /*<div className="socials-area">
                                    <span><i class="fa-brands fa-twitter"></i></span> 
                                    <span><i class="fa-brands fa-discord"></i></span> 
                                    <span><i class="fa-brands fa-telegram"></i></span> 
                                </div>*/}
                            </div>
                            <div className="info-area">
                                <div className="left">
                                    <div className="d-flex gap-15 align-items-center">
                                        <h2 className="text-white mb-0">Hound</h2>
                                        { /*<button className="btn btn-blur rounded-4 fs-13 text-center">Edit Profile</button> */}
                                    </div>
                                    
                                    <div className="d-flex gap-15">
                                        <div className="w-address d-flex">
                                             <img src="./images/tokens/xrp.svg" height="15px"/>
                                            <p className="text-white">{props.xrpAddress}</p>
                                        </div>
                                        <span>Joined November 2022</span>
                                    </div>
                                    { /*<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>*/}
                                </div>
                                <div className="right">
                                    <div className="info-box">
                                    <h5>Badges Collection</h5>
                                    <div id="pins">
                                        {Array(pins.length).fill().map((_, i) => (
                                            <li className="nav-item dropdown medal">
                                                <a className="nav-link"
                                                   href={process.env.REACT_APP_URL + "nftDetails?nftid=" + pins[i].nftid}
                                                   data-toggle="modal">
                                                    <img src={pins[i].image} title={pins[i].name}
                                                        draggable="false" alt="pin"
                                                        />
                                                </a>
                                            </li>
                                        ))}

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <NftSearchBar /> */}

                <div className="row">
                    <div className="col">
                        <div className="explore-container">
                        {/* <NftCard name={'test'} />
                        <NftCard name={'test2'} /> */}
                            {Array(numberOfNfts).fill().map((_, i) => (
                                nftImages[i] === "" || nftImages[i] === undefined ? null : <NftCard key={i} nft={nftImages[i]} name={nftNames[i]} address={props.xrpAddress} nftId={nftIds[i]} showPrice={false} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};