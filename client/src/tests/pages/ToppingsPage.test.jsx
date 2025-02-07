import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToppingsPage from "../../pages/ToppingsPage";

describe("ToppingsPage", () => {
	it("renders the ToppingsPage with heading", () => {
		render(<ToppingsPage />);
		expect(screen.getByText("Toppings")).toBeInTheDocument();
		expect(screen.getByText("Add Topping")).toBeInTheDocument();
	});
});
