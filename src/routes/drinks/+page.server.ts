import { parseDrinks } from "$lib/api/drinks";
import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
    try {
        const response = await event.fetch('/drinks');
        if (!response.ok) {
            throw new Error('error fetching drinks');
        }
        const rows = await response.json();
        return {
            drinks: parseDrinks(rows),
        }
    } catch (e) {
        throw e;
    }
}