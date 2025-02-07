import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Chip,
	IconButton,
	Typography,
	TextField,
	Modal,
} from "@mui/material";
import { Edit, Save, Delete, Cancel } from "@mui/icons-material";
import PropTypes from "prop-types";

const PizzaCard = ({ id, name, toppings, updatePizza, deletePizza }) => {
	const [editing, setEditing] = useState(false);
	const [pizzaName, setPizzaName] = useState(name);
	const [open, setOpen] = useState(false);

	const handleCancel = () => {
		setEditing(false);
		setPizzaName(name);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await updatePizza({ id, name: pizzaName });
			setEditing(false);
		} catch (error) {
			alert(error);
		}
	};

	const handleDelete = () => {
		deletePizza(id);
	};

	return (
		<>
			<Card>
				<CardContent>
					{editing ? (
						<form onSubmit={handleSubmit}>
							<TextField
								label="Pizza Name"
								variant="outlined"
								value={pizzaName}
								onChange={(event) => setPizzaName(event.target.value)}
								fullWidth
								required
							/>
						</form>
					) : (
						<Typography>{name}</Typography>
					)}
					<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
						{toppings.map((topping) => (
							<Chip
								key={`${id}-${topping._id}`}
								label={topping.name}
							/>
						))}
					</Box>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Box>
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
								<IconButton onClick={() => setEditing(true)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => setOpen(true)}>
									<Delete color="error" />
								</IconButton>
							</>
						)}
					</Box>
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
						Are you sure you want to delete this pizza?
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

PizzaCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	toppings: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	updatePizza: PropTypes.func.isRequired,
	deletePizza: PropTypes.func.isRequired,
};

export default PizzaCard;
