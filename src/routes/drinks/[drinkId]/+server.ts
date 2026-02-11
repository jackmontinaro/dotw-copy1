import { PUBLIC_SPREADSHEET_ID } from "$env/static/public";
import { initClient, SHEET_NAME } from "$lib/api/drinks";
import { error, json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {
    try {
        const client = initClient();
        const drinkId = event.params.drinkId;
        if (!drinkId) {
            throw error(500, 'unknown drink ID');
        }
        const response = await client.spreadsheets.values.batchGet({
            spreadsheetId: PUBLIC_SPREADSHEET_ID,
            ranges: [`${SHEET_NAME}!1:1`, `${SHEET_NAME}!${Number(drinkId)+1}:${Number(drinkId)+1}`],
        });
        const ranges = response.data.valueRanges;
        if (!ranges) {
            throw error(500, 'undefined ranges');
        }
        const header = ranges[0].values;
        if (!header) {
            throw error(500, 'invalid header');
        }
        const values = ranges[1].values;
        if (!values) {
            throw error(500, 'invalid values');
        }
        const drink = [...header, ...values]
        if (!drink) {
            return [];
        }
        return json(drink);
    } catch (e) {
        throw e;
    }
}