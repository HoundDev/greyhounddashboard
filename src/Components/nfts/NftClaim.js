import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'


require("dotenv").config();

export default function NftClaim(props) {

    return (
        <div className="content-body">
            <div className="container-fluid nft-home">

                <div className="row justify-content-center">

                    <div className="col-xl-5 col-xxl-5 col-lg-6">
                        <div className="card claim-nft">
                            <div className="card-body">
                                <div className="claim-container text-center">
                                    <h3>Claim your NFT</h3>
                                    <span>You have X NFTs left to claim.</span>
                                    <div className="claim-img">
                                        <img className="mt-5 mb-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2axwwnCdgRheFY6ooHtgiJ0sCfraOhfO5HC2a8bvjw&s" height={250} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-0 pt-0 justify-content-center d-flex">
                              <button className="btn btn-white rounded-4 mb-2 text-center">Claim NFT</button>
                            </div>
                        </div>
                    </div>

                </div>

               
               
    

            </div>
        </div>
    );
};