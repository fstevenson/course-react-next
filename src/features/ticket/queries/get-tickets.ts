import { initialTickets } from "@/data"
import { Ticket } from "../types";

export const getTickets = async (): Promise<Ticket[]> => {
    // Simulate a delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return new Promise((resolve) => {
        resolve(initialTickets);
    });
};