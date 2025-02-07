import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ToppingsCard from "../../components/ToppingsCard";

describe("ToppingsCard", () => {
	beforeEach(() => {
		render(
			<ToppingsCard
				id="1"
				name="Topping 1"
				updateTopping={() => {}}
				deleteTopping={() => {}}
			/>
		);
	});

	it("renders the ToppingsCard with toppings with edit and delete button", () => {
		expect(screen.getByText("Topping 1")).toBeInTheDocument();
		expect(screen.getByTestId("edit")).toBeInTheDocument();
		expect(screen.getByTestId("delete")).toBeInTheDocument();
	});

	it("renders the ToppingsCard in editing mode", async () => {
		userEvent.click(screen.getByTestId("edit"));
		await waitFor(() => {
			expect(screen.getByRole("textbox")).toBeInTheDocument();
			expect(screen.getByTestId("save")).toBeInTheDocument();
			expect(screen.getByTestId("cancel")).toBeInTheDocument();
		});
	});
});
