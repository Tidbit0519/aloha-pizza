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
	Modal,
	Collapse,
} from "@mui/material";
import { Edit, Delete, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const ExpandMoreTransition = styled((props) => {
	const { expand, ...other } = props;
	// return children component
	return (
		<ExpandMore
			{...other}
			sx={{
				color: "gray",
			}}
		/>
	);
})(({ theme }) => ({
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
	variants: [
		{
			props: ({ expand }) => !expand,
			style: {
				transform: "rotate(0deg)",
			},
		},
		{
			props: ({ expand }) => !!expand,
			style: {
				transform: "rotate(180deg)",
			},
		},
	],
}));

const PizzaCard = ({ id, name, toppings, handlePizzaForm, deletePizza }) => {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const handleDelete = () => {
		deletePizza(id);
	};

	return (
		<>
			<Card>
				<CardContent>
					<Typography>{name}</Typography>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Box>
						<IconButton
							data-testid={`edit-btn-${id}`}
							onClick={() => {
								const toppingIds = toppings.map((t) => t._id);
								const pizza = { id, name, toppings: toppingIds };
								handlePizzaForm(pizza);
							}}
						>
							<Edit />
						</IconButton>
						<IconButton
							data-testid={`delete-btn-${id}`}
							onClick={() => setOpen(true)}
						>
							<Delete color="error" />
						</IconButton>
					</Box>
				</CardActions>
				<CardActions
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						pl: 2,
						color: "gray",
						"&:hover": {
							cursor: "pointer",
						},
					}}
					onClick={() => setExpanded(!expanded)}
				>
					<Typography variant="caption">View Toppings</Typography>
					<ExpandMoreTransition expand={expanded} />
				</CardActions>
				<Collapse
					in={expanded}
					timeout="auto"
					unmountOnExit
				>
					<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", p: 1 }}>
						{toppings.length === 0 && (
							<Typography
								variant="caption"
								sx={{
									color: "text.secondary",
									width: "100%",
									textAlign: "center",
								}}
							>
								No toppings available
							</Typography>
						)}
						{toppings.map((topping, index) =>
							index < 3 ? (
								<Chip
									key={`${id}-${topping._id}`}
									label={topping.name}
								/>
							) : index === 3 ? (
								<Chip
									key={`${id}-${topping._id}`}
									label={`+${toppings.length - 3} more`}
								/>
							) : null
						)}
					</Box>
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
	handlePizzaForm: PropTypes.func.isRequired,
	deletePizza: PropTypes.func.isRequired,
};

export default PizzaCard;
