import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";
import ToppingsCard from "./ToppingsCard";

const ToppingsList = ({ toppings, updateTopping, deleteTopping }) => {
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
						<ToppingsCard
							id={topping._id}
							name={topping.name}
							updateTopping={updateTopping}
							deleteTopping={deleteTopping}
						/>
					</Grid2>
				))}
			</Grid2>
		</Box>
	);
};
ToppingsList.propTypes = {
	toppings: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	).isRequired,
	updateTopping: PropTypes.func.isRequired,
	deleteTopping: PropTypes.func.isRequired,
};

export default ToppingsList;
