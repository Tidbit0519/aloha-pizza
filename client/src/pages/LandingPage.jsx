import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography
				variant="h4"
				component="h1"
			>
				Welcome to Aloha Pizza!
			</Typography>
			<Typography
				variant="h6"
				component="h2"
				textAlign={"center"}
				sx={{ mt: 2 }}
			>
				If you are a pizza store owner, you can browse the toppings. If you are
				a pizza chef, you can browse the pizzas.
			</Typography>
			<Box sx={{ mt: 4 }}>
				<Button
					variant="contained"
					color="primary"
					component={Link}
					to="/pizza"
				>
					Browse Pizza
				</Button>
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/toppings"
					sx={{ ml: 2 }}
				>
					Browse Toppings
				</Button>
			</Box>
		</Box>
	);
};

export default LandingPage;
