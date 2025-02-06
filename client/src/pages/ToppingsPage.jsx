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
					<ToppingsForm createTopping={handleCreateTopping} />
				</Box>
			</Modal>
		</Box>
	);
};

export default ToppingsPage;
