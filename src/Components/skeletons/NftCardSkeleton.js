import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = ({ cards }) => {
    return (
        Array(cards)
            .fill(0)
            .map((_, i) => 
                <SkeletonTheme baseColor='#272833' highlightColor='#303341'>
                    <div className='card nft-card '>
                        <div className="card-media">

                            <div className="card-img-top img-fluid tlt">
                                <Skeleton height='100%' />
                            </div>

                        </div>
                        <div className="card-body">
                            <div className="card-title">
                                <h3 className="fs-18 text-white"> <Skeleton width={200} height={20} /> </h3>
                                <Skeleton width={50} height={20} />
                            </div>
                            <div className="meta-info">
                                <div className="card-author">
                                    <div className="avatar">
                                        <Skeleton width={33} height={33} />
                                    </div>
                                    <div className="info">
                                        <span className="fs-13"><Skeleton width={60} /></span>
                                        <h6> <a className="fs-14 text-white"><Skeleton width={40} /></a> </h6>
                                    </div>
                                </div>
                                <div className="card-price">
                                    <span className="fs-13"> <Skeleton width={60} /> </span>
                                    <h5 className="fs-14 text-white"> <Skeleton width={40} /></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </SkeletonTheme>
            ));
};
export default CardSkeleton;