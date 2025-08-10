import { Container, Grid, GridCol, Text, Box } from "@mantine/core";
import EventCard from "@/components/Card/EventCard/EventCard";
import type { ProfileCard } from "@/types";
import Link from "next/link";

function apiBase(): string {
    const raw =
        process.env.API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:8000/api";
    return raw.replace(/\/$/, "");
}

async function fetchEventsBySlug(slug: string): Promise<ProfileCard[]> {
    const timezone = process.env.SITE_TIMEZONE ?? "America/Vancouver";
    const res = await fetch(`${apiBase()}/events/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ timezone }),
        next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function SignificantDatesPage({
    title,
    dateParam,
}: {
    title: string;
    dateParam: string;
}) {
    const data = await fetchEventsBySlug(dateParam);

    return (
        <Container size="xl" mt="xl">
            <Text style={{ fontSize: 32, fontWeight: 600, letterSpacing: 1.6 }}>
                {title}
            </Text>

            {data.length === 0 ? (
                <Box mt="md">
                    <Text>No events found for this date.</Text>
                    <Text>
                        Go back to <Link href="/">home</Link> or try another date.
                    </Text>
                </Box>
            ) : (
                <Grid mt="md" gutter="md" columns={12}>
                    {data.map((card) => (
                        <GridCol key={card.id} span={{ base: 12, sm: 6, md: 3 }}>
                            <EventCard data={card} />
                        </GridCol>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
