import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PizzaCard from "../../components/PizzaCard";

const mockPizzaCardProps = {
	id: "1",
	name: "Pizza 1",
	toppings: [{ _id: "1", name: "Topping 1" }],
};

const mockHandlePizzaForm = vi.fn();
const mockDeletePizza = vi.fn();

describe("PizzaCard", () => {
	beforeEach(() => {
		render(
			<PizzaCard
				id={mockPizzaCardProps.id}
				name={mockPizzaCardProps.name}
				toppings={mockPizzaCardProps.toppings}
				handlePizzaForm={async (data) => await mockHandlePizzaForm(data)}
				deletePizza={async (id) => await mockDeletePizza(id)}
			/>
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders the PizzaCard with toppings with edit and delete button", () => {
		expect(screen.getByText("Pizza 1")).toBeInTheDocument();
		expect(
			screen.getByTestId(`edit-btn-${mockPizzaCardProps.id}`)
		).toBeInTheDocument();
		expect(
			screen.getByTestId(`delete-btn-${mockPizzaCardProps.id}`)
		).toBeInTheDocument();
	});

	it("calls the delete callback when the delete butotn is clicked", async () => {
		userEvent.click(screen.getByTestId(`delete-btn-${mockPizzaCardProps.id}`));
		await waitFor(() => {
			expect(
				screen.getByText("Are you sure you want to delete this pizza?")
			).toBeInTheDocument();
		});

		userEvent.click(screen.getByText("Delete"));
		mockDeletePizza.mockResolvedValueOnce();

		await waitFor(() => {
			expect(mockDeletePizza).toHaveBeenCalledWith("1");
		});
	});
});
