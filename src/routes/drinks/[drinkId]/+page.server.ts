import { parseDrinks } from "$lib/api/drinks";
import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
    try {
        const response = await event.fetch(`/drinks/${event.params.drinkId}`);
        if (!response.ok) {
            throw new Error('error fetching drinks');
        }
        const rows = await response.json();
        return {
            drink: parseDrinks(rows)[0],
        }
    } catch (e) {
        throw e;
    }
}