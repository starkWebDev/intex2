import React from "react";
import { Paper } from "@material-ui/core";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { MainContext } from "../Context/MainContext";

export const DonationsTimeGraph = () => {
	const context = React.useContext(MainContext);

	return (
		//add title
		<Paper elevation={3}>
			<Chart data={context.donationsTimeData} height={350}>
				<ArgumentAxis />
				<ValueAxis />

				<LineSeries valueField="runningTotal" argumentField="day" />
				{/* <Animation /> */}
			</Chart>
		</Paper>
	);
};
