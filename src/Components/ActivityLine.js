import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export var GHdata = {
   defaultFontFamily: "Poppins",
   labels: [
   ],

   datasets: [
      {
         label: "HOUND",
         data: [],
         borderColor: "#ffab2d",
         borderWidth: "4",
         barThickness: "flex",
         backgroundColor: "rgba(255, 171, 45, 0.05)",
         minBarLength: 10,
      },
   ],
};

const options = {
   responsive: true,
   maintainAspectRatio: false,

   legend: {
      display: false,
   },
   scales: {
      yAxes: [
         {
            gridColor: "navy",
            gridLines: {
               color: "rgba(0,0,0,0.1)",
               height: 150,
               drawBorder: true,
            },
            ticks: {
               fontColor: "#3e4954",
               max: 0.00001,
               min: 0.0000001,
               stepSize: .0000025,
            },
         },
      ],
      xAxes: [
         {
            barPercentage: 0.3,

            gridLines: {
               display: false,
               zeroLineColor: "transparent",
            },
            ticks: {
               stepSize: 20,
               fontColor: "#3e4954",
               fontFamily: "Nunito, sans-serif",
            },
         },
      ],
   },
   tooltips: {
      mode: "index",
      intersect: false,
      titleFontColor: "#888",
      bodyFontColor: "#555",
      titleFontSize: 12,
      bodyFontSize: 15,
      backgroundColor: "rgba(255,255,255,1)",
      displayColors: true,
      xPadding: 10,
      yPadding: 7,
      borderColor: "rgba(220, 220, 220, 1)",
      borderWidth: 1,
      caretSize: 6,
      caretPadding: 10,
   },
};
class ActivityLine extends Component {
   render() {
      return (
         <div style={{ height: "350px" }}>
            <Line data={GHdata} options={options} height={350} />
         </div>
      );
   }
}

export default ActivityLine;
