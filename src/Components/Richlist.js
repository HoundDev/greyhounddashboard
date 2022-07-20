import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation  } from "react-router-dom";
import GreyHolders from "./greyhoundHolders";
import GreyTrustlines from "./greyhoundTrustlines";
require("dotenv").config();

    export default function Richlist(props) {
        const [pager, setPager] = useState({})
        const [pageOfItems, setpageOfItems] = useState([])
        const [sum, setSum] = useState(0)
        const [searchParams] = useSearchParams();
        const { search } = useLocation();
        const [xrpAddressInputVal, setxrpAddressInputVal] = useState('');

        function handleAddressSearchChange(event){
          setxrpAddressInputVal(event.target.value);
          if(event.target.value.length >= 3)
          {
            let rowsFound = pageOfItems.find(x => x.xrpAddress.includes(event.target.value) === true);
            let arryItems = [];
            if(rowsFound !== undefined)
            {
              arryItems.push(rowsFound);
            }
            setpageOfItems(arryItems);
            //Filter the grid
          }
        }

        const getRichListData = async (page) => {
            try {
              let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/richlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"page" : page})
              });
              let json = await response.json()
              console.log(json.sum[0].sum)
              setPager(json.pager)
              setpageOfItems(json.pageOfItems)
              setSum(json.sum[0].sum)
            } catch (error) {
                console.log(error)
              return { success: false };
            }
          }


          useEffect(async () => {
            const page = parseInt(searchParams.get('page')) || 1;
            console.log(page)
            console.log(pager.currentPage)
            if (page !== pager.currentPage) {
                console.log('te')
                await getRichListData(page)
            }
        }, [search]);

        function isEven(value) {
            return !(value % 2)
        }

      return (
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
                    <div className="col-xl-2 col-xxl-2 col-lg-2 col-sm-2">
                        <div className="card">
                            <div className="card-body text-center card-text  align-middle">
                                <h2 className=" text-white fs-28">
                                    #13</h2>
                                    <h2 className="text-white fs-18 mb-2 font-w600">Wealthiest Hound</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-5">
						<div className="card overflow-hidden">
							<div className="card-header border-0 pb-0 card-bx">
								<div className="me-auto">
									<h2 className="text-white mb-2 font-w600">Trustlines</h2>
									<p className="mb-1 fs-16">11,218 (+4% in 30 days)</p>
								</div>
							</div>
							<div className="card-body p-0">
								<GreyTrustlines/>
							</div>
						</div>
                    </div>
                    <div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-5">
						<div className="card overflow-hidden">
							<div className="card-header border-0 pb-0 card-bx">
								<div className="me-auto">
									<h2 className="text-white mb-2 font-w600">Holders</h2>
									<p className="mb-1 fs-16">11,218 (+4% in 30 days)</p>
								</div>
							</div>
							<div className="card-body p-0">
								<GreyHolders/>	
							</div>
						</div>
                    </div>
                </div>
            <div className="form-head d-flex mb-4 mb-md-3 align-items-start">
              <div className="input-group search-area d-inline-flex">
                <input id="walletAddy" type="text" className="form-control" placeholder="Enter a wallet address" value={xrpAddressInputVal} onChange={handleAddressSearchChange} />
              </div>
              <button className="btn btn-md btn-primary ml-auto"><i className="fa-solid fa-arrows-rotate" /></button>
            </div>
            
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive table-hover fs-14">
                  <div id="example-5_wrapper" className="dataTables_wrapper no-footer">
                    <table className="table display mb-4 dataTablesCard dataTable no-footer" id="richlist" role="grid" aria-describedby="example-5_info">
                      <thead>
                        <tr role="row">
                          <th style={{width: '10px'}}>Rank</th>
                          <th style={{width: '300.812px'}}>Wallet Address</th>
                          <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Coin: activate to sort column ascending" style={{width: '50px'}}>Greyhound Amount</th>
                          <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Last Price: activate to sort column ascending" style={{width: '10px'}}>Change (24h)</th>
                          <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Change (24h): activate to sort column ascending" style={{width: '10px'}}>Percentage (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                      {pager.pages && pager.pages.length > 0 ? <>
                      {pageOfItems.map(item =>
                        <tr key={item.id} role="row" className="odd">
                        <td className="width sorting_1">
                          <span className="text-white"><b>#{item.id}</b></span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                          {item.xrpAddress}
                          </div>
                        </td>
                        <td>
                          <span>{Math.round(item.balance)}</span>
                        </td>
                        <td>
                          <span className="font-w500 text-success">-</span>
                        </td>
                        <td>
                          <span className="font-w500">{((Math.round(item.balance) / Math.round(sum)) * 100).toFixed(5)}</span>
                        </td>
                      </tr>
                      )} </> : <></> }
                      </tbody>
                    </table>
                    {pager.pages && pager.pages.length > 0 ?
                        <><div className="dataTables_info" id="example-5_info" role="status" aria-live="polite">
                        Showing {pager.currentPage} of {pager.totalPages} Pages</div>
                        <div className="dataTables_paginate paging_simple_numbers" id="example-5_paginate">
    <button className="paginate_button previous disabled" aria-controls="example-5" data-dt-idx={0} tabIndex={0} id="example-5_previous"><i className="la la-angle-left"></i></button>
    {pager.pages.map(page =>
        <span key={page}><Link to={`/richlist?page=${page}`} className={`paginate_button ${pager.currentPage === page ? 'current' : ''}`} aria-controls="example-5" data-dt-idx={1} tabIndex={0}>{page}</Link></span>
                            )}
    <button className="paginate_button next disabled" aria-controls="example-5" data-dt-idx={2} tabIndex={0} id="example-5_next"><i className="la la-angle-right"></i></button>
    </div></> : <></>
    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  };