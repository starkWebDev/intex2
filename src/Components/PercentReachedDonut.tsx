import React from "react";
import Paper from "@material-ui/core/Paper";
import { Chart, PieSeries } from "@devexpress/dx-react-chart-material-ui";
import { MainContext } from "../Context/MainContext";

export const PercentReachedDonut = () => {
	const context = React.useContext(MainContext);
	const donutstuff = [
		{
			region: "percDone",
			val:
				(Number(context.selectedCampaign?.current_amount) /
					Number(context.selectedCampaign?.goal)) *
				100,
		},
		{
			region: "percLeft",
			val:
				100 -
				(Number(context.selectedCampaign?.current_amount) /
					Number(context.selectedCampaign?.goal)) *
					100,
		},
	];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [data, setData] = React.useState<any>(donutstuff);

	return (
		<Paper elevation={3}>
			<Chart data={data} height={350}>
				<PieSeries
					valueField="val"
					argumentField="region"
					innerRadius={0.6}
				/>
			</Chart>
		</Paper>
	);
};
