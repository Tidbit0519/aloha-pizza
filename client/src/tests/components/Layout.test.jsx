import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "../../components/Layout";

describe("Layout", () => {
	it("renders the Layout with navigation links", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Layout />
				<Routes>
					<Route
						path="/"
						element={<div>Home</div>}
					/>
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getAllByText("Home")).toHaveLength(2);
		expect(screen.getByText("Pizza")).toBeInTheDocument();
		expect(screen.getByText("Toppings")).toBeInTheDocument();
	});
});
