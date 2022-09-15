import React from "react";

require("dotenv").config();

export default function nftCard() {

    return (
        <div className="card nft-card mb-3">
            <div className="card-media">
                <img className="card-img-top img-fluid tlt" src="" alt="" />
                <button className="wishlist-button heart"><span className="number-like">13</span></button>
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h6 className="fs-18 text-white ml-1">The Standard #3512</h6>
                    <span className="badge badge-pill badge-elite fs-12">Elite</span>
                </div>
                <div className="meta-info">
                    <div className="card-author">
                        <div className="avatar">
                            <img src="./images/avatar/default-avatar.jpg" alt="Image" />
                        </div>
                        <div className="info">
                            <span className="fs-13">Owned by</span>
                            <h6> <a className="fs-16 text-white">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</a> </h6>
                        </div>
                    </div>
                    <div className="card-price">
                        <span className="fs-13">Current Price</span>
                        <h5 className="fs-18 text-white">589 XRP</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};