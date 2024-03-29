//import useState
import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';

const NftCard = (props) => {
    // console.log(props);
    //check if the `card nft-card` is clicked
    const [clicked, setClicked] = useState(false);
    
    //if clicked, show the nft image
    if (clicked) {
        console.log("clicked");
        let url = '/nftDetails?nftid=' + props.nftId;
        //open the url
        window.open(url, '_self')
    }
            

    function handleClick() {
        if (props.clickable === false) {
            return;
        }
        if (clicked) {
            setClicked(false);
        }
        else {
            setClicked(true);
        }
    }
	

    return (
	
	<Tilt className="tilter" perspective={400} glareEnable={true} glareMaxOpacity={0.35} scale={1.04} transitionSpeed={2500} tiltMaxAngleX={7}tiltMaxAngleY={7} gyroscope={true} glarePosition="all" glareColor="lightblue">
        <div className={'card nft-card ' + props.className} onClick={handleClick}>
            <div className="card-media">
                <img className="card-img-top img-fluid tlt" src={props.nft} alt="NFT 1" height={500}/>
                {/* <button className="wishlist-button heart"><span className="number-like">13</span></button> */}
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h3 className="fs-18 text-white">{props.name}</h3>
                    {/* <span className="badge badge-pill badge-elite fs-12">279.1</span> */}
                </div>
                <div className="meta-info">
                    <div className="card-author">
                        <div className="avatar">
                            <img src={props.nft} alt="author" />
                        </div>
                        <div className="info">
                            <span className="fs-13">Owned by</span>
                            <h6> <a className="fs-14 text-white">{props.address}</a> </h6>
                        </div>
                    </div>
                    {props.showPrice === false ? <><></></> :
                        <div className="card-price">
                        <span className="fs-13">Current Price</span>
                        <h5 className="fs-14 text-white">{props.bid || 0} XRP</h5>
                    </div>
                    }
                </div>
            </div>
        </div>
	</Tilt>
    )
}

export default NftCard;