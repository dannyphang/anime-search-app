const API_URL = 'https://api.jikan.moe/v4';

export async function getAllAnime() {
    const response = await fetch(`${API_URL}/anime`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime');
    }
    return response.json();
}

export async function searchAnime(query: string) {
    const response = await fetch(`${API_URL}/anime?q=${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime');
    }
    return response.json();
}

export async function getAnimeDetails(id: number) {
    const response = await fetch(`${API_URL}/anime/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch anime details');
    }
    return response.json();
}