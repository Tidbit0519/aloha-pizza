import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

const usePizzaApi = () => {
	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	const handleSearch = (name) => {
		name = name.trim().toLowerCase();
		setSearch(name);
	};

	useEffect(() => {
		getAllPizzas();
	}, [search]);

	const getAllPizzas = async () => {
		setError(null);
		try {
			const response = await axiosInstance.get(
				`${API_URL}/pizzas/${search ? `?search=${search}` : ""}`
			);
			setLoading(true);
			setPizzas(response.data);
		} catch (error) {
			setError(error.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	const createPizza = async ({ name, toppings }) => {
		setError(null);
		try {
			await axiosInstance.post(`${API_URL}/pizzas`, {
				name,
				toppings,
			});
			setLoading(true);
			getAllPizzas();
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const updatePizza = async ({ id, name, toppings }) => {
		setError(null);
		try {
			const response = await axiosInstance.put(`${API_URL}/pizzas/${id}`, {
				name,
				toppings,
			});
			setLoading(true);
			setPizzas(
				pizzas.map((pizza) => (pizza._id === id ? response.data.pizza : pizza))
			);
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const deletePizza = async (id) => {
		setError(null);
		try {
			await axiosInstance.delete(`${API_URL}/pizzas/${id}`);
			setLoading(true);
			setPizzas(pizzas.filter((pizza) => pizza._id !== id));
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		pizzas,
		loading,
		error,
		handleSearch,
		getAllPizzas,
		createPizza,
		updatePizza,
		deletePizza,
	};
};

export default usePizzaApi;
