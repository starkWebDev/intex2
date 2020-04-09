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

export const DonationsPanel = () => {
	const context = React.useContext(MainContext);
	return (
		<>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Amount</TableCell>
							<TableCell>Offline</TableCell>
							<TableCell>Anonymous</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Verified</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{context.selectedCampaign?.donations?.map((don) => (
							<TableRow key={don.donation_id}>
								<TableCell>{don.amount}</TableCell>
								<TableCell>
									{don.is_offline ? "Y" : "N"}
								</TableCell>
								<TableCell>
									{don.is_anonymous ? "Y" : "N"}
								</TableCell>
								<TableCell>{don.name}</TableCell>
								<TableCell>
									{don.created_at.getMonth()}/
									{don.created_at.getDate()}/
									{don.created_at.getFullYear()}
								</TableCell>
								<TableCell>
									{don.verified ? "Y" : "N"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
