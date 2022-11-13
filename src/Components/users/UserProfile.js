import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

require("dotenv").config();

export default function UserProfile() {

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
                                            <p className="text-white">rpZidWw84xGD3dp7F81ajM36NZnJFLpSZW</p>
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
   
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};