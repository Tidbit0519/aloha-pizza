import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const pages = ["Toppings", "Pizzas"];

const Layout = () => {
	const navigate = useNavigate();

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h5"
						sx={{
							cursor: "pointer",
						}}
						onClick={() => navigate("/")}
					>
						Aloha Pizza
					</Typography>
					<Box sx={{ marginLeft: 8 }} />
					{pages.map((page) => (
						<Button
							key={page}
							color="inherit"
							variant="text"
							sx={{
								width: "100px",
							}}
							onClick={() => navigate(`/${page.toLowerCase()}`)}
						>
							{page}
						</Button>
					))}
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					mt: 4,
					mx: {
						xs: 4,
						sm: 8,
						md: 16,
						lg: 32,
					},
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
