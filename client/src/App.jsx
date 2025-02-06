import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ToppingsPage from "./pages/ToppingsPage";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					path="/toppings"
					element={<ToppingsPage />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
