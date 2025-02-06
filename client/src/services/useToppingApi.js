import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useToppingApi = () => {
    const [toppings, setToppings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllToppings = async () => {
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/toppings`);
            setLoading(true);
            setToppings(response.data);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const createTopping = async ({ name }) => {
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/toppings`, { name });
            setLoading(true);
            setToppings([...toppings, response.data]);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const updateTopping = async ({ id, name }) => {
        setError(null);
        try {
            const response = await axios.put(`${API_URL}/toppings/${id}`, { name });
            setLoading(true);
            setToppings(toppings.map((topping) => topping._id === id ? response.data : topping));
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteTopping = async (id) => {
        setError(null);
        try {
            await axios.delete(`${API_URL}/toppings/${id}`);
            setLoading(true);
            setToppings(toppings.filter((topping) => topping._id !== id));
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { toppings, loading, error, getAllToppings, createTopping, updateTopping, deleteTopping };
};

export default useToppingApi;