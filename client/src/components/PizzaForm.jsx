import { useState } from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Typography,
	TextField,
	Checkbox,
	Grid2,
} from "@mui/material";

const PizzaForm = ({ createPizza, toppings }) => {
	const [pizzaName, setPizzaName] = useState("");
	const [selectedToppings, setSelectedToppings] = useState([]);

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
		createPizza({ name: pizzaName, toppings: selectedToppings });
	};

	return (
		<Box>
			<Typography variant="h6">Add Pizza</Typography>
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
						Add
					</Button>
				</Box>
			</form>
		</Box>
	);
};

PizzaForm.propTypes = {
	createPizza: PropTypes.func.isRequired,
	toppings: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
};

export default PizzaForm;
