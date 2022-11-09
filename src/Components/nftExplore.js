import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import NftCard from "./nfts/NftCard";

require("dotenv").config();

export default function nftExplore() {

    return (
        <div className="content-body">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <form class="nft-form">
                            <input type="text" className="form-control search" placeholder="Search NFT's" />
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
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};