import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import NftCard from "./nfts/NftCard";

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
                                <h5 className="card-title text-black">Current Balance</h5>
                            </div>
                            <div className="card-body">
                                <h2 className="card-text text-black" id="greyhound-amount">5 NFTs</h2>
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
                            <SwiperSlide> <NftCard/> </SwiperSlide>
                            <SwiperSlide> <NftCard/> </SwiperSlide>
                            <SwiperSlide> <NftCard/> </SwiperSlide>
                            <SwiperSlide> <NftCard/> </SwiperSlide>
                            <SwiperSlide> <NftCard/> </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
};