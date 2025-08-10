import { Container, Flex, ScrollArea, Text, Box } from "@mantine/core";
import Link from "next/link";
import EventCard from "@/components/Card/EventCard/EventCard";
import classes from "./SignificantDates.module.css";
import type { ProfileCard } from "@/types";

type EventsResponse = ProfileCard[];

function apiBase(): string {
    const raw =
        process.env.API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:8000/api";
    return raw.replace(/\/$/, "");
}

async function fetchSignificantEvents(): Promise<EventsResponse> {
    // Choose a stable server-side timezone so SSR is deterministic
    const timezone = process.env.SITE_TIMEZONE ?? "America/Vancouver";
    const res = await fetch(`${apiBase()}/events/today`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ timezone }),
        // Cache on the server for 10 minutes; tweak as needed
        next: { revalidate: 600 },
    });

    if (!res.ok) {
        // Fail soft: return empty so the section still renders
        return [];
    }
    return res.json();
}

function formattedTodaySlug(): string {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "long" }).toLowerCase();
    const day = String(now.getDate()).padStart(2, "0");
    return `${month}${day}`;
}

function Cards({ data }: { data: ProfileCard[] }) {
    const showMore = data.length >= 7;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
            }}
        >
            {data.map((card) => (
                <Box key={card.id}>
                    <EventCard data={card} />
                </Box>
            ))}

            {showMore && (
                <Box>
                    <Link href={`/date/${formattedTodaySlug()}`} style={{ textDecoration: "none" }}>
                        <Box className={classes.moreBox}>
                            <Text className={classes.moreText}>More</Text>
                        </Box>
                    </Link>
                </Box>
            )}
        </div>
    );
}

function Mobile({ data }: { data: ProfileCard[] }) {
    return (
        <ScrollArea w="100%" hiddenFrom="md">
            <Flex direction="column" w="100%">
                <Cards data={data} />
            </Flex>
        </ScrollArea>
    );
}

function Desktop({ data }: { data: ProfileCard[] }) {
    return (
        <Flex direction="column" w="100%" visibleFrom="md">
            <Cards data={data} />
        </Flex>
    );
}

export default async function SignificantDatesModule({ title }: { title: string }) {
    const data = await fetchSignificantEvents(); // server-side fetch

    return (
        <Container size="xl" mt="xl">
            <Text className={classes.title}>{title}</Text>
            <Mobile data={data} />
            <Desktop data={data} />
        </Container>
    );
}
