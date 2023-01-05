import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftSearchBar from "../forms/NftSearchBar";
import NftCard from "./../nfts/NftCard"

require("dotenv").config();

export default function EditProfile(props) {

    const [numberOfNfts, setNumberOfNfts] = useState(0);
    const [nftImages, setNftImages] = useState([]);
    const [nftNames, setNftNames] = useState([]);
    const [nftIds, setNftIds] = useState([]);

    return (
        <div className="content-body">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="user-info-area">
                            <div className="bg-area mb-3" style={{}}>
                                <div className="avatar-area">
                                    <img src="./images/placeholder/user-avatar.jpg" alt="" className="avatar-img" height={126} />
                                </div>
                            </div>
                            <div className="info-area">
                                <div className="col-lg-6 px-0 fd-col gap-15">
                                    <div className="mb-3">
                                        <label className="form-label text-white">Display Name</label>
                                        <input type="text" className="form-control" placeholder="Enter your display name" />
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label text-white">Bio</label>
                                        <textarea class="form-control" rows="4" placeholder="Write a short bio about yourself"></textarea>
                                    </div>
                                
                                    <h3 className="mb-3">Social Media Links</h3>
                                    <div className="mb-3">
                                        <label className="form-label text-white">Twitter</label>
                                        <div className="input-group mb-3">
											<span className="input-group-text"><i class="fa-brands fa-twitter"></i></span>
                                            <input type="text" class="form-control" placeholder="Enter your Twitter handle" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-white">Discord</label>
                                        <div className="input-group mb-3">
											<span className="input-group-text"><i class="fa-brands fa-discord"></i></span>
                                            <input type="text" class="form-control" placeholder="Enter your Discord handle" />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label text-white">Telegram</label>
                                        <div className="input-group mb-3">
											<span className="input-group-text"><i class="fa-brands fa-telegram"></i></span>
                                            <input type="text" class="form-control" placeholder="Enter your Telegram username" />
                                        </div>
                                    </div>
                                    <div >
                                        <button className="btn btn-white rounded-4 mb-2 text-center">Save changes</button>
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