import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'


require("dotenv").config();

export default function NftHome() {

    return (
        <div className="content-body">
            <div className="container-fluid">

                <div className="row">

                    <div className="col-xl-8 col-xxl-8 col-lg-8">
                        <div className="card nft-intro-card">
                            <div className="row">

                                <div className="col-md-8 justify-content-center align-self-center">
                                    <div className="card-body">
                                        <h2 className="card-text text-white">Discover, Collect and Trade XLS-20 NFTs</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <a href="#" className="btn btn-white rounded-4 mb-2">
                                            Explore
                                        </a>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <img draggable="false" src="./images/hound-3d.png" alt="NFT 1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-xxl-4 col-lg-4">
                        <div className="card card-gradient">
                            <div className="card-header border-0 pb-0">
                                <h5 className="card-title text-white">Current Balance</h5>
                            </div>
                            <div className="card-body">
                                <h2 className="card-text text-white" id="greyhound-amount">5 NFTs</h2>
                                <p className="card-text">≈ $2,560,000</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row overflow-h">

                <div className="col-xl-12 col-xxl-12 col-lg-12">
								<div className="d-flex  mt-4 ">
									<div>
										<h4 className="text-white fs-28 ">The Standard Collection</h4>
									</div>

								</div>
							</div>
                    <div className="col-xl-12 col-xxl-12 col-lg-12 mt-md-5">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={"auto"}   
                        >
                            <SwiperSlide>
                                <div className="card nft-card mb-3">
                                    <div className="card-media">
                                        <img className="card-img-top img-fluid tlt" src="./images/test/nft.jpg" alt="NFT 1"/>
                                        <button className="wishlist-button heart"><span className="number-like">13</span></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h6 className="fs-18 text-white ml-1">Elite #3512</h6>
                                            <span className="badge badge-pill badge-elite fs-12">333.4</span>
                                        </div>
                                        <div className="meta-info">
                                            <div className="card-author">
                                                <div className="avatar">
                                                    <img src="./images/avatar/default-avatar.jpg" alt="Image"/>
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
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className="card nft-card mb-3">
                                    <div className="card-media">
                                        <img className="card-img-top img-fluid tlt" src="./images/test/nft2.jpg" alt="NFT 1"/>
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
                                                    <img src="./images/avatar/default-avatar.jpg" alt="Image"/>
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
                            </SwiperSlide>
                            <SwiperSlide>NFT 3</SwiperSlide>
                            <SwiperSlide>NFT 4</SwiperSlide>
                            <SwiperSlide>NFT 5</SwiperSlide>
                            <SwiperSlide>NFT 6</SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
};