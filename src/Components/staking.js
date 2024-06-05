import React, { useState, useEffect } from "react";

export default function NftHome(props) {

	const [numMinted, setNumMinted] = useState(0);
	const [holders, setHolders] = useState(0);
	const [floor, setFloor] = useState(0);
	const [listed, setListed] = useState(0);
	const [mintedPercentage, setMintedPercentage] = useState(0);

	useEffect(() => {
		const getNumMinted = async () => {
			const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/getcollection';
			const response = await fetch(url);
			const data = await response.json();
			setNumMinted(data.totalsupply);
			setHolders(data.unique_owners);
			setFloor(data.floor);
			setListed(data.listedPercentage);
			//calculate minted percentage
			const minted = Math.round((data.totalsupply / 10000) * 100);
			setMintedPercentage(minted);
			console.log('minted: ', minted, '%')
		}
		getNumMinted();
	}, []);
    return (
    
    
    
        <div className="content-body nft-lander">
        	<div className="container-fluid ">
        	
        
   
        
        
        
        
        	
        		<div className="single-nft">
        			<div className="row">
						
        				<div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 mb-5">
        					<div className="nft-container">
        						<h1 className="banner-title fs-32  text-center mt-2 mb-5">Lock Hounds & Earn</h1>
        						
        						
        						<div className="row">
	        						
	        						
	        						<div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
	        							<div className="card logo-bg">
	        								<div className="card-body text-center card-text  align-middle">
	        									
	        										<h2 className=" text-white fs-32">21.1M</h2>
	        										<h2 className="text-white fs-14 mb-2 font-w600">Hound Balance</h2>
	        										<a href="/" className="btn btn-border-white rounded-4 mb-2 mt-2 btn-md font-weight-bold">Quick Swap</a>
	        								</div>
	        							</div>
	        						</div>
	        						<div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
	        							<div className="card logo-bg">
	        								<div className="card-body text-center card-text  align-middle">
	        									
	        										<h2 className=" text-white fs-32">12</h2>
	        										<h2 className="text-white fs-14 mb-2 font-w600">Hounds Locked</h2>
	        										<a href="http://localhost:3000/nftSteps" className="btn btn-border-white rounded-4 mb-2 mt-2 btn-md font-weight-bold">Mint Now</a>
	        								</div>
	        							</div>
	        						</div>
	        						
	        						<div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
	        							<div className="card logo-bg">
	        								<div className="card-body text-center card-text  align-middle">
	        									
	        										<h2 className=" text-white fs-32">9000</h2>
	        										<h2 className="text-white fs-14 mb-2 font-w600">Unclaimed Rewards</h2>
	        										<a href="/nftSteps" className="btn btn-primary rounded-4 mb-2 mt-2 btn-md font-weight-bold">Claim Now</a>
	        								</div>
	        							</div>
	        						</div>
        						</div>
        						
        						
                            
                            
                            
                                
                            
                            	<div className="card stakingTabs mt-3 mt-sm-0 ">
									<ul className="nav nav-tabs" role="tablist">
										<li className="nav-item">
											<a className="nav-link active" data-toggle="tab" href="#wallet" role="tab" aria-selected="true">
												Wallet 
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" data-toggle="tab" href="#locked" role="tab" aria-selected="false">
												Locked
											</a>
										</li>
									</ul>
								</div>
								
								<div className="p-0 tab-content">
									<div className="tab-pane active" id="wallet">
										
										
										
										
										{/*start of wallet*/}
										<div className="card flex justify-between mb-2 stakeNft">
			                            	<div className="flex ">
							      				<div className="py-3 px-4 items-center flex bg-darker nftStart">
										      		<div className="toggle-pill-dark">
												        <input type="checkbox" id="pill1" name="check"/>
												        <label for="pill1" className="mb-0"></label>
												    </div>
							      				</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="images/9790.png" className="mr-3"/>
								      					<span className="text-white font-weight-bold">Standard <span className="fs-12 font-weight-normal font-primary">#1234</span></span>
								      				</span>
								      			</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="/images/svg/logo-icon.svg" className="logoIcon inline mr-2"/>
								      					<span className="text-white font-weight-bold">2000 $HOUND <span className="fs-12 font-weight-normal font-primary">/per week</span></span>
								      				</span>
								      			</div>
								      			
								      			
								      			<div className="items-center py-3 px-2 flex bg-darker text-white font-weight-bold nftEnd">
								      				<span className="flex mx-auto">
								      					Unlocked
													</span>
												</div>
							      			</div>
			                            </div>
			                            <div className="row align-items-center  text-center mt-4">
			    							<div className="col-auto mx-auto">
				  								<p className="mb-2 fs-14">0 NFT(s) Selected</p>
				  								<a href="#" className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2 items-center px-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="lockIcon"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></a>
				  								
				  								<a href="#" className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2">Select All</a>
				  								
			  								</div>
			  							</div>
										
										{/*End of wallet*/}
										
										
										
										
										
									</div>
									<div className="tab-pane" id="locked">
										
										
										
										{/*start off locked*/}	
										<div className="card flex justify-between mb-2 stakeNft">
			                            	<div className="flex ">
							      				<div className="py-3 px-4 items-center flex bg-darker nftStart">
										      		<div className="toggle-pill-dark">
												        <input type="checkbox" id="pill1" name="check"/>
												        <label for="pill1" className="mb-0"></label>
												    </div>
							      				</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="images/9790.png" className="mr-3"/>
								      					<span className="text-white font-weight-bold">Standard <span className="fs-12 font-weight-normal font-primary">#1234</span></span>
								      				</span>
								      			</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="/images/svg/logo-icon.svg" className="logoIcon inline mr-2"/>
								      					<span className="text-white font-weight-bold">2000 $HOUND <span className="fs-12 font-weight-normal font-primary">/per week</span></span>
								      				</span>
								      			</div>
								      			
								      			
								      			<div className="items-center py-3 px-2 flex bg-primary text-white font-weight-bold nftEnd">
								      				<span className="flex mx-auto">
								      					<svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className="logoIcon mr-1">
				  											<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg> 7 days
													</span>
												</div>
							      			</div>
			                            </div>
			                            <div className="card flex justify-between mb-2 stakeNft">
			                            	<div className="flex ">
							      				<div className="py-3 px-4 items-center flex bg-darker nftStart">
										      		<div className="toggle-pill-dark">
												        <input type="checkbox" id="pill1" name="check"/>
												        <label for="pill1" className="mb-0"></label>
												    </div>
							      				</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="images/9790.png" className="mr-3"/>
								      					<span className="text-white font-weight-bold">Elite <span className="fs-12 font-weight-normal font-primary">#1234</span></span>
								      				</span>
								      			</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="/images/svg/logo-icon.svg" className="logoIcon inline mr-2"/>
								      					<span className="text-white font-weight-bold">5000 $HOUND <span className="fs-12 font-weight-normal font-primary">/per week</span></span>
								      				</span>
								      			</div>
								      			
								      			
								      			<div className="items-center py-3 px-2 flex bg-primary text-white font-weight-bold nftEnd">
								      				<span className="flex mx-auto">
								      					<svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className="logoIcon mr-1">
				  											<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg> 7 days
													</span>
												</div>
							      			</div>
			                            </div>
			                            <div className="card flex justify-between mb-2 stakeNft">
			                            	<div className="flex ">
							      				<div className="py-3 px-4 items-center flex bg-darker nftStart">
										      		<div className="toggle-pill-dark">
												        <input type="checkbox" id="pill1" name="check"/>
												        <label for="pill1" className="mb-0"></label>
												    </div>
							      				</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="images/9790.png" className="mr-3"/>
								      					<span className="text-white font-weight-bold">Legendary <span className="fs-12 font-weight-normal font-primary">#1234</span></span>
								      				</span>
								      			</div>
								      			<div className="items-center py-3 px-4 flex nftMiddle">
								      				<span className="flex items-center ">
								      					<img src="/images/svg/logo-icon.svg" className="logoIcon inline mr-2"/>
								      					<span className="text-white font-weight-bold">2000 $HOUND <span className="fs-12 font-weight-normal font-primary">/per week</span></span>
								      				</span>
								      			</div>
								      			
								      			
								      			<div className="items-center py-3 px-2 flex bg-primary text-white font-weight-bold nftEnd">
								      				<span className="flex mx-auto">
								      					<svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className="logoIcon mr-1">
				  											<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg> 7 days
													</span>
												</div>
							      			</div>
			                            </div>
			                            <div className="row align-items-center  text-center mt-4">
			    							<div className="col-auto mx-auto">
				  								<p className="mb-2 fs-14">2 NFT(s) Selected</p>
				  								<a href="#" className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2 items-center px-3">
				  								
				  								<svg xmlns="http://www.w3.org/2000/svg" className="lockIcon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"></path></svg>
				  								</a>
				  								
				  								<a href="#" className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2">Select All</a>
				  								
			  								</div>
			  							</div>
			  							{/*end off locked*/}
										
										
										
										
										
										
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