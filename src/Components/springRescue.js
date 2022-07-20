import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation  } from "react-router-dom";
require("dotenv").config();

    export default function SpringRescue(props) {
        
        
      return (
        <div className="content-body">
          <div className="container-fluid">
          
          		
          		<div className="page-titles">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active"><a>Events</a></li>
						<li className="breadcrumb-item"><a>Spring Rescue 2022</a></li>
					</ol>
				</div>
				
				<div className="row">
				<div className="col-xl-4 col-xxl-4 col-lg-4">
						<div className="card">

								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 text-white fs-20">Community Goals</h4>
								</div>
								
								<div className="card-body">
								
								
								
								
								
								
								
								<div className="text-center mb-3">
									
									
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px">
										
										<g>
											<polygon className="st0" id="piece-iii" data-toggle="modal"
												data-target="#challenge-iii" points="1200.14,1492.69 1200.27,1492.43 1200.24,1492.35 1200.32,1492.32 1235.65,1417.12 1164.76,1385.33 
		1118.35,1482.48 1125.56,1502.29 1169.03,1538.87 1207.1,1511.26 1200.4,1492.81 	" />
											<polygon className="st0" id="piece-v" points="1378.12,1113.89 1268.12,944.29 1228.46,918.38 973.39,752.32 830.32,980.16 814.83,1128.35 
		986.11,1290.65 1241.29,1405.1 	" />
											<path className="st0" id="piece-i" d="M1133.62,1526.59l-96.62,57.22c0,0-0.37,20.54,9.57,20.54c9.94,0,32.17,0,32.17,0l79.12-57.38L1133.62,1526.59
		z" />
											<polygon className="st0" id="piece-iv" points="1537.51,1359.64 1386.63,1127 1214.63,1493.08 1221.55,1512.13 1411.13,1672.26 1544.28,1625.12 
		1580.11,1492.84 	" />
											<path className="st0" id="piece-ii" d="M1042.62,1646.96l1,2.88c0,0,2.58,25.86,11.96,26.17c9.38,0.31,339.77,0.31,339.77,0.31l-181.66-153.43
		L1042.62,1646.96z" />
											<polyline className="st0"
												points="810.51,525.4 729.21,576.88 669.7,781.14 672.05,854.71 822.5,642.72 832.99,451.61 	" />
											<polygon className="st0 piece-xi"
												points="773.9,325.43 465.42,400.24 441.57,451.01 691.6,500.6 	" />
											<path className="st0"
												d="M431.65,408.43c-11.09,2.83,0,32.46,0,32.46l17.21-36.64C448.86,404.26,442.74,405.6,431.65,408.43z" />
											<g>
												<g>
													<polygon className="st0" points="756.69,1656.99 853.18,1182.98 850.57,1180.51 801.35,1133.87 801.94,1133.24 800.98,1133.14 
				817.42,975.79 817.39,975.77 965.98,739.16 844.11,451.61 835.6,647.21 835.5,647.2 835.57,647.25 672.75,876.67 672.95,882.98 
				731.87,1117.64 731.87,1603 			" />
													<polygon className="st0"
														points="797.41,1604.36 899.46,1226.83 864.65,1193.85 781.08,1604.36 			" />
												</g>
												<path className="st0"
													d="M750.81,1676.31l-29.3-63.73l-61.36,48.59c0,0-1.02,15.14,6.96,15.14S750.81,1676.31,750.81,1676.31z" />
											</g>
											<path className="st0" id="piece-x" d="M799.14,516.69c0,0,39.28-128.26,45.21-149.17c5.93-20.91-54.52-44.16-54.52-44.16l-87.11,184.8l-6.85,20.49
		l30.28,34.43L799.14,516.69z" />
										</g>
									</svg>

								</div>
								
								
								
								
								
								
								
								
								
								<div className="event-goal d-flex flex-wrap align-items-center mb-3">
									<div className="symbol flex-shrink-0 mr-4 ">
										<i className="fa-brands fa-twitter"></i>
									</div>
									<div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
										<a href="#" className="text-white mb-1 font-size-lg">Get 30,000 followers on
											Twitter</a>
										<span>5,000 Remaining</span>
									</div>
									<h3 className="text-white fs-16">55%</h3>
								</div>
								
								
								<div className="event-goal d-flex flex-wrap align-items-center mb-3">
									<div className="symbol flex-shrink-0 mr-4 ">
										<i className="fa-brands fa-discord"></i>
									</div>
									<div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
										<a href="#" className="text-white mb-1 font-size-lg">Get 30,000 followers on
											Twitter</a>
										<span>5,000 Remaining</span>
									</div>
									<h3 className="text-white fs-16">90%</h3>
								</div>
								
								
								<div className="event-goal d-flex flex-wrap align-items-center mb-3">
									<div className="symbol flex-shrink-0 mr-4 ">
										<i className="fa-brands fa-discord"></i>
									</div>
									<div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
										<a href="#" className="text-white mb-1 font-size-lg">Get 30,000 followers on
											Twitter</a>
										<span>5,000 Remaining</span>
									</div>
									<h3 className="text-white fs-16">90%</h3>
								</div>
								</div>

							
						</div>
					</div>
				
				
				
				
				
					<div className="col-xl-8 col-xxl-8 col-lg-8">
						<div className="row">
							<div className="col-xl-12 col-xxl-12 col-lg-12">
								<div className="card">
									<div className="card-header pb-0 border-0">
										<h4 className="mb-0 text-white fs-20">Spring Rescue 2022</h4>
										<div className="dropdown custom-dropdown mb-0 d-md-block d-none">
											<div data-toggle="dropdown">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
														stroke="#fff" strokeWidth="2"
														stroke-linecap="round" stroke-linejoin="round">
													</path>
													<path
														d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
														stroke="#fff" strokeWidth="2"
														stroke-linecap="round" stroke-linejoin="round">
													</path>
													<path
														d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
														stroke="#fff" strokeWidth="2"
														stroke-linecap="round" stroke-linejoin="round">
													</path>
												</svg>
											</div>
											<div className="dropdown-menu dropdown-menu-right">
												<a className="dropdown-item"
													href="javascript:void(0);">Details</a>
												<a className="dropdown-item text-danger"
													href="javascript:void(0);">Cancel</a>
											</div>
										</div>
									</div>
									<div className="card-body">
										<div
											className="media d-md-flex d-block pb-sm-4 pb-2 mb-4 text-md-left text-center">
											<img src="./images/events/spring-rescue.png" alt="" width="280" className="rounded mr-0 mr-md-4 mb-2 mb-md-0"/>
											<div className="media-body">
												<div className="d-md-flex d-block justify-content-between">
													<h4 className="fs-22 text-white">Spring Rescue 2022</h4>
												</div>
												<span className="text-primary d-block mb-3" href="#">
													<i className="fi fi-sr-copy-alt"></i> Rescue</span>
												<p className="fs-14 text-white font-w200">
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
													eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
													ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
													aliquip ex ea commodo consequat. Duis aute irure dolor in
													reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
													pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
													culpa qui officia deserunt mollit anim id est laborum
												</p>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-4 col-md-6 col-xxl-6 mb-3">
												<div className="mediaInfo media bgl-primary p-3 rounded align-items-center">
													<i className="fi fi-sr-trophy mr-4"></i>
													<div className="media-body"><span className="fs-12 d-block mb-1">Total Prize</span>
														<span className="fs-18 text-white"><b>100,000,000 Greyhound</b></span>
													</div>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 col-xxl-6 mb-3">
												<div className="mediaInfo media bgl-primary p-3 rounded align-items-center">
													<i className="fi fi-sr-calendar mr-4"></i>
													<div className="media-body">
														<span className="fs-12 d-block mb-1">Date</span>
														<span className="fs-18 text-white"><b>Sunday, 12 June 2020</b></span>
													</div>
												</div>
											</div>
											<div className="col-lg-4 col-md-12 col-xxl-12">
												<div className="mediaInfo media bgl-primary p-3 rounded align-items-center">
													<i className="fi fi-sr-marker mr-4"></i>
													<div className="media-body">
														<span className="fs-12 d-block mb-1">Event Details</span>
														<span className="fs-18 text-white"><b>Read More Here</b></span>
													</div>
													<a href="#">
														<svg width="24" height="12" viewBox="0 0 24 12" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M23.725 5.14889C23.7247 5.14861 23.7245 5.14828 23.7242 5.148L18.8256 0.272997C18.4586 -0.0922062 17.865 -0.0908471 17.4997 0.276184C17.1345 0.643168 17.1359 1.23675 17.5028 1.602L20.7918 4.875H0.9375C0.419719 4.875 0 5.29472 0 5.8125C0 6.33028 0.419719 6.75 0.9375 6.75H20.7917L17.5029 10.023C17.1359 10.3882 17.1345 10.9818 17.4998 11.3488C17.865 11.7159 18.4587 11.7172 18.8256 11.352L23.7242 6.477C23.7245 6.47671 23.7248 6.47639 23.7251 6.47611C24.0923 6.10964 24.0911 5.51414 23.725 5.14889Z"
																fill="white"></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
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