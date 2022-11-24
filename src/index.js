import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme} from "react-loading-skeleton";

ReactDOM.render(
  <React.StrictMode>
    <SkeletonTheme  baseColor="#21212A" highlightColor="#292935" borderRadius="0.25em">
       <BrowserRouter>
       <App />
       </BrowserRouter>
       </SkeletonTheme>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
