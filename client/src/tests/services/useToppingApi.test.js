import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import useToppingApi from "../../services/useToppingApi";
import axios from "axios";

vi.mock("axios", () => {
	return {
		default: {
			post: vi.fn(),
			get: vi.fn(),
			delete: vi.fn(),
			put: vi.fn(),
			create: vi.fn().mockReturnThis(),
			interceptors: {
				request: {
					use: vi.fn(),
					eject: vi.fn(),
				},
				response: {
					use: vi.fn(),
					eject: vi.fn(),
				},
			},
		},
	};
});

const mockToppings = [{ id: 1, name: "Topping 1" }];

describe("useToppingApi", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should fetch all toppings", async () => {
		const { result } = renderHook(() => useToppingApi());
		vi.spyOn(axios, "get").mockResolvedValue({ data: mockToppings });

		await act(() => {
			result.current.getAllToppings();
		});

		expect(result.current.toppings).toEqual(mockToppings);
	});

	it("should return an error when fetching all toppings fails", async () => {
		const { result } = renderHook(() => useToppingApi());
		const error = "Error fetching toppings";
		vi.spyOn(axios, "get").mockRejectedValue({
			response: { data: { message: error } },
		});

		await act(() => {
			result.current.getAllToppings();
		});

		expect(result.current.error).toEqual(error);
	});
});
