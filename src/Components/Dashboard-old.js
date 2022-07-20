import LoadingOverlay from 'react-loading-overlay-ts';
import React, { useState, useRef, useEffect, useCallback } from "react";
import TransactionsSent from './TransactionsSent'
import TransactionsReceived from './TransactionsReceived'
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
                if(mainData.data.Account_Lines[i].currency == '47726579686F756E640000000000000000000000')
                {
                    setGreyHoundBalance(Math.round(parseFloat(mainData.data.Account_Lines[i].balance)));
                }
            }

            //Set Greyhound Supply
            if(mainData.data.GreyHoundAmount[0].sum != null)
            {
                setGreyHoundSupply(Math.round(mainData.data.GreyHoundAmount[0].sum));
                setGreyHoundAmountBurnt(parseFloat(( 1 - parseFloat(mainData.data.GreyHoundAmount[0].sum) / 1000000000000) * 100).toFixed(2))
            }

            //Set Transactions
            let receivedTxns = []
            let sentTxns = []
            for(let i = 0; i < mainData.data.Transactions.length; i++)
            {
                if(mainData.data.Transactions[i].tx.TransactionType == 'Payment')
                {
                    if(mainData.data.Transactions[i].tx.Destination == props.xrpAddress)
                    {
                        //Received
                        if(typeof mainData.data.Transactions[i].tx.Amount == 'object'){
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
                        if(typeof mainData.data.Transactions[i].tx.Amount == 'object'){
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
            <div className="col-xl-3 col-xxl-3 col-lg-6">
              <div className="card" style={{background: '#fff'}}>
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title">Current Balance</h5>
                </div>
                <div className="card-body">
                  <h2 className="card-text" id="greyhound-amount" style={{fontWeight: 700, color: '#000'}}>
                    {greyHoundBalance} GREYHOUND</h2>
                  {/* <p className="card-text text-black">$ 7,342,000</p> */}
                </div>
                <div className="card-footer border-0 pt-0" style={{zIndex: 2}}>
                  <p className="card-text d-inline">Card footer</p>
                  <a href={'https://bithomp.com/explorer/' + props.xrpAddress} target="_blank" className="btn btn-custom rounded-4 float-right">
                    VIEW MORE
                  </a>
                </div>
                <img className="bg-img" src="./images/greyhound.png" draggable="false" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-xxl-5 col-lg-6">
              <div className="row">
                <div className="col-xl-6 col-xxl-6 col-lg-6">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h5 className="card-title text-white">Greyhound Supply</h5>
                    </div>
                    <div className="card-body">
                      <h2 className="card-text text-white" style={{fontWeight: 700}}>{greyHoundSupply}</h2>
                      <p>Greyhound Burned: <a className="text-white">{greyHoundAmountBurnt}%</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-xxl-6 col-lg-6">
                  <div className="card" style={{background: '#CE5C6D'}}>
                    <div className="card-header border-0 pb-0">
                      <h5 className="card-title text-white">Snapshot</h5>
                    </div>
                    <div className="card-body">
                      <h2 className="card-text text-white" style={{fontWeight: 700}}>
                        {snapShotTier}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className="card" style={{backgroundColor: '#252430'}}>
                    <div className="card-header border-0 pb-0 d-block d-md-flex">
                      <div>
                        <h4 className="fs-20 text-white">Quick Trade</h4>
                        <p className="mb-0 fs-15">Lorem ipsum dolor sit amet, consectetur</p>
                      </div>
                      <div className="dropdown custom-dropdown d-block mt-3 mt-sm-0">
                        <div className="btn d-flex align-items-center rounded-4 svg-btn btn-md" data-toggle="dropdown" aria-expanded="false">
                          <img src="./images/solo.png" height="42px" />
                          <div className="text-left ml-3">
                            <span className="d-block fs-16 text-white">561 SOLO</span>
                          </div>
                          <i className="fa fa-angle-down scale5 ml-3 text-white" />
                        </div>
                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-37px, 72px, 0px)', borderRadius: '4px'}}>
                          <a className="dropdown-item" href="">1000 XRP</a>
                          <a className="dropdown-item" href="">4 KATANA</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="basic-form">
                        <form>
                          <div className="form-group">
                            <div className="input-group input-group-lg">
                              <div className="input-group-prepend">
                                <span className="input-group-text bg-white border rounded-4">Amount
                                  (GREYHOUND)
                                </span>
                              </div>
                              <input type="number" className="form-control rounded-4" placeholder="0,000000" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="card-footer border-0 pt-0">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <p className="mb-0 fs-13">Total: 0 SOLO</p>
                        </div>
                        <div className="col-md-7 text-left mt-3 mt-sm-0 text-sm-right">
                          <a href="#" className="btn btn-custom rounded-4 mb-2">
                            BUY
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-4 col-lg-8">
              <div className="card" style={{background: '#252430'}}>
                <div className="card-header border-0 d-sm-flex d-block">
                  <div>
                    <h4 className="fs-20 text-white">Last Transactions</h4>
                  </div>
                  <div className="card-action card-tabs mt-3 mt-sm-0">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#sent" role="tab" aria-selected="true">
                          Sent
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#received" role="tab" aria-selected="false">
                          Received
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body p-0 tab-content card-table">
                  {/* SENT */}
                  <div className="tab-pane fade active show" id="sent">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                            <TransactionsSent transactions={lastTransactionsSent} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* RECEIVED */}
                  <div className="tab-pane" id="received">
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
            <div className="col-xl-6 col-xxl-6 col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header d-sm-flex d-block pb-0 border-0">
                  <div>
                    <h4 className="text-white fs-20">Market Overview</h4>
                    <p className="fs-13 mb-0">Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>
                <div className="card-body" id="user-activity">
                  <div className="d-flex flex-wrap justify-content-between mb-5">
                    <div className="card-action card-tabs icontabs mt-3 mt-sm-0">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab" href="#bounce" role="tab" aria-selected="false">
                            <img src="images/svg/greyhound-icon.svg" />
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab" aria-selected="false">
                            <img src="images/svg/xrp-icon.svg" style={{height: '20px'}} />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex align-items-center mt-3 mt-sm-0">
                      <p className="mb-0 fs-13 mr-3">Current Price</p>
                      <h2 className="mb-0 text-white font-w600">0.000005</h2>
                    </div>
                  </div>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="user" role="tabpanel">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div className />
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div className />
                        </div>
                      </div>
                      <canvas id="activityLine" height={350} style={{display: 'block', width: '797px', height: '350px'}} width={797} className="chartjs-render-monitor" />
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
  