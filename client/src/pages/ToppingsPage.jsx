import { Box, Typography } from "@mui/material";
import ToppingsList from "../components/ToppingsList";

const ToppingsPage = () => {
	return (
		<Box>
			<Typography
				variant="h4"
				component="h1"
			>
				Toppings
			</Typography>
			<ToppingsList />
		</Box>
	);
};

export default ToppingsPage;
