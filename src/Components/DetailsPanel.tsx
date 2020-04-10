import React from "react";
import {
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Paper,
} from "@material-ui/core";
import { MainContext } from "../Context/MainContext";

export const DetailsPanel = () => {
	const { selectedCampaign } = React.useContext(MainContext);
	return (
		<>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Goal</TableCell>
							<TableCell>Current Raised</TableCell>
							<TableCell>Donors</TableCell>
							<TableCell>Days Active</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Campaign image</TableCell>
							<TableCell>Launch Date</TableCell>
							<TableCell>Visible in Search</TableCell>
							<TableCell>Is Charity</TableCell>
							<TableCell>Charity Valid</TableCell>
							<TableCell>Charity Name</TableCell>
							<TableCell>Deactivated</TableCell>
							<TableCell>Has Benefeciary</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{selectedCampaign?.title}</TableCell>
							<TableCell>{selectedCampaign?.goal}</TableCell>
							<TableCell>
								{selectedCampaign?.current_amount}
							</TableCell>
							<TableCell>{selectedCampaign?.donators}</TableCell>
							<TableCell>
								{selectedCampaign?.days_active}
							</TableCell>
							<TableCell>
								{selectedCampaign?.description}
							</TableCell>
							<TableCell>
								<a href={selectedCampaign?.campaign_image_url}>
									Link
								</a>
							</TableCell>
							<TableCell>
								{selectedCampaign?.launch_date.getMonth()}/
								{selectedCampaign?.launch_date.getDate()}/
								{selectedCampaign?.launch_date.getFullYear()}
							</TableCell>
							<TableCell>
								{selectedCampaign?.visible_in_search
									? "Y"
									: "N"}
							</TableCell>
							<TableCell>
								{selectedCampaign?.is_charity ? "Y" : "N"}
							</TableCell>
							<TableCell>
								{selectedCampaign?.charity_valid ? "Y" : "N"}
							</TableCell>
							<TableCell>
								{selectedCampaign?.charity_name}
							</TableCell>
							<TableCell>
								{selectedCampaign?.deactivated ? "Y" : "N"}
							</TableCell>
							<TableCell>
								{selectedCampaign?.has_beneficiary ? "Y" : "N"}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
