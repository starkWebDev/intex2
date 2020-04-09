// thinking devextremem react time here
import React from "react";
import {
	Paper,
	makeStyles,
	createStyles,
	// Container,
} from "@material-ui/core";

import { SocialSharesGraph } from "./SocialSharesGraph";

const useStyles = makeStyles((theme) =>
	createStyles({
		graphPaper: {
			width: "500px",
			margin: `${theme.spacing(4)}px auto`,
		},
	})
);

export const Analyze = () => {
	const classes = useStyles();

	return (
		<>
			<Paper className={classes.graphPaper}>
				<SocialSharesGraph />
			</Paper>
		</>
	);
};
