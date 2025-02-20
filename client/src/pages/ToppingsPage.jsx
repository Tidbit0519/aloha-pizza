import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material";
import useToppingApi from "../services/useToppingApi";
import ToppingsList from "../components/ToppingsList";
import ToppingsForm from "../components/ToppingsForm";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const ToppingsPage = () => {
	const [open, setOpen] = useState(false);
	const {
		toppings,
		loading,
		error,
		handleSearch,
		getAllToppings,
		createTopping,
		updateTopping,
		deleteTopping,
	} = useToppingApi();
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		getAllToppings();
	}, []);

	const handleCreateTopping = (topping) => {
		createTopping(topping);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				component="h1"
			>
				Toppings
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
					sx={{ flexGrow: 1 }}
					slotProps={{
						input: {
							endAdornment: searchInput && (
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
				error={error}
				open={open}
				setOpen={setOpen}
				createTopping={handleCreateTopping}
			/>
		</Box>
	);
};

export default ToppingsPage;
