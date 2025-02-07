import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ToppingsCard from "../../components/ToppingsCard";

const mockToppingCardProps = {
	id: "1",
	name: "Topping 1",
};
const mockUpdateTopping = vi.fn();
const mockDeleteTopping = vi.fn();

describe("ToppingsCard", () => {
	beforeEach(() => {
		render(
			<ToppingsCard
				id={mockToppingCardProps.id}
				name={mockToppingCardProps.name}
				updateTopping={async (data) => await mockUpdateTopping(data)}
				deleteTopping={async (id) => await mockDeleteTopping(id)}
			/>
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders the ToppingsCard with toppings with edit and delete button", () => {
		expect(screen.getByText("Topping 1")).toBeInTheDocument();
		expect(
			screen.getByTestId(`edit-btn-${mockToppingCardProps.id}`)
		).toBeInTheDocument();
		expect(
			screen.getByTestId(`delete-btn-${mockToppingCardProps.id}`)
		).toBeInTheDocument();
	});

	it("renders the ToppingsCard in editing mode", async () => {
		userEvent.click(screen.getByTestId(`edit-btn-${mockToppingCardProps.id}`));
		await waitFor(() => {
			expect(screen.getByRole("textbox")).toBeInTheDocument();
			expect(
				screen.getByTestId(`save-btn-${mockToppingCardProps.id}`)
			).toBeInTheDocument();
			expect(
				screen.getByTestId(`cancel-btn-${mockToppingCardProps.id}`)
			).toBeInTheDocument();
		});
	});

	it("renders the ToppingsCard with updated name", async () => {
		userEvent.click(screen.getByTestId(`edit-btn-${mockToppingCardProps.id}`));
		await waitFor(() => {
			expect(screen.getByRole("textbox")).toBeInTheDocument();
		});

		const input = screen.getByRole("textbox");
		userEvent.clear(input);
		await userEvent.type(input, "Topping 1 Updated");

		userEvent.click(screen.getByTestId(`save-btn-${mockToppingCardProps.id}`));
		mockUpdateTopping.mockResolvedValueOnce();

		await waitFor(() => {
			expect(mockUpdateTopping).toHaveBeenCalledWith({
				id: mockToppingCardProps.id,
				name: "Topping 1 Updated",
			});
		});

		render(
			<ToppingsCard
				id={mockToppingCardProps.id}
				name="Topping 1 Updated"
				updateTopping={async (data) => await mockUpdateTopping(data)}
				deleteTopping={() => {}}
			/>
		);
		expect(screen.getByText("Topping 1 Updated")).toBeInTheDocument();
	});

	it("deletes the ToppingsCard from the list", async () => {
		userEvent.click(
			screen.getByTestId(`delete-btn-${mockToppingCardProps.id}`)
		);
		await waitFor(() => {
			expect(
				screen.getByText("Are you sure you want to delete this topping?")
			).toBeInTheDocument();
		});

		userEvent.click(screen.getByText("Delete"));
		mockDeleteTopping.mockResolvedValueOnce();

		await waitFor(() => {
			expect(mockDeleteTopping).toHaveBeenCalledWith(mockToppingCardProps.id);
		});
	});
});
