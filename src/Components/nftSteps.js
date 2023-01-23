import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import NftCard from "./nfts/NftCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



require("dotenv").config();

function getSteps() {
  return ['Burn', 'Mint', 'Claim'];
  
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return (
	  
        <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-1">
			<div className="card overflow-hidden">
				<div className="card-header border-0 pb-0">
					<div className="stepperTitle text-white mb-2 font-w600">Burn Hound</div>
				</div>
				<div className="card-body">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>
		
					
		<div className="container text-center">
		<div className="row">
					<div className="col-md-6">
		 				<div className="mintbox">
			  				<span className="text-white">Balance</span>
			  				<div className="d-block">
			  					<span className="fs-22 text-white" id="baseField">0123456789</span>
			  				</div>
			  				<a href="/">Buy More</a>
			  			</div>	
					</div>
					<div className="col-md-6">
			  			<div className="mintbox">
			  				<span className="text-white">Cost</span>
			  				
			  				<div className="d-block">
			  					<img className="gh-icon" src="./images/svg/logo-icon.svg" height="30px" id="baseImage"/><span className="fs-24 text-white">10M HOUND</span>
			  				</div>
			  				<span className="text-white">Per NFT</span>
			  			</div>	
					</div>
		</div>
		</div>
						
						
		
				</div>
				
			</div>	
		</div>
	  
      );
    case 1:
      return (
        <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-2">
			<div className="card overflow-hidden">
				<div className="card-header border-0 pb-0">
					<div className="stepperTitle text-white mb-2 font-w600">Mint Houndie</div>
				</div>
				<div className="card-body">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>
				</div>
			</div>	
		</div>
      );
    case 2:
      return (
        <div className="col-xl-8 col-xxl-8 col-lg-8 offset-lg-2 text-center" id="mintbox-3">
			<div className="card overflow-hidden">
				<div className="card-header border-0 pb-0">
					<div className="stepperTitle text-white mb-2 font-w600">Claim Your NFT</div>
				</div>
		
				<div className="card-body">	
				<p>Click on the crate to reveal your NFT</p>

				<div id="cube" className="h-40 w-40 relative flex justify-center items-center cursor-pointer">
			      <div className="hexagon absolute"></div>
			      <div className="cube back h-40 w-40 absolute top-0 left-0"></div>
			      <div className="cube topcrate h-40 w-40 absolute top-0 left-0"></div>
			      <div className="cube leftcrate h-40 w-40 absolute top-0 left-0"></div>
			      <div className="cube rightcrate h-40 w-40 absolute top-0 left-0"></div>
			      <div className="powerup absolute"></div>
			    </div>
				</div>
		
		
			</div>	
		</div>
      );
    default:
      return 'Unknown step';
  }
}



export default function GreyStepper() {

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
  
<div className="content-body">
<div className="container-fluid">
<div className="row">
    
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className="text-center btn-bar">
                  <Button className='btn-white-border' disabled={activeStep === 0}onClick={handleBack}>Cancel</Button>
                  <Button className="btn-primary" variant="contained" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Done' : 'Next' }</Button>
               </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
   
    
</div>
</div>
</div>
    
  );
}