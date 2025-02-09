import { Box, Button, Typography, Grid2 } from "@mui/material";
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
				textAlign={"center"}
			>
				Welcome to Aloha Pizza!
			</Typography>
			<Typography
				variant="h6"
				component="h2"
				textAlign={"center"}
				sx={{ my: 2 }}
			>
				If you are a pizza store owner, you can browse the toppings. If you are
				a pizza chef, you can browse the pizzas.
			</Typography>
			<Grid2
				container
				spacing={2}
				justifyContent="center"
				sx={{ mt: 4 }}
			>
				<Grid2>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to="/pizza"
						sx={{
							width: "180px",
						}}
					>
						Browse Pizza
					</Button>
				</Grid2>
				<Grid2 item>
					<Button
						variant="contained"
						color="secondary"
						component={Link}
						to="/toppings"
						sx={{
							width: "180px",
						}}
					>
						Browse Toppings
					</Button>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default LandingPage;
