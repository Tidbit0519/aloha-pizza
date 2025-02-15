import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import usePizzaApi from "../services/usePizzaApi";
import useToppingApi from "../services/useToppingApi";
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
	const { toppings, getAllToppings } = useToppingApi();
	const [selectedPizza, setSelectedPizza] = useState(null);

	useEffect(() => {
		getAllPizzas();
		getAllToppings();
	}, []);

	const handleCreatePizza = async (pizza) => {
		try {
			await createPizza(pizza);
			setOpen(false);
		} catch (error) {
			alert(error);
		}
	};

	const handleCreatePizzaForm = () => {
		setSelectedPizza(null);
		setOpen(true);
	};

	const handleUpdatePizza = async (pizza) => {
		try {
			await updatePizza(pizza);
			setOpen(false);
		} catch (error) {
			alert(error);
		}
	};

	const handleUpdatePizzaForm = (pizza) => {
		setSelectedPizza(pizza);
		setOpen(true);
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
					onClick={handleCreatePizzaForm}
				>
					Add Pizza
				</Button>
			</Box>
			{loading ? (
				<Typography>Loading...</Typography>
			) : (
				<PizzaList
					pizzas={pizzas}
					handlePizzaForm={handleUpdatePizzaForm}
					deletePizza={deletePizza}
				/>
			)}
			<PizzaForm
				open={open}
				setOpen={setOpen}
				currentPizza={selectedPizza}
				updatePizza={handleUpdatePizza}
				createPizza={handleCreatePizza}
				toppings={toppings}
			/>
		</Box>
	);
};

export default PizzaPage;
