"use client";

export default async function ListRoute({
    params
}: { params: Promise<{ letter: string }> }) {
    const { letter } = await params;
    return (
        <main style={{ padding: 24 }}>
            <h1>List by Letter</h1>
            <p>Letter: {letter}</p>
        </main>
    );
}
