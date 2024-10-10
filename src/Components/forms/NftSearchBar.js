import React from "react";
import { Dropdown} from "react-bootstrap";

export default function NftSearchBar(props) {

    return (
        <div className="row">
            <div className="col-lg-12">
                <form className="nft-form">
                    <input type="search" className="form-control search" placeholder="Search NFTs"  />
                    <div className="dropdown">
                        <div className="btn d-flex " data-toggle="dropdown" aria-expanded="false">
                            <div className="text-left">
                                <span className="fs-15 text-white">All Marketplaces</span>
                            </div>
                            <i className="fa fa-angle-down ml-3 text-white" />
                        </div>
                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)' }}>
                            <div className="dropdown-item">
                                <input className="form-check-input" type="checkbox" defaultChecked />
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
                    <Dropdown>
                        <Dropdown.Toggle variant="dropdown-menu dropdown-menu-right" id="dropdown-basic" >
                            Select Mode
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/nftExplore?action=1">Recently Listed</Dropdown.Item>
                            <Dropdown.Item href="/nftExplore?action=2">Price: low to high</Dropdown.Item>
                            <Dropdown.Item href="/nftExplore?action=3">Price: high to low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
            </div>
        </div>
    );
};