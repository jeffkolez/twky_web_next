import { Profile, ProfileCard, ProfileQuote, ProfileSearchResult, ProfilesList } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log(API_URL);

export const getHighlights = async (): Promise<ProfileCard[]> => {
    const response = await fetch(`${API_URL}/profiles/highlights`);

    if (!response.ok) {
        throw new Error("Couldn't fetch highlights");
    }

    return response.json();
};

export const getAll = async (letter?: string): Promise<ProfilesList[]> => {
    const response = await fetch(`${API_URL}/profiles/search/${letter}`);

    if (!response.ok) {
        throw new Error("Couldn't get highlights");
    }

    return response.json();
};

export const getSignificantEvents = async (date?: string): Promise<ProfileCard[]> => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const endpoint = date ? `${API_URL}/events/${date}` : `${API_URL}/events/today`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timezone: timezone }),
    });

    if (!response.ok) {
        throw new Error("Couldn't get events");
    }

    return response.json();
};

export const getRelated = async ({ queryKey }: { queryKey: [string, { id: string }] }): Promise<ProfileCard[]> => {
    const [, { id }] = queryKey;
    const response = await fetch(`${API_URL}/profiles/related/${id}`);

    if (!response.ok) {
        throw new Error("Couldn't get highlights");
    }

    return response.json();
};

export const getFeatured = async (): Promise<ProfileCard[]> => {
    const response = await fetch(`${API_URL}/profiles/featured`);

    if (!response.ok) {
        throw new Error("Couldn't get highlights");
    }

    return response.json();
};

export const getProfile = async ({ queryKey }: { queryKey: [string, { id: string }] }): Promise<Profile> => {
    const [, { id }] = queryKey;
    const response = await fetch(`${API_URL}/profiles/${id}`);

    if (!response.ok) {
        throw new Error("Couldn't get profile");
    }

    return response.json();
};

export const getQuote = async (): Promise<ProfileQuote> => {
    const response = await fetch(`${API_URL}/profiles/quote`);

    if (!response.ok) {
        throw new Error("Couldn't get quote");
    }

    return response.json();
};

export const search = async ({ queryKey }: { queryKey: [string, { w: string }] }): Promise<ProfileSearchResult[]> => {
    const [, { w }] = queryKey;
    const response = await fetch(`${API_URL}/profiles/search?w=${w}`);

    if (!response.ok) {
        throw new Error("Couldn't search");
    }

    return response.json();
};
