import { useState } from "react";
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	TextField,
} from "@mui/material";
import { Edit, Save, Delete, Cancel } from "@mui/icons-material";
import PropTypes from "prop-types";

const ToppingsCard = ({ id, name, updateTopping, deleteTopping }) => {
	const [editing, setEditing] = useState(false);
	const [toppingName, setToppingName] = useState(name);

	const handleChange = (event) => {
		setToppingName(event.target.value);
	};

	const handleEdit = () => {
		setEditing(true);
	};

	const handleCancel = () => {
		setEditing(false);
		setToppingName(name);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		updateTopping({ id, name: toppingName });
		setEditing(false);
	};

	const handleDelete = () => {
		deleteTopping(id);
	};

	return (
		<Card>
			<CardContent>
				{editing ? (
					<form onSubmit={handleSubmit}>
						<TextField
							label="Topping Name"
							variant="outlined"
							value={toppingName}
							onChange={handleChange}
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
						<IconButton onClick={handleSubmit}>
							<Save color="success" />
						</IconButton>
						<IconButton onClick={handleCancel}>
							<Cancel />
						</IconButton>
					</>
				) : (
					<>
						<IconButton onClick={handleEdit}>
							<Edit />
						</IconButton>
						<IconButton onClick={handleDelete}>
							<Delete color="error" />
						</IconButton>
					</>
				)}
			</CardActions>
		</Card>
	);
};

ToppingsCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	updateTopping: PropTypes.func.isRequired,
	deleteTopping: PropTypes.func.isRequired,
};

export default ToppingsCard;
