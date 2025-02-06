import { useState, useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import useToppingApi from "../services/useToppingApi";
import AddIcon from "@mui/icons-material/Add";
import ToppingsList from "../components/ToppingsList";
import ToppingsForm from "../components/ToppingsForm";

const ToppingsPage = () => {
	const [open, setOpen] = useState(false);
	const {
		toppings,
		loading,
		error,
		getAllToppings,
		createTopping,
		updateTopping,
	} = useToppingApi();

	useEffect(() => {
		getAllToppings();
	}, []);

	useEffect(() => {
		if (error) {
			alert(error);
		}
	}, [error]);

	return (
		<Box>
			<Typography>Toppings</Typography>
			<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() => setOpen(true)}
				>
					Add Topping
				</Button>
			</Box>
			{loading ? (
				<Typography>Loading...</Typography>
			) : (
				<ToppingsList
					toppings={toppings}
					updateTopping={updateTopping}
				/>
			)}

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
					}}
				>
					<ToppingsForm
						createTopping={createTopping}
						updateTopping={updateTopping}
					/>
				</Box>
			</Modal>
		</Box>
	);
};

export default ToppingsPage;
