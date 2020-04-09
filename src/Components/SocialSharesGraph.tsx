import React from "react";
import { Paper } from "@material-ui/core";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	ScatterSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { MainContext } from "../Context/MainContext";

// const data = [
// 	{
// 		social: 12,
// 		donators: 20,
// 	},
// 	{
// 		social: 2,
// 		donators: 6,
// 	},
// 	{
// 		social: 50,
// 		donators: 300,
// 	},
// 	{
// 		social: 15,
// 		donators: 100,
// 	},
// 	{
// 		social: 1,
// 		donators: 5,
// 	},
// 	{
// 		social: 27,
// 		donators: 160,
// 	},
// 	{
// 		social1: 27,
// 		donators1: 160,
// 	},
// ];

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
