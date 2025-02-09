import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Typography,
	TextField,
	Checkbox,
	Grid2,
	Modal,
} from "@mui/material";

const PizzaForm = ({
	open,
	setOpen,
	currentPizza,
	updatePizza,
	createPizza,
	toppings,
}) => {
	const [pizzaName, setPizzaName] = useState(currentPizza?.name || "");
	const [selectedToppings, setSelectedToppings] = useState(
		currentPizza?.toppings || []
	);

	useEffect(() => {
		if (currentPizza) {
			setPizzaName(currentPizza.name);
			setSelectedToppings(currentPizza.toppings);
		}
	}, [currentPizza]);

	const handleSelectTopping = (topping) => {
		if (selectedToppings.includes(topping._id)) {
			setSelectedToppings(selectedToppings.filter((id) => id !== topping._id));
		} else {
			setSelectedToppings([...selectedToppings, topping._id]);
		}
	};

	const handleChange = (event) => {
		setPizzaName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentPizza) {
			updatePizza({
				id: currentPizza.id,
				name: pizzaName,
				toppings: selectedToppings,
			});
		} else {
			createPizza({ name: pizzaName, toppings: selectedToppings });
		}
		setPizzaName("");
		setSelectedToppings([]);
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			data-testid="pizza-modal"
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
					maxWidth: {
						xs: "80%",
					},
				}}
			>
				<Box>
					<Typography variant="h6">
						{" "}
						{currentPizza ? "Edit Pizza" : "Add Pizza"}
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Pizza Name"
							variant="outlined"
							value={pizzaName}
							onChange={handleChange}
							fullWidth
							required
							sx={{ my: 2 }}
						/>
						<Typography
							variant="body2"
							fontWeight={"bold"}
							sx={{ my: 2 }}
						>
							Toppings
						</Typography>

						<Grid2
							container
							spacing={2}
						>
							{toppings.map((topping) => (
								<Grid2
									key={topping._id}
									size={6}
								>
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<Checkbox
											checked={selectedToppings.includes(topping._id)}
											onChange={() => handleSelectTopping(topping)}
										/>
										<Typography>{topping.name}</Typography>
									</Box>
								</Grid2>
							))}
						</Grid2>
						<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
							>
								{currentPizza ? "Update" : "Add"}
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									setOpen(false);
									setPizzaName("");
									setSelectedToppings([]);
								}}
								sx={{ ml: 2 }}
							>
								Cancel
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Modal>
	);
};

PizzaForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	currentPizza: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		toppings: PropTypes.arrayOf(PropTypes.string),
	}),
	updatePizza: PropTypes.func.isRequired,
	createPizza: PropTypes.func.isRequired,
	toppings: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
};

export default PizzaForm;
