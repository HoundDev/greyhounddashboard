import React, { useState, useRef, useEffect, useCallback } from "react";
import { Route, Routes, Redirect, Link, useSearchParams, useLocation  } from "react-router-dom";
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
            if(rowsFound != undefined)
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
            <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
              <div className="input-group search-area d-inline-flex">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="flaticon-381-search-2" /></span>
                </div>
                <input type="text" className="form-control" placeholder="Insert Wallet Address" value={xrpAddressInputVal} onChange={handleAddressSearchChange} />
              </div>
              <a href="javascript:void(0);" className="btn btn-primary ml-auto"><i className="fa-solid fa-arrows-rotate" /></a>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive table-hover fs-14">
                  <div id="example-5_wrapper" className="dataTables_wrapper no-footer">
                    <table className="table display mb-4 dataTablesCard dataTable no-footer" id="example-5" role="grid" aria-describedby="example-5_info">
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
                          <span className="bgl-primary text-primary d-inline-block p-3 ">#{item.id}</span>
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
    <a className="paginate_button previous disabled" aria-controls="example-5" data-dt-idx={0} tabIndex={0} id="example-5_previous">Previous</a>
    {pager.pages.map(page =>
        <span key={page}><Link to={`/richlist?page=${page}`} className={`paginate_button ${pager.currentPage === page ? 'current' : ''}`} aria-controls="example-5" data-dt-idx={1} tabIndex={0}>{page}</Link></span>
                            )}
    <a className="paginate_button next disabled" aria-controls="example-5" data-dt-idx={2} tabIndex={0} id="example-5_next">Next</a>
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