import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { Route, Routes, Redirect, Link } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import React, { useState, useRef, useEffect } from "react";
import Cookies from 'universal-cookie';
import RichList from './Components/Richlist.js';
require("dotenv").config();

function App() {
  const [userAddress, setUserAddress] = React.useState('')
  const [userSession, setUserSession] = React.useState('')
  const [activeStyleDashboard, setActiveStyleDashboard] = React.useState('mm-active')
  const [activeStyleRichList, setActiveStyleRichlist] = React.useState('')
  const [snapShotTier, setsnapShotTier] = React.useState('None')

  useEffect(() => {
    const cookies = new Cookies();
    let userAddress = cookies.get('userAddress');
    let userSession = cookies.get('userSession');
    if(userAddress != undefined && userSession != undefined)
    {
      setUserAddress(userAddress);
      setUserSession(userSession);
    }
  }, []);

  function getTier(tier)
  {
    setsnapShotTier(tier);
  }


  function setStateValues(obj)
  {
    const cookies = new Cookies();
    cookies.set('userAddress', obj.xrpAddress, { path: '/' });
    cookies.set('userSession', obj.session, { path: '/' });
    window.location = "/";
  }

  function Logout()
  {
    const cookies = new Cookies();
    cookies.remove('userAddress');
    cookies.remove('userSession');
    setUserAddress('');
    setUserSession('');
  }

  function setActive(str)
  {
    if(str === 'dashboardLI'){
      setActiveStyleDashboard('mm-active')
      setActiveStyleRichlist('')
    } else if (str === 'richlistLI')
    {
      setActiveStyleDashboard('')
      setActiveStyleRichlist('mm-active')
    }
  }

  console.log(userAddress)

  return (
      <>
      {userAddress == '' ? <Login setStateValues={setStateValues} /> : <div id="main-wrapper">
      <div className="nav-header">
        <a href="index.html" className="brand-logo">
          <img className="logo-abbr" src="./images/svg/logo.svg" draggable="false" alt="" />
          <img className="logo-compact" src="./images/svg/logo-text.svg" draggable="false" alt="" />
          <img className="brand-title" src="./images/svg/logo-text.svg" draggable="false" alt="" />
        </a>
  
        <div className="nav-control">
          <div className="hamburger">
            <span className="line"></span><span className="line"></span><span className="line"></span>
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

    {snapShotTier != 'None' ? <li className="nav-item dropdown notification_dropdown">
      <a className="nav-link" href="#" data-toggle="modal" data-target="#badge-nft-airdrop">
        <img src="./images/badges/airdropnft.png" title="Rosie NFT Snapshot 2022"
          draggable="false" />
      </a>
    </li> : <></> }



    {/* <li className="nav-item dropdown notification_dropdown">
      <a className="nav-link" href="#" data-toggle="modal" data-target="#badge-greyhound-og">
        <img src="./images/badges/og.png" title="Rosie NFT Snapshot 2022" draggable="false" />
      </a>
    </li> */}

    <li className="nav-item dropdown header-profile">
      <a className="nav-link" href="#" role="button" data-toggle="dropdown">
        <div className="header-info">
          <span className="text-white"
            id="wallet-address"><strong>{userAddress}
            </strong></span>
          <p className="fs-15 mb-0">Wallet Address</p>
        </div>
        <img src="./images/avatar/default-avatar.jpg" width="20" alt="" draggable="false" />
      </a>
      <div className="dropdown-menu dropdown-menu-right">
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
			<div className="deznav-scroll">
				<ul className="metismenu" id="menu">
					<li id="dashboardLI" className={activeStyleDashboard}><Link onClick={() => setActive('dashboardLI')} to="/" className=" ai-icon" aria-expanded="false">
							<i className="fa-solid fa-grip"></i>
							<span className="nav-text">Dashboard</span>
              </Link>
					</li>

					<li id="richlistLI" className={activeStyleRichList}><Link onClick={() => setActive('richlistLI')} to="/richlist" className=" ai-icon" aria-expanded="false">
							<i className="fa-solid fa-table-list" title="Richlist"></i>
							<span className="nav-text">Richlist</span>
              </Link>
					</li>

					<li><a className="ai-icon" href="#" aria-expanded="false">
							<i className="fa-regular fa-calendar" title="Events"></i>
							<span className="nav-text">Events (Coming Soon)</span>
						</a>
					</li>

					<li><a className="ai-icon" href="#" aria-expanded="false">
							<i className="fa-solid fa-clone" title="NFTs"></i>
							<span className="nav-text">NFTs (Coming Soon)</span>
						</a>
					</li>

					<li><a className="ai-icon" href="https://greyhoundcoin.net/" aria-expanded="false">
							<i className="fa-solid fa-arrow-up-right-from-square" title="Main Website"></i>
							<span className="nav-text">Main Website</span>
						</a>
					</li>

				</ul>

				<a href="https://greyhoundcoin.net/blog/announcement/2022/03/13/snapshot-wrapup.html">

					<div className="add-menu-sidebar">

						<p>Snapshot Wrap-Up and Plans for the Future</p>
						<svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M23.725 5.14889C23.7248 5.14861 23.7245 5.14828 23.7242 5.148L18.8256 0.272997C18.4586 -0.0922062 17.865 -0.0908471 17.4997 0.276184C17.1345 0.643169 17.1359 1.23675 17.5028 1.602L20.7918 4.875H0.9375C0.419719 4.875 0 5.29472 0 5.8125C0 6.33028 0.419719 6.75 0.9375 6.75H20.7917L17.5029 10.023C17.1359 10.3882 17.1345 10.9818 17.4998 11.3488C17.865 11.7159 18.4587 11.7172 18.8256 11.352L23.7242 6.477C23.7245 6.47672 23.7248 6.47639 23.7251 6.47611C24.0923 6.10964 24.0911 5.51414 23.725 5.14889Z"
								fill="white" />
						</svg>

					</div>
				</a>
				<div className="copyright">
					<p><strong>Greyhound</strong> © 2022 All Rights Reserved</p>
				</div>
			</div>
		</div>
    <Routes>
        <Route path="/" element={<Dashboard xrpAddress={userAddress} updateTier={getTier} />} />
        <Route path="/richlist" element={<RichList xrpAddress={userAddress} />} />
      </Routes>
      

</div>
  
  
  } </>
  );
}

export default App;
