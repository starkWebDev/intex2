import React from "react";
import { AppBar, makeStyles, createStyles, Tabs, Tab } from "@material-ui/core";
import { Search, Assessment, TrendingUp } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) =>
	createStyles({
		tab: {
			fontSize: "1.6em",
			padding: `auto ${theme.spacing(3)}px`,
		},
	})
);

export const HeaderAppBar = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	return (
		<AppBar position="static">
			<Tabs
				value={
					location.pathname === "/" ? "/browse" : location.pathname
				}
				indicatorColor="secondary"
				textColor="inherit"
				onChange={(e, newVal) => {
					history.push(newVal);
				}}
				aria-label="disabled tabs example"
				centered
			>
				<Tab
					label="Browse"
					icon={<Search />}
					value="/browse"
					className={classes.tab}
				/>
				<Tab
					label="Analyze"
					icon={<Assessment />}
					value="/analyze"
					className={classes.tab}
				/>
				<Tab
					label="Predict"
					icon={<TrendingUp />}
					value="/predict"
					className={classes.tab}
				/>
			</Tabs>
		</AppBar>
	);
};
// label={
//     <Grid
//         container
//         direction="row"
//         alignItems="center"
//         justify="center"
//     >
//         <div>Browse</div>
//         <Search />
//     </Grid>
// }
