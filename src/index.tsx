import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { MainProvider } from "./Context/MainContext";
import { theme } from "./theme";

ReactDOM.render(
	<Router>
		<CssBaseline>
			<ThemeProvider theme={theme}>
				<MainProvider>
					<App />
				</MainProvider>
			</ThemeProvider>
		</CssBaseline>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
