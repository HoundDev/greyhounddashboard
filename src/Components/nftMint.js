import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import NftCard from "./nfts/NftCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'


require("dotenv").config();

export default function NftHome(props) {

    // const [numberOfNfts, setNumberOfNfts] = useState(0);
    // const [nftImages, setNftImages] = useState([]);
    // const [nftNames, setNftNames] = useState([]);

    // function convertHexToStr(hex) {
    //     var str = '';
    //     for (var i = 0; i < hex.length; i += 2)
    //         str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    //     return str;
    // }

    // async function getNfts() {
    //     let response = await fetch(process.env.REACT_APP_PROXY_ENDPOINT + 'api/getnfts', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({"xrpAddress": props.xrpAddress})
    //       });
    //     let data = await response.json();
    //     console.log(data);
    //     setNumberOfNfts(data.account_nfts.length);
    //     let nfts = data.account_nfts;
    //     let nftImages = [];
    //     let nftNames = [];
    //     //get the `uri` from the nft
    //     for (let i = 0; i < nfts.length; i++) {
    //         let nft = nfts[i];
    //         let nftUri = nft.URI;
    //         if (nftUri === "" || nftUri === undefined) {
    //             console.log("uri is empty");
    //             continue;
    //         }
    //         //convert the uri from hex to ascii
    //         let nftUriAscii = convertHexToStr(nftUri);
    //         //if the uri does not start with `https://`, then it is not a valid uri
    //         if (!nftUriAscii.startsWith('https://')) {
    //             continue;
    //         }
            
    //         //fetch the url from the ascii uri
    //         let nftUriResponse = await fetch(nftUriAscii);
    //         //get the `image` from the response
    //         let nftUriData = await nftUriResponse.json();
    //         let nftImage = nftUriData.image;
    //         let nftName = nftUriData.name;
    //         nftImages.push(nftImage);
    //         nftNames.push(nftName);
    //     }
    //     setNftImages(nftImages);
    //     setNftNames(nftNames);
    // }

    // useEffect(() => {
    //     getNfts();
    // }, []);
    return (
    
    
    
        <div className="content-body nft-lander">
        	<div className="container-fluid bg-mint">
        	
        
        
        
        		<div className="animate__shape-1">
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNC0xNFQyMToyODoxNiswNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiBzdEV2dDp3aGVuPSIyMDIyLTA0LTE0VDIxOjI4OjE2KzA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp6X8YEAAACySURBVEiJrdPBDYMwDEBRs0FHYARG6CgdjU3KCIzAJr+XQFMaJ3ZiJBQFxf8dIgQQ4/sA3sDimBFPfAOeaTUjnvii7IcALWZGeuIupDduPjcSN50fjTfnIuLV+ai42omMFxHh+4dGxHNkB2ZJ0pY+RgEvYM3vIBK54jkQhfzE78Ao8hcvAb1IMa4BXkSN1wArUo23gBbSjFsADTHFrcAdMcc9wInsnjggEyCOZxaRwzPwAcdxooBVheNPAAAAAElFTkSuQmCC" alt="shape" />
	</div>
	
	<div className="animate__shape-2">
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNC0xNFQyMToyODoxNiswNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiBzdEV2dDp3aGVuPSIyMDIyLTA0LTE0VDIxOjI4OjE2KzA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp6X8YEAAACySURBVEiJrdPBDYMwDEBRs0FHYARG6CgdjU3KCIzAJr+XQFMaJ3ZiJBQFxf8dIgQQ4/sA3sDimBFPfAOeaTUjnvii7IcALWZGeuIupDduPjcSN50fjTfnIuLV+ai42omMFxHh+4dGxHNkB2ZJ0pY+RgEvYM3vIBK54jkQhfzE78Ao8hcvAb1IMa4BXkSN1wArUo23gBbSjFsADTHFrcAdMcc9wInsnjggEyCOZxaRwzPwAcdxooBVheNPAAAAAElFTkSuQmCC" alt="shape" />
	</div>
	
	<div className="animate__shape-3">
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNC0xNFQyMToyODoxNiswNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiBzdEV2dDp3aGVuPSIyMDIyLTA0LTE0VDIxOjI4OjE2KzA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp6X8YEAAACySURBVEiJrdPBDYMwDEBRs0FHYARG6CgdjU3KCIzAJr+XQFMaJ3ZiJBQFxf8dIgQQ4/sA3sDimBFPfAOeaTUjnvii7IcALWZGeuIupDduPjcSN50fjTfnIuLV+ai42omMFxHh+4dGxHNkB2ZJ0pY+RgEvYM3vIBK54jkQhfzE78Ao8hcvAb1IMa4BXkSN1wArUo23gBbSjFsADTHFrcAdMcc9wInsnjggEyCOZxaRwzPwAcdxooBVheNPAAAAAElFTkSuQmCC" alt="shape" />
	</div>
	
	<div className="animate__shape-5">
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNC0xNFQyMToyODoxNiswNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiBzdEV2dDp3aGVuPSIyMDIyLTA0LTE0VDIxOjI4OjE2KzA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp6X8YEAAACySURBVEiJrdPBDYMwDEBRs0FHYARG6CgdjU3KCIzAJr+XQFMaJ3ZiJBQFxf8dIgQQ4/sA3sDimBFPfAOeaTUjnvii7IcALWZGeuIupDduPjcSN50fjTfnIuLV+ai42omMFxHh+4dGxHNkB2ZJ0pY+RgEvYM3vIBK54jkQhfzE78Ao8hcvAb1IMa4BXkSN1wArUo23gBbSjFsADTHFrcAdMcc9wInsnjggEyCOZxaRwzPwAcdxooBVheNPAAAAAElFTkSuQmCC" alt="shape" />
	</div>
	
	<div className="animate__shape-4">
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNC0xNFQyMToyODoxNiswNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDQtMTRUMjE6NTk6MzIrMDY6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MzVkNDExLWQ1OTMtMjE0NC1hMGJlLWJiMTVmNDQ2ZWQ2MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUzNWQ0MTEtZDU5My0yMTQ0LWEwYmUtYmIxNWY0NDZlZDYzIiBzdEV2dDp3aGVuPSIyMDIyLTA0LTE0VDIxOjI4OjE2KzA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp6X8YEAAACySURBVEiJrdPBDYMwDEBRs0FHYARG6CgdjU3KCIzAJr+XQFMaJ3ZiJBQFxf8dIgQQ4/sA3sDimBFPfAOeaTUjnvii7IcALWZGeuIupDduPjcSN50fjTfnIuLV+ai42omMFxHh+4dGxHNkB2ZJ0pY+RgEvYM3vIBK54jkQhfzE78Ao8hcvAb1IMa4BXkSN1wArUo23gBbSjFsADTHFrcAdMcc9wInsnjggEyCOZxaRwzPwAcdxooBVheNPAAAAAElFTkSuQmCC" alt="shape" />
	</div>
        
        
        
        
        	
        		<div className="single-nft mt-5 mb-3">
        			<div className="row">

        				<div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 ">
        					<div className="nft-container">
        						<h1 className="banner-title mt-5">Mint Houndie NFTs Now!</h1>
        						
        						
        						<div className="progress mb-2">
									<div className="progress-bar progress-animated bg-primary"></div>
								</div>
        						<p className="text-white banner-minted">465 / 100000 MINTED</p>
                            
                            
                            
                            
                            
                            
                            
                            <div className="form-row align-items-center">
    							<div className="col-auto">
  
  								<a href="/nftSteps" className="btn btn-primary rounded-4 mb-2 mt-2 btn-lg mr-3">Mint Now</a>
  								<a href="/nftCollection" className="btn btn-border-white rounded-4 mb-2 mt-2 btn-lg mr-3">Explore Collection</a>
  									
  								</div>
   
    
    
  							</div>
  							<p className="text-white banner-price">Only <span>10 MILLION HOUND</span> per mint!</p>
  						
  
                            
                           
                            
                            
                            
                            
			                    
			                    
        					</div>
        				</div>
        				<div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 mint">
        					<div className="nft-container">
        						<div className="img-wrapper  mb-5">
        							<img className="img-fluid" src="/images/hero_img_1.png"/>
        						</div>
        					</div>
        				</div>
        			</div>	
        		</div>
        		
        		
        		<div className="row mb-5">
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">127</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Holders</h2>
        					</div>
        				</div>
        			</div>
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">4.5%</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Listed</h2>
        					</div>
        				</div>
        			</div>
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">30 XRP</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Floor</h2>
        					</div>
        				</div>
        			</div>
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">5%</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Royalties</h2>
        					</div>
        				</div>
        			</div>
        		</div>
        		
        		
        		
        	</div>
        </div>	
        
        
        
        
        
        
        
        
	
	
		  
    );
};