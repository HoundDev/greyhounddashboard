import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export var data = {
   defaultFontFamily: "Poppins",
   labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ],

   datasets: [
      {
         label: "My First dataset",
         data: [20, 35, 70, 44, 40, 37, 30, 37, 10, 40, 60, 20],
         borderColor: "#ffab2d",
         borderWidth: "4",
         barThickness: "flex",
         backgroundColor: "rgba(255, 171, 45, 0.05)",
         minBarLength: 30,
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
               height: 50,
               drawBorder: true,
            },
            ticks: {
               fontColor: "#3e4954",
               max: 0.80,
               min: 0.20,
               stepSize: 0.2,
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
               stepSize: 1,
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
class ActivityLine3 extends Component {
   render() {

      return (
         <div style={{ height: "350px" }}>
            <Line data={data} options={options} height={350} />
         </div>
      );
   }
}

export default ActivityLine3;
