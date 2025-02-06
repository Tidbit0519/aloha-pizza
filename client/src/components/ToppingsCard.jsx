import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ToppingsCard = ({ name }) => {
	return (
		<Card>
			<CardContent>
				<Typography
					variant="h5"
					component="div"
				>
					{name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					color="primary"
				>
					Edit
				</Button>
				<Button
					size="small"
					color="secondary"
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

ToppingsCard.propTypes = {
	name: PropTypes.string.isRequired,
};

export default ToppingsCard;
