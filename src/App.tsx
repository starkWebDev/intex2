import React from "react";
import { Switch, Route } from "react-router-dom";
import { Browse } from "./Components/Browse";
import { Analyze } from "./Components/Analyze";
import { Predict } from "./Components/Predict";
import { HeaderAppBar } from "./Components/HeaderAppBar";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
	createStyles({
		"@global": {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
	})
);

function App() {
	useStyles();
	return (
		<>
			<HeaderAppBar />
			<Switch>
				<Route path="/analyze">
					<Analyze />
				</Route>
				<Route path="/predict">
					<Predict />
				</Route>
				<Route path="/">
					<Browse />
				</Route>
			</Switch>
		</>
	);
}

export default App;
