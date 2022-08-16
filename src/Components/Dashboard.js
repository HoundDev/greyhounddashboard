import LoadingOverlay from 'react-loading-overlay-ts';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container  } from "react-bootstrap";
import { Link } from "react-router-dom";

import TransactionsSent from './TransactionsSent'
import TransactionsReceived from './TransactionsReceived'
import GreyVolume from "./greyhoundVolume";
import GreySupply from "./greyhoundSupply";
import ActivityLine from "./ActivityLine";
import ActivityLine3 from "./ActivityLine3";
import Tilt from 'react-vanilla-tilt';




require("dotenv").config();
const xrpl = require("xrpl");


function Dashboard(props) {
    const [isActive, setActive] = useState(true)
    const [greyHoundBalance, setGreyHoundBalance] = useState(0)
    const [greyHoundSupply, setGreyHoundSupply] = useState(1000000000000)
    const [greyHoundAmountBurnt, setGreyHoundAmountBurnt] = useState(0)
    const [lastTransactionsSent, setLastTransactionsSent] = useState([])
    const [lastTransactionsReceived, setLastTransactionsReceived] = useState([])
    const [snapShotTier, setSnapShotTier] = useState('None')
    const [snapShotTierBalance, setSnapShotTierBalance] = useState(0)
	const [basicModal, setBasicModal] = useState(false);
	const [ogModal, setOgModal] = useState(false);

    const getMainData = async (requestContent) => {
        try {
          let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/mainData', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"xrpAddress" : requestContent})
          });
          let json = await response.json()
          return { success: true, data: json };
        } catch (error) {
          return { success: false };
        }
      }

    const handleButtonClicked = useCallback(() => {
        setActive(value => !value)
      }, [])

      useEffect(async () => {
        let mainData = await getMainData(props.xrpAddress)
        setActive(false)
        ParseDataUpdateState(mainData)
    }, []);


    function SendTierToParent(tier)
    {
      props.updateTier(tier);
    }

    function convertRippleEpochToDate(epoch)
    {
        var d = new Date(0);
        d.setUTCSeconds(epoch + 946684800);
        return getFormattedDate(d);
    }

    function getFormattedDate(date) {
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return month + '/' + day + '/' + year;
    }


    function ParseDataUpdateState(mainData)
    {
        try{

          setSnapShotTier(mainData.data.UserTier.tier);
          SendTierToParent(mainData.data.UserTier.tier)

            //Get Greyhound Balance
            for(let i = 0; i < mainData.data.Account_Lines.length; i++)
            {
                if(mainData.data.Account_Lines[i].currency === '47726579686F756E640000000000000000000000')
                {
                    setGreyHoundBalance(Math.round(parseFloat(mainData.data.Account_Lines[i].balance)));
                }
            }

            //Set Greyhound Supply
            if(mainData.data.GreyHoundAmount[0].sum !== null)
            {
                setGreyHoundSupply(Math.round(mainData.data.GreyHoundAmount[0].sum));
                setGreyHoundAmountBurnt(parseFloat(( 1 - parseFloat(mainData.data.GreyHoundAmount[0].sum) / 1000000000000) * 100).toFixed(2))
            }

            //Set Transactions
            let receivedTxns = []
            let sentTxns = []
            for(let i = 0; i < mainData.data.Transactions.length; i++)
            {
                if(mainData.data.Transactions[i].tx.TransactionType === 'Payment')
                {
                    if(mainData.data.Transactions[i].tx.Destination === props.xrpAddress)
                    {
                        //Received
                        if(typeof mainData.data.Transactions[i].tx.Amount === 'object'){
                            //token currency
                            if(mainData.data.Transactions[i].tx.Amount.currency.length === 3)
                            {
                                //standard currency
                                receivedTxns.push({currency: mainData.data.Transactions[i].tx.Amount.currency, amount: mainData.data.Transactions[i].tx.Amount.value, date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Account, hash: mainData.data.Transactions[i].tx.hash})
                            } else {
                                receivedTxns.push({currency: xrpl.convertHexToString(mainData.data.Transactions[i].tx.Amount.currency), amount: mainData.data.Transactions[i].tx.Amount.value, date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Account, hash: mainData.data.Transactions[i].tx.hash})
                                //non-standard currency
                            }

                        } else {
                            receivedTxns.push({currency: 'XRP', amount: Math.round(parseFloat(mainData.data.Transactions[i].tx.Amount) / 1000000), date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Account, hash: mainData.data.Transactions[i].tx.hash})
                            //standard XRP
                        }
                    } else {
                        //Sent
                        if(typeof mainData.data.Transactions[i].tx.Amount === 'object'){
                            //token currency
                            if(mainData.data.Transactions[i].tx.Amount.currency.length === 3)
                            {
                                //standard currency
                                sentTxns.push({currency: mainData.data.Transactions[i].tx.Amount.currency, amount: mainData.data.Transactions[i].tx.Amount.value, date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Destination, hash: mainData.data.Transactions[i].tx.hash})
                            } else {
                                //non-standard currency
                                sentTxns.push({currency: xrpl.convertHexToString(mainData.data.Transactions[i].tx.Amount.currency), amount: mainData.data.Transactions[i].tx.Amount.value, date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Destination, hash: mainData.data.Transactions[i].tx.hash})
                            }

                        } else {
                            //standard XRP
                            sentTxns.push({currency: 'XRP', amount: Math.round(parseFloat(mainData.data.Transactions[i].tx.Amount) / 1000000), date: convertRippleEpochToDate(mainData.data.Transactions[i].tx.date), account: mainData.data.Transactions[i].tx.Destination, hash: mainData.data.Transactions[i].tx.hash})
                        }
                    }
                }
            }

            console.log(sentTxns,receivedTxns)
            setLastTransactionsSent(sentTxns);
            setLastTransactionsReceived(receivedTxns);

        } catch(err)
        {
            
        }
    }


    return (
        <LoadingOverlay
        active={isActive}
        styles={{
            content: {
              width: '100%',
              height: '100%',
              marginTop:'400px',
              verticalAlign:'top',
            }
          }}
        spinner
        text='Loading...'
      >
        <div className="content-body">
        <div className="container-fluid">
		
		
		
		
		
		<div className="row">
               <div className="col-xl-3 col-xxl-3 col-lg-3">
			   		<div className="card overflow-hidden">
			   			 <div className="card-header border-0 pb-0">
			   			 	<h5 className="card-title text-white">Balance</h5>
							<div className="card-header-right">
								<a className="fs-16 font-w500 text-success " href="#"><i className="fi fi-rr-arrow-small-up"></i> 2.36%</a>
							</div>
			   			 </div>
			   			 <div className="card-body">
			   			 	<div className="balance-info pb-4">
								<a className="price-toggle"><i className="fi fi-rr-exchange text-white"></i></a>
								<div>
								<h2 className="card-text text-white fs-20 greyhound-price"style={{fontWeight: 700}} id="greyhound-amount">{greyHoundBalance} HOUND</h2>
									<span>≈ </span><h2 className="card-text fs-14 dollar-price"> 7,342.00 USD</h2><br/>
									<a href={'https://bithomp.com/explorer/' + props.xrpAddress} target="_blank" className="btn btn-primary rounded-4 mb-2 btn-xs">View More</a>
								</div>
								
									
							</div>
							
							
							<div className="event-goal d-flex flex-wrap align-items-center mt-4">
								<div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
									<a href="#" className="text-white mb-1 fs-16">NFT Airdrop</a>
									<span>You have <a>1 Legendary unclaimed NFT</a></span>
								</div>
							</div>
							<div className="event-goal d-flex flex-wrap align-items-center mt-4">
								<div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
									<a href="#" className="text-white mb-1 fs-16">NFT Airdrop</a>
									<span>You have <a>1 Original Greyhound unclaimed NFT</a></span>
								</div>
							</div>
			   			 </div>
			   			 
			   			 
			   			 
			   			 
			   			 
			   			 <div className="card-footer border-0 pt-0">
							<h5 className="card-title text-white">Pin Collection</h5>
							<div id="pins">
								<li className="nav-item dropdown medal">
									<a className="nav-link" href="#" data-toggle="modal">
										<img src="./images/badges/airdropnft.png" title="Spring Rescue 2022"
											draggable="false"/>
										<i className="fa-solid fa-lock medal-lock"></i>
									</a>
								</li>
								<li className="nav-item dropdown medal">
									<a className="nav-link" onClick={() => setBasicModal(true)}>
										<img src="./images/badges/airdropnft.png" title="Rosie NFT Snapshot 2022"
											draggable="false"/>
									</a>
								</li>
								<li className="nav-item dropdown medal">
									<a className="nav-link" onClick={() => setOgModal(true)}>
										<img src="./images/badges/og.png" title="Greyhound OG Member"
											draggable="false"/>
									</a>
								</li>
							</div>
						</div>
						
						
						
						
						
						
						
						
						
                        <Modal className="fade" id="badge-nft-airdrop" show={basicModal} size="lg">
						   <div className="modal-content modal-badge">
                           <Modal.Header>
						   		2022 NFT Snapshot Medal
                              <Button
                                 variant=""
                                 className="close"
                                 onClick={() => setBasicModal(false)}
                              >
                                 <span>&times;</span>
                              </Button>
                           </Modal.Header>
                           <Modal.Body>
						   		<svg className="badge-bg" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
									<circle cx="30" cy="30" r="18" />
								</svg>
								<Tilt className="tlt" options={{ scale: 1, max: 35, perspective: 1000 }} style={{}}>
									<img className="layer0" draggable="false" src="./images/badges/airdropnft_layer0.png"/>
									<img className="layer1" draggable="false" src="./images/badges/airdropnft_layer1.png"/>
								</Tilt>
								<p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. </p>
						   </Modal.Body>
						   </div>
                        </Modal>
						
						<Modal className="fade" id="badge-greyhound-og" show={ogModal} size="lg">
						   <div className="modal-content modal-badge">
                           <Modal.Header>
						   		2022 OG Snapshot Medal
                              <Button
                                 variant=""
                                 className="close"
                                 onClick={() => setOgModal(false)}
                              >
                                 <span>&times;</span>
                              </Button>
                           </Modal.Header>
                           <Modal.Body>
						   		<svg className="badge-bg" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
									<circle cx="30" cy="30" r="18" />
								</svg>
								<Tilt className="tlt" options={{ scale: 1, max: 35, perspective: 1000 }} style={{}}>
									<img className="layer0" draggable="false" src="./images/badges/og_layer0.png"/>
									<img className="layer1" draggable="false" src="./images/badges/og_layer1.png"/>
								</Tilt>
								<p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. </p>
						   </Modal.Body>
						   </div>
                        </Modal>
						
						
						
						
						
			   			 
			   			 
			   			 
			   		</div>
			   </div>
			   <div className="col-xl-5 col-xxl-5 col-lg-5">
			   		<div className="row">
			   			<div className="col-xl-12 col-xxl-12 col-lg-12">
				   			<div className="card overflow-hidden trade-card">
					   			
					   			
					   			
					   			
					   				<div className="card-header border-0 pb-0 d-block d-md-flex">
										<h5 className="card-title text-white">Quick Trade</h5>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-12 align-self-center text-center quick-trade">
												<div>
													<form>
														<div className="dropdown custom-dropdown d-block mt-3 mt-sm-0">
															<div className="btn d-flex align-items-center rounded-4 svg-btn btn-md" data-toggle="dropdown" aria-expanded="false">
															<img className="gh-icon" src="./images/tokens/greyhound.svg" height="30px"/>
															<div className="text-left ml-3">
																<span className="d-block fs-16 text-white">HOUND</span>
															</div>
															<i className="fa fa-angle-down scale5 ml-3 text-white" />
															</div>
															<div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)', borderRadius: '4px'}}>
															<a className="dropdown-item" href="">1000 XRP</a>
															<a className="dropdown-item" href="">4 KATANA</a>
															</div>
														</div>
														<input type="number" className="form-control fs-28" placeholder="50000000"/>
													</form>
													<p className="fs-14">1 HOUND = 0.0000001 XRP</p>
												</div>
											</div>
											<div className="col-xl-2 col-xxl-2 col-lg-2 col-sm-12 align-self-center text-center">
												<i className="fi fi-rr-exchange circle-icon"></i>
											</div>
											<div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-12 align-self-center text-center quick-trade">
												<div>
													<form>
														<div className="dropdown custom-dropdown d-block mt-3 mt-sm-0">
															<div className="btn d-flex align-items-center rounded-4 svg-btn btn-md" data-toggle="dropdown" aria-expanded="false">
															<img src="./images/tokens/xrp.png" height="30px"/>
															<div className="text-left ml-3">
																<span className="d-block fs-16 text-white">XRP</span>
															</div>
															<i className="fa fa-angle-down scale5 ml-3 text-white" />
															</div>
															<div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)', borderRadius: '4px'}}>
															<a className="dropdown-item" href="">1000 XRP</a>
															<a className="dropdown-item" href="">4 KATANA</a>
															</div>
														</div>
														<input type="number" className="form-control fs-28" placeholder="50000000"/>
													</form>
													<p className="fs-14">1 HOUND = 0.0000001 XRP</p>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer border-0 pt-0">
										<div className="row align-items-center">
											<div className="col-md-5 col-sm-12">
												<p className="mb-0 fs-16 "><a className="text-white pr-3">Transaction Fee:</a>0 XRP</p>
											</div>
											<div className="col-md-7 text-left mt-3 mt-sm-0 text-sm-right">
												<a href="#" className="btn btn-primary rounded-4 mb-2">
													Trade
												</a>
											</div>
										</div>
									</div>





				   			</div>
			   			</div>
			   		</div>
			   		<div className="row">
			   			<div className="col-xl-6 col-xxl-6 col-lg-6">
				   			<div className="card overflow-hidden">
					   			<div className="card-header border-0 pb-0">
					   				<div className="me-auto">
										<h5 className="card-title text-white mb-2">Greyhound Supply</h5>
										<p className="mb-3 fs-14 font-w500">{greyHoundSupply} {greyHoundAmountBurnt}%</p>
									</div>
					   			</div>
					   			<div className="card-body p-0">
						   			<GreySupply />						   			
					   			</div>
				   			</div>
			   			</div>
			   			<div className="col-xl-6 col-xxl-6 col-lg-6">
				   			<div className="card overflow-hidden">
					   			<div className="card-header border-0 pb-0">
					   				<div className="me-auto">
										<h5 className="card-title text-white mb-2">Volume</h5>
										<p className="mb-3 fs-14 font-w500">2,000 XRP in the last day</p>
									</div>
					   			</div>
					   			<div className="card-body p-0">
						   			<GreyVolume />
					   			</div>
				   			</div>
			   			</div>
			   		</div>
			   		
			   </div>
			   <div className="col-xl-4 col-xxl-4 col-lg-4">
			   		<div className="card overflow-hidden">
			   			 <div className="card-header border-0 d-sm-flex d-block">
			   			 
			   			 	<div>
								<h4 className="fs-20 text-white">Last Transactions</h4>
							</div>
							<div className="card-action card-tabs mt-3 mt-sm-0">
								<ul className="nav nav-tabs" role="tablist">
			                      <li className="nav-item">
			                        <a className="nav-link " data-toggle="tab" href="#sent" role="tab" aria-selected="true">
			                          Sent
			                        </a>
			                      </li>
			                      <li className="nav-item">
			                        <a className="nav-link active" data-toggle="tab" href="#received" role="tab" aria-selected="false">
			                          Received
			                        </a>
			                      </li>
			                    </ul>
							</div>
			   			 
			   			 </div>
			   			 <div className="card-body p-0 tab-content card-table">
                  {/* SENT */}
                  <div className="tab-pane " id="sent">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                            <TransactionsSent transactions={lastTransactionsSent} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* RECEIVED */}
                  <div className="tab-pane fade active show" id="received">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                        <TransactionsReceived transactions={lastTransactionsReceived} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
			   		</div>
			   </div>
			   
		 	</div>
		
		
		
		
		
		
		
		
		
		
		
		
		
          
          <div className="row">
            <div className="col-xl-8 col-xxl-8 col-lg-6">
              
			  
			  
			  
			  
			  
			  <div className="card">
                     <div className="card-header d-sm-flex d-block pb-0 border-0">
                        <div>
                           <h4 className="text-black fs-20">Market Overview</h4>
                           <p className="fs-13 mb-0">
                              Lorem ipsum dolor sit amet, consectetur
                           </p>
                        </div>
                     </div>
                     <div className="card-body" id="user-activity">
                        <Tab.Container defaultActiveKey="all">
                           <div className="d-flex flex-wrap justify-content-between mb-5">
                              <div className="card-action card-tabs icontabs mt-3 mt-sm-0">
                                 <Nav className="nav nav-tabs" role="tablist">
                                    <Nav.Item className="nav-item">
                                       <Nav.Link eventKey="all">
									   	   <img src="images/tokens/greyhound.svg" style={{height: '28px'}}/>
									   </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                       <Nav.Link eventKey="xrp" >
										  <img src="images/svg/xrp-icon.svg" style={{height: '20px'}}/>
                                       </Nav.Link>
                                    </Nav.Item>
                                 </Nav>
                              </div>
                              <div className="d-flex align-items-center mt-3 mt-sm-0">
                                 <p className="mb-0 fs-13 mr-3">Current price</p>
                                 <h2 className="mb-0 text-black font-w600">
                                    000000.5
                                 </h2>
                              </div>
                           </div>
                           <Tab.Content
                              className="tab-content"
                              id="myTabContent"
                           >
                              <Tab.Pane eventKey="all">
                                 <ActivityLine />
                              </Tab.Pane>
                              <Tab.Pane eventKey="xrp">
                                 <ActivityLine3 />
                              </Tab.Pane>
                           </Tab.Content>
                        </Tab.Container>
                     </div>
                  </div>
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
            </div>
			<div className="col-xl-4 col-xxl-4 col-lg-6">
	              <div className="card overflow-hidden">
		   			<div className="card-header border-0 pb-0">
		   				<div>
							<h4 className="fs-20 text-white">Last Transactions</h4>
						</div>
						<div className="card-action card-tabs mt-3 mt-sm-0">
							<ul className="nav nav-tabs" role="tablist">
		                      <li className="nav-item">
		                        <a className="nav-link active" data-toggle="tab" href="#buy" role="tab" aria-selected="true">
		                          Buy
		                        </a>
		                      </li>
		                      <li className="nav-item">
		                        <a className="nav-link" data-toggle="tab" href="#send" role="tab" aria-selected="false">
		                          Send
		                        </a>
		                      </li>
		                    </ul>
						</div>
		   			</div>
		   			<div className="card-body p-0 tab-content">
			   			  {/* send */}
		                  <div className="tab-pane fade active show" id="send">
		                    <div className="table-responsive">
		                      <table className="table text-center bg-info-hover card-table">
											<thead>
												<tr>
													<th className="text-left text-white fs-16">Greyhound Amount</th>
													<th className=" text-white fs-16">Price (XRP)</th>
												</tr>
											</thead>
											<tbody>
												<tr className="sell">
													<td className="text-left">80,000,000</td>
													<td>0.0000048</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>

												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="sell">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
											</tbody>
										</table>
		                    </div>
		                  </div>
		                  {/* buy */}
		                  <div className="tab-pane" id="buy">
		                    <div className="table-responsive">
		                      <table className="table text-center bg-info-hover card-table">
											<thead>
												<tr>
													<th className="text-left text-white fs-16">Greyhound Amount</th>
													<th className=" text-white fs-16">Price (XRP)</th>
												</tr>
											</thead>
											<tbody>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
												<tr className="buy">
													<td className="text-left">14,602,196</td>
													<td>0.00000378</td>
												</tr>
											</tbody>
										</table>
		                    </div>
		                  </div>
		   			</div>
	   			</div>
            </div>
          </div>
        </div>
      </div>
      </LoadingOverlay>
    );
  }
  
  export default Dashboard;
  