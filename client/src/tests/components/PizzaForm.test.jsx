import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PizzaForm from "../../components/PizzaForm";

const mockPizzaFormProps = {
	open: true,
	setOpen: () => {},
	currentPizza: null,
	updatePizza: () => {},
	createPizza: () => {},
	toppings: [
		{ _id: "1", name: "topping1" },
		{ _id: "2", name: "topping2" },
	],
};

describe("PizzaForm", () => {
	it("renders an empty form with unchecked boxes if there is no current pizza", () => {
		render(<PizzaForm {...mockPizzaFormProps} />);
		expect(screen.getByText("Add Pizza")).toBeInTheDocument();

		const checkboxes = screen.getAllByRole("checkbox");
		checkboxes.forEach((checkbox) => {
			expect(checkbox).not.toBeChecked();
		});

		expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
	});

	it("renders a form with the current pizza's name and checked boxes if there is a current pizza", () => {
		const mockPizza = {
			id: "1",
			name: "Pizza 1",
			toppings: [{ _id: "1", name: "topping1" }],
		};
		render(
			<PizzaForm
				{...mockPizzaFormProps}
				currentPizza={mockPizza}
			/>
		);
		expect(screen.getByText("Edit Pizza")).toBeInTheDocument();

		const checkboxes = screen.getAllByRole("checkbox");
		checkboxes.forEach((checkbox) => {
			if (checkbox.name === "topping1") {
				expect(checkbox).toBeChecked();
			} else {
				expect(checkbox).not.toBeChecked();
			}
		});

		expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
	});
});
