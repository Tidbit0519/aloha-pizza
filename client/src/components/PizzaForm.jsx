import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, TextField } from "@mui/material";

const PizzaForm = ({ createPizza }) => {
	const [pizzaName, setPizzaName] = useState("");

	const handleChange = (event) => {
		setPizzaName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createPizza({ name: pizzaName });
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
					sx={{ mt: 2 }}
				/>
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
};

export default PizzaForm;
