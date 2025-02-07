import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToppingsList from "../../components/ToppingsList";

describe("ToppingsList", () => {
	it("renders the ToppingsList with no toppings", () => {
		render(
			<ToppingsList
				toppings={[]}
				updateTopping={() => {}}
				deleteTopping={() => {}}
			/>
		);
		expect(screen.getByText("No toppings available")).toBeInTheDocument();
	});

	it("renders the ToppingsList with toppings", () => {
		const toppings = [
			{ _id: "1", name: "Topping 1" },
			{ _id: "2", name: "Topping 2" },
		];
		render(
			<ToppingsList
				toppings={toppings}
				updateTopping={() => {}}
				deleteTopping={() => {}}
			/>
		);
		expect(screen.getByText("Topping 1")).toBeInTheDocument();
		expect(screen.getByText("Topping 2")).toBeInTheDocument();
	});
});
