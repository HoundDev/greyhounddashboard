import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = () => {
    return (
        <SkeletonTheme baseColor='#272833' highlightColor='#303341'>
            <div className='card nft-card '>
                <div className="card-media">
                    
                    <div className="card-img-top img-fluid tlt">
                    <Skeleton  height='100%'/>
                    </div>
                    <button className="wishlist-button heart"><span className="number-like">13</span></button>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <h6 className="fs-18 text-white ml-1"> <Skeleton width={200} /> </h6>
                        <Skeleton />
                    </div>
                    <div className="meta-info">
                        <div className="card-author">
                            <div className="avatar">
                                <Skeleton width={33} height={33} />
                            </div>
                            <div className="info">
                                <span className="fs-13"><Skeleton  width={50}/></span>
                                <h6> <a className="fs-14 text-white"><Skeleton  width={30} /></a> </h6>
                            </div>
                        </div>
                        <div className="card-price">
                            <span className="fs-13"> <Skeleton /> </span>
                            <h5 className="fs-14 text-white"> </h5>
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}
export default CardSkeleton;