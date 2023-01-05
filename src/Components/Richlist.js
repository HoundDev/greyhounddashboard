import React, { useState, useEffect, Component } from "react";
import { Line } from "react-chartjs-2";
import { Link, useSearchParams, useLocation } from "react-router-dom";
// import GreyHolders from "./greyhoundHolders";
// import GreyTrustlines from "./greyhoundTrustlines";

const format = (num, decimals) => {
  try {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  } catch (e) {
    return num;
  }
};
require("dotenv").config();

export default function Richlist(props) {
  const [pager, setPager] = useState({})
  const [pageOfItems, setpageOfItems] = useState([])
  const [sum, setSum] = useState(0)
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const [xrpAddressInputVal, setxrpAddressInputVal] = useState('');
  const [userRank, setUserRank] = useState(0);
  const [labelsHolder, setLabelsHolder] = useState([]);
  const [dataHolder, setDataHolder] = useState([]);
  const [labelTls, setLabelTls] = useState([]);
  const [dataTls, setDataTls] = useState([]);
  const [totalTls, setTotalTls] = useState(0);
  const [totalHolders, setTotalHolders] = useState(0);
  const [changeTls, setChangeTls] = useState(0);
  const [changeHolders, setChangeHolders] = useState(0);

  const dataholder = {
    defaultFontFamily: "Poppins",
    labels: labelsHolder,
    datasets: [{
      label: "Issue Supply",
      backgroundColor: '#CE5C6C',
      borderColor: '#CE5C6C',
      pointBackgroundColor: '#CE5C6C',
      pointBorderColor: '#CE5C6C',
      borderWidth: 2,
      pointHoverBackgroundColor: '#CE5C6C',
      pointHoverBorderColor: '#CE5C6C',
      data: dataHolder
    }],
  };
  const optionsholder = {
    title: {
      display: !1
    },
    tooltips: {
      intersect: !1,
      mode: "nearest",
      xPadding: 20,
      yPadding: 20,
      caretPadding: 20
    },
    legend: {
      display: !1
    },
    responsive: !0,
    maintainAspectRatio: !1,
    hover: {
      mode: "index"
    },
    scales: {
      xAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: "Month"
        }
      }],
      yAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: "Value"
        },
        ticks: {
          beginAtZero: !0
        }
      }]
    },
    elements: {
      line: {
        tension: .2
      },
      point: {
        radius: 0,
        borderWidth: 0
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }

  };
  class GreyHolders extends Component {
    render() {
      return <Line data={dataholder} options={optionsholder} height={50} id="chartHolder" />;
    }
  }
  const datatls = {
    defaultFontFamily: "Poppins",
    labels: labelTls,
    datasets: [{
      label: "Issue Supply",
      backgroundColor: '#CE5C6C',
      borderColor: '#CE5C6C',
      pointBackgroundColor: '#CE5C6C',
      pointBorderColor: '#CE5C6C',
      borderWidth: 2,
      pointHoverBackgroundColor: '#CE5C6C',
      pointHoverBorderColor: '#CE5C6C',
      data: dataTls
    }],
  };
  const optionstls = {
    title: {
      display: !1
    },
    tooltips: {
      intersect: !1,
      mode: "nearest",
      xPadding: 20,
      yPadding: 20,
      caretPadding: 20
    },
    legend: {
      display: !1
    },
    responsive: !0,
    maintainAspectRatio: !1,
    hover: {
      mode: "index"
    },
    scales: {
      xAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: "Month"
        }
      }],
      yAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: "Value"
        },
        ticks: {
          beginAtZero: !0
        }
      }]
    },
    elements: {
      line: {
        tension: .2
      },
      point: {
        radius: 0,
        borderWidth: 0
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }

  };
  class GreyTrustlines extends Component {
    render() {
      return <Line data={datatls} options={optionstls} height={50} />;
    }
  }

  function handleAddressSearchChange(event) {
    setxrpAddressInputVal(event.target.value);
    if (event.target.value.length >= 3) {
      let rowsFound = pageOfItems.find(x => x.xrpAddress.includes(event.target.value) === true);
      let arryItems = [];
      if (rowsFound !== undefined) {
        arryItems.push(rowsFound);
        setpageOfItems(arryItems);
      }
      //Filter the grid
    }
    if (event.target.value.length === 0) {
      getRichListData(pager.currentPage);
    }
  }

  const getRichListData = async (page) => {
    try {
      let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/richlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "page": page, "address": props.xrpAddress })
      });
      let json = await response.json()
      console.log(json.sum[0].sum)
      setPager(json.pager)
      setpageOfItems(json.pageOfItems)
      setSum(json.sum[0].sum)
      setTotalHolders(json.totalHolders)
      setTotalTls(json.totalTls)
      let label = [];
      let data = [];
      for (var key in json.holderData) {
        label.push(key);
        data.push(json.holderData[key]);
      }
      //invert both arrays
      label.reverse();
      data.reverse();
      //get the %change over the last 30 days
      let before = data[data.length - 2];
      let after = data[data.length - 1];
      let change = ((after - before) / before) * 100;
      if (change > 0) {
        change = "+" + change.toFixed(2);
      } else {
        change = change.toFixed(2);
      }
      setChangeHolders(change);
      setLabelsHolder(label);
      setDataHolder(data);
      let label2 = [];
      let data2 = [];
      let baseTl = json.totalTls
      for (var key2 in json.tlData) {
        label2.push(key2);
        data2.push(baseTl);
        baseTl = baseTl - json.tlData[key2];
      }
      //invert both arrays
      label2.reverse();
      data2.reverse();
      //get the %change over the last 30 days
      let before2 = data2[data2.length - 2];
      let after2 = data2[data2.length - 1];
      let change2 = ((after2 - before2) / before2) * 100;
      //place a `+` in front of the number if it's positive
      if (change2 > 0) {
        change2 = "+" + change2.toFixed(2);
      } else {
        change2 = change2.toFixed(2);
      }
      setChangeTls(change2);
      setLabelTls(label2);
      setDataTls(data2);
      if (json.rank !== undefined) {
        setUserRank(json.rank)
      }
      else {
        setUserRank(0)
      }
    } catch (error) {
      console.log(error)
      return { success: false };
    }
  }

  const handleNextPage = (event) => {
    getRichListData(pager.currentPage + 1);
  }

  const handlePrevPage = (event) => {
    getRichListData(pager.currentPage - 1);
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
            <div className="card logo-bg">
              <div className="card-body text-center card-text  align-middle">
                <img className="bg-img" src="./images/svg/logo-icon-white.svg" />
                <h2 className=" text-white fs-28">
                  #{userRank}</h2>
                <h2 className="text-white fs-18 mb-2 font-w600">Wealthiest Hound</h2>
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-5">
            <div className="card overflow-hidden">
              <div className="card-header border-0 pb-0 card-bx">
                <div className="me-auto">
                  <h2 className="text-white mb-2 font-w600">Trustlines</h2>
                  <p className="mb-1 fs-16">{format(totalTls)} ({changeTls}% in 30 days)</p>
                </div>
              </div>
              <div className="card-body p-0">
                <GreyTrustlines />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-xxl-5 col-lg-5 col-sm-5">
            <div className="card overflow-hidden">
              <div className="card-header border-0 pb-0 card-bx">
                <div className="me-auto">
                  <h2 className="text-white mb-2 font-w600">Holders</h2>
                  <p className="mb-1 fs-16">{format(totalHolders)} ({changeHolders}% in 30 days)</p>
                </div>
              </div>
              <div className="card-body p-0">
                <GreyHolders />
              </div>
            </div>
          </div>
        </div>
        <div className="form-head d-flex mb-4 mb-md-3 align-items-start">
          <div className="input-group mb-3">
            <span className="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input id="walletAddy" type="text" class="form-control pl-0" placeholder="Enter a wallet address" value={xrpAddressInputVal} onChange={handleAddressSearchChange}/>
          </div>
          <button className="btn btn-md btn-primary ml-auto" hidden><i className="fa-solid fa-arrows-rotate" hidden></i></button>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="table-responsive table-hover fs-14">
              <div id="example-5_wrapper" className="dataTables_wrapper no-footer">
                <table className="table display mb-4 dataTablesCard dataTable no-footer" id="richlist" role="grid" aria-describedby="example-5_info">
                  <thead>
                    <tr role="row">
                      <th style={{ width: '10px' }}>Rank</th>
                      <th style={{ width: '300.812px' }}>Wallet Address</th>
                      <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Coin: activate to sort column ascending" style={{ width: '50px' }}>Greyhound Amount</th>
                      {/* <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Last Price: activate to sort column ascending" style={{ width: '10px' }}>Change (24h)</th> */}
                      <th className="sorting" tabIndex={0} aria-controls="example-5" rowSpan={1} colSpan={1} aria-label="Change (24h): activate to sort column ascending" style={{ width: '10px' }}>Percentage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pager.pages && pager.pages.length > 0 ? <>
                      {pageOfItems.map(item =>
                        <tr key={item.id} role="row" className="odd">
                          <td className="width sorting_1">
                            <span className="text-white">#{item.id}</span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {item.xrpAddress}
                            </div>
                          </td>
                          <td>
                            <span>{format(Math.round(item.balance))}</span>
                          </td>
                          {/* <td>
                            <span className="font-w500 text-success">-</span>
                          </td> */}
                          <td>
                            <span className="font-w500">{((Math.round(item.balance) / Math.round(sum)) * 100).toFixed(5)}%</span>
                          </td>
                        </tr>
                      )} </> : <></>}
                  </tbody>
                </table>
                {pager.pages && pager.pages.length > 0 ?
                  <><div className="dataTables_info" id="example-5_info" role="status" aria-live="polite">
                    Showing {pager.currentPage} of {pager.totalPages} Pages</div>
                    <div className="dataTables_paginate paging_simple_numbers" id="example-5_paginate">
                      <button className="paginate_button previous disabled" aria-controls="example-5" data-dt-idx={0} tabIndex={0} id="example-5_previous" onClick={handlePrevPage}><i className="la la-angle-left"></i></button>
                      {pager.pages.map(page =>
                        <span key={page}><Link to={`/richlist?page=${page}`} className={`paginate_button ${pager.currentPage === page ? 'current' : ''}`} aria-controls="example-5" data-dt-idx={1} tabIndex={0}>{page}</Link></span>
                      )}
                      <button className="paginate_button next disabled" aria-controls="example-5" data-dt-idx={2} tabIndex={0} id="example-5_next" onClick={handleNextPage}><i className="la la-angle-right"></i></button>
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