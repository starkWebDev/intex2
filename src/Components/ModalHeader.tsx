import React from "react";
import { Grid, Typography, makeStyles, createStyles } from "@material-ui/core";
import { MainContext } from "../Context/MainContext";

const useStyles = makeStyles((theme) =>
	createStyles({
		modalPaper: {
			width: "95%",
			height: "85%",
			position: "absolute",
			transform: "translate(-50%, -50%)",
			top: "50%",
			left: "50%",
			overflow: "scroll",
		},
		modal: {
			outline: "none",
		},
		label: {
			textAlign: "right",
		},
		field: {
			textAlign: "center",
		},
	})
);

export const ModalHeader = () => {
	const classes = useStyles();
	const context = React.useContext(MainContext);

	return (
		<Grid container item xs={12} spacing={2}>
			<Grid item xs={6} md={1}>
				<Typography variant="h6" className={classes.label}>
					Title:
				</Typography>
			</Grid>
			<Grid item xs={6} md={5}>
				<Typography variant="h6" className={classes.field}>
					{context.selectedCampaign?.title}
				</Typography>
			</Grid>
			<Grid item xs={6} md={1}>
				<Typography variant="h6" className={classes.label}>
					Goal:
				</Typography>
			</Grid>
			<Grid item xs={3} md={1}>
				<Typography variant="h6" className={classes.field}>
					{context.selectedCampaign?.goal}
				</Typography>
			</Grid>
			<Grid item xs={3} md={1}>
				<Typography variant="h6" className={classes.field}>
					{context.selectedCampaign?.currency_code}
				</Typography>
			</Grid>
			<Grid item xs={6} md={1}>
				<Typography variant="h6" className={classes.label}>
					Current:
				</Typography>
			</Grid>
			<Grid item xs={3} md={1}>
				<Typography variant="h6" className={classes.field}>
					{context.selectedCampaign?.current_amount}
				</Typography>
			</Grid>
			<Grid item xs={3} md={1}>
				<Typography variant="h6" className={classes.field}>
					{context.selectedCampaign?.currency_code}
				</Typography>
			</Grid>
		</Grid>
	);
};
