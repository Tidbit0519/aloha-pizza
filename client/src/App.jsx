import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ToppingsPage from "./pages/ToppingsPage";
import PizzaPage from "./pages/PizzaPage";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					path="/toppings"
					element={<ToppingsPage />}
				/>
				<Route
					path="/pizza"
					element={<PizzaPage />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
