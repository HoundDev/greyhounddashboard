import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

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
                                        <span className="d-block fs-14 text-white">Trending</span>
                                    </div>
                                    <i className="fa fa-angle-down scale5 ml-3 text-white" />
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
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card nft-card mb-3">
                                <div className="card-media">
                                    <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1" />
                                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6 className="fs-18 text-white ml-1">Standard #2391</h6>
                                        <span className="badge badge-pill badge-elite fs-12">279.1</span>
                                    </div>
                                    <div className="meta-info">
                                        <div className="card-author">
                                            <div className="avatar">
                                                <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                                            </div>
                                            <div className="info">
                                                <span className="fs-13">Owned by</span>
                                                <h6> <a className="fs-14 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            <span className="fs-13">Current Price</span>
                                            <h5 className="fs-14 text-white">589 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};