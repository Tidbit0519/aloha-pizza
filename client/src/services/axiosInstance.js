import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
	(response) => {
		toast.success(response.data.message);
		return Promise.resolve(response);
	},
	(error) => {
		const errorMessage = error.response.data.message;
		toast.error(errorMessage);
		return Promise.reject(error);
	}
);

export default axiosInstance;
