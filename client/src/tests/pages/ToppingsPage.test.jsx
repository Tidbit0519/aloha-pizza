import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ToppingsPage from "../../pages/ToppingsPage";

describe("ToppingsPage", () => {
	beforeEach(() => {
		render(<ToppingsPage />);
	});

	it("renders the ToppingsPage with heading", () => {
		expect(screen.getByText("Toppings")).toBeInTheDocument();
		expect(screen.getByText("Add Topping")).toBeInTheDocument();
	});

	it("opens the add topping modal when Add Topping is clicked", async () => {
		expect(screen.queryByTestId("add-topping-modal")).not.toBeInTheDocument();
		const addButton = screen.getByRole("button", { name: /Add Topping/i });
		userEvent.click(addButton);
		await waitFor(() => {
			expect(screen.getByTestId("add-topping-modal")).toBeInTheDocument();
		});
	});
});
