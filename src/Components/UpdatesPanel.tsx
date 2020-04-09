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

export const UpdatesPanel = () => {
	const context = React.useContext(MainContext);
	return (
		<>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Photo URL</TableCell>
							<TableCell>Author</TableCell>
							<TableCell>Author Type</TableCell>
							<TableCell>Update Text</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{context.selectedCampaign?.updates?.map((update) => (
							<TableRow key={update.update_id}>
								<TableCell>
									{update.created_at.getMonth()}/
									{update.created_at.getDate()}/
									{update.created_at.getFullYear()}
								</TableCell>
								<TableCell>
									<a href={update.photo_url}>Link</a>
								</TableCell>
								<TableCell>{update.update_author}</TableCell>
								<TableCell>{update.author_type}</TableCell>
								<TableCell>{update.update_text}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
