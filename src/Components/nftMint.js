import React, { useState, useEffect } from "react";

export default function NftHome(props) {

	const [numMinted, setNumMinted] = useState(0);
	const [holders, setHolders] = useState(0);
	const [floor, setFloor] = useState(0);
	const [listed, setListed] = useState(0);
	const [mintedPercentage, setMintedPercentage] = useState(0);

	useEffect(() => {
		const getNumMinted = async () => {
			const url = process.env.REACT_APP_PROXY_ENDPOINT + 'api/getcollection';
			const response = await fetch(url);
			const data = await response.json();
			setNumMinted(data.totalsupply);
			setHolders(data.unique_owners);
			setFloor(data.floor);
			setListed(data.listedPercentage);
			//calculate minted percentage
			const minted = Math.round((data.totalsupply / 10000) * 100);
			setMintedPercentage(minted);
			console.log('minted: ', minted, '%')
		}
		getNumMinted();
	}, []);
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
        
        
        
        
        	
        		<div className="single-nft">
        			<div className="row">
						
        				<div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12 mb-5">
        					<div className="nft-container">
        						<h1 className="banner-title mt-5">Mint Houndie NFTs Now!</h1>
        						
        						
        						<div className="progress mb-2">
									<div className="progress-bar progress-animated bg-primary" role="progressbar" style={{width: `${mintedPercentage}%`}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
        						<p className="text-white banner-minted">{numMinted} / 10000 MINTED</p>
                            
                            
                            
                            
                            
                            
                            
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
        						<div className="img-wrapper">
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
        						<h2 className=" text-white fs-28">{holders}</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Holders</h2>
        					</div>
        				</div>
        			</div>
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">{listed}%</h2>
        						<h2 className="text-white fs-18 mb-2 font-w600">Listed</h2>
        					</div>
        				</div>
        			</div>
        			<div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
        				<div className="card logo-bg">
        					<div className="card-body text-center card-text  align-middle">
        						<h2 className=" text-white fs-28">{floor} XRP</h2>
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