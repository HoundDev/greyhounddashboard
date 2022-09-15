import React from "react";

require("dotenv").config();

export default function nftDetails() {

    return (
        <div className="content-body">
            <div className="container-fluid">

                <div className="page-titles">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="">NFTs</a></li>
                        <li className="breadcrumb-item"><a href="">The Standard Collection</a></li>
                        <li className="breadcrumb-item active"><a href="">The Standard #3512</a></li>
                    </ol>
                </div>

                <div className="single-nft">

                    <div className="row">

                        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12">
                            <div className="nft-container">
                                <img className="img-fluid mb-5" src="./images/test/nft.jpg" />
                                <div className="mb-5">
                                    <h3 class="mb-3">Owned by</h3>
                                    <div class="owner-nft">
                                        <div class="owner-avatar">
                                            <a href="#">
                                                <img src="/images/avatar/default-avatar.jpg" alt="Profile Image"/>
                                            </a>
                                            <div class="profile-verification verified">
                                                <i class="fas fa-check"></i>
                                            </div>
                                        </div>
                                        <div class="owner-info">
                                            <span class="username">RandomUser123</span>
                                            <h6 class="address">rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H</h6>
                                        </div>
                                    </div>
                                </div>
                                <h3 class="mb-3">Attributes</h3>
                                <div className="box properties mb-3">
                                    <div className="properties-wrapper">
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                        <div class="single-prop"><span>Dragon </span><p>Gold</p><span class="rarity">85% have this trait</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 ml-auto ">
                            <div className="nft-info">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="./images/avatar/standard-collection.gif" alt="" className="avatar-img" />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-0 text-white">The Standard Collection</h5>
                                    </div>
                                </div>
                                <div class="nft-name">
                                    <h2 className="mb-3 text-white">Elite #3512 </h2>
                                </div>
                                <p className="mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, unde.
                                    Unde, doloremque ipsam? Nesciunt dolorem nisi quae nostrum veniam quasi illum,
                                    iusto tempore nihil, natus perspiciatis? Sed</p>
                            </div>

                            <div class="nft-price-wrapper">
                                <div>
                                    <div className="box-info">
                                        <p className="fs-14 mb-0">Price</p>
                                        <div className="nft-item-price"><span>589 XRP</span>≈ 500,000,000 HOUND</div>
                                    </div>
                                    <div className="box-info">
                                        <p className="fs-14 mb-0">Rarity Score</p>
                                        <div className="nft-item-price"><span>273</span>Elite</div>
                                    </div>
                                    </div>
                                    <div className="buy-nft">
                                        <button class="btn buy">Mint for 589 XRP</button>
                                        <button class="btn save-nft"><i class="fa-solid fa-heart"></i></button>
                                    </div>
                                
                            </div>

                       
                        </div>

                    </div>
                </div>



            </div>
        </div>
    );
};