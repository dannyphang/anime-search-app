import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../shared/constant/common";

const API_URL = 'https://api.jikan.moe/v4';

export async function getAllAnime() {
    const response = await fetch(`${API_URL}/anime`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime');
    }
    return response.json();
}

export async function searchAnime({
    q,
    page = DEFAULT_PAGE_INDEX,
    limit = DEFAULT_PAGE_SIZE,
}: {
    q: string;
    page?: number;
    limit?: number;
}) {
    const response = await fetch(`${API_URL}/anime${returnParamDataUrl({ q, page, limit })}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime');
    }
    return response.json();
}

export async function getAnimeDetails(id: string) {
    const response = await fetch(`${API_URL}/anime/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime details');
    }
    return response.json();
}

function returnParamDataUrl(object: any): string {
    const query = Object.entries(object)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value! as any)}`)
        .join("&");

    return query ? `?${query}` : "";
}