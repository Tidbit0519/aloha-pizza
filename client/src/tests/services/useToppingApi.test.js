import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import useToppingApi from "../../services/useToppingApi";
import axios from "axios";

describe("useToppingApi", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch all toppings", async () => {
        const { result } = renderHook(() => useToppingApi());
        const toppings = [{ id: 1, name: "Topping 1" }];
        vi.spyOn(axios, "get").mockResolvedValue({ data: toppings });

        await act(() => {
            result.current.getAllToppings();
        });

        expect(result.current.toppings).toEqual(toppings);
    });

    it("should return an error when fetching all toppings fails", async () => {
        const { result } = renderHook(() => useToppingApi());
        const error = "Error fetching toppings";
        vi.spyOn(axios, "get").mockRejectedValue({ response: { data: { message: error } } });

        await act(() => {
            result.current.getAllToppings();
        });

        expect(result.current.error).toEqual(error);
    });

    it("should create a topping", async () => {
        const { result } = renderHook(() => useToppingApi());
        const topping = { id: 1, name: "Topping 1" };
        vi.spyOn(axios, "post").mockResolvedValue({ data: topping });

        await act(() => {
            result.current.createTopping(topping);
        });

        expect(result.current.toppings).toEqual([topping]);
    });

    it("should return an error when creating a topping fails", async () => {
        const { result } = renderHook(() => useToppingApi());
        const error = "Error creating topping";
        vi.spyOn(axios, "post").mockRejectedValue({ response: { data: { message: error } } });

        await act(async () => {
            await expect(result.current.createTopping({ name: "Topping 1" })).rejects.toEqual(error);
        });
    });
});