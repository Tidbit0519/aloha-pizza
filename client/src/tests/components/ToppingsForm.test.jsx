import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToppingsForm from "../../components/ToppingsForm";

const mockToppingsFormProps = {
	open: true,
	setOpen: () => {},
	createTopping: () => {},
};

describe("ToppingsForm", () => {
	it("render the ToppingsForm with title, input and buttons", () => {
		render(<ToppingsForm {...mockToppingsFormProps} />);
		expect(screen.getByText("Add Topping")).toBeInTheDocument();
		expect(screen.getByRole("textbox"), {
			name: /Topping Name/i,
		}).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
	});
});
