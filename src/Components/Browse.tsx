//thinking material table here

import React from "react";
import MaterialTable from "material-table";
import { makeStyles, createStyles } from "@material-ui/core";
import { MainContext } from "../Context/MainContext";
import { DetailsModal } from "./DetailsModal";

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
					{ title: "Goal", field: "goal" },
					{
						title: "Current Amount",
						field: "current_amount",
					},
					{
						title: "# Donators",
						field: "donators",
						type: "numeric",
					},
					{
						title: "Social Shares",
						field: "social_share_total",
						type: "numeric",
					},
					{
						title: "# Hearts",
						field: "hearts",
						type: "numeric",
					},
					{
						title: "Is Charity",
						field: "is_charity",
						type: "boolean",
					},
				]}
				options={{
					grouping: false,
					pageSize: 5,
					filtering: true,
					actionsColumnIndex: -1,
				}}
				// detailPanel={(rowData) => {
				// 	return <div>{rowData.id}</div>;
				// }}
				// onRowClick={(event, rowData, togglePanel) =>
				// 	togglePanel && togglePanel()
				// }
				isLoading={context.isLoading}
				actions={[
					{
						icon: "pageview",
						tooltip: "View Details",
						onClick: (event, data) => {
							context.setSelectedCampaign(data.tableData.id);
							setOpen(true);
						},
					},
				]}
				data={context.campaigns.map((o) => Object.create({ ...o }))}
				title="Campaigns"
			/>
			<DetailsModal open={open} handleClose={handleClose} />
		</div>
	);
};
