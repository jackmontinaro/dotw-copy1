import { PUBLIC_SHEETS_CREDENTIALS, PUBLIC_SHEETS_SCOPES } from "$env/static/public";
import { google, type sheets_v4 } from "googleapis";

export const SHEET_NAME = 'Sheet1';

export interface Drink {
    id?: string,
    name?: string,
    recipe?: string,
    timesDrank?: number,
    notes?: string,
    overallScore?: number,
    mOverallScore?: number,
    mEaseOfMake?: number,
    mLook?: number,
    mTaste?: number,
    mWouldAtBar?: number,
    jOverallScore?: number,
    jEaseOfMake?: number,
    jLook?: number,
    jTaste?: number,
    jWouldAtBar?: number,
    hOverallScore?: number,
    hEaseOfMake?: number,
    hLook?: number,
    hTaste?: number,
    hWouldAtBar?: number,
    date?: string,
}

export class DrinksClient {
    async listDrinks(): Promise<Drink[]> {
        try {
            const response = await fetch('/drinks');
            if (!response.ok) {
                throw new Error('error fetching drinks');
            }
            const rows = await response.json();
            return parseDrinks(rows);
        } catch (e) {
            throw e;
        }
    }
}

export function initClient(): sheets_v4.Sheets {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(PUBLIC_SHEETS_CREDENTIALS),
        scopes: [PUBLIC_SHEETS_SCOPES],
    });
    return google.sheets({ version: 'v4', auth });
}

export function parseDrinks(rows: any[][]): Drink[] {
    const headers = rows.shift() as string[];
    const drinks: Drink[] = rows.map(row => {
        const res: Drink = {};
        headers.forEach((header, index) => {
            res[header as keyof typeof res] = row[index];
        });
        return res;
    });
    return drinks.reverse();
}