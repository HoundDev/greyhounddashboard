import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container  } from "react-bootstrap";
import { Link, useSearchParams, useLocation  } from "react-router-dom";
require("dotenv").config();

    export default function SpringRescue(props) {
  
        
        
      return (
        <div className="content-body">
          <div className="container-fluid">
          
          		
          		<div className="page-titles">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active"><a>Events</a></li>
						<li className="breadcrumb-item"><a>VIII</a></li>
					</ol>
				</div>
				
				<div className="row">
				<div className="col-xl-6 col-xxl-6 col-lg-6">
						<div className="card">

								<div className="card-header pb-0 border-0">
									<h4 className="mb-0 text-white fs-20">You found a hidden message!</h4>
								</div>
								
								<div className="card-body pb-300">
								    <audio controls>
									  <source src="/images/events/viii.mp3" type="audio/mpeg"/>
									</audio>
								</div>
								
						</div>					
								
					</div>
				</div>
          </div>
      	</div>
      );
  };