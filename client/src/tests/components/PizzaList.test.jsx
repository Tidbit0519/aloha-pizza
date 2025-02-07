import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PizzaList from "../../components/PizzaList";

const mockPizzaListProps = {
	pizzas: [
		{ _id: "1", name: "Pizza 1", toppings: [{ _id: "1", name: "topping 1" }] },
		{ _id: "2", name: "Pizza 2", toppings: [{ _id: "2", name: "topping 2" }] },
	],
	updatePizza: () => {},
	deletePizza: () => {},
};

describe("PizzaList", () => {
	it("renders the PizzaList with no pizzas", () => {
		render(
			<PizzaList
				pizzas={[]}
				updatePizza={() => {}}
				deletePizza={() => {}}
			/>
		);
		expect(screen.getByText("No pizzas available")).toBeInTheDocument();
	});

	it("renders the PizzaList with pizzas", () => {
		render(<PizzaList {...mockPizzaListProps} />);
		expect(screen.getByText("Pizza 1")).toBeInTheDocument();
		expect(screen.getByText("Pizza 2")).toBeInTheDocument();
		expect(screen.getByText("topping 1")).toBeInTheDocument();
		expect(screen.getByText("topping 2")).toBeInTheDocument();
	});
});
