import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
   defaultFontFamily: "Poppins",
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
   datasets: [{
		label: "Issue Supply",
		backgroundColor: '#CE5C6C',
		borderColor: '#CE5C6C',
		pointBackgroundColor: '#CE5C6C',
		pointBorderColor: '#CE5C6C',
		borderWidth:2,
		pointHoverBackgroundColor: '#CE5C6C',
		pointHoverBorderColor: '#CE5C6C',
		data: [4000, 3000, 7000, 10000, 20000, 10000, 7000, 2000]
	}],
};

const options = {
   title: {
		display: !1
	},
	tooltips: {
		intersect: !1,
		mode: "nearest",
		xPadding: 20,
		yPadding: 20,
		caretPadding: 20
	},
	legend: {
		display: !1
	},
	responsive: !0,
	maintainAspectRatio: !1,
	hover: {
		mode: "index"
	},
   scales: {
		xAxes: [{
			display: !1,
			gridLines: !1,
			scaleLabel: {
				display: !0,
				labelString: "Month"
			}
		}],
		yAxes: [{
			display: !1,
			gridLines: !1,
			scaleLabel: {
				display: !0,
				labelString: "Value"
			},
			ticks: {
				beginAtZero: !0
			}
		}]
	},
	elements: {
		line: {
			tension: .2
		},
		point: {
			radius: 0,
			borderWidth: 0
		}
	},
	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 5,
			bottom: 0
		}
	}
	
};
class GreyhoundTruslines extends Component {
   render() {
      return <Line data={data} options={options} height={50} />;
   }
}

export default GreyhoundTruslines;