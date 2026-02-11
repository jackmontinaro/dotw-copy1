import { PUBLIC_SPREADSHEET_ID } from "$env/static/public";
import { initClient, SHEET_NAME } from "$lib/api/drinks";
import { json, error, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {
    try {
        const client = initClient();
        const response = await client.spreadsheets.values.get({
            spreadsheetId: PUBLIC_SPREADSHEET_ID,
            range: SHEET_NAME,
        });
        const rows = response.data.values;
        if (!rows) {
            return [];
        }
        return json(rows);
    } catch (e) {
        throw e;
    }
}

export async function POST(event: RequestEvent) {
    try {
        const body = await event.request.json();
        const client = initClient();

        // read header row to preserve column order
        const headerRes = await client.spreadsheets.values.get({
            spreadsheetId: PUBLIC_SPREADSHEET_ID,
            range: `${SHEET_NAME}!1:1`,
        });
        const headers = headerRes.data.values?.[0] ?? [];
        if (!headers.length) throw error(500, 'missing header row');

        // compute next id from column A (assumes id is in the first column)
        const idColRes = await client.spreadsheets.values.get({
            spreadsheetId: PUBLIC_SPREADSHEET_ID,
            range: `${SHEET_NAME}!A2:A`,
        });
        const idVals = idColRes.data.values?.flat().filter(v => v != null && v !== '') ?? [];
        const ids = idVals.map(v => Number(v)).filter(n => !Number.isNaN(n));
        const nextId = ids.length ? Math.max(...ids) + 1 : 1;

        // build row in the exact header order (try both exact and lowercased keys)
        const row = headers.map((h: string) => {
            const key = h;
            const keyLower = String(h).toLowerCase();
            if (keyLower === 'id') return String(nextId);
            return body[key] ?? body[keyLower] ?? '';
        });

        const appendRes = await client.spreadsheets.values.append({
            spreadsheetId: PUBLIC_SPREADSHEET_ID,
            range: SHEET_NAME,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [row],
            },
        });

        return json({ success: true, result: appendRes.data, id: nextId });
    } catch (e) {
        throw e;
    }
}