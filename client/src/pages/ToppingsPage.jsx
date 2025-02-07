import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import useToppingApi from "../services/useToppingApi";
import AddIcon from "@mui/icons-material/Add";
import ToppingsList from "../components/ToppingsList";
import ToppingsForm from "../components/ToppingsForm";

const ToppingsPage = () => {
	const [open, setOpen] = useState(false);
	const {
		toppings,
		loading,
		getAllToppings,
		createTopping,
		updateTopping,
		deleteTopping,
	} = useToppingApi();

	useEffect(() => {
		getAllToppings();
	}, []);

	const handleCreateTopping = async (topping) => {
		try {
			await createTopping(topping);
			setOpen(false);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Box>
			<Typography
				variant="h4"
				component="h1"
			>
				Toppings
			</Typography>
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
					deleteTopping={deleteTopping}
				/>
			)}
			<ToppingsForm
				open={open}
				setOpen={setOpen}
				createTopping={handleCreateTopping}
			/>
		</Box>
	);
};

export default ToppingsPage;
