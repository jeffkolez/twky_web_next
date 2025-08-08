"use client";

import { Button, Title, Stack } from "@mantine/core";

export default function Home() {
    return (
        <main style={{ padding: 24 }}>
            <Stack>
            <Title order={2}>Hello Next.js + Mantine</Title>
            <Button onClick={() => alert("It works!")}>Click me</Button>
            </Stack>
        </main>
    );
}
