import React from "react";
import { Paper } from "@material-ui/core";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	ScatterSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { MainContext } from "../Context/MainContext";

export const SocialSharesGraph = () => {
	const context = React.useContext(MainContext);
	return (
		<Paper elevation={3}>
			<Chart data={context.socialSharesData} height={350}>
				<ArgumentAxis showGrid />
				<ValueAxis />
				<ScatterSeries valueField="donators" argumentField="social" />
				<ScatterSeries valueField="donators1" argumentField="social1" />
			</Chart>
		</Paper>
	);
};
