import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, TextField } from "@mui/material";

const ToppingsForm = ({ createTopping }) => {
	const [toppingName, setToppingName] = useState("");

	const handleChange = (event) => {
		setToppingName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createTopping({ name: toppingName });
	};

	return (
		<Box>
			<Typography
				variant="h4"
				component="h1"
			>
				Add Topping
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Topping Name"
					variant="outlined"
					value={toppingName}
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

ToppingsForm.propTypes = {
	createTopping: PropTypes.func.isRequired,
	updateTopping: PropTypes.func.isRequired,
};

export default ToppingsForm;
