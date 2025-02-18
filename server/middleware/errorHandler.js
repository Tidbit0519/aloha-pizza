const errorHandler = (err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMessage =
		err.message || "Something went wrong. Please try again later.";
	res.status(errStatus).json({
		message: errMessage,
		stack: process.env.NODE_ENV === "development" ? err.stack : null,
	});
};

export default errorHandler;
