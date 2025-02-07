import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Chip,
	Collapse,
	IconButton,
	Typography,
	TextField,
	Modal,
	styled,
} from "@mui/material";
import { Edit, Save, Delete, Cancel, ExpandMore } from "@mui/icons-material";
import PropTypes from "prop-types";

const ExpandMoreIcon = styled((props) => {
	// eslint-disable-next-line no-unused-vars
	const { expand, ...other } = props;
	return <ExpandMore {...other} />;
})(({ theme, expand }) => ({
	transform: expand ? "rotate(180deg)" : "rotate(0deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const PizzaCard = ({ id, name, toppings, updatePizza, deletePizza }) => {
	const [editing, setEditing] = useState(false);
	const [pizzaName, setPizzaName] = useState(name);
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
					<IconButton
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon expand={expanded} />
					</IconButton>
				</CardActions>
				<Collapse
					in={expanded}
					timeout="auto"
					unmountOnExit
				>
					<CardContent>
						<Typography
							variant="caption"
							fontWeight={"bold"}
						>
							Toppings:
						</Typography>
						<Box sx={{ display: "flex", flexWrap: "wrap" }}>
							{toppings.map((topping) => (
								<Chip
									key={topping._id}
									label={topping.name}
									sx={{ mr: 1, mt: 1 }}
								/>
							))}
						</Box>
					</CardContent>
				</Collapse>
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
