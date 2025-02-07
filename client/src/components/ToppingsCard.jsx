import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	TextField,
	Modal,
} from "@mui/material";
import { Edit, Save, Delete, Cancel } from "@mui/icons-material";
import PropTypes from "prop-types";

const ToppingsCard = ({ id, name, updateTopping, deleteTopping }) => {
	const [editing, setEditing] = useState(false);
	const [toppingName, setToppingName] = useState(name);
	const [open, setOpen] = useState(false);

	const handleCancel = () => {
		setEditing(false);
		setToppingName(name);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await updateTopping({ id, name: toppingName });
			setEditing(false);
		} catch (error) {
			alert(error);
		}
	};

	const handleDelete = () => {
		deleteTopping(id);
	};

	return (
		<>
			<Card>
				<CardContent>
					{editing ? (
						<form onSubmit={handleSubmit}>
							<TextField
								label="Topping Name"
								variant="outlined"
								value={toppingName}
								onChange={(event) => setToppingName(event.target.value)}
								fullWidth
								required
							/>
						</form>
					) : (
						<Typography>{name}</Typography>
					)}
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
					{editing ? (
						<>
							<IconButton
								onClick={handleSubmit}
								data-testid="save"
							>
								<Save color="success" />
							</IconButton>
							<IconButton
								onClick={handleCancel}
								data-testid="cancel"
							>
								<Cancel />
							</IconButton>
						</>
					) : (
						<>
							<IconButton
								onClick={() => setEditing(true)}
								data-testid="edit"
							>
								<Edit />
							</IconButton>
							<IconButton
								onClick={() => setOpen(true)}
								data-testid="delete"
							>
								<Delete color="error" />
							</IconButton>
						</>
					)}
				</CardActions>
			</Card>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<Typography sx={{ mb: 4 }}>
						Are you sure you want to delete this topping?
					</Typography>
					<Box
						sx={{
							mt: 2,
							display: "flex",
							gap: 2,
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="contained"
							color="error"
							onClick={handleDelete}
						>
							Delete
						</Button>
						<Button
							variant="outlined"
							onClick={() => setOpen(false)}
						>
							No
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

ToppingsCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	updateTopping: PropTypes.func.isRequired,
	deleteTopping: PropTypes.func.isRequired,
};

export default ToppingsCard;
