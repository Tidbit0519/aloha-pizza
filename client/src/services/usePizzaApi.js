import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const createPizza = async ({ name, description, price, toppings }) => {
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/pizzas`, { name, description, price, toppings });
            setLoading(true);
            setPizzas([...pizzas, response.data]);
        } catch (error) {
            setError(error.response.data.message);
            throw error.response.data.message;
        } finally {
            setLoading(false);
        }
    };

    const updatePizza = async ({ id, name, description, price, toppings }) => {
        setError(null);
        try {
            const response = await axios.put(`${API_URL}/pizzas/${id}`, { name, description, price, toppings });
            setLoading(true);
            setPizzas(pizzas.map((pizza) => pizza._id === id ? response.data : pizza));
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