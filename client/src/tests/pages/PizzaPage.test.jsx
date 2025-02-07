import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import PizzaPage from "../../pages/PizzaPage";

describe("PizzaPage", () => {
	beforeEach(() => {
		render(<PizzaPage />);
	});

	it("renders the PizzaPage with heading", () => {
		expect(screen.getByText("Pizza")).toBeInTheDocument();
		expect(screen.getByText("Add Pizza")).toBeInTheDocument();
	});

	it("opens the add pizza modal when Add Pizza is clicked and closed when cancel is clicked", async () => {
		expect(screen.queryByTestId("add-pizza-modal")).not.toBeInTheDocument();
		const addButton = screen.getByRole("button", { name: /Add Pizza/i });
		userEvent.click(addButton);
		await waitFor(() => {
			expect(screen.getByTestId("add-pizza-modal")).toBeInTheDocument();
		});

		const closeButton = screen.getByRole("button", { name: /cancel/i });
		userEvent.click(closeButton);
		await waitFor(() => {
			expect(screen.queryByTestId("add-pizza-modal")).not.toBeInTheDocument();
		});
	});
});
