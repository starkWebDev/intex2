import React from "react";
import {
	Paper,
	makeStyles,
	createStyles,
	Modal,
	Grid,
	Typography,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Backdrop,
	CircularProgress,
	IconButton,
} from "@material-ui/core";
import { MainContext } from "../Context/MainContext";
import { ExpandMore, Clear } from "@material-ui/icons";
import { DonationsTimeGraph } from "./DonationsTimeGraph";
import { SocialSharesGraph } from "./SocialSharesGraph";
import { PercentReachedDonut } from "./PercentReachedDonut";

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
			padding: theme.spacing(4),
			outline: "none",
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
		spinner: {
			zIndex: 99,
		},
		deleteButton: {
			position: "absolute",
			top: theme.spacing(1),
			right: theme.spacing(1),
		},
	})
);

interface IProps {
	open: boolean;
	handleClose: () => void;
}

export const DetailsModal = ({ open, handleClose }: IProps) => {
	const context = React.useContext(MainContext);
	const classes = useStyles();
	const [donationsPanel, setDonationsPanel] = React.useState<boolean>(false);

	return (
		<Modal open={open} onClose={handleClose} className={classes.modal}>
			<Paper className={classes.modalPaper}>
				<Backdrop
					open={context.detailsLoading}
					className={classes.spinner}
				>
					<CircularProgress color="primary" />
				</Backdrop>
				<IconButton
					className={classes.deleteButton}
					onClick={handleClose}
				>
					<Clear />
				</IconButton>
				<Grid container spacing={3}>
					<Grid
						item
						container
						direction="column"
						justify="center"
						md={2}
						xs={12}
					>
						<Typography variant="h6">
							{Math.round(
								(Number(
									context.selectedCampaign?.current_amount
								) /
									Number(context.selectedCampaign?.goal)) *
									100
							)}
							% of goal reached
						</Typography>
						<PercentReachedDonut />
					</Grid>
					<Grid
						item
						container
						direction="column"
						justify="center"
						md={5}
						xs={12}
					>
						<Typography variant="h6">
							Donations over Days Since Launch
						</Typography>
						<DonationsTimeGraph />
					</Grid>
					<Grid
						item
						container
						direction="column"
						justify="center"
						md={5}
						xs={12}
					>
						<Typography variant="h6">
							Donators over Total Social Shares
						</Typography>
						<SocialSharesGraph />
					</Grid>
					<Grid
						container
						item
						xs={12}
						md={4}
						style={{ width: "100%" }}
					>
						<ExpansionPanel
							expanded={donationsPanel}
							onChange={() => {
								setDonationsPanel(!donationsPanel);
							}}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography>Donations</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<ul>
									{context.selectedCampaign?.donations?.map(
										(don) => (
											<li key={don.donation_id}>
												{don.amount}
											</li>
										)
									)}
								</ul>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
					<Grid container item xs={12} md={8}></Grid>
				</Grid>
			</Paper>
		</Modal>
	);
};
