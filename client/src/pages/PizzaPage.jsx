import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	IconButton,
	TextField,
	InputAdornment,
} from "@mui/material";
import usePizzaApi from "../services/usePizzaApi";
import useToppingApi from "../services/useToppingApi";
import AddIcon from "@mui/icons-material/Add";
import PizzaList from "../components/PizzaList";
import PizzaForm from "../components/PizzaForm";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const PizzaPage = () => {
	const [open, setOpen] = useState(false);
	const {
		pizzas,
		loading,
		error,
		handleSearch,
		getAllPizzas,
		createPizza,
		updatePizza,
		deletePizza,
	} = usePizzaApi();
	const { toppings, getAllToppings } = useToppingApi();
	const [selectedPizza, setSelectedPizza] = useState(null);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		getAllPizzas();
		getAllToppings();
	}, []);

	const handleCreatePizza = async (pizza) => {
		await createPizza(pizza);
	};

	const handleCreatePizzaForm = () => {
		setSelectedPizza(null);
		setOpen(true);
	};

	const handleUpdatePizza = async (pizza) => {
		await updatePizza(pizza);
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
			<Box
				sx={{
					mt: 2,
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<TextField
					label="Search"
					variant="outlined"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => {
											setSearchInput("");
											handleSearch("");
										}}
									>
										<ClearIcon />
									</IconButton>
								</InputAdornment>
							),
						},
					}}
					sx={{ flexGrow: 1 }}
				/>
				<IconButton
					color="primary"
					onClick={() => handleSearch(searchInput)}
				>
					<SearchIcon />
				</IconButton>
			</Box>
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
				error={error}
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
