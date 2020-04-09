// thinking devextremem react time here
import React from "react";
import {
	Paper,
	makeStyles,
	createStyles,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";

import { SocialSharesGraph } from "./SocialSharesGraph";

const useStyles = makeStyles((theme) =>
	createStyles({
		graphPaper: {
			width: "500px",
			margin: `${theme.spacing(4)}px auto`,
		},
		textPaper: {
			width: "500px",
			margin: `${theme.spacing(4)}px auto`,
			padding: theme.spacing(3),
		},
		widePaper: {
			width: "100%",
			padding: theme.spacing(3),
		},
	})
);

export const Analyze = () => {
	const classes = useStyles();

	return (
		<Container>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Paper className={classes.textPaper} elevation={3}>
						<Typography variant="h6" gutterBottom>
							How Social Shares Affect Donators
						</Typography>
						<SocialSharesGraph />
					</Paper>
				</Grid>
				<Grid item container xs={12} md={6} alignContent="stretch">
					<Paper className={classes.textPaper} elevation={3}>
						<Typography variant="h6" gutterBottom>
							How Social Shares Affect Donators
						</Typography>
						<Typography variant="body1">
							As you can see in the graph about how social shares
							affect donators, there is a strong correlation
							between the number of shares on social media
							(x-axis), and the number of donators (y-axis) that a
							campaign has.
						</Typography>
						<br />
						<Typography variant="body1">
							It is the strongest indicator of how well an active
							campaign will do in terms of number of donators as
							well as overall money raised. While it is not
							something you as the campaign director may have 100%
							power over, it is something you can impact. Sharing
							on your own social media platforms often and asking
							that friends and family do the same is a great way
							to get your campaign out.
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.widePaper}>
						<Typography variant="h6" gutterBottom>
							How Updates Affect an Active Campaign
						</Typography>
						<Typography variant="body1">
							While updating your campaign information does not
							have the same strong affect that getting social
							shares does, it still has shown to help (don't
							worry, we'll have a graph showing it, too, soon).
							The great thing about updating your profile is that
							it is entirely in your power. There is no waiting on
							anyone's elses action to share a post, like there is
							with social shares. You are the one the decides to
							make an update to the campaign information. Doing so
							can do a couple of things.
						</Typography>
						<br />
						<Typography variant="body1">
							First off it should always immediately be followed
							by sharing it to your social media pages. This will
							spark those that have shared it before to do so
							again. This happens because people become invested
							in your story once they have shared it once. They
							then feel obligated to share it again to keep{" "}
							<i>their</i> family and friends in the loop
							regarding what has changed. Doing so gets your
							campaign on people's screens, which increases your
							chance of having people that have seen before but
							not donated, decide to donate. Of course another
							benefit of this chain of re-sharing (sparked by an
							update) is that you have the potential to reach new
							people that have not seen your campaign before,
							which naturally increases your chances of increasing
							donators and donations.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};
