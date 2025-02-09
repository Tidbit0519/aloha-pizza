import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";

const ToppingsForm = ({ open, setOpen, createTopping }) => {
	const [toppingName, setToppingName] = useState("");

	const handleChange = (event) => {
		setToppingName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createTopping({ name: toppingName });
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			data-testid="add-topping-modal"
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
					<Typography variant="h6">Add Topping</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Topping Name"
							data-testid="topping-name-input"
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
							<Button
								variant="outlined"
								onClick={() => setOpen(false)}
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

ToppingsForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	createTopping: PropTypes.func.isRequired,
};

export default ToppingsForm;
