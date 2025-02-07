import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";

describe("LandingPage", () => {
	beforeEach(() => {
		render(<LandingPage />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
			),
		});
	});

	it("renders the LandingPage with title and buttons with the right links", () => {
		expect(screen.getByText("Welcome to Aloha Pizza!")).toBeInTheDocument();

		const browsePizzaButton = screen.getByRole("link", {
			name: "Browse Pizza",
		});
		const browseToppingsButton = screen.getByRole("link", {
			name: "Browse Toppings",
		});
		expect(browsePizzaButton).toHaveAttribute("href", "/pizza");
		expect(browseToppingsButton).toHaveAttribute("href", "/toppings");
	});
});
