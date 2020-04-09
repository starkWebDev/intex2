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
import { MathFuncs } from "../utils/MathFuncs";
import { red, green } from "@material-ui/core/colors";
import { DonationsPanel } from "./DonationsPanel";
import { UpdatesPanel } from "./UpdatesPanel";
import { DetailsPanel } from "./DetailsPanel";

const mathFuncs = new MathFuncs();

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
		dataPaper: {
			padding: theme.spacing(2),
		},
		bad: {
			color: red[600],
		},
		good: {
			color: green[600],
		},
		panels: {
			width: "100%",
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
	const [updatesPanel, setUpdatesPanel] = React.useState<boolean>(false);
	const [detailsPanel, setDetailsPanel] = React.useState<boolean>(false);
	const donationsZScore = context.selectedCampaign
		? mathFuncs.ZScore(
				context.selectedCampaign!.donators,
				context.avgDonators,
				context.stdevDonators
		  )
		: "loading...";
	const sharesZScore = context.selectedCampaign
		? mathFuncs.ZScore(
				context.selectedCampaign!.social_share_total,
				context.avgSocialShares,
				context.stdevSocialShares
		  )
		: "loading...";
	const updatesZscore = context.selectedCampaign
		? mathFuncs.ZScore(
				context.selectedCampaign!.update_count,
				context.avgUpdates,
				context.stdevUpdates
		  )
		: "loading...";

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
					<Grid container item xs={12} md={4} direction="column">
						<Paper elevation={3} className={classes.dataPaper}>
							<Grid item xs={12}>
								<Typography>
									Donators:{" "}
									{donationsZScore < 0 ? (
										<span className={classes.bad}>Bad</span>
									) : (
										<span className={classes.good}>
											Good
										</span>
									)}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									Average number donators:{" "}
									{context.avgDonators}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's donators:{" "}
									{context.selectedCampaign?.donators}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's donators z-score:{" "}
									{donationsZScore}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid container item xs={12} md={4} direction="column">
						<Paper elevation={3} className={classes.dataPaper}>
							<Grid item xs={12}>
								<Typography>
									Social Shares:{" "}
									{sharesZScore < 0 ? (
										<span className={classes.bad}>Bad</span>
									) : (
										<span className={classes.good}>
											Good
										</span>
									)}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									Average shares on social media:{" "}
									{context.avgSocialShares}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's shares:{" "}
									{
										context.selectedCampaign
											?.social_share_total
									}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's shares z-score:{" "}
									{sharesZScore}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid container item xs={12} md={4} direction="column">
						<Paper elevation={3} className={classes.dataPaper}>
							<Grid item xs={12}>
								<Typography>
									Updates:{" "}
									{updatesZscore < 0 ? (
										<span className={classes.bad}>Bad</span>
									) : (
										<span className={classes.good}>
											Good
										</span>
									)}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									Average number of updates:{" "}
									{context.avgUpdates}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's updates count:{" "}
									{context.selectedCampaign?.update_count}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									This campaign's update count z-score:{" "}
									{updatesZscore}
								</Typography>
							</Grid>
						</Paper>
					</Grid>

					<Grid container item xs={12} md={12}>
						<ExpansionPanel
							expanded={donationsPanel}
							onChange={() => {
								setDonationsPanel(!donationsPanel);
							}}
							className={classes.panels}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography>Donations</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<DonationsPanel />
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
					<Grid container item xs={12} md={12}>
						<ExpansionPanel
							expanded={updatesPanel}
							onChange={() => {
								setUpdatesPanel(!updatesPanel);
							}}
							className={classes.panels}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography>Updates</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<UpdatesPanel />
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
					<Grid container item xs={12} md={12}>
						<ExpansionPanel
							expanded={detailsPanel}
							onChange={() => {
								setDetailsPanel(!detailsPanel);
							}}
							className={classes.panels}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography>Details</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<DetailsPanel />
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
				</Grid>
			</Paper>
		</Modal>
	);
};
