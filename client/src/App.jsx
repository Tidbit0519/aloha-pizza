import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import PizzaPage from "./pages/PizzaPage";
import ToppingsPage from "./pages/ToppingsPage";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					path="/"
					element={<LandingPage />}
				/>
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
