const NftCard = (props) => {
    return (
        <div className={'card nft-card ' + props.className}>
            <div className="card-media">
                <img className="card-img-top img-fluid tlt" src={props.nft} alt="NFT 1" />
                <button className="wishlist-button heart"><span className="number-like">13</span></button>
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h6 className="fs-18 text-white ml-1">{props.name}</h6>
                    <span className="badge badge-pill badge-elite fs-12">279.1</span>
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
                    <div className="card-price">
                        <span className="fs-13">Current Price</span>
                        <h5 className="fs-14 text-white">589 XRP</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftCard;