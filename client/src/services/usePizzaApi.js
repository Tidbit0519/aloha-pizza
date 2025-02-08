import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const usePizzaApi = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllPizzas = async () => {
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/pizzas`);
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
            await axios.post(`${API_URL}/pizzas`, { name, toppings });
            setLoading(true);
            getAllPizzas();
        } catch (error) {
            setError(error.response.data.message);
            throw error.response.data.message;
        } finally {
            setLoading(false);
        }
    };

    const updatePizza = async ({ id, name, toppings }) => {
        setError(null);
        try {
            await axios.put(`${API_URL}/pizzas/${id}`, { name, toppings });
            setLoading(true);
            getAllPizzas();
        } catch (error) {
            setError(error.response.data.message);
            throw error.response.data.message;
        } finally {
            setLoading(false);
        }
    };

    const deletePizza = async (id) => {
        setError(null);
        try {
            await axios.delete(`${API_URL}/pizzas/${id}`);
            setLoading(true);
            setPizzas(pizzas.filter((pizza) => pizza._id !== id));
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { pizzas, loading, error, getAllPizzas, createPizza, updatePizza, deletePizza };
};

export default usePizzaApi;