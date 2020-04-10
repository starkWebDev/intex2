//thinking material table here

import React from "react";
import MaterialTable from "material-table";
import { makeStyles, createStyles } from "@material-ui/core";
import { MainContext } from "../Context/MainContext";
import { DetailsModal } from "./DetailsModal";
import { MathFuncs } from "../utils/MathFuncs";

const mathFuncs = new MathFuncs();

const useStyles = makeStyles((theme) =>
	createStyles({
		table: {
			maxWidth: "98vw",
			margin: `${theme.spacing(4)}px auto`,
		},
		modalPaper: {
			width: "95%",
			height: "85%",
			position: "absolute",
			transform: "translate(-50%, -50%)",
			top: "50%",
			left: "50%",
		},
		modal: {
			outline: "none",
		},
		"& > :last-child": {
			outline: "none",
		},
	})
);

export const Browse = () => {
	const context = React.useContext(MainContext);
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
		context.removeSelectedFromSocial();
	};

	return (
		<div className={classes.table}>
			<MaterialTable
				// filterplaceholder and customfilterandsearch values on column
				columns={[
					{ title: "Title", field: "title" },
					{ title: "Currency Code", field: "currency_code" },
					{
						title: "Goal",
						field: "goal",
						filterPlaceholder: "#-# or #",
						customFilterAndSearch: numFilter,
					},

					{
						title: "Current Amount",
						field: "current_amount",
						filterPlaceholder: "#-# or #",
						customFilterAndSearch: numFilter,
					},
					{
						title: "Percent of Goal Reached",
						field: "percentOfGoal",
						filterPlaceholder: "#-# or #",
						customFilterAndSearch: numFilter,
					},
					{
						title: "# Donors",
						field: "donators",
						filterPlaceholder: "#-# or #",
						customFilterAndSearch: numFilter,
					},
					{
						title: "Social Shares",
						field: "social_share_total",
						filterPlaceholder: "#-# or #",
						customFilterAndSearch: numFilter,
					},
					{
						title: "Overall Score",
						field: "overallScore",
						cellStyle: (data, row) => {
							return ((data as unknown) as string) === "Bad"
								? { color: "red" }
								: { color: "green" };
						},
					},
				]}
				options={{
					grouping: false,
					pageSize: 5,
					filtering: true,
					actionsColumnIndex: -1,
				}}
				isLoading={context.isLoading}
				actions={[
					{
						icon: "morevertoutlined",
						tooltip: "View Details",
						onClick: (event, data) => {
							context.setSelectedCampaign(data.tableData.id);
							setOpen(true);
						},
					},
				]}
				data={context.campaigns.map((o) => {
					const donationsZScore = mathFuncs.ZScore(
						o.donators,
						context.avgDonators,
						context.stdevDonators
					);
					const sharesZScore = mathFuncs.ZScore(
						o.social_share_total,
						context.avgSocialShares,
						context.stdevSocialShares
					);
					const updatesZscore = mathFuncs.ZScore(
						o.update_count,
						context.avgUpdates,
						context.stdevUpdates
					);

					let overallScore;
					if (
						donationsZScore > 0 &&
						(sharesZScore > 0 || updatesZscore > 0)
					) {
						overallScore = "Good";
					} else if (sharesZScore > 0 && updatesZscore > 0) {
						overallScore = "Good";
					} else {
						overallScore = "Bad";
					}

					return Object.create({
						...o,
						percentOfGoal: `${Math.round(
							(Number(o.current_amount) / Number(o.goal)) * 100
						)}`,
						overallScore,
						donators: o.donators.toString(),
						social_share_total: o.social_share_total.toString(),
					});
				})}
				title="Campaigns"
			/>
			<DetailsModal open={open} handleClose={handleClose} />
		</div>
	);
};

const numFilter = (filter: any, rowData: any, column: any) => {
	const params = filter.split("-");
	let lower, upper;
	if (params.length === 2) {
		lower = Number(params[0]);
		upper = Number(params[1]);
		if (
			Number(rowData[column.field]) >= lower &&
			Number(rowData[column.field]) <= upper
		) {
			return true;
		}
	} else if (params.length === 1) {
		if (Number(rowData[column.field]) === Number(params[0])) {
			return true;
		}
	}
	return false;
};
