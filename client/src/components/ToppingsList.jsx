import { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import { getAllToppings } from "../services/toppingServices";
import ToppingsCard from "./ToppingsCard";

const ToppingsList = () => {
	const [toppings, setToppings] = useState([]);
	useEffect(() => {
		const fetchToppings = async () => {
			const data = await getAllToppings();
			setToppings(data);
		};
		fetchToppings();
	}, []);
	return (
		<Box sx={{ mt: 2 }}>
			<Grid2
				container
				spacing={2}
			>
				{toppings.map((topping) => (
					<Grid2
						key={topping._id}
						size={{ xs: 6, sm: 4, md: 3 }}
					>
						<ToppingsCard name={topping.name} />
					</Grid2>
				))}
			</Grid2>
		</Box>
	);
};

export default ToppingsList;
