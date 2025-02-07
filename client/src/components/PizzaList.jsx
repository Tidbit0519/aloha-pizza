import { Box, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzas, updatePizza, deletePizza }) => {
	return (
		<Box sx={{ mt: 2 }}>
			{pizzas.length === 0 && (
				<Typography color="textDisabled">No pizzas available</Typography>
			)}
			<Grid2
				container
				spacing={2}
			>
				{pizzas.map((pizza) => (
					<Grid2
						key={pizza._id}
						size={{ xs: 6, sm: 4, md: 3 }}
					>
						<PizzaCard
							id={pizza._id}
							name={pizza.name}
							updatePizza={updatePizza}
							deletePizza={deletePizza}
						/>
					</Grid2>
				))}
			</Grid2>
		</Box>
	);
};
PizzaList.propTypes = {
	pizzas: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	updatePizza: PropTypes.func.isRequired,
	deletePizza: PropTypes.func.isRequired,
};

export default PizzaList;
