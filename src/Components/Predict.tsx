//simple input UI here

import React from "react";
import {
	Paper,
	TextField,
	Button,
	Grid,
	makeStyles,
	createStyles,
	Container,
	Typography,
	Switch,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormControlLabel,
	FormGroup,
	Dialog,
	Backdrop,
	CircularProgress,
} from "@material-ui/core";
import { COUNTRY_CODES } from "../data/CountryCodes";
import { CURRENCY_CODES } from "../data/CurrencyCodes";
import Axios from "axios";
import { MainContext } from "../Context/MainContext";
import { useHistory } from "react-router-dom";
// import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			width: "50%",
			margin: `${theme.spacing(4)}px auto`,
		},
		paper: {
			padding: theme.spacing(3),
			// backgroundColor: theme.palette.secondary.light,
		},
		submitButton: {
			margin: `${theme.spacing(3)}px auto`,
		},
		header: {
			textAlign: "center",
		},
		subtitle: {
			margin: theme.spacing(2, 0),
		},
		dialog: {
			// width: "250px",
			padding: theme.spacing(2),
		},
		spinner: {
			zIndex: 99,
		},
	})
);

export const Predict = () => {
	const context = React.useContext(MainContext);
	const classes = useStyles();
	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [has_beneficiary, setHas_beneficiary] = React.useState<boolean>(
		false
	);
	const [currency_code, setCurrency_code] = React.useState<string>("");
	const [location_country, setLocation_country] = React.useState<string>("");
	const [goal, setGoal] = React.useState<number | string>("");
	const [dialogMessage, setDialogMessage] = React.useState<string | null>(
		null
	);
	const history = useHistory();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);

	// when we have the list of inputs, try to mirror the gofundme page's form for simplicity in filling it out
	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						setLoading(true);
						try {
							const res = await Axios.post(
								`${context.rootURL}predict/`,
								JSON.stringify({
									title,
									description,
									has_beneficiary,
									currency_code,
									location_country,
									goal,
								})
							);
							setLoading(false);
							setDialogMessage(
								`Based on your inputs, we predict that you will get ${Math.round(
									Number(res.data.donators)
								)} donators and and average donation of ${Math.round(
									Number(res.data.avg_donation)
								)} ${currency_code}!`
							);
						} catch (err) {
							setLoading(false);
							setError(true);
							throw new Error(err);
						}
					}}
				>
					<Grid container direction="column">
						<Typography variant="h4" className={classes.header}>
							Campaign Success Prediction
						</Typography>
						<Typography
							variant="subtitle1"
							className={classes.subtitle}
						>
							Input the details of your campaign and see how
							likely it is to be successful! We will compare your
							campaign details to that of thousands of others in
							our database and give you a predicition of how many
							donors yours will have, as well as the average
							donation per donor.
						</Typography>
						<TextField
							label="Title"
							value={title}
							onChange={(e) =>
								e.target.value.length < 50 &&
								setTitle(e.target.value)
							}
							required
						/>
						<TextField
							label="Description"
							multiline
							rows={3}
							rowsMax={8}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={has_beneficiary}
										onChange={(e) =>
											setHas_beneficiary(e.target.checked)
										}
									/>
								}
								label="My GoFundMe has a beneficiary"
							/>
						</FormGroup>
						<FormControl>
							<InputLabel>Country Code</InputLabel>
							<Select
								label="Country"
								value={location_country}
								onChange={(e) =>
									setLocation_country(
										e.target.value as string
									)
								}
								required
							>
								{COUNTRY_CODES.map((code) => (
									<MenuItem key={code} value={code}>
										{code}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel>Currency Code</InputLabel>
							<Select
								label="Currency Code"
								value={currency_code}
								onChange={(e) =>
									setCurrency_code(e.target.value as string)
								}
								required
							>
								{CURRENCY_CODES.map((code) => (
									<MenuItem key={code} value={code}>
										{code}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							label="Goal"
							value={goal}
							onChange={(e) => {
								(!!Number(e.target.value) ||
									e.target.value === "") &&
									setGoal(Number(e.target.value));
							}}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							className={classes.submitButton}
						>
							Submit
						</Button>
					</Grid>
				</form>
				<Dialog
					open={!!dialogMessage}
					onClose={() => setDialogMessage(null)}
				>
					<Paper className={classes.dialog}>
						<Grid
							container
							direction="column"
							justify="center"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography variant="h5">
									{error
										? "We are very sorry, but there seems to be some technical difficulties. Please try again later"
										: dialogMessage}
								</Typography>
								{error || (
									<Typography variant="subtitle1">
										If you are unhappy with your results,
										click the advice button below to be
										directed to our analyze page that will
										help you understand what makes the most
										difference in having a successful
										campaign.
									</Typography>
								)}
							</Grid>
							<Grid
								item
								container
								direction="row"
								spacing={3}
								alignItems="center"
								justify="center"
								xs={12}
							>
								<Grid item>
									<Button
										onClick={() => {
											setDialogMessage(null);
										}}
										variant="contained"
									>
										Close
									</Button>
								</Grid>
								<Grid item>
									<Button
										onClick={() => {
											setDialogMessage(null);
											history.push("/analyze");
										}}
										variant="contained"
										color="secondary"
									>
										Advice
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Dialog>
				<Backdrop open={loading} className={classes.spinner}>
					<CircularProgress color="primary" />
				</Backdrop>
			</Paper>
		</Container>
	);
};
