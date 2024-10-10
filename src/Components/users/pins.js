import React from "react";

export default function UserProfile() {

    return (
        <div className="content-body">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="user-info-area">
                            <div className="bg-area mb-3"  style={{ backgroundImage: `url(./images/test/banner.jpg)` }}>
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
                                        <div>
                                            <span>Price Floor</span>
                                            <span className="text-white">0 XRP</span>
                                        </div>
                                        <div>
                                            <span>Volume</span>
                                            <span className="text-white">0 XRP</span>
                                        </div>
                                        <div>
                                            <span>Owners</span>
                                            <span className="text-white">5</span>
                                        </div>
                                        <div>
                                            <span>Items</span>
                                            <span className="text-white">10K</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <form className="nft-form">
                            <input type="text" className="form-control search" placeholder="Search NFT's" />
                            
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
   
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};