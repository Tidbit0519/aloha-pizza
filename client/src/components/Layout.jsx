import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const pages = ["Pizza", "Toppings"];

const Layout = () => {
	const navigate = useNavigate();

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Button
						color="inherit"
						variant="text"
						startIcon={<HomeIcon />}
						onClick={() => navigate("/")}
						sx={{ width: 100 }}
					>
						Home
					</Button>
					<Box sx={{ marginLeft: 8 }} />
					{pages.map((page) => (
						// Mark button background darker if it's on the current page
						<Button
							key={page}
							color="inherit"
							variant="text"
							sx={{
								width: 100,
								backgroundColor:
									window.location.pathname === `/${page.toLowerCase()}`
										? "rgba(0, 0, 0, 0.1)"
										: "transparent",
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
