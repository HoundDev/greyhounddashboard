import { TbHome, TbListSearch, TbCalendarEvent } from "react-icons/tb";

import Login from './Components/Login'


import Dashboard from './Components/Dashboard'
import { Route, Routes, Redirect, Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import React, { useState, useRef, useEffect } from "react";
import Cookies from 'universal-cookie';
import RichList from './Components/Richlist.js';
import SpringRescue from './Components/springRescue.js';
import NftHome from './Components/nftHome.js';
import NftExplore from './Components/nftExplore';
import NftDetails from './Components/nftDetails.js';
import NftCollection from './Components/nfts/NftCollection';
import NftClaim from "./Components/nfts/NftClaim";
import NftMint from "./Components/nftMint";
import NftSteps from "./Components/nftSteps";
import UserProfile from './Components/users/UserProfile';
import EditProfile from "./Components/users/EditProfile";
import AccessDenied from './Components/accessDenied.js';
import Viii from './Components/viii.js';
import Footer from './layouts/Footer';
import PerfectScrollbar from "react-perfect-scrollbar";
require("dotenv").config();





function App() {
  const [userAddress, setUserAddress] = React.useState('')
  const [userSession, setUserSession] = React.useState('')
  const [activeStyleDashboard, setActiveStyleDashboard] = React.useState('mm-active')
  const [activeStyleRichList, setActiveStyleRichlist] = React.useState('')

  const [activeStyleSpringRescue, setActiveStyleSpringRescue] = React.useState('')
  const [snapShotTier, setsnapShotTier] = React.useState('None')

  const [toggle, setToggle] = useState(false);
  const [dashClicked, setDashClicked] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };


  // async function notifsFetch() {
  //   let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/notifs', {
  //     method: 'post'
  //   });
  //   let data = await response.json();
  //   console.log(data)
  // }
  // notifsFetch()
  useEffect(() => {
    const cookies = new Cookies();
    let userAddress = cookies.get('userAddress');
    let userSession = cookies.get('userSession');
    if (userAddress !== undefined && userSession !== undefined) {
      setUserAddress(userAddress);
      setUserSession(userSession);
    }
  }, []);

  function getTier(tier) {
    setsnapShotTier(tier);
  }


  function setStateValues(obj) {
    const cookies = new Cookies();
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
       
    cookies.set('userAddress', obj.xrpAddress, { path: '/', expires: futureDate });
    cookies.set('userSession', obj.session, { path: '/', expires: futureDate });
    window.location = "/";
  }

  function Logout() {
    const cookies = new Cookies();
    cookies.remove('userAddress');
    cookies.remove('userSession');
    setUserAddress('');
    setUserSession('');
  }

  function setActive(str) {
    if (str === 'dashboardLI') {
      setActiveStyleDashboard('mm-active')
      setActiveStyleRichlist('')
      setActiveStyleSpringRescue('')
      setDashClicked(true);
    } else if (str === 'richlistLI') {
      setActiveStyleDashboard('')
      setActiveStyleRichlist('mm-active')
      setActiveStyleSpringRescue('')
      setDashClicked(false);
    } else if (str === 'SpringRescueLI') {
      setActiveStyleDashboard('')
      setActiveStyleRichlist('')
      setActiveStyleSpringRescue('mm-active')
      setDashClicked(false);
    }
  }

  //console.log(userAddress)

  //wait for dom to be loaded
  useEffect(() => {
    //check if dashButton is clicked
    if (dashClicked) {
      //refresh the page
      setDashClicked(false);
      window.location.reload();
    }
  }, [dashClicked]);
  return (
    <>
      {userAddress === '' ? <Login setStateValues={setStateValues} /> : <div id="main-wrapper" className={`show ${toggle ? "menu-toggle" : ""}`}>
        <div className="nav-header">
          <a className="brand-logo">
            <div className="logo-abbr" draggable="false" alt=""></div>
            <img className="logo-compact" src="./images/svg/logo-icon-light.svg" alt="" />
            <div className="brand-title" draggable="false" alt=""></div>
          </a>

          <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  <div className="dashboard_bar">
                    Dashboard
                  </div>
                </div>

                <ul className="navbar-nav header-right">

                  {/* snapShotTier !== 'None' ? <li className="nav-item dropdown notification_dropdown">
      <a className="nav-link" href="#" data-toggle="modal" data-target="#badge-nft-airdrop">
        <img src="./images/badges/airdropnft.png" title="Rosie NFT Snapshot 2022"
          draggable="false" />
      </a>
    </li> : <></> */}




                  <li className="nav-item d-none">
                    <a className="nav-link pl-3">
                      <label className="theme-toggle " title="Toggle theme">
                        <input id="theme-toggle" type="checkbox" checked={checked} onChange={handleChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" fill="currentColor" strokeLinecap="round" className="theme-toggle__classic" viewBox="0 0 32 32">
                          <clipPath id="theme-toggle__classic__cutout">
                            <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
                          </clipPath>
                          <g clipPath="url(#theme-toggle__classic__cutout)">
                            <circle cx="16" cy="16" r="9.34" />
                            <g stroke="currentColor" strokeWidth="1.5">
                              <path d="M16 5.5v-4" />
                              <path d="M16 30.5v-4" />
                              <path d="M1.5 16h4" />
                              <path d="M26.5 16h4" />
                              <path d="m23.4 8.6 2.8-2.8" />
                              <path d="m5.7 26.3 2.9-2.9" />
                              <path d="m5.8 5.8 2.8 2.8" />
                              <path d="m23.4 23.4 2.9 2.9" />
                            </g>
                          </g>
                        </svg>
                      </label>
                    </a>
                  </li>

                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link" href="#" data-toggle="dropdown">
                      <i className="fi fi-sr-bell text-white"></i>
                      <span className="badge light bg-secondary">1</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right">
                      <div  className="widget-media dz-scroll p-3 ps">
                        <ul className="timeline">
                          {/* <li>
                            <div className="timeline-panel">
                              <div className="media-body">
                                <small className="d-block mb-1">NFT Airdrop</small>
                                <h5 className="text-white">You have 1 Legendary unclaimed NFT</h5>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media-body">
                                <small className="d-block mb-1">NFT Airdrop</small>
                                <h5 className="text-white">You have 1 Original Greyhound unclaimed NFT</h5>
                              </div>
                            </div>
                          </li> */}
                          <li>
                            <div className="timeline-panel">
                              <div className="media-body">
                                <small className="d-block mb-1">Welcome To Beta!</small>
                                <h5 className="text-white">This is just an idea of what notifications will look like when we have big announcements to share with you.</h5>
                              </div>
                            </div>
                          </li>
                      
                        </ul>
                       </div>
                    </div>
                  </li>



                  <li className="nav-item dropdown header-profile">
                    <a className="nav-link" role="button" data-toggle="dropdown">
                      <div className="header-info">
                        <span className="text-white"
                          id="wallet-address"><strong>{userAddress}
                          </strong></span>
                        <p className="fs-15 mb-0">Wallet Address</p>
                      </div>
                      <img src="./images/avatar/default-avatar.jpg" width="20" alt="" draggable="false" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item">
                       
                        <span className="ml-2">My Profile </span>
                      </a>
                      <a onClick={Logout} className="dropdown-item ai-icon">
                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger"
                          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span className="ml-2">Logout </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>


        <div className="deznav">
          <PerfectScrollbar className="deznav-scroll">
            <ul className="metismenu" id="menu">
              <li id="dashboardLI" className={activeStyleDashboard}><Link onClick={() => setActive('dashboardLI')} to="/" className=" ai-icon" aria-expanded="false" id='dashButton'>
                <i className="fi fi-sr-apps"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              </li>

              <li id="richlistLI" className={activeStyleRichList}><Link onClick={() => setActive('richlistLI')} to="/richlist" className=" ai-icon" aria-expanded="false">
                <i className="fi fi-rr-list"></i>
                <span className="nav-text">Richlist</span>
              </Link>
              </li>
               <li id="richlistLI" className={activeStyleSpringRescue}>
                {/* <Link onClick={() => setActive('SpringRescueLI')} to="/springrescue" className=" ai-icon" aria-expanded="false"> */}
                <Link onClick={null} to="/" className=" ai-icon" aria-expanded="false">
                <i className="fi fi-sr-calendar"></i>
                <span className="nav-text">Events <span className="badge badge-primary badge-rounded badge-xs">coming soon</span></span>
              </Link>
              </li>

              {/* <li><a className="ai-icon" href="#" aria-expanded="false">
                <i className="fi fi-sr-gallery"></i>
                <span className="nav-text">NFTs <span className="badge badge-primary badge-rounded badge-xs">coming soon</span></span>
              </a>
              </li> */}
              <li><a className="ai-icon" href="/userprofile" aria-expanded="false">
                <i className="fi fi-sr-gallery"></i>
                <span className="nav-text">NFTs </span>
              </a>
              </li>
              <li><a className="ai-icon" href="#" aria-expanded="false">
                <i className="fi fi-sr-gamepad"></i>
                <span className="nav-text">Games <span className="badge badge-primary badge-rounded badge-xs">coming soon</span></span>
              </a>
              </li>

              <li><a className="ai-icon" href="https://greyhoundcoin.net/" aria-expanded="false">
                <i className="fi fi-rr-globe"></i>
                <span className="nav-text">Main Website</span>
              </a>
              </li>

            </ul>



            <div className="add-menu-sidebar ">
              <img src="./images/staking-bitrue.png" draggable="false" />
              <a href="https://www.bitrue.com/powerpiggy/greyhound?pgid=72" className="btn btn-white rounded-4" target="blank">Stake On Bitrue</a>
            </div>
          </PerfectScrollbar>
        </div>


        <Routes>
          <Route path="/" element={<Dashboard xrpAddress={userAddress} updateTier={getTier} />} />
          <Route path="/richlist" element={<RichList xrpAddress={userAddress} />} />
          {/*<Route path="/springrescue" element={<SpringRescue xrpAddress={userAddress} />} />*/}
          <Route path="/nftHome" element={<NftHome xrpAddress={userAddress} />} />
          <Route path="/claimNFT/" element={<NftClaim xrpAddress={userAddress} />} />
          <Route exact path="/nftDetails" element={<NftDetails xrpAddress={userAddress} />} />
          {/* <Route path="/nftDetails/:id" element={<NftDetails xrpAddress={userAddress} />} /> */}
          {/* <Route path="/nftExplore" element={<NftExplore xrpAddress={userAddress} />} /> */}
          <Route path="/accessdenied" element={<AccessDenied xrpAddress={userAddress} />} />
		      {/* <Route path="/viii" element={<Viii xrpAddress={userAddress} />} /> */}
          <Route path="/NftCollection" element={<NftCollection xrpAddress={userAddress} />} />
          <Route path="/NftSteps" element={<NftSteps xrpAddress={userAddress} />} />
          <Route path="/nftMint" element={<NftMint xrpAddress={userAddress} />} />
          <Route path="/userprofile" element={<UserProfile xrpAddress={userAddress} /> } />
          <Route path="/editprofile" element={<EditProfile xrpAddress={userAddress} /> } />
          {/* <Route path=":handle" element={<NftDetails xrpAddress={userAddress} /> } /> */}
        </Routes>

        <Footer />
      </div>




      } </>
  );

}


export default App;
