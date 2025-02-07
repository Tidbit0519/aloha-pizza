import { useState, useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import usePizzaApi from "../services/usePizzaApi";
import AddIcon from "@mui/icons-material/Add";
import PizzaList from "../components/PizzaList";
import PizzaForm from "../components/PizzaForm";

const PizzaPage = () => {
	const [open, setOpen] = useState(false);
	const {
		pizzas,
		loading,
		getAllPizzas,
		createPizza,
		updatePizza,
		deletePizza,
	} = usePizzaApi();

	useEffect(() => {
		getAllPizzas();
	}, []);

	const handleCreatePizza = async (pizza) => {
		try {
			await createPizza(pizza);
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
				Pizza
			</Typography>
			<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() => setOpen(true)}
				>
					Add Pizza
				</Button>
			</Box>
			{loading ? (
				<Typography>Loading...</Typography>
			) : (
				<PizzaList
					pizzas={pizzas}
					updatePizza={updatePizza}
					deletePizza={deletePizza}
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
					<PizzaForm createPizza={handleCreatePizza} />
				</Box>
			</Modal>
		</Box>
	);
};

export default PizzaPage;
